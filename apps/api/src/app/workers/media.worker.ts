import { Worker, Queue } from 'bullmq';
import { eq } from 'drizzle-orm';
import { redis } from '../lib/redis.js';
import { db } from '../db/client.js';
import { mediaAssets } from '../db/schema.js';
import { getStoredObjectMetadata } from '../services/storage.js';

export const mediaValidationQueue = new Queue('media-validation', {
  connection: redis,
});

export interface MediaValidationJob {
  mediaAssetId: string;
}

export function startMediaWorker() {
  return new Worker<MediaValidationJob>(
    'media-validation',
    async (job) => {
      const { mediaAssetId } = job.data;
      const media = await db.query.mediaAssets.findFirst({
        where: eq(mediaAssets.id, mediaAssetId),
      });
      if (!media) {
        return;
      }

      const objectMetadata = await getStoredObjectMetadata({
        key: media.storageKey,
      }).catch(() => ({} as Record<string, string>));
      const durationSecondsRaw = objectMetadata['duration-seconds'];
      const durationSeconds =
        typeof durationSecondsRaw === 'string'
          ? Number(durationSecondsRaw)
          : undefined;

      const shouldReject =
        media.mediaType === 'video' &&
        typeof durationSeconds === 'number' &&
        durationSeconds > 180;

      await db
        .update(mediaAssets)
        .set({
          status: shouldReject ? 'rejected' : 'validated',
          durationSeconds: durationSeconds ?? media.durationSeconds,
          publicUrl: media.publicUrl ?? null,
        })
        .where(eq(mediaAssets.id, mediaAssetId));
    },
    { connection: redis }
  );
}
