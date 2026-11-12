FROM oven/bun:1 AS build

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY tsconfig.json ./
COPY src ./src
COPY views ./views
RUN bun run build

FROM oven/bun:1-slim

WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/package.json /app/bun.lock ./
RUN bun install --frozen-lockfile --production
COPY --from=build /app/dist ./dist
COPY --from=build /app/views ./views

EXPOSE 3000
CMD ["bun", "run", "start"]
