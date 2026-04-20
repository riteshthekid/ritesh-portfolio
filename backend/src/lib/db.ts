import { PrismaClient } from '@prisma/client';

const isProduction = process.env.NODE_ENV === 'production';

export const prisma = new PrismaClient({
  log: isProduction ? ['warn', 'error'] : ['query', 'info', 'warn', 'error'],
});

export async function connectDb(): Promise<void> {
  try {
    await prisma.$connect();
    console.log('[db] connected to PostgreSQL');
  } catch (error) {
    console.error('[db] connection error', error);
    throw error;
  }
}

export async function disconnectDb(): Promise<void> {
  await prisma.$disconnect();
}
