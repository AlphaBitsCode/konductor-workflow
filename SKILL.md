---
name: konductor-workflow
description: This skill should be used when the user asks to "run /k-init", "run /k-update", "run /k-history", "run /k-compact", "run /k-checkin", "refresh Konductor", "compact the current context", "check in current work", "review Konductor history", or "read KONDUCTOR.md".
---
# Konductor Workflow

Use this skill for repo-local Konductor setup, refresh, and history review.

## Core Rules

- Read `KONDUCTOR.md` first.
- Keep outputs compact and repo-specific.
- Treat `docs/CHECK_IN.md` as short-term working state that `/k-checkin` refreshes and `/k-compact` compresses.
- Treat `.konductor/memory/KONDUCTOR_MEMORY.md` and `.konductor/memory/KONDUCTOR_ADR_HISTORY.md` as durable memory.
- Treat `.konductor/memory/KONDUCTOR_VISION_ROADMAP.md` as durable intent.
- Use `npx konductor-workflow@latest hello` only for intro/help text.

## /k-init

1. Read `KONDUCTOR.md`, `docs/KONDUCTOR_GUIDE.md`, `docs/PROJECT_SKILLS_WORKFLOW.md`, `docs/CHECK_IN.md`, `.konductor/memory/KONDUCTOR_VISION_ROADMAP.md`, `.konductor/memory/KONDUCTOR_MEMORY.md`, and `.konductor/memory/KONDUCTOR_ADR_HISTORY.md`.
2. Summarize the repository state, active goals, current work, and highest-risk tech debt.
3. Keep output short, specific, and decision-oriented.

## /k-update

1. Run `npx konductor-workflow@latest` from the repository root.
2. Confirm the installed runtime skill is written to `.agents/skills/konductor-workflow/SKILL.md`.
3. If the user only wants intro text, run `npx konductor-workflow@latest hello`.
4. Report changed files and any follow-up still needed.

## /k-compact

1. Read `KONDUCTOR.md`, `docs/CHECK_IN.md`, `docs/PROJECT_SKILLS_WORKFLOW.md`, `.konductor/memory/KONDUCTOR_MEMORY.md`, `.konductor/memory/KONDUCTOR_ADR_HISTORY.md`, and `.konductor/memory/KONDUCTOR_VISION_ROADMAP.md`.
2. Trim `docs/CHECK_IN.md` down to active work only.
3. Move completed or durable facts into the appropriate memory or ADR files when they matter for future work.
4. Return the smallest useful status summary: current goal, remaining blockers, and next action.

## /k-checkin

1. Read `KONDUCTOR.md`, `docs/CHECK_IN.md`, and the three durable memory files.
2. Refresh `docs/CHECK_IN.md` with the current status, active goals, blockers, and handoff point.
3. Keep the update concise and time-local.
4. Return a compact check-in summary for the human.

## /k-history

1. Read `.konductor/memory/KONDUCTOR_MEMORY.md`, `.konductor/memory/KONDUCTOR_ADR_HISTORY.md`, `.konductor/memory/KONDUCTOR_VISION_ROADMAP.md`, and `docs/CHECK_IN.md`.
2. Summarize durable rules, architectural decisions, roadmap intent, and live WIP.
3. Call out gaps, conflicts, or missing memory explicitly.

## Repo Map

- `KONDUCTOR.md`: compact repository contract and read-first alignment file.
- `SKILL.md`: universal Konductor skill source and trigger map.
- `.agents/skills/konductor-workflow/SKILL.md`: installed runtime copy of the skill.
- `docs/PROJECT_SKILLS_WORKFLOW.md`: human-facing slash-command catalog.
- `docs/KONDUCTOR_GUIDE.md`: daily-use guide for adopters.
- `docs/CHECK_IN.md`: live working state; keep compact, and refresh with `/k-checkin`.
- `.konductor/memory/KONDUCTOR_MEMORY.md`: durable conventions and shared knowledge.
- `.konductor/memory/KONDUCTOR_ADR_HISTORY.md`: durable architectural decisions.
- `.konductor/memory/KONDUCTOR_VISION_ROADMAP.md`: durable intent and roadmap.
