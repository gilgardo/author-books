FROM node:alpine

WORKDIR /app

COPY api/package.json ./

RUN npm install

COPY api/ .

RUN npx prisma generate

EXPOSE 3000

CMD [ "npx", "tsx", "server.ts" ]

