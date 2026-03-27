import crypto from 'node:crypto';

export function makeToken(size = 32): string {
  return crypto.randomBytes(size).toString('hex');
}

export function hashToken(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex');
}
