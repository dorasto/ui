# Use official Bun image for ARM architecture
FROM oven/bun:1-alpine AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# Build the application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

# Production image
FROM base AS runner
WORKDIR /app

# Copy built application and node_modules
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Set production environment
ENV NODE_ENV=production

# Default port (can be overridden)
ENV PORT=3000

# Expose the port
EXPOSE ${PORT}

# Start the application
CMD ["bun", "run", ".output/server/index.mjs"]
