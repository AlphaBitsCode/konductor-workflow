# ADR-001. Add Explicit Framework Versioning

Date: 2026-04-04

## Status

Accepted

## Context

The starter was installable, but adopted repositories had no durable way to answer three basic questions:

- which framework version is installed here
- what changed since that version
- how should an agent upgrade safely without overwriting local framework customizations

That made upgrades ambiguous and reduced confidence in framework maintenance.

## Decision

The starter will use explicit release versioning with these artifacts:

- a root `VERSION` file as the canonical machine-readable framework version
- a root `CHANGELOG.md` for human-readable release history
- an install-time `.konductor/KONDUCTOR_VERSION.json` manifest written by the bootstrap script into adopted repositories
- bootstrap support for `--ref` so installs and upgrades can target a pinned tag, branch, or commit

Framework upgrade guidance will instruct agents to treat template updates as additive by default and preserve repo-specific customizations unless a human requests a reset or a documented framework change requires replacement.

## Consequences

- Positive: adopted repositories can inspect their installed framework version directly.
- Positive: upgrades become auditable and reproducible when pinned refs are used.
- Negative: the bootstrap installer now owns one generated file and slightly more logic.
