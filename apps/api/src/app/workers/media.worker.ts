import { Worker, Queue } from 'bullmq';
import { eq } from 'drizzle-orm';
import { redis } from '../lib/redis.js';
import { db } from '../db/client.js';
import { mediaAssets } from '../db/schema.js';

export const mediaValidationQueue = new Queue('media-validation', {
  connection: redis,
});

export interface MediaValidationJob {
  mediaAssetId: string;
  durationSeconds?: number;
}

export function startMediaWorker() {
  return new Worker<MediaValidationJob>(
    'media-validation',
    async (job) => {
      const { mediaAssetId, durationSeconds } = job.data;
      const media = await db.query.mediaAssets.findFirst({
        where: eq(mediaAssets.id, mediaAssetId),
      });
      if (!media) {
        return;
      }

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
