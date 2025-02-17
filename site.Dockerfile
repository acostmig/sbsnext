FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm@10.2.1

FROM base AS builder
WORKDIR /app
COPY . /app

RUN pnpm install --force 
RUN pnpm build



FROM base AS runner
WORKDIR /app
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/pnpm-lock.yaml /app/pnpm-lock.yaml
COPY --from=builder /app/next.config.ts /app/next.config.ts
RUN pnpm install --force --prod
# COPY --from=builder /app/node_modules/ /app/node_modules/


EXPOSE 3000
CMD ["pnpm", "start"]


