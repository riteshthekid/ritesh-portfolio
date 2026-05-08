# Ritesh Patel — Portfolio

A modern, full-stack personal portfolio built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **PostgreSQL** via Prisma. Features an animated hero with fluid mask effects, a contact form that saves messages to the database, and a protected admin dashboard.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animation | Motion (Framer Motion) |
| Icons | Lucide React |
| Database | PostgreSQL + Prisma ORM |
| Auth | JWT (jsonwebtoken) |
| Validation | Zod |
| Deployment | Vercel + Neon/Supabase |

## Project Structure

```
Portfolio/
├── app/                          # Next.js App Router
│   ├── admin/
│   │   ├── page.tsx              # Redirects → /admin/dashboard
│   │   ├── login/page.tsx        # Admin login page
│   │   └── dashboard/page.tsx    # Contact messages dashboard
│   ├── api/
│   │   ├── contact/route.ts      # POST /api/contact
│   │   └── admin/
│   │       ├── login/route.ts    # POST /api/admin/login (returns JWT)
│   │       └── messages/
│   │           ├── route.ts      # GET  /api/admin/messages (paginated)
│   │           └── [id]/route.ts # DELETE /api/admin/messages/:id
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx                  # Portfolio homepage
│   └── not-found.tsx
├── components/                   # React components (Hero, About, etc.)
├── lib/
│   ├── auth.ts                   # JWT login + verification
│   ├── db.ts                     # Prisma client singleton
│   └── validation.ts             # Zod schemas
├── types/index.ts                # Shared TypeScript interfaces
├── prisma/schema.prisma          # PostgreSQL schema
└── public/                       # Static assets (anime.png, samurai.png)
```

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/riteshthekid/ritesh-portfolio.git
cd ritesh-portfolio
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/portfolio"
JWT_SECRET="your-64-char-random-secret"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your-strong-password"
```

Generate a JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Set Up Database

```bash
npm run db:push        # Push schema to your database
npm run db:generate    # Generate Prisma client
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin panel: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint check |
| `npm run type-check` | TypeScript check |
| `npm run db:push` | Sync schema to database |
| `npm run db:generate` | Regenerate Prisma client |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:studio` | Open Prisma Studio GUI |

## Deployment

See the [Vercel Deployment Guide](./DEPLOYMENT.md) for step-by-step instructions.

## License

MIT
