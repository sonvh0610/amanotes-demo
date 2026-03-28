# Goodjob Refactor Roadmap (Aligned to Case Study Docs)

This roadmap translates `docs/CASE_STUDY_1_PLAN.md` and `docs/TECH_STACK_PLAN.md` into an execution sequence for the current repository state.

## Current Baseline (as of 2026-03-28)

- Monorepo structure is in place: `apps/api`, `apps/web`, `packages/shared`.
- Core MVP flows already exist: kudos, feed, reactions, comments, rewards, redemption, notifications, media presign, OAuth flows.
- Nx CI exists with affected checks; production CD and runtime packaging were missing.
- Backend routes and workers are converging in the same runtime process and deserve boundary tightening for easier scaling.

## Refactor Goals

1. Preserve transactional integrity and ledger correctness while improving module boundaries.
2. Keep frontend pages composition-only and move remaining side effects to feature hooks/API modules.
3. Isolate runtime responsibilities (HTTP API, websocket fanout, media worker, migrations) to support independent scaling and safer deploys.
4. Standardize operational readiness: health checks, deploy/migrate flow, rollback playbook.

## Refactor Plan by Phase

### Phase 1: API Module Boundaries and Contracts

- Split API domain services by bounded context:
  - `kudos`, `feed`, `rewards`, `wallet`, `notifications`, `auth`, `uploads`.
- Extract shared route glue patterns:
  - auth guard wrappers
  - validation helpers
  - error mapping helpers
- Move transaction-critical logic into service-layer functions with small route handlers.
- Add explicit domain-level tests for:
  - no self-kudo
  - points 10-50 validation
  - monthly budget lock behavior
  - idempotent redemption lock behavior

Exit criteria:

- Route files remain thin (input validation + call service + response mapping).
- Critical invariants are tested without requiring full HTTP end-to-end coverage.

### Phase 2: Worker and Realtime Runtime Separation

- Introduce independent process entrypoints:
  - `api-server` process
  - `media-worker` process
- Keep Redis pub/sub event contracts in `packages/shared` to prevent drift.
- Add retry + dead-letter strategy and visibility for media processing failures.

Exit criteria:

- API can start without media worker when desired.
- Worker can be scaled independently with no API code changes.

### Phase 3: Frontend Feature Decoupling

- Ensure server calls are centralized by feature:
  - `apps/web/src/app/features/kudos/api.ts`
  - `apps/web/src/app/features/rewards/api.ts`
  - `apps/web/src/app/features/wallet/api.ts`
- Ensure pages are composition/presentation only.
- Consolidate socket state updates into reusable hooks/context to avoid duplicate connection logic.

Exit criteria:

- Page files do not directly fetch/mutate server state.
- Realtime subscriptions are centralized and testable.

### Phase 4: Data Access and Query Performance

- Review indexes against feed, notifications, wallet history, and redemptions read paths.
- Normalize repeated query patterns into repository helpers.
- Add query-level benchmarks for feed pagination and wallet history under realistic row counts.

Exit criteria:

- Keyset pagination paths remain index-friendly.
- Slow query candidates are identified with index/action decisions documented.

### Phase 5: Operations, Deployment, and Reliability

- Adopt containerized runtime artifacts (API + Web).
- Run DB migrations as part of production deployment gate.
- Add CI/CD with quality gates, image publishing, and controlled deploy workflow.
- Add rollback process and production env contract documentation.

Exit criteria:

- Green CI gates on PR and `main`.
- Successful deploy from GitHub Actions to production target.
- Clear rollback and secret requirements documented.

## Recommended Delivery Order (2-week tactical)

1. Week 1:
   - Phase 1 (service boundary extraction + invariants tests).
   - Begin Phase 3 (frontend composition cleanup).
2. Week 2:
   - Phase 2 (worker separation).
   - Phase 4 (query/index pass).
   - Phase 5 hardening + load/regression checks.

## Risk Controls During Refactor

- Keep behavior-preserving pull requests small and domain-scoped.
- For any transaction logic touch, require tests for both success and race/failure path.
- Gate merges with affected `typecheck,test,build`.
- Prefer additive changes before deletion to protect rollback paths.
