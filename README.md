# Goodjob Case Study Submission

This repository is a production-oriented kudos and rewards platform delivered as an Nx monorepo.

It is organized into clearly separated frontend and backend applications:

- `apps/web`: React 19 + Vite + TypeScript + Tailwind CSS
- `apps/api`: Fastify + TypeScript + Drizzle ORM + PostgreSQL + Redis + BullMQ
- `packages/shared`: shared validation schemas, contracts, and cross-app types

## Submission Mapping

### A. Git Repository

- Source code is split by responsibility inside a single Nx monorepo.
- The repository includes iterative commit history with scoped commit messages, for example:
  - `feat: ship case-study production upgrade`
  - `fix: stabilize ci typecheck and deploy gates`
  - `style: format kudos route for ci`
- Setup instructions are included below.
- Environment variable scaffolding is provided in [`.env.example`](/Users/sonvh/Codes/goodjob/.env.example).

### B. Hosting (Optional)

- Production deployment guidance is documented in [`docs/PRODUCTION_DEPLOYMENT.md`](/Users/sonvh/Codes/goodjob/docs/PRODUCTION_DEPLOYMENT.md).
- The web app can be deployed to Vercel and the API can run via Docker on a VM or container host.
- No live URL is committed in this repository today. Add it here when a public deployment is available.

### C. Test Cases / Testing Strategy

Current automated coverage includes:

- Unit and rule-level validation around point ranges, self-kudo rejection, and monthly budget enforcement
- Integration coverage for the "Give Kudo" flow from HTTP request to database persistence
- Edge case and concurrency coverage for:
  - attempting to give points to oneself
  - overspending the monthly giving budget
  - concurrent reward redemption requests

Primary test files:

- [`apps/api/tests/case-study.spec.ts`](/Users/sonvh/Codes/goodjob/apps/api/tests/case-study.spec.ts)
- [`apps/web/src/app/app.spec.tsx`](/Users/sonvh/Codes/goodjob/apps/web/src/app/app.spec.tsx)
- [`apps/web/src/app/auth.features.spec.tsx`](/Users/sonvh/Codes/goodjob/apps/web/src/app/auth.features.spec.tsx)

## Product Scope

Implemented platform capabilities:

- Authenticated kudos sending with points, description, core value, optional tagged teammates, and optional media
- Monthly giving budget enforcement with transactional locking
- Feed, reactions, comments, and realtime notifications
- Reward catalog management and atomic reward redemption
- AI-generated monthly summaries with cache invalidation when source activity changes
- Media upload and validation pipeline backed by S3-compatible storage plus Redis/BullMQ workers

## Architecture Choices

### Why an Nx Monorepo

- Keeps frontend, backend, and shared contracts in one repository
- Makes cross-project type sharing straightforward
- Standardizes builds, tests, and typechecks through a single task runner

### Why PostgreSQL + Drizzle

- PostgreSQL is a strong fit for transactional integrity, row locking, and ledger-style persistence
- The case study requires correctness under concurrency, which is easier to enforce with relational constraints and transactions
- Drizzle keeps the schema close to TypeScript while still allowing direct SQL where row locks matter

### Why Redis + BullMQ

- Redis supports realtime fanout and lightweight asynchronous job orchestration
- BullMQ is used to move media validation work out of the request path so uploads do not block the API

### Why React Query on the Frontend

- Server state dominates this product: feed data, wallet data, rewards, notifications, and auth-adjacent fetches
- React Query gives caching, refetching, and loading/error state handling without introducing heavier client-state complexity

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start infrastructure

```bash
docker compose up -d
```

Local services:

- PostgreSQL: `localhost:54322`
- Redis: `localhost:6379`
- MinIO: `localhost:9000`
- MinIO console: `localhost:9001`

### 3. Create local environment file

```bash
cp .env.example .env
```

### 4. Run database migrations

```bash
npm run migrate
```

### 5. Start the applications

In separate terminals:

```bash
npm run dev:api
```

```bash
npm run dev:web
```

Default local URLs:

- Web: `http://localhost:4200`
- API: `http://localhost:3000`

## Nx Commands

Common workspace commands:

- Start web app: `npm exec -- nx run @org/web:dev`
- Start API: `npm exec -- nx run @org/api:serve`
- Run API migrations: `npm exec -- nx run @org/api:migrate`
- Typecheck workspace: `npm exec -- nx run-many -t typecheck`
- Build workspace: `npm exec -- nx run-many -t build`
- Test API: `npm exec -- nx run @org/api:test`
- Test web: `npm exec -- nx run @org/web:test -- --run`

## Environment Variables

The repository includes [`.env.example`](/Users/sonvh/Codes/goodjob/.env.example) with local defaults and placeholders.

Key groups:

- App runtime: `NODE_ENV`, `HOST`, `PORT`
- Database and cache: `DATABASE_URL`, `REDIS_URL`
- Frontend/backend origins: `APP_BASE_URL`, `API_BASE_URL`, `VITE_*`
- Auth and session security: `SESSION_*`, `JWT_SECRET`, `CSRF_*`, `OIDC_*`, OAuth provider secrets
- Media storage: `S3_*`
- AI summary feature: `OPENAI_API_KEY`, `OPENAI_MODEL`

If `OPENAI_API_KEY` is not configured, the API falls back to a deterministic summary response so local development and tests still work.

## Testing Strategy

### Unit and Rule-Level Coverage

The backend suite verifies business rules around:

- valid point ranges for kudos
- self-kudo rejection
- monthly giving budget enforcement and reset behavior through wallet and ledger state

### Integration Coverage

The "Give Kudo" flow is tested end-to-end through the API layer:

- authenticated request
- CSRF-protected mutation
- database persistence
- ledger writes
- tagged teammate persistence
- feed payload verification

### Edge Cases and Concurrency

The suite explicitly covers:

- rejecting attempts to give points to yourself
- rejecting overspend scenarios against the monthly giving budget
- preventing double-spend during concurrent reward redemption

Run the test suite with:

```bash
npm exec -- nx run @org/api:test
npm exec -- nx run @org/web:test -- --run
```

## Production Build Notes

- The frontend production bundle is generated with `vite build`
- Nx build entrypoints are available for both applications
- Deployment and CI/CD details live in [`docs/PRODUCTION_DEPLOYMENT.md`](/Users/sonvh/Codes/goodjob/docs/PRODUCTION_DEPLOYMENT.md)

To produce local build artifacts:

```bash
npm exec -- nx run-many -t build
```

## Additional Documentation

- Submission checklist: [`docs/SUBMISSION_PLAN.md`](/Users/sonvh/Codes/goodjob/docs/SUBMISSION_PLAN.md)
- Original case-study plan: [`docs/CASE_STUDY_1_PLAN.md`](/Users/sonvh/Codes/goodjob/docs/CASE_STUDY_1_PLAN.md)
- Production runbook: [`docs/PRODUCTION_DEPLOYMENT.md`](/Users/sonvh/Codes/goodjob/docs/PRODUCTION_DEPLOYMENT.md)
