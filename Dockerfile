# ==============================================================================
# Multi-stage Dockerfile for MerryMe Wedding Digital Media Web App
# ==============================================================================

# Stage 1: Build production static files with Node.js
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for efficient caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --prefer-offline --no-audit

# Copy project source files
COPY . .

# Build production bundle (outputs to /app/dist)
RUN npm run build

# Stage 2: Serve with lightweight Nginx alpine
FROM nginx:alpine AS runner

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration for SPA routing & gzip
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose container internal HTTP port
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
