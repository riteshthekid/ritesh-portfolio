# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage — just serve static files via a shared volume
FROM alpine:latest
WORKDIR /app

# Copy built assets to a predictable location
COPY --from=builder /app/dist /app/dist

# Keep container alive so nginx can copy-on-start, or use a volume
CMD ["sh", "-c", "cp -r /app/dist/* /usr/share/nginx/html/ && echo 'Frontend files copied' && sleep infinity"]