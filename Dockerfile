# Use official Bun image for ARM architecture
FROM oven/bun:1-alpine AS base
WORKDIR /app

# Install dependencies stage
FROM base AS deps
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# Build stage
FROM base AS builder

# Force cache bust for the build stage
ARG CACHEBUST=1
ENV CACHEBUST=$CACHEBUST

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun registry:build && bun run build

# Production stage - optimized
FROM base AS runner
WORKDIR /app

# Force cache bust (keeps image fresh)
ARG CACHEBUST=1

# Copy built application and all dependencies
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000

# Don't run as root
USER bun

# Expose the port
EXPOSE 3000

# Start the application
CMD ["bun", "run", ".output/server/index.mjs"]
