import { FastifyInstance } from 'fastify';
import { and, desc, eq, lt, or } from 'drizzle-orm';
import { listFeedQuerySchema } from '@org/shared';
import { db } from '../../db/client.js';
import { kudos, users } from '../../db/schema.js';

function decodeCursor(
  cursor?: string
): { createdAt: string; id: string } | null {
  if (!cursor) {
    return null;
  }
  try {
    const decoded = JSON.parse(Buffer.from(cursor, 'base64url').toString('utf-8')) as {
      createdAt: string;
      id: string;
    };
    if (!decoded.createdAt || !decoded.id) {
      return null;
    }
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

export default async function feedRoutes(fastify: FastifyInstance) {
  fastify.get('/', { preHandler: fastify.requireAuth }, async (request, reply) => {
    const parsed = listFeedQuerySchema.safeParse(request.query);
    if (!parsed.success) {
      return reply.status(400).send({ error: parsed.error.flatten() });
    }

    const { limit } = parsed.data;
    const cursor = decodeCursor(parsed.data.cursor);
    const rows = await db
      .select({
        id: kudos.id,
        senderId: kudos.senderId,
        receiverId: kudos.receiverId,
        points: kudos.points,
        description: kudos.description,
        coreValue: kudos.coreValue,
        mediaAssetId: kudos.mediaAssetId,
        createdAt: kudos.createdAt,
        senderName: users.displayName,
      })
      .from(kudos)
      .innerJoin(users, eq(kudos.senderId, users.id))
      .where(
        cursor
          ? or(
              lt(kudos.createdAt, new Date(cursor.createdAt)),
              and(eq(kudos.createdAt, new Date(cursor.createdAt)), lt(kudos.id, cursor.id))
            )
          : undefined
      )
      .orderBy(desc(kudos.createdAt), desc(kudos.id))
      .limit(limit + 1);

    const hasMore = rows.length > limit;
    const items = hasMore ? rows.slice(0, limit) : rows;
    const nextCursor =
      hasMore && items.length > 0
        ? encodeCursor(items[items.length - 1]!.createdAt, items[items.length - 1]!.id)
        : null;

    return reply.send({ items, nextCursor });
  });
}
