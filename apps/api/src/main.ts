import 'dotenv/config';
import Fastify from 'fastify';
import { app } from './app/app';
import { getEnv } from './app/config/env.js';
import { startMediaWorker } from './app/workers/media.worker.js';
import { pgPool } from './app/db/client.js';
import { redis, redisSubscriber } from './app/lib/redis.js';

const env = getEnv();
const host = env.HOST;
const port = env.PORT;

// Instantiate Fastify with some config
const server = Fastify({
  logger: true,
});

const mediaWorker = startMediaWorker();

// Register your application as a normal plugin.
server.register(app);

// Start listening.
server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://${host}:${port}`);
  }
});

async function shutdown() {
  await server.close();
  await mediaWorker.close();
  await redis.quit();
  await redisSubscriber.quit();
  await pgPool.end();
  process.exit(0);
}

process.on('SIGTERM', () => {
  void shutdown();
});
process.on('SIGINT', () => {
  void shutdown();
});
