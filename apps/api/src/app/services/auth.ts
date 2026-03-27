import bcrypt from 'bcryptjs';
import { and, eq, gt, isNull } from 'drizzle-orm';
import { db } from '../db/client.js';
import {
  accounts,
  passwordResetTokens,
  sessions,
  users,
  wallets,
} from '../db/schema.js';
import { hashToken, makeToken } from '../lib/crypto.js';
import { getEnv } from '../config/env.js';

const env = getEnv();

export interface SessionResult {
  sessionToken: string;
  expiresAt: Date;
}

export async function registerUser(input: {
  email: string;
  displayName: string;
  password: string;
}) {
  const normalizedEmail = input.email.trim().toLowerCase();
  const passwordHash = await bcrypt.hash(input.password, 10);

  const result = await db
    .insert(users)
    .values({
      email: normalizedEmail,
      displayName: input.displayName.trim(),
      passwordHash,
    })
    .returning({
      id: users.id,
      email: users.email,
      displayName: users.displayName,
    });

  const user = result[0];
  if (!user) {
    throw new Error('Unable to register user');
  }

  await db.insert(wallets).values({
    userId: user.id,
    availablePoints: 0,
  });

  return user;
}

export async function authenticateUser(input: {
  email: string;
  password: string;
}) {
  const normalizedEmail = input.email.trim().toLowerCase();
  const user = await db.query.users.findFirst({
    where: eq(users.email, normalizedEmail),
  });

  if (!user || !user.passwordHash) {
    return null;
  }

  const valid = await bcrypt.compare(input.password, user.passwordHash);
  if (!valid) {
    return null;
  }

  return user;
}

export async function createSession(userId: string): Promise<SessionResult> {
  const sessionToken = makeToken(32);
  const tokenHash = hashToken(sessionToken);
  const expiresAt = new Date(
    Date.now() + env.SESSION_TTL_HOURS * 60 * 60 * 1000
  );

  await db.insert(sessions).values({
    userId,
    tokenHash,
    expiresAt,
  });

  return { sessionToken, expiresAt };
}

export async function findSessionUser(sessionToken: string) {
  const tokenHash = hashToken(sessionToken);

  const rows = await db
    .select({
      id: users.id,
      email: users.email,
      displayName: users.displayName,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      passwordHash: users.passwordHash,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(and(eq(sessions.tokenHash, tokenHash), gt(sessions.expiresAt, new Date())))
    .limit(1);

  const user = rows[0];
  if (!user) {
    return null;
  }

  return user;
}

export async function destroySession(sessionToken: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.tokenHash, hashToken(sessionToken)));
}

export async function createPasswordResetToken(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await db.query.users.findFirst({
    where: eq(users.email, normalizedEmail),
  });

  if (!user) {
    return null;
  }

  const resetToken = makeToken(32);
  const tokenHash = hashToken(resetToken);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 30);

  await db.insert(passwordResetTokens).values({
    userId: user.id,
    tokenHash,
    expiresAt,
  });

  return { resetToken, user };
}

export async function resetPassword(token: string, password: string) {
  const tokenHash = hashToken(token);
  const resetRow = await db.query.passwordResetTokens.findFirst({
    where: and(
      eq(passwordResetTokens.tokenHash, tokenHash),
      gt(passwordResetTokens.expiresAt, new Date()),
      isNull(passwordResetTokens.consumedAt)
    ),
  });

  if (!resetRow) {
    return false;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.transaction(async (tx) => {
    await tx
      .update(users)
      .set({ passwordHash, updatedAt: new Date() })
      .where(eq(users.id, resetRow.userId));

    await tx
      .update(passwordResetTokens)
      .set({ consumedAt: new Date() })
      .where(eq(passwordResetTokens.id, resetRow.id));
  });

  return true;
}

export async function upsertOauthAccount(input: {
  provider: 'google' | 'slack';
  providerAccountId: string;
  email?: string;
  displayName?: string;
}) {
  let user = input.email
    ? await db.query.users.findFirst({
        where: eq(users.email, input.email.toLowerCase()),
      })
    : null;

  if (!user) {
    const inserted = await db
      .insert(users)
      .values({
        email: input.email ?? `${input.provider}-${input.providerAccountId}@local`,
        displayName: input.displayName ?? `${input.provider} user`,
      })
      .returning();
    user = inserted[0] ?? null;
    if (!user) {
      throw new Error('Cannot create oauth user');
    }
    await db.insert(wallets).values({
      userId: user.id,
      availablePoints: 0,
    });
  }

  const existing = await db.query.accounts.findFirst({
    where: and(
      eq(accounts.provider, input.provider),
      eq(accounts.providerAccountId, input.providerAccountId)
    ),
  });

  if (!existing) {
    await db.insert(accounts).values({
      userId: user.id,
      provider: input.provider,
      providerAccountId: input.providerAccountId,
    });
  }

  return user;
}
