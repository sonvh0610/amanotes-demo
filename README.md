# Goodjob Case Study Upgrade

This repository implements Amanotes Case Study 1 as an Nx monorepo with:

- `apps/api`: Fastify + TypeScript + Drizzle + PostgreSQL + Redis + BullMQ + WebSocket
- `apps/web`: React + Vite + React Query + Tailwind
- `packages/shared`: shared API contracts and realtime types

## What is implemented

- Enterprise auth and security
  - OIDC SSO as the primary enterprise auth path
  - Optional Google and Slack OAuth fallback for local/demo flows
  - Cookie sessions with session rotation on login
  - CSRF protection for cookie-authenticated mutating routes
  - Rate limiting on the API
- Kudos
  - `POST /kudos` enforces 10-50 points, no self-kudos, required `coreValue`, optional tagged teammates, and up to 5 media files
  - Monthly giving budget of 200 points enforced with DB transactions and row locks
  - Immutable point ledger and monthly budget ledger
- Feed and notifications
  - Cursor-paginated feed with reactions, comments, media, receiver name, core value, and tagged teammates
  - Persisted notifications plus realtime websocket fanout through Redis pub/sub
  - Tagged users receive dedicated `kudo_tagged` notifications
- Rewards
  - Reward catalog CRUD
  - Transactional redemption with idempotency keys and anti-double-spend locking
- Media pipeline
  - Presigned uploads to S3/MinIO
  - Async media validation worker via BullMQ
  - Video duration validated from object metadata server-side without blocking the API request path
- AI feature
  - `GET /ai/monthly-summary?month=YYYY-MM`
  - Monthly achievement summaries generated from kudos, points, core values, notable colleagues, and reward redemptions
  - Cached in Postgres by `userId + monthKey + contentHash`

## Local setup

1. Install dependencies

```bash
npm install
```

2. Start infra

```bash
docker compose up -d
```

PostgreSQL is exposed on `54322`, Redis on `6379`, and MinIO on `9000`.

3. Copy env

```bash
cp .env.example .env
```

4. Run migrations

```bash
npm run migrate
```

5. Start the API and web app

```bash
npm run dev:api
npm run dev:web
```

## Auth and security model

- Session auth uses secure cookie settings derived from `APP_BASE_URL` and `API_BASE_URL`
- CSRF uses a double-submit token:
  - authenticated clients fetch `/auth/csrf`
  - mutating requests send `x-csrf-token`
  - the API validates the header against the CSRF cookie
- OIDC SSO is configured with:
  - `OIDC_ISSUER_URL`
  - `OIDC_CLIENT_ID`
  - `OIDC_CLIENT_SECRET`
  - `OIDC_REDIRECT_URI`
  - optional `OIDC_SCOPES`

## AI summary configuration

Set these env vars to enable LLM-backed summaries:

- `OPENAI_API_KEY`
- `OPENAI_MODEL`

If `OPENAI_API_KEY` is empty, the API returns a deterministic fallback summary so the UI and tests still work.

## Nx tasks

- API serve: `npm exec -- nx run @org/api:serve`
- API migrate: `npm exec -- nx run @org/api:migrate`
- API test: `npm exec -- nx run @org/api:test`
- Web dev: `npm exec -- nx run @org/web:dev`
- Typecheck all: `npm run typecheck`
- Build all: `npm run build`

## Testing strategy

- Web tests: auth and route rendering
- API tests:
  - self-kudo rejection
  - kudo persistence with ledgers and tagged teammates
  - CSRF enforcement
  - OIDC-backed protected route access
  - concurrent redemption protection
  - concurrent monthly budget protection
  - monthly summary cache refresh behavior

## Key routes

- Auth: `/auth/providers`, `/auth/csrf`, `/auth/me`, `/auth/logout`, `/auth/oidc/start`, `/auth/oidc/callback`, `/auth/oauth/:provider/start`, `/auth/oauth/:provider/callback`
- Uploads: `/uploads/presign`, `/uploads/complete`, `/uploads/media/:id/view`
- Kudos and feed: `/kudos`, `/feed`, `/feed/:id`, `/kudos/:id/reactions`, `/kudos/:id/comments`
- Rewards: `/rewards`, `/rewards/:id/redeem`
- Notifications: `/notifications`, `/notifications/read`, websocket `/notifications/stream`
- AI: `/ai/monthly-summary`

## Production and CI/CD

- CI: `.github/workflows/ci.yml`
- CD: `.github/workflows/cd.yml`
- Deployment runbook: [`docs/PRODUCTION_DEPLOYMENT.md`](./docs/PRODUCTION_DEPLOYMENT.md)
