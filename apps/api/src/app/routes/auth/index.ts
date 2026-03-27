import { FastifyInstance } from 'fastify';
import {
  forgotPasswordBodySchema,
  loginBodySchema,
  registerBodySchema,
  resetPasswordBodySchema,
} from '@org/shared';
import { eq } from 'drizzle-orm';
import {
  authenticateUser,
  createPasswordResetToken,
  createSession,
  destroySession,
  registerUser,
  resetPassword,
  upsertOauthAccount,
} from '../../services/auth.js';
import { db } from '../../db/client.js';
import { users } from '../../db/schema.js';
import { redis } from '../../lib/redis.js';
import { makeToken } from '../../lib/crypto.js';

const OAUTH_STATE_KEY_PREFIX = 'oauth:state:';

function makeCookieOptions(maxAgeSeconds: number) {
  return {
    path: '/',
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: false,
    maxAge: maxAgeSeconds,
  };
}

async function resolveOauthUser(
  provider: 'google' | 'slack',
  code: string,
  env: FastifyInstance['appEnv']
) {
  if (provider === 'google' && env.GOOGLE_OAUTH_CLIENT_ID && env.GOOGLE_OAUTH_CLIENT_SECRET && env.GOOGLE_OAUTH_REDIRECT_URI) {
    const tokenResp = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: env.GOOGLE_OAUTH_CLIENT_ID,
        client_secret: env.GOOGLE_OAUTH_CLIENT_SECRET,
        redirect_uri: env.GOOGLE_OAUTH_REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });
    if (tokenResp.ok) {
      const tokenData = (await tokenResp.json()) as { access_token?: string };
      if (tokenData.access_token) {
        const userResp = await fetch(
          'https://www.googleapis.com/oauth2/v2/userinfo',
          {
            headers: {
              authorization: `Bearer ${tokenData.access_token}`,
            },
          }
        );
        if (userResp.ok) {
          const userData = (await userResp.json()) as {
            id: string;
            email?: string;
            name?: string;
          };
          return upsertOauthAccount({
            provider,
            providerAccountId: userData.id,
            email: userData.email,
            displayName: userData.name,
          });
        }
      }
    }
  }

  if (provider === 'slack' && env.SLACK_OAUTH_CLIENT_ID && env.SLACK_OAUTH_CLIENT_SECRET && env.SLACK_OAUTH_REDIRECT_URI) {
    const tokenResp = await fetch('https://slack.com/api/oauth.v2.access', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: env.SLACK_OAUTH_CLIENT_ID,
        client_secret: env.SLACK_OAUTH_CLIENT_SECRET,
        redirect_uri: env.SLACK_OAUTH_REDIRECT_URI,
      }),
    });
    if (tokenResp.ok) {
      const tokenData = (await tokenResp.json()) as {
        ok?: boolean;
        authed_user?: { id?: string };
        access_token?: string;
      };
      if (tokenData.ok && tokenData.access_token) {
        const profileResp = await fetch('https://slack.com/api/users.identity', {
          headers: { authorization: `Bearer ${tokenData.access_token}` },
        });
        if (profileResp.ok) {
          const profileData = (await profileResp.json()) as {
            ok?: boolean;
            user?: { id?: string; email?: string; name?: string };
          };
          if (profileData.ok && profileData.user?.id) {
            return upsertOauthAccount({
              provider,
              providerAccountId: profileData.user.id,
              email: profileData.user.email,
              displayName: profileData.user.name,
            });
          }
        }
      }
    }
  }

  return upsertOauthAccount({
    provider,
    providerAccountId: code,
    email: `${provider}-${code}@local`,
    displayName: `${provider} user`,
  });
}

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/register', async (request, reply) => {
    const parsed = registerBodySchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: parsed.error.flatten() });
    }

    const existing = await db.query.users.findFirst({
      where: eq(users.email, parsed.data.email.toLowerCase()),
    });
    if (existing) {
      return reply.status(409).send({ error: 'Email already exists' });
    }

    const user = await registerUser(parsed.data);
    const session = await createSession(user.id);
    reply.setCookie(
      fastify.appEnv.SESSION_COOKIE_NAME,
      session.sessionToken,
      makeCookieOptions(Math.floor((session.expiresAt.getTime() - Date.now()) / 1000))
    );
    return reply.send({ user: { id: user.id, email: user.email, displayName: user.displayName } });
  });

  fastify.post('/login', async (request, reply) => {
    const parsed = loginBodySchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: parsed.error.flatten() });
    }

    const user = await authenticateUser(parsed.data);
    if (!user) {
      return reply.status(401).send({ error: 'Invalid credentials' });
    }

    const session = await createSession(user.id);
    reply.setCookie(
      fastify.appEnv.SESSION_COOKIE_NAME,
      session.sessionToken,
      makeCookieOptions(Math.floor((session.expiresAt.getTime() - Date.now()) / 1000))
    );
    return reply.send({
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
      },
    });
  });

  fastify.post('/logout', { preHandler: fastify.requireAuth }, async (request, reply) => {
    const token = request.cookies[fastify.appEnv.SESSION_COOKIE_NAME];
    if (token) {
      await destroySession(token);
    }
    reply.clearCookie(fastify.appEnv.SESSION_COOKIE_NAME, { path: '/' });
    return reply.send({ ok: true });
  });

  fastify.get('/me', { preHandler: fastify.requireAuth }, async (request) => {
    return { user: request.user };
  });

  fastify.post('/forgot-password', async (request, reply) => {
    const parsed = forgotPasswordBodySchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: parsed.error.flatten() });
    }

    const reset = await createPasswordResetToken(parsed.data.email);
    if (!reset) {
      return reply.send({ ok: true });
    }

    return reply.send({
      ok: true,
      resetToken: reset.resetToken,
    });
  });

  fastify.post('/reset-password', async (request, reply) => {
    const parsed = resetPasswordBodySchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: parsed.error.flatten() });
    }
    const done = await resetPassword(parsed.data.token, parsed.data.password);
    if (!done) {
      return reply.status(400).send({ error: 'Invalid or expired token' });
    }
    return reply.send({ ok: true });
  });

  fastify.get('/oauth/:provider/start', async (request, reply) => {
    const provider = request.params as { provider: 'google' | 'slack' };
    if (!['google', 'slack'].includes(provider.provider)) {
      return reply.status(400).send({ error: 'Unsupported provider' });
    }

    const state = makeToken(16);
    await redis.setex(`${OAUTH_STATE_KEY_PREFIX}${state}`, 600, provider.provider);

    if (provider.provider === 'google') {
      if (!fastify.appEnv.GOOGLE_OAUTH_CLIENT_ID || !fastify.appEnv.GOOGLE_OAUTH_REDIRECT_URI) {
        return reply.status(400).send({ error: 'Google OAuth is not configured' });
      }
      const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
      url.searchParams.set('response_type', 'code');
      url.searchParams.set('client_id', fastify.appEnv.GOOGLE_OAUTH_CLIENT_ID);
      url.searchParams.set('redirect_uri', fastify.appEnv.GOOGLE_OAUTH_REDIRECT_URI);
      url.searchParams.set('scope', 'openid email profile');
      url.searchParams.set('state', state);
      return reply.send({ url: url.toString() });
    }

    if (!fastify.appEnv.SLACK_OAUTH_CLIENT_ID || !fastify.appEnv.SLACK_OAUTH_REDIRECT_URI) {
      return reply.status(400).send({ error: 'Slack OAuth is not configured' });
    }
    const url = new URL('https://slack.com/oauth/v2/authorize');
    url.searchParams.set('client_id', fastify.appEnv.SLACK_OAUTH_CLIENT_ID);
    url.searchParams.set('redirect_uri', fastify.appEnv.SLACK_OAUTH_REDIRECT_URI);
    url.searchParams.set('scope', 'identity.basic,identity.email');
    url.searchParams.set('state', state);
    return reply.send({ url: url.toString() });
  });

  fastify.get('/oauth/:provider/callback', async (request, reply) => {
    const provider = request.params as { provider: 'google' | 'slack' };
    const query = request.query as { code?: string; state?: string };
    if (!query.code || !query.state) {
      return reply.status(400).send({ error: 'Missing code/state' });
    }

    const stateProvider = await redis.get(`${OAUTH_STATE_KEY_PREFIX}${query.state}`);
    if (!stateProvider || stateProvider !== provider.provider) {
      return reply.status(400).send({ error: 'Invalid OAuth state' });
    }
    await redis.del(`${OAUTH_STATE_KEY_PREFIX}${query.state}`);

    const oauthUser = await resolveOauthUser(provider.provider, query.code, fastify.appEnv);
    const session = await createSession(oauthUser.id);
    reply.setCookie(
      fastify.appEnv.SESSION_COOKIE_NAME,
      session.sessionToken,
      makeCookieOptions(Math.floor((session.expiresAt.getTime() - Date.now()) / 1000))
    );
    return reply.redirect(`${fastify.appEnv.APP_BASE_URL}/`);
  });
}
