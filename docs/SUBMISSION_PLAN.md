# Submission Plan

This document turns the assessment requirements into a final submission checklist for this repository.

## Goal

Present the project as a professional candidate submission with:

- a clearly structured repository
- reproducible setup instructions
- explicit architecture rationale
- environment variable guidance
- visible test strategy
- optional production deployment evidence

## Current Status

### Repository Structure

Status: ready

- Frontend lives in [`apps/web`](/Users/sonvh/Codes/goodjob/apps/web)
- Backend lives in [`apps/api`](/Users/sonvh/Codes/goodjob/apps/api)
- Shared contracts live in [`packages/shared`](/Users/sonvh/Codes/goodjob/packages/shared)

### Commit History

Status: ready, with room for polish if more iterations are added

Recent commit messages already show a reasonably professional pattern:

- `feat: ship case-study production upgrade`
- `fix: stabilize ci typecheck and deploy gates`
- `style: format kudos route for ci`

### README and Setup

Status: ready

The root README now includes:

- setup commands
- Nx task references
- architecture choices
- testing strategy
- environment variable guidance
- submission mapping to the assessment rubric

### Environment Variables

Status: ready

The [`.env.example`](/Users/sonvh/Codes/goodjob/.env.example) file exists and should remain synchronized with runtime needs.

### Hosting

Status: optional / not yet linked in repo

If a live deployment is added before submission:

1. Deploy the web app and API.
2. Add the public URL to the root README.
3. Verify the deployed site is using a production build.
4. Confirm there are no stray browser console logs in the deployed UI flow.

### Testing Evidence

Status: ready

The repository already demonstrates:

- business-rule validation
- API-to-database integration coverage
- concurrency protection for reward redemption
- monthly giving budget protection under concurrent requests

Note: the backend suite depends on local PostgreSQL and Redis being reachable before `@org/api:test` will pass.

## Recommended Final Submission Steps

1. Run `npm install`.
2. Run `docker compose up -d`.
3. Run `npm run migrate`.
4. Run `npm exec -- nx run @org/api:test`.
5. Run `npm exec -- nx run @org/web:test -- --run`.
6. Run `npm exec -- nx run-many -t build`.
7. If deploying, add the public URL to the README and smoke-test the production flow.

## Reviewer Walkthrough

For a reviewer with limited time, the suggested review path is:

1. Read the root [README](/Users/sonvh/Codes/goodjob/README.md).
2. Inspect the API tests in [`apps/api/tests/case-study.spec.ts`](/Users/sonvh/Codes/goodjob/apps/api/tests/case-study.spec.ts).
3. Review deployment notes in [`docs/PRODUCTION_DEPLOYMENT.md`](/Users/sonvh/Codes/goodjob/docs/PRODUCTION_DEPLOYMENT.md).
4. Check recent git commits to see iterative delivery.

## Gaps To Decide Before Submission

- Add a public demo URL or leave hosting as intentionally optional
- Decide whether to include screenshots or a short demo GIF in the repository
- Decide whether to squash or preserve the current iterative commit history
