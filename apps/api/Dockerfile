FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

# Copy monorepo manifests
COPY package.json pnpm-lock.yaml* ./

# Copy app and shared manifests
COPY apps/api/package.json ./apps/api/

# Install only API workspace
RUN pnpm install --filter @author-books/api...

# Copy shared and API source
COPY packages ./packages
COPY apps/api/src ./apps/api/src
COPY apps/api/prisma ./apps/api/prisma

WORKDIR /app/apps/api

RUN npx prisma generate

EXPOSE 3000

CMD ["npx", "tsx", "src/server.ts"]
