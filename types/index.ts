// Shared TypeScript types for the portfolio application

// ─── Contact ─────────────────────────────────────────────────────────────────

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  ip?: string | null;
  userAgent?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessageInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ─── API Responses ────────────────────────────────────────────────────────────

export interface ApiError {
  error: string;
  details?: string;
}

export interface ApiSuccess<T = void> {
  ok: true;
  data?: T;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface PaginatedResponse<T> {
  messages: T[];
  pagination: PaginationMeta;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface AuthPayload {
  username: string;
}

export interface LoginResponse {
  token: string;
}
