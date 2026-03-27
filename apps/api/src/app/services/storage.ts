import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getEnv } from '../config/env.js';

const env = getEnv();

const s3Client = new S3Client({
  region: env.S3_REGION,
  endpoint: env.S3_ENDPOINT,
  forcePathStyle: Boolean(env.S3_ENDPOINT),
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  },
});

export function makeStorageKey(userId: string, fileName: string) {
  const extension = path.extname(fileName || '').slice(0, 16);
  return `uploads/${userId}/${Date.now()}-${randomUUID()}${extension}`;
}

export async function createPresignedUploadUrl(input: {
  key: string;
  mimeType: string;
}) {
  const cmd = new PutObjectCommand({
    Bucket: env.S3_BUCKET,
    Key: input.key,
    ContentType: input.mimeType,
  });
  const url = await getSignedUrl(s3Client, cmd, {
    expiresIn: 900,
  });
  return url;
}

export function makeObjectPublicUrl(key: string): string {
  if (env.S3_ENDPOINT) {
    return `${env.S3_ENDPOINT}/${env.S3_BUCKET}/${key}`;
  }
  return `https://${env.S3_BUCKET}.s3.${env.S3_REGION}.amazonaws.com/${key}`;
}
