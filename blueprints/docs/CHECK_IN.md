# Check-In

This file is the short-term memory scratchpad for active collaboration between AI coding agents and humans in this repository. It is not a permanent policy document.

- Use this for live claims, progress notes, work in progress, near-term coordination, and planned but not yet confirmed tasks or strategy.
- Keep it compact, current, and up to the hour when active work is underway.
- Do not grow this into a history log.
- Do not store long-term rules here. Put them in `.konductor/memory/KONDUCTOR_MEMORY.md`.
- Do not store durable architectural decisions here. Record them as embedded ADR entries in `.konductor/memory/KONDUCTOR_ADR_HISTORY.md`.
- When possible, update this file with the current ongoing task even if the task is still in progress or blocked.
- Keep enough current context here to support self-retrospection and the next upgrade or recovery step.
- Archive or clear stale entries when they are no longer relevant to active work.

## Active Claims

| Owner | Task | Started | Status |
| :--- | :--- | :--- | :--- |
| Agent A | Fix login redirect bug after OAuth callback | 2026-01-15 | in progress |
| Alice | Review and merge PR #42 (rate limiting) | 2026-01-15 | blocked — waiting on staging deploy |

## Recent Progress

- 2026-01-15: Reproduced login redirect bug on staging. Root cause: missing `redirect_uri` param in OAuth config. Fix in progress.
- 2026-01-14: Merged payment gateway refactor. All integration tests green. Deployed to staging.
- 2026-01-13: Added rate limiting middleware. PR #42 open for review.

## Open Questions

- Should the session timeout be 30 or 60 minutes? Waiting on product decision.
- Is the legacy CSV import endpoint still in use? Check with Bob before deprecating.

## Planned / Unconfirmed

- Upgrade Node.js to v22 across all services (not yet scheduled).
- Add Redis caching layer to the product search endpoint (discussed, not confirmed).
