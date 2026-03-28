import fp from 'fastify-plugin';
import cookie from '@fastify/cookie';
import rateLimit from '@fastify/rate-limit';
import websocket from '@fastify/websocket';
import cors from '@fastify/cors';
import { FastifyReply, FastifyRequest } from 'fastify';
import { getEnv } from '../config/env.js';
import { findSessionUser } from '../services/auth.js';
import { publishEvent, startRealtimeSubscriber } from '../services/realtime.js';

export default fp(async function infrastructurePlugin(fastify) {
  const env = getEnv();
  fastify.decorate('appEnv', env);
  fastify.decorate('publishEvent', publishEvent);

  await fastify.register(cookie);
  await fastify.register(cors, {
    origin: env.APP_BASE_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });
  await fastify.register(rateLimit, {
    max: env.RATE_LIMIT_MAX,
    timeWindow: env.RATE_LIMIT_WINDOW,
  });
  await fastify.register(websocket);

  await startRealtimeSubscriber();

  fastify.addHook('preHandler', async (request, reply) => {
    const method = request.method.toUpperCase();
    const isMutating = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);
    if (!isMutating) {
      return;
    }

    const routeUrl = request.routeOptions.url ?? '';
    const isOauthCallback =
      routeUrl.includes('/auth/oauth/:provider/callback') ||
      routeUrl.includes('/auth/oidc/callback');
    const isWebsocket = routeUrl.includes('/notifications/stream');
    if (isOauthCallback || isWebsocket) {
      return;
    }

    const sessionToken = request.cookies[env.SESSION_COOKIE_NAME];
    if (!sessionToken) {
      return;
    }

    const csrfCookie = request.cookies[env.CSRF_COOKIE_NAME];
    const csrfHeader = request.headers[env.CSRF_HEADER_NAME] as
      | string
      | undefined;

    if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
      return reply.status(403).send({ error: 'Invalid CSRF token' });
    }
  });

  fastify.decorate(
    'requireAuth',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const token = request.cookies[env.SESSION_COOKIE_NAME];
      if (!token) {
        return reply.status(401).send({ error: 'Unauthorized' });
      }

      const user = await findSessionUser(token);
      if (!user) {
        reply.clearCookie(env.SESSION_COOKIE_NAME);
        return reply.status(401).send({ error: 'Unauthorized' });
      }

      request.user = {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        role: user.role,
      };
    }
  );
});
