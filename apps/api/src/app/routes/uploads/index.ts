import { FastifyInstance } from 'fastify';
import { and, eq } from 'drizzle-orm';
import { uploadPresignBodySchema, uuidSchema } from '@org/shared';
import { db } from '../../db/client.js';
import { mediaAssets } from '../../db/schema.js';
import {
  createPresignedUploadUrl,
  createPresignedReadUrl,
  makeObjectPublicUrl,
  makeStorageKey,
} from '../../services/storage.js';
import { mediaValidationQueue } from '../../workers/media.worker.js';

const MAX_IMAGE_BYTES = 1 * 1024 * 1024;

export default async function uploadRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/media/:id/view',
    { preHandler: fastify.requireAuth },
    async (request, reply) => {
      const mediaAssetId = (request.params as { id: string }).id;
      const parsedId = uuidSchema.safeParse(mediaAssetId);
      if (!parsedId.success) {
        return reply.status(400).send({ error: 'Invalid mediaAssetId' });
      }

      const media = await db.query.mediaAssets.findFirst({
        where: eq(mediaAssets.id, parsedId.data),
      });
      if (!media) {
        return reply.status(404).send({ error: 'Media asset not found' });
      }
      if (media.status === 'rejected') {
        return reply.status(410).send({ error: 'Media asset rejected' });
      }

      const signedUrl = await createPresignedReadUrl({ key: media.storageKey });
      return reply.redirect(signedUrl);
    }
  );

  fastify.post(
    '/presign',
    { preHandler: fastify.requireAuth },
    async (request, reply) => {
      const parsed = uploadPresignBodySchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({ error: parsed.error.flatten() });
      }

      if (
        parsed.data.mediaType === 'image' &&
        parsed.data.fileSizeBytes > MAX_IMAGE_BYTES
      ) {
        return reply.status(400).send({ error: 'Image exceeds 1MB limit' });
      }

      try {
        const key = makeStorageKey(request.user!.id, parsed.data.fileName);
        const uploadUrl = await createPresignedUploadUrl({
          key,
          mimeType: parsed.data.mimeType,
        });

        const inserted = await db
          .insert(mediaAssets)
          .values({
            ownerId: request.user!.id,
            mediaType: parsed.data.mediaType,
            mimeType: parsed.data.mimeType,
            fileSizeBytes: parsed.data.fileSizeBytes,
            storageKey: key,
            publicUrl: makeObjectPublicUrl(key),
            status: 'pending',
          })
          .returning();

        return reply.status(201).send({
          uploadUrl,
          mediaAsset: inserted[0],
        });
      } catch (error) {
        request.log.error({ err: error }, 'Failed to create upload presign');
        return reply
          .status(503)
          .send({ error: 'Upload storage is unavailable' });
      }
    }
  );

  fastify.post(
    '/complete',
    { preHandler: fastify.requireAuth },
    async (request, reply) => {
      const body = request.body as {
        mediaAssetId?: string;
        durationSeconds?: number;
      };
      const parsedId = uuidSchema.safeParse(body.mediaAssetId);
      if (!parsedId.success) {
        return reply.status(400).send({ error: 'Invalid mediaAssetId' });
      }

      const media = await db.query.mediaAssets.findFirst({
        where: and(
          eq(mediaAssets.id, parsedId.data),
          eq(mediaAssets.ownerId, request.user!.id)
        ),
      });
      if (!media) {
        return reply.status(404).send({ error: 'Media asset not found' });
      }

      await mediaValidationQueue.add(
        'validate',
        {
          mediaAssetId: media.id,
          durationSeconds:
            typeof body.durationSeconds === 'number'
              ? body.durationSeconds
              : undefined,
        },
        { attempts: 3, removeOnComplete: true }
      );

      return reply.send({ ok: true, mediaAssetId: media.id, status: 'queued' });
    }
  );
}
