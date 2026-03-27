import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { getEnv } from '../config/env.js';
import * as schema from './schema.js';

const env = getEnv();

export const pgPool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 20,
});

export const db = drizzle(pgPool, { schema });

export type AppDb = typeof db;
