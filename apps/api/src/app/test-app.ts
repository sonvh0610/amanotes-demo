import type { FastifyInstance } from 'fastify';
import infrastructurePlugin from './plugins/infrastructure.js';
import sensiblePlugin from './plugins/sensible.js';
import rootRoutes from './routes/root.js';
import authRoutes from './routes/auth/index.js';
import uploadRoutes from './routes/uploads/index.js';
import kudosRoutes from './routes/kudos/index.js';
import feedRoutes from './routes/feed/index.js';
import rewardRoutes from './routes/rewards/index.js';
import notificationRoutes from './routes/notifications/index.js';
import aiRoutes from './routes/ai/index.js';

export async function registerTestApp(fastify: FastifyInstance) {
  await fastify.register(infrastructurePlugin);
  await fastify.register(sensiblePlugin);
  await fastify.register(rootRoutes);
  await fastify.register(authRoutes, { prefix: '/auth' });
  await fastify.register(uploadRoutes, { prefix: '/uploads' });
  await fastify.register(kudosRoutes, { prefix: '/kudos' });
  await fastify.register(feedRoutes, { prefix: '/feed' });
  await fastify.register(rewardRoutes, { prefix: '/rewards' });
  await fastify.register(notificationRoutes, { prefix: '/notifications' });
  await fastify.register(aiRoutes, { prefix: '/ai' });
}
