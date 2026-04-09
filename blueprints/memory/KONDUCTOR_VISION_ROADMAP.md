# Vision Objectives

This document is the project's true north.

It defines the WHY context for the repository. If there is a conflict between short-term implementation convenience and these objectives, this file takes priority and the change should be reviewed deliberately.

## Purpose

This starter exists to help a repository:

1. keep its orchestration instructions short, stable, and repo-specific
2. make the working loop observable, auditable, and easy to customize
3. preserve a durable version history for installed starter files
4. support human and AI collaborators without making the workflow fragile

## Success Criteria

The framework is doing its job when:

- adopters can identify the installed framework version quickly
- agents can tell what is stable policy versus live work in progress
- upgrades preserve repo-specific customizations by default
- the workflow remains easy to inspect and customize without extra runtime tooling

## Design Principles

- Keep `KONDUCTOR.md` short enough to tag in almost any prompt.
- Treat `docs/CHECK_IN.md` as the shared live working file for active agents.
- Keep only `README.md` and `KONDUCTOR.md` at repo root; move all other project documentation under `docs/`.
- Keep the workflow blueprint focused on HOW, not WHY.
- Use explicit version metadata and changelogs for upgrade clarity.
- Keep the baseline Markdown-only and easy to carry across repositories.
- Prefer additive, reviewable changes over opaque rewrites.

## Non-Goals

- This file does not describe the execution loop in detail.
- This file does not define repository-specific checks.
- This file does not replace embedded ADR decisions recorded in `KONDUCTOR_ADR_HISTORY.md`.
- This file does not grow into a work log or history stream.
