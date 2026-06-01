# syntax=docker/dockerfile:1
# Multi-stage build producing an Astro Node standalone server image. Mirrors the
# dashboard's Dockerfile shape; serves on :3001 behind Nginx Proxy Manager.

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Production build also switches keystatic.config.ts to GitHub storage mode.
ENV NODE_ENV=production
# PUBLIC_ vars are inlined by Astro at BUILD time, so the Keystatic GitHub App
# slug (not secret) must be a build arg. Server-side secrets (client id/secret)
# stay runtime-only via the env_file, never baked into the image.
ARG PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=""
ENV PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=$PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3001
# Run as an unprivileged user.
RUN addgroup -g 1001 nodejs && adduser -u 1001 -G nodejs -S astro
# The node standalone adapter needs the built server plus runtime deps.
COPY --from=builder --chown=astro:nodejs /app/dist ./dist
COPY --from=builder --chown=astro:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=astro:nodejs /app/package.json ./package.json
USER astro
EXPOSE 3001
# Lightweight container healthcheck hitting the home page.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3001/ >/dev/null 2>&1 || exit 1
CMD ["node", "./dist/server/entry.mjs"]
