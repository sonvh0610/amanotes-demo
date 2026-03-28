# Production Deployment and CI/CD Runbook

This repository now includes CI and CD workflows:

- CI: `.github/workflows/ci.yml`
- CD: `.github/workflows/cd.yml`

## Delivery Model

1. CI runs on pull requests and `main` pushes:
   - `nx format:check`
   - `nx affected --targets=typecheck,test,build`
2. CD runs on `main` pushes (or manually):
   - builds API and Web images
   - pushes images to GHCR
   - deploys via SSH to production host
   - runs DB migrations before restarting services

## New Production Artifacts

- `Dockerfile.api`: builds and runs Fastify API (`node apps/api/dist/main.js`).
- `Dockerfile.web`: builds Vite web app and serves through Nginx.
- `deploy/nginx/web.conf`: SPA serving + API/WebSocket reverse proxy.
- `deploy/docker-compose.prod.yml`: production compose stack using GHCR images.

## Required GitHub Secrets

Set these in repository settings before enabling production CD:

- `PROD_SSH_HOST`: production host/IP.
- `PROD_SSH_PORT`: SSH port (usually `22`).
- `PROD_SSH_USER`: SSH user on production host.
- `PROD_SSH_PRIVATE_KEY`: private key for that user.
- `PROD_DEPLOY_PATH`: absolute path on server where this repo is checked out.
- `GHCR_USERNAME`: GHCR username for pull access from server.
- `GHCR_READ_TOKEN`: PAT with `read:packages` scope.

## First-Time Server Setup

1. Install Docker + Docker Compose plugin on production host.
2. Clone this repository at `PROD_DEPLOY_PATH` on the host.
3. Create `PROD_DEPLOY_PATH/.env.prod` with production values:
   - `NODE_ENV=production`
   - `HOST=0.0.0.0`
   - `PORT=3000`
   - `DATABASE_URL`
   - `REDIS_URL`
   - `APP_BASE_URL`
   - `API_BASE_URL`
   - `SESSION_COOKIE_NAME`
   - `SESSION_TTL_HOURS`
   - `JWT_SECRET`
   - `S3_ENDPOINT` (optional if using AWS S3 directly)
   - `S3_REGION`
   - `S3_ACCESS_KEY_ID`
   - `S3_SECRET_ACCESS_KEY`
   - `S3_BUCKET`
   - OAuth secrets/redirect URIs as needed
   - `RATE_LIMIT_MAX`
   - `RATE_LIMIT_WINDOW`
4. Make sure Postgres and Redis are reachable from the host (managed services or private network).

## Deployment Flow Executed by CD

The CD workflow runs this sequence on the server:

1. `git fetch` + `git checkout main` + `git pull --ff-only`
2. `docker login ghcr.io`
3. `docker compose -f deploy/docker-compose.prod.yml pull`
4. `docker compose -f deploy/docker-compose.prod.yml run --rm api node apps/api/dist/apps/api/src/app/db/migrate.js`
5. `docker compose -f deploy/docker-compose.prod.yml up -d --remove-orphans`
6. `docker image prune -f`

## Smoke Checks After Deploy

Run on production host:

```bash
docker compose -f deploy/docker-compose.prod.yml ps
curl -f http://localhost/healthz
```

Then verify application flows:

1. Login + session persistence.
2. Send kudos (10-50 points).
3. React/comment update in feed.
4. Redeem reward with idempotency key.

## Rollback

To roll back to previous image tag:

1. Set `IMAGE_TAG=<previous_sha>` in shell on production host.
2. Re-run:

```bash
docker compose -f deploy/docker-compose.prod.yml pull
docker compose -f deploy/docker-compose.prod.yml up -d --remove-orphans
```

If schema changed, use your DB rollback policy before or after image rollback depending on migration compatibility.
