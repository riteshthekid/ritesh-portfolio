import path from 'path';
import dotenv from 'dotenv';

const envPath = path.resolve(process.cwd(), '.env');
dotenv.config({ path: envPath });

function getEnv(name: string): string {
  return process.env[name] || '';
}

export const config = {
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: getEnv('DATABASE_URL'),
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
  jwtSecret: getEnv('JWT_SECRET'),
  adminUsername: getEnv('ADMIN_USERNAME'),
  adminPassword: getEnv('ADMIN_PASSWORD')
};
