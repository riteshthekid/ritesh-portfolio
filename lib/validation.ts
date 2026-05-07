import { z } from 'zod';

export const contactMessageSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email().max(254).toLowerCase().trim(),
  subject: z.string().min(1).max(200).trim(),
  message: z.string().min(1).max(2000).trim(),
});

export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
