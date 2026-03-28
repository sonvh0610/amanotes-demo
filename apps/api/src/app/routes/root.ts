import { FastifyInstance } from 'fastify';
import { and, asc, desc, eq, ilike, inArray, lt, or, sql } from 'drizzle-orm';
import { listUsersQuerySchema, listWalletTransactionsQuerySchema } from '@org/shared';
import { db } from '../db/client.js';
import {
  budgetLedger,
  kudos,
  monthlyGivingWallets,
  pointLedger,
  redemptions,
  rewards,
  users,
  wallets,
} from '../db/schema.js';
import { monthKeyFromDate } from '../lib/time.js';

const MONTHLY_GIVING_LIMIT = 200;

function decodeCursor(
  cursor?: string
): { createdAt: string; id: string } | null {
  if (!cursor) return null;
  try {
    const decoded = JSON.parse(
      Buffer.from(cursor, 'base64url').toString('utf-8')
    ) as { createdAt: string; id: string };
    if (!decoded.createdAt || !decoded.id) return null;
    return decoded;
  } catch {
    return null;
  }
}

function encodeCursor(createdAt: Date, id: string): string {
  return Buffer.from(
    JSON.stringify({ createdAt: createdAt.toISOString(), id }),
    'utf-8'
  ).toString('base64url');
}

async function getGivingWallet(userId: string) {
  const monthKey = monthKeyFromDate();
  const existing = await db.query.monthlyGivingWallets.findFirst({
    where: and(
      eq(monthlyGivingWallets.userId, userId),
      eq(monthlyGivingWallets.monthKey, monthKey)
    ),
  });

  if (existing) {
    return existing;
  }

  const spentRows = await db
    .select({
      total: sql<number>`coalesce(sum(${budgetLedger.deltaPoints}), 0)`,
    })
    .from(budgetLedger)
    .where(
      and(eq(budgetLedger.userId, userId), eq(budgetLedger.monthKey, monthKey))
    );
  const spentPoints = Math.abs(Math.min(spentRows[0]?.total ?? 0, 0));

  const inserted = await db
    .insert(monthlyGivingWallets)
    .values({
      userId,
      monthKey,
      spentPoints,
      limitPoints: MONTHLY_GIVING_LIMIT,
    })
    .onConflictDoUpdate({
      target: [monthlyGivingWallets.userId, monthlyGivingWallets.monthKey],
      set: {
        spentPoints,
        updatedAt: new Date(),
      },
    })
    .returning();

  return inserted[0]!;
}

export default async function (fastify: FastifyInstance) {
  fastify.get('/', async function () {
    return { message: 'Goodjob API is running' };
  });

  fastify.get('/healthz', async function () {
    return { ok: true, service: 'api' };
  });

  fastify.get(
    '/wallet',
    { preHandler: fastify.requireAuth },
    async (request, reply) => {
      const wallet = await db.query.wallets.findFirst({
        where: eq(wallets.userId, request.user!.id),
      });
      if (!wallet) {
        return reply.status(404).send({ error: 'Wallet not found' });
      }

      const givingWallet = await getGivingWallet(request.user!.id);

      return reply.send({
        wallet: {
          receivedWallet: wallet,
          givingWallet: {
            monthKey: givingWallet.monthKey,
            limitPoints: givingWallet.limitPoints,
            spentPoints: givingWallet.spentPoints,
            remainingPoints: Math.max(
              givingWallet.limitPoints - givingWallet.spentPoints,
              0
            ),
            updatedAt: givingWallet.updatedAt,
          },
        },
      });
    }
  );

  fastify.get(
    '/wallet/transactions',
    { preHandler: fastify.requireAuth },
    async (request, reply) => {
      const parsed = listWalletTransactionsQuerySchema.safeParse(request.query);
      if (!parsed.success) {
        return reply.status(400).send({ error: parsed.error.flatten() });
      }

      const { limit } = parsed.data;
      const cursor = decodeCursor(parsed.data.cursor);

      const rows = await db
        .select({
          id: pointLedger.id,
          deltaPoints: pointLedger.deltaPoints,
          direction: pointLedger.direction,
          reason: pointLedger.reason,
          refType: pointLedger.refType,
          refId: pointLedger.refId,
          createdAt: pointLedger.createdAt,
        })
        .from(pointLedger)
        .where(
          and(
            eq(pointLedger.userId, request.user!.id),
            cursor
              ? or(
                  lt(pointLedger.createdAt, new Date(cursor.createdAt)),
                  and(
                    eq(pointLedger.createdAt, new Date(cursor.createdAt)),
                    lt(pointLedger.id, cursor.id)
                  )
                )
              : undefined
          )
        )
        .orderBy(desc(pointLedger.createdAt), desc(pointLedger.id))
        .limit(limit + 1);

      const hasMore = rows.length > limit;
      const items = hasMore ? rows.slice(0, limit) : rows;

      const kudoIds = items
        .filter((row) => row.refType === 'kudo')
        .map((row) => row.refId);
      const redemptionIds = items
        .filter((row) => row.refType === 'redemption')
        .map((row) => row.refId);

      const kudoRows =
        kudoIds.length > 0
          ? await db
              .select({
                id: kudos.id,
                senderId: kudos.senderId,
                receiverId: kudos.receiverId,
              })
              .from(kudos)
              .where(inArray(kudos.id, kudoIds))
          : [];

      const kudoUserIds = Array.from(
        new Set(
          kudoRows.flatMap((row) => [row.senderId, row.receiverId]).filter(Boolean)
        )
      );

      const kudoUsers =
        kudoUserIds.length > 0
          ? await db
              .select({
                id: users.id,
                displayName: users.displayName,
              })
              .from(users)
              .where(inArray(users.id, kudoUserIds))
          : [];

      const kudoById = new Map(kudoRows.map((row) => [row.id, row]));
      const userNameById = new Map(kudoUsers.map((row) => [row.id, row.displayName]));

      const redemptionRows =
        redemptionIds.length > 0
          ? await db
              .select({
                id: redemptions.id,
                rewardId: redemptions.rewardId,
              })
              .from(redemptions)
              .where(inArray(redemptions.id, redemptionIds))
          : [];

      const rewardIds = Array.from(
        new Set(redemptionRows.map((row) => row.rewardId).filter(Boolean))
      );

      const rewardRows =
        rewardIds.length > 0
          ? await db
              .select({
                id: rewards.id,
                name: rewards.name,
              })
              .from(rewards)
              .where(inArray(rewards.id, rewardIds))
          : [];

      const redemptionById = new Map(redemptionRows.map((row) => [row.id, row]));
      const rewardNameById = new Map(rewardRows.map((row) => [row.id, row.name]));

      const enrichedItems = items.map((row) => {
        let detail: string | null = null;

        if (row.reason === 'reward_redeemed' && row.refType === 'redemption') {
          const redemption = redemptionById.get(row.refId);
          const rewardName = redemption
            ? rewardNameById.get(redemption.rewardId) ?? null
            : null;
          detail = rewardName ? `Reward: ${rewardName}` : null;
        }

        if (row.reason === 'kudo_received' && row.refType === 'kudo') {
          const kudo = kudoById.get(row.refId);
          const senderName = kudo ? userNameById.get(kudo.senderId) ?? null : null;
          detail = senderName ? `From: ${senderName}` : null;
        }

        if (row.reason === 'kudo_sent' && row.refType === 'kudo') {
          const kudo = kudoById.get(row.refId);
          const receiverName = kudo ? userNameById.get(kudo.receiverId) ?? null : null;
          detail = receiverName ? `To: ${receiverName}` : null;
        }

        return {
          ...row,
          detail,
        };
      });

      const nextCursor =
        hasMore && items.length > 0
          ? encodeCursor(
              items[items.length - 1]!.createdAt,
              items[items.length - 1]!.id
            )
          : null;

      return reply.send({ items: enrichedItems, nextCursor });
    }
  );

  fastify.get(
    '/users',
    { preHandler: fastify.requireAuth },
    async (request, reply) => {
      const parsed = listUsersQuerySchema.safeParse(request.query);
      if (!parsed.success) {
        return reply.status(400).send({ error: parsed.error.flatten() });
      }

      const q = parsed.data.q?.trim();
      const cursor = decodeCursor(parsed.data.cursor);
      const rows = await db
        .select({
          id: users.id,
          displayName: users.displayName,
          email: users.email,
          avatarUrl: users.avatarUrl,
          createdAt: users.createdAt,
        })
        .from(users)
        .where(
          and(
            sql`${users.id} <> ${request.user!.id}`,
            cursor
              ? or(
                  lt(users.createdAt, new Date(cursor.createdAt)),
                  and(
                    eq(users.createdAt, new Date(cursor.createdAt)),
                    lt(users.id, cursor.id)
                  )
                )
              : undefined,
            q
              ? or(
                  ilike(users.displayName, `%${q}%`),
                  ilike(users.email, `%${q}%`)
                )
              : undefined
          )
        )
        .orderBy(desc(users.createdAt), desc(users.id), asc(users.displayName))
        .limit(parsed.data.limit + 1);

      const hasMore = rows.length > parsed.data.limit;
      const items = hasMore ? rows.slice(0, parsed.data.limit) : rows;
      const nextCursor =
        hasMore && items.length > 0
          ? encodeCursor(
              items[items.length - 1]!.createdAt,
              items[items.length - 1]!.id
            )
          : null;

      return reply.send({
        items: items.map(({ createdAt: _createdAt, ...rest }) => rest),
        nextCursor,
      });
    }
  );

}
