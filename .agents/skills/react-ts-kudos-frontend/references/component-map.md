# Component Map

## Suggested Routes
- `/feed`: live kudos feed.
- `/kudos/new`: give kudo form.
- `/rewards`: reward catalog and redemption history.

## Suggested Modules
- `features/kudos/api.ts`: typed API wrappers for send/feed/reaction/comment operations.
- `features/kudos/hooks`: `useSendKudosForm`, `useKudoFeed`.
- `features/kudos/components`: `ReactionToggleGroup`, media grid/viewer, comment composer.
- `features/rewards`: catalog, redeem mutation, status chips.
- `shared/api`: typed API client.
- `shared/ui`: buttons, modals, toasts, skeletons.

## Key UX Contracts
- Every write action shows pending, success, and error state.
- Infinite scroll or load-more must preserve scroll position.
- Media preview should appear before submit and support up to 5 files.
- Send Kudos uses points input (10-50), not slider.
- Reactions are toggle buttons with count inside each button.
- Send payload does not include tagged teammates or core/core-value fields.
