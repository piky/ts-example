FROM node:18-alpine AS tester

WORKDIR /app

COPY package* /app/

RUN npm ci

COPY . .

RUN npm run lint && \
    npm run test:ci && \
    npm run build

FROM node:18-alpine AS runner

ENV NODE_ENV=production

WORKDIR /app

COPY package* /app/

RUN npm ci

COPY --from=tester /app/dist/ ./dist

RUN chown -R 1000:1000 ./

USER 1000

ENTRYPOINT [ "npm", "run" ]
CMD ["start"]