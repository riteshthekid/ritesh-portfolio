import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { contactMessageSchema } from '@/lib/validation';

// Simple in-memory rate limiter (per IP, 5 requests per 15 minutes)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS) {
    return false;
  }

  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many contact requests from this IP, please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validatedData = contactMessageSchema.parse(body);

    const newMessage = await prisma.contactMessage.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
        ip,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    return NextResponse.json({ ok: true, id: newMessage.id }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid input data', details: error.message }, { status: 400 });
    }
    console.error('[contact] error creating message', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
