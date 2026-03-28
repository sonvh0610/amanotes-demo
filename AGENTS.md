<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->

## Goodjob Kudos Feature Rules

- For `Send Kudos` and `Kudo Feed`, keep logic and presentation separated:
  - Put server calls in `apps/web/src/app/features/kudos/api.ts`.
  - Put stateful behavior in `apps/web/src/app/features/kudos/hooks/*`.
  - Keep page files in `apps/web/src/app/pages/*` as composition/presentation only.
- Reuse media UI components across features that need uploads or previews:
  - Upload and local preview: `apps/web/src/app/components/media/KudosMediaDropzone.tsx`.
  - Feed/comment media grids and modal: `apps/web/src/app/features/kudos/components/*`.
- `Send Kudos` payload contract defaults:
  - No tagged-teammates field.
  - No core/core-value field.
  - Points use numeric input with allowed range 10-50.
  - Up to 5 media files per submission.
- Feed interaction contracts:
  - Reaction buttons must be toggle-able and show count in the button.
  - Comment composer supports text and/or media (up to 5 files) and reuses upload component.
- Preserve dashboard styling language:
  - Primary actions use primary color and pointer cursor.
  - Reusable components should keep current design tokens and Tailwind utility conventions.

## Goodjob Rewards & Wallet Feature Rules

- Keep `Rewards` and `My Wallet` logic/presentation separated:
  - Rewards server calls live in `apps/web/src/app/features/rewards/api.ts`.
  - Rewards stateful behavior lives in `apps/web/src/app/features/rewards/hooks/*`.
  - Rewards reusable UI pieces live in `apps/web/src/app/features/rewards/components/*`.
  - Wallet server calls live in `apps/web/src/app/features/wallet/api.ts`.
  - Wallet stateful behavior lives in `apps/web/src/app/features/wallet/hooks/*`.
  - Wallet reusable UI pieces live in `apps/web/src/app/features/wallet/components/*`.
  - Page files in `apps/web/src/app/pages/*` should compose feature hooks/components only.
- Rewards UX contracts:
  - Clicking `Redeem` must ask for explicit confirmation before sending request.
  - Successful redeem/create/update must show user-facing success notification.
  - Reward create/edit modal should support thumbnail upload via dropzone-style UI.
  - Reward card thumbnails must gracefully fallback if image cannot be loaded.
- Wallet UX contracts:
  - `My Wallet` should include recent point transaction history.
  - Transaction list entries should translate internal reason codes to readable labels.
