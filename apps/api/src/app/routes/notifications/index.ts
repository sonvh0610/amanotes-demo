import { FastifyInstance } from 'fastify';
import { and, desc, eq, isNull } from 'drizzle-orm';
import { db } from '../../db/client.js';
import { notifications } from '../../db/schema.js';
import { findSessionUser } from '../../services/auth.js';
import { registerUserSocket } from '../../services/realtime.js';

export default async function notificationRoutes(fastify: FastifyInstance) {
  fastify.get('/', { preHandler: fastify.requireAuth }, async (request, reply) => {
    const items = await db.query.notifications.findMany({
      where: eq(notifications.userId, request.user!.id),
      orderBy: [desc(notifications.createdAt)],
      limit: 100,
    });

    return reply.send({ items });
  });

  fastify.post('/read', { preHandler: fastify.requireAuth }, async (request, reply) => {
    await db
      .update(notifications)
      .set({ readAt: new Date() })
      .where(
        and(eq(notifications.userId, request.user!.id), isNull(notifications.readAt))
      );
    return reply.send({ ok: true });
  });

  fastify.get(
    '/stream',
    { websocket: true },
    async (socket, request) => {
      const token = request.cookies[fastify.appEnv.SESSION_COOKIE_NAME];
      if (!token) {
        socket.close(1008, 'Unauthorized');
        return;
      }

      const user = await findSessionUser(token);
      if (!user) {
        socket.close(1008, 'Unauthorized');
        return;
      }

      registerUserSocket(user.id, socket);
      socket.send(
        JSON.stringify({
          event: 'notification.new',
          payload: { status: 'connected' },
          createdAt: new Date().toISOString(),
        })
      );
    }
  );
}
