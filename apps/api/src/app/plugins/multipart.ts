import fp from 'fastify-plugin';
import multipart from '@fastify/multipart';

export default fp(async function multipartPlugin(fastify) {
  await fastify.register(multipart, {
    limits: {
      files: 1,
      fileSize: 25 * 1024 * 1024,
    },
  });
});
