import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default('0.0.0.0'),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
  APP_BASE_URL: z.string().url().default('http://localhost:4200'),
  API_BASE_URL: z.string().url().default('http://localhost:3000'),
  SESSION_COOKIE_NAME: z.string().default('goodjob_session'),
  SESSION_TTL_HOURS: z.coerce
    .number()
    .int()
    .positive()
    .default(24 * 7),
  JWT_SECRET: z.string().min(32),
  CSRF_COOKIE_NAME: z.string().default('goodjob_csrf'),
  CSRF_HEADER_NAME: z.string().default('x-csrf-token'),
  S3_ENDPOINT: z.string().url().optional(),
  S3_REGION: z.string().default('ap-southeast-1'),
  S3_ACCESS_KEY_ID: z.string().min(1).optional(),
  S3_SECRET_ACCESS_KEY: z.string().min(1).optional(),
  S3_BUCKET: z.string().default('goodjob-media'),
  OIDC_ISSUER_URL: z.string().url().optional(),
  OIDC_CLIENT_ID: z.string().optional(),
  OIDC_CLIENT_SECRET: z.string().optional(),
  OIDC_REDIRECT_URI: z.string().url().optional(),
  OIDC_SCOPES: z.string().default('openid profile email'),
  GOOGLE_OAUTH_CLIENT_ID: z.string().optional(),
  GOOGLE_OAUTH_CLIENT_SECRET: z.string().optional(),
  GOOGLE_OAUTH_REDIRECT_URI: z.string().url().optional(),
  SLACK_OAUTH_CLIENT_ID: z.string().optional(),
  SLACK_OAUTH_CLIENT_SECRET: z.string().optional(),
  SLACK_OAUTH_REDIRECT_URI: z.string().url().optional(),
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_MODEL: z.string().default('gpt-4o-mini'),
  DATABASE_URL_TEST: z.string().optional(),
  REDIS_URL_TEST: z.string().optional(),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),
  RATE_LIMIT_WINDOW: z.string().default('1 minute'),
});

type ParsedEnv = z.infer<typeof envSchema>;

export type AppEnv = Omit<
  ParsedEnv,
  'S3_ACCESS_KEY_ID' | 'S3_SECRET_ACCESS_KEY'
> & {
  S3_ACCESS_KEY_ID: string;
  S3_SECRET_ACCESS_KEY: string;
};

let cachedEnv: AppEnv | null = null;

function resolveS3Env(
  parsed: ParsedEnv
): Pick<AppEnv, 'S3_ACCESS_KEY_ID' | 'S3_SECRET_ACCESS_KEY'> {
  const isLocalMinio =
    parsed.NODE_ENV !== 'production' && Boolean(parsed.S3_ENDPOINT);

  const accessKeyId =
    parsed.S3_ACCESS_KEY_ID ?? (isLocalMinio ? 'minioadmin' : undefined);
  const secretAccessKey =
    parsed.S3_SECRET_ACCESS_KEY ?? (isLocalMinio ? 'minioadmin' : undefined);

  if (!accessKeyId) {
    throw new Error(
      `Invalid environment variables:\nS3_ACCESS_KEY_ID: Required (set this in production; defaults only apply when S3_ENDPOINT is set for local MinIO)`
    );
  }
  if (!secretAccessKey) {
    throw new Error(
      `Invalid environment variables:\nS3_SECRET_ACCESS_KEY: Required (set this in production; defaults only apply when S3_ENDPOINT is set for local MinIO)`
    );
  }

  if (parsed.NODE_ENV === 'production') {
    const usingMinioDefaults =
      accessKeyId === 'minioadmin' || secretAccessKey === 'minioadmin';
    if (usingMinioDefaults) {
      throw new Error(
        `Invalid environment variables:\nS3_ACCESS_KEY_ID/S3_SECRET_ACCESS_KEY: Refusing to run in production with MinIO default credentials ("minioadmin"). Set real credentials in your deployment environment.`
      );
    }
  }

  return {
    S3_ACCESS_KEY_ID: accessKeyId,
    S3_SECRET_ACCESS_KEY: secretAccessKey,
  };
}

export function getEnv(): AppEnv {
  if (cachedEnv) {
    return cachedEnv;
  }

  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('\n');
    throw new Error(`Invalid environment variables:\n${details}`);
  }

  cachedEnv = {
    ...parsed.data,
    ...resolveS3Env(parsed.data),
  };
  return cachedEnv;
}
