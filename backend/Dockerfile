# Multi-stage build for Node.js backend
FROM node:18-slim AS base

# Install dependencies (including devDeps for build)
FROM base AS deps
RUN apt-get update && apt-get install -y libc6-dev openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# Copy package files and prisma schema
COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm ci

# Generate Prisma client
RUN npx prisma generate

# Build stage
FROM deps AS builder
WORKDIR /app
COPY . .

# Build the TypeScript application
RUN npm run build

# Production stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Install OpenSSL (required by Prisma)
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN groupadd --system --gid 1001 nodejs
RUN useradd --system --uid 1001 backend

# Copy built application and production deps
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma

# Change ownership
RUN chown -R backend:nodejs /app
USER backend

# Expose port
EXPOSE 4000

# Health check using Node.js (no curl needed)
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
CMD ["npm", "start"]