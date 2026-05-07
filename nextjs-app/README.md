<div align="center">

# ⚡ Ritesh Patel — Portfolio

**A modern, full-stack developer portfolio built with Next.js 16 App Router**

[![Next.js](https://img.shields.io/badge/Next.js-16.2.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

[Live Demo](https://your-portfolio.vercel.app) · [Admin Panel](https://your-portfolio.vercel.app/admin/login) · [Report Bug](https://github.com/riteshthekid/portfolio/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [Admin Panel](#-admin-panel)
- [API Reference](#-api-reference)
- [Deployment](#-deployment)
- [Scripts](#-scripts)

---

## 🌟 Overview

A **production-grade personal portfolio** designed to make a strong first impression. Built as a unified Next.js full-stack application — no separate backend server required. The entire app (UI, API routes, database access) lives in a single Next.js project deployable to Vercel in one click.

The design features a **fluid interactive hero** where hovering over the image triggers a WebGL-style canvas mask effect that morphs between two illustrations using an SVG `feTurbulence` + `feDisplacementMap` filter — creating a liquid, organic transition unique to this portfolio.

---

## ✨ Features

### Frontend
- **Fluid Morphing Hero** — SVG gooey filter mask reveals a samurai illustration beneath as you hover, with real-time particle trail rendering via `requestAnimationFrame`
- **Smooth Animations** — Every section uses `motion/react` (Framer Motion) with viewport-triggered entrance animations and spring-based transitions
- **Glassmorphic Navbar** — Floating pill navbar that auto-hides on scroll past the hero, with animated mobile dropdown
- **3D Flip Card** — About section image flips on hover with CSS `perspective` and `backface-visibility`
- **Tech Stack Marquee** — Infinite auto-scrolling skills carousel with shimmer hover effects
- **Skeleton Loading** — Full-page skeleton UI shown for 1 second on first load to prevent layout flash
- **Responsive Design** — Mobile-first layout, fully functional from 320px to 4K

### Backend (Next.js Route Handlers)
- **Contact Form API** — Validates, rate-limits (5 req / 15 min per IP), and stores messages in PostgreSQL via Prisma
- **Admin Authentication** — JWT-based session with `crypto.timingSafeEqual` to prevent timing attacks
- **Admin Dashboard** — Protected route to view and delete contact form submissions with pagination
- **Input Validation** — All API endpoints use Zod schemas for strict input validation
- **Error Handling** — Consistent error response format across all API routes

### Developer Experience
- **Zero Config Deployment** — Auto-detected by Vercel, no `vercel.json` needed
- **Type-Safe** — End-to-end TypeScript with strict mode enabled
- **Lint-Free** — ESLint with Next.js core web vitals rules, 0 warnings or errors
- **Optimized Fonts** — Inter loaded via `next/font/google` for zero layout shift

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 16 (App Router) | Full-stack React framework |
| **Language** | TypeScript 5 (strict) | Type safety |
| **Styling** | Tailwind CSS v4 | Utility-first CSS |
| **Animations** | Motion (Framer Motion) v12 | UI animations & transitions |
| **Database** | PostgreSQL | Persistent contact message storage |
| **ORM** | Prisma 5 | Type-safe database access |
| **Auth** | JSON Web Tokens (jsonwebtoken) | Admin session management |
| **Validation** | Zod | Runtime input validation |
| **Icons** | Lucide React | Icon library |
| **Fonts** | Inter via next/font/google | Optimized web fonts |
| **Deployment** | Vercel | Serverless hosting |

---

## 📁 Project Structure

```
nextjs-app/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout — metadata, fonts, global CSS
│   ├── page.tsx                  # Home page (/) — assembles all sections
│   ├── globals.css               # Tailwind v4 + custom scrollbar + marquee keyframe
│   ├── not-found.tsx             # Custom 404 page
│   │
│   ├── admin/
│   │   ├── page.tsx              # /admin → redirects to /admin/dashboard
│   │   ├── login/
│   │   │   └── page.tsx          # Admin login form
│   │   └── dashboard/
│   │       └── page.tsx          # Protected message dashboard
│   │
│   └── api/                      # Next.js Route Handlers (serverless)
│       ├── contact/
│       │   └── route.ts          # POST /api/contact — submit contact form
│       └── admin/
│           ├── login/
│           │   └── route.ts      # POST /api/admin/login — get JWT token
│           └── messages/
│               ├── route.ts      # GET /api/admin/messages — list messages (auth)
│               └── [id]/
│                   └── route.ts  # DELETE /api/admin/messages/:id (auth)
│
├── components/                   # Reusable React components
│   ├── Navbar.tsx                # Floating glassmorphic navigation bar
│   ├── Hero.tsx                  # Fluid morphing hero section
│   ├── About.tsx                 # About me + 3D flip card + tech marquee
│   ├── Projects.tsx              # Project cards grid
│   ├── Services.tsx              # Services offered cards
│   ├── Contact.tsx               # Contact form + info card
│   ├── ErrorBoundary.tsx         # React error boundary wrapper
│   └── SkeletonLoader.tsx        # Full-page skeleton loading state
│
├── lib/                          # Shared server-side utilities
│   ├── db.ts                     # Prisma singleton (hot-reload safe)
│   ├── auth.ts                   # JWT sign/verify + timing-safe login
│   └── validation.ts             # Zod schemas (contact form, login)
│
├── prisma/
│   └── schema.prisma             # Database schema — ContactMessage model
│
├── public/                       # Static assets
│   ├── anime.png                 # Base hero illustration
│   └── samurai.png               # Revealed hero illustration (fluid mask)
│
├── .env.local                    # Local environment variables (git-ignored)
├── next.config.ts                # Next.js config — image domains, turbopack root
├── tsconfig.json                 # TypeScript config — strict mode + path aliases
├── eslint.config.mjs             # ESLint — Next.js core-web-vitals rules
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.17.0
- **npm** ≥ 9.x
- A **PostgreSQL** database (local or cloud — [Neon](https://neon.tech), [Supabase](https://supabase.com), [Railway](https://railway.app) all work great)

### 1. Clone & Install

```bash
git clone https://github.com/riteshthekid/portfolio.git
cd portfolio/nextjs-app
npm install
```

### 2. Configure Environment Variables

Copy the example and fill in your values:

```bash
cp .env.local .env.local
```

Then edit `.env.local` — see [Environment Variables](#-environment-variables) below.

### 3. Set Up the Database

```bash
# Push the Prisma schema to your database
npm run db:push

# (Optional) Open Prisma Studio to inspect data
npm run db:studio
```

### 4. Run the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment Variables

Create a `.env.local` file in the `nextjs-app/` directory with the following:

```env
# ─── Database ─────────────────────────────────────────────────────────────────
# PostgreSQL connection string
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio_db?schema=public"

# ─── Authentication ───────────────────────────────────────────────────────────
# Strong random secret for signing JWT tokens (min. 32 characters)
# Generate one: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET="your-super-secret-jwt-key-here"

# ─── Admin Credentials ────────────────────────────────────────────────────────
# Username and password for the /admin/login panel
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your-secure-admin-password"
```

> **⚠️ Security:** Never commit `.env.local` to version control. It is already listed in `.gitignore`.

---

## 🗄 Database Setup

This project uses **Prisma** with **PostgreSQL**. The schema is minimal — a single `ContactMessage` model:

```prisma
model ContactMessage {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String
  message   String
  ip        String?          // Stored for rate-limit reference
  userAgent String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Commands

```bash
# Apply schema to database (development)
npm run db:push

# Generate Prisma client after schema changes
npm run db:generate

# Open Prisma Studio (visual DB browser)
npm run db:studio

# Create a migration (for production schema changes)
npx prisma migrate dev --name <migration-name>
```

### Recommended Free Hosting Options

| Provider | Free Tier | Notes |
|----------|-----------|-------|
| [Neon](https://neon.tech) | 512 MB | Best for Vercel, serverless-native |
| [Supabase](https://supabase.com) | 500 MB | Includes dashboard UI |
| [Railway](https://railway.app) | $5 credit | Full PostgreSQL |

---

## 🔒 Admin Panel

The admin panel at `/admin` lets you view and manage contact form submissions.

### Access

1. Navigate to `https://your-portfolio.vercel.app/admin/login`
2. Enter the credentials from your `ADMIN_USERNAME` / `ADMIN_PASSWORD` env vars
3. On success, a JWT token is stored in `localStorage` and you are redirected to `/admin/dashboard`

### Features

- **View all messages** — paginated list with sender name, email, subject, message, and timestamp
- **Delete messages** — remove individual submissions with confirmation prompt
- **Auto-logout** — if the JWT token expires (24h) or is invalid, the dashboard redirects to login
- **Session persistence** — token survives page refresh (stored in `localStorage`)

### Security

- Passwords compared with `crypto.timingSafeEqual` to prevent timing attacks
- All dashboard API endpoints verify the JWT on every request
- Tokens expire after **24 hours**
- Rate limiting on the contact form: **5 requests per IP per 15 minutes**

---

## 📡 API Reference

### `POST /api/contact`

Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello Ritesh, I'd like to work with you..."
}
```

**Responses:**

| Status | Description |
|--------|-------------|
| `201` | Message saved successfully |
| `400` | Validation error (missing/invalid fields) |
| `429` | Rate limit exceeded (5 req / 15 min per IP) |
| `500` | Internal server error |

---

### `POST /api/admin/login`

Authenticate as admin and receive a JWT token.

**Request Body:**
```json
{
  "username": "admin",
  "password": "your-password"
}
```

**Responses:**

| Status | Description |
|--------|-------------|
| `200` | `{ "token": "<jwt>" }` |
| `400` | Missing credentials |
| `401` | Invalid credentials |

---

### `GET /api/admin/messages`

List all contact messages (requires auth).

**Headers:** `Authorization: Bearer <token>`

**Query Params:** `?page=1&limit=10`

**Response:**
```json
{
  "messages": [ ... ],
  "pagination": { "page": 1, "limit": 10, "total": 42, "pages": 5 }
}
```

---

### `DELETE /api/admin/messages/:id`

Delete a specific message (requires auth).

**Headers:** `Authorization: Bearer <token>`

| Status | Description |
|--------|-------------|
| `200` | `{ "ok": true }` |
| `401` | No token |
| `403` | Invalid/expired token |
| `404` | Message not found |

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push the `nextjs-app/` folder to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. Set **Root Directory** to `nextjs-app`
4. Add all environment variables in the **Vercel Environment Variables** section:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
5. Click **Deploy** — done!

> Vercel auto-detects Next.js. No `vercel.json` is required.

### Post-Deployment

After deploying, run the database migration once:

```bash
# Set DATABASE_URL to your production DB, then:
npx prisma migrate deploy
```

Or use Prisma's `db push` for initial setup:

```bash
DATABASE_URL="your-production-db-url" npx prisma db push
```

---

## 📜 Scripts

```bash
# Development
npm run dev          # Start dev server with Turbopack (http://localhost:3000)

# Production
npm run build        # Build optimized production bundle
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint

# Database
npm run db:push      # Push Prisma schema to database (no migration)
npm run db:generate  # Regenerate Prisma Client after schema change
npm run db:studio    # Open Prisma Studio visual editor
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Designed & Built by [Ritesh Patel](https://github.com/riteshthekid)**

*If you found this helpful, consider giving it a ⭐*

</div>
