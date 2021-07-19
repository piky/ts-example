FROM node:16-alpine AS tester

WORKDIR /app

COPY package* /app/

RUN npm ci

COPY . .

RUN npm run lint && \
    npm run test:ci && \
    npm run build

FROM node:16-alpine AS runner

ENV NODE_ENV=production

WORKDIR /app

COPY package* /app/

RUN npm ci

COPY --from=tester /app/dist/ ./dist

RUN chown -R 1000:1000 ./

USER 1000

CMD ["npm", "run", "start"]