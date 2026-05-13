# Tech Enablement Hub - Docker Image
# Multi-stage build for optimized image size

# Stage 1: Build frontend
FROM node:18-alpine AS frontend-build

WORKDIR /app/client

# Copy frontend package files
COPY client/package*.json ./

# Install frontend dependencies
RUN npm ci --only=production

# Copy frontend source
COPY client/ ./

# Build frontend
RUN npm run build

# Stage 2: Setup backend
FROM node:18-alpine AS backend-build

WORKDIR /app

# Copy backend package files
COPY package*.json ./

# Install backend dependencies
RUN npm ci --only=production

# Stage 3: Production image
FROM node:18-alpine

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Copy backend dependencies and code
COPY --from=backend-build /app/node_modules ./node_modules
COPY --from=backend-build /app/package*.json ./
COPY server/ ./server/

# Copy built frontend
COPY --from=frontend-build /app/client/build ./client/build

# Copy necessary files
COPY README.md ./

# Create directories for data and uploads
RUN mkdir -p /app/server/data /app/server/uploads

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose ports
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "server/index.js"]
