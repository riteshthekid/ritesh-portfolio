import { Router } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { prisma } from '../lib/db';
import { authenticateToken, login, type AuthRequest } from '../middleware/auth';
import { loginSchema } from '../services/validation';

export const adminRouter = Router();

// Login endpoint
adminRouter.post('/login', async (req, res) => {
  try {
    const { username, password } = loginSchema.parse(req.body);
    const token = await login(username, password);
    if (!token) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    return res.json({ token });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid input' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Protected routes
adminRouter.use(authenticateToken);

// Get all contact messages with pagination
adminRouter.get('/messages', async (req: AuthRequest, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
      }),
      prisma.contactMessage.count(),
    ]);

    return res.json({
      messages,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('[admin] error fetching messages', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single message
adminRouter.get('/messages/:id', async (req: AuthRequest, res) => {
  try {
    const message = await prisma.contactMessage.findUnique({
      where: { id: req.params.id },
    });
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    return res.json(message);
  } catch (error) {
    console.error('[admin] error fetching message', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a message
adminRouter.delete('/messages/:id', async (req: AuthRequest, res) => {
  try {
    await prisma.contactMessage.delete({
      where: { id: req.params.id },
    });
    return res.json({ ok: true });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ error: 'Message not found' });
    }
    console.error('[admin] error deleting message', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});