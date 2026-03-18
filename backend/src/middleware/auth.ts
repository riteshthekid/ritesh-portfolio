import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { config } from '../config';

export interface AuthRequest extends Request {
  user?: { username: string };
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user as { username: string };
    next();
  });
}

export async function login(username: string, password: string): Promise<string | null> {
  if (username !== config.adminUsername) return null;

  const expectedPassword = Buffer.from(config.adminPassword);
  const actualPassword = Buffer.from(password);

  if (expectedPassword.length === actualPassword.length && crypto.timingSafeEqual(expectedPassword, actualPassword)) {
    return jwt.sign({ username }, config.jwtSecret, { expiresIn: '24h' });
  }

  return null;
}