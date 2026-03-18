import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { prisma } from '../lib/db';
import { contactMessageSchema, type ContactMessageInput } from '../services/validation';

export const contactRouter = Router();

// Rate limiting: 5 requests per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: { error: 'Too many contact requests from this IP, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

contactRouter.post('/', contactLimiter, async (req, res) => {
  try {
    const validatedData: ContactMessageInput = contactMessageSchema.parse(req.body);

    const newMessage = await prisma.contactMessage.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
        ip: req.ip,
        userAgent: req.get('user-agent') || undefined,
      },
    });

    return res.status(201).json({ ok: true, id: newMessage.id });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid input data', details: error.message });
    }
    console.error('[contact] error creating message', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
