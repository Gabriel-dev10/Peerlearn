# ---- build ----
FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json ./
RUN bun install
COPY . .
RUN bunx prisma generate
RUN bunx nest build

# ---- runtime ----
FROM oven/bun:1-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY package.json ./
EXPOSE 3003
CMD ["sh", "-c", "bunx prisma db push --skip-generate && bun dist/main.js"]
