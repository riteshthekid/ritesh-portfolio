import jwt from 'jsonwebtoken';
import crypto from 'crypto';

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET environment variable is not set');
  return secret;
}

export function verifyToken(token: string): { username: string } | null {
  try {
    return jwt.verify(token, getJwtSecret()) as { username: string };
  } catch {
    return null;
  }
}

export async function login(username: string, password: string): Promise<string | null> {
  const adminUsername = process.env.ADMIN_USERNAME || '';
  const adminPassword = process.env.ADMIN_PASSWORD || '';

  if (username !== adminUsername) return null;

  const expectedPassword = Buffer.from(adminPassword);
  const actualPassword = Buffer.from(password);

  if (
    expectedPassword.length === actualPassword.length &&
    crypto.timingSafeEqual(expectedPassword, actualPassword)
  ) {
    return jwt.sign({ username }, getJwtSecret(), { expiresIn: '24h' });
  }

  return null;
}
