# History Index

This document is the combined ledger for planned roadmap milestones and completed workflow iterations, architectural changes, and evaluation milestones.

## ROADMAP_MILESTONES

Use this section for planned near-term framework work that should be visible to future agents before it is completed.

| Target / Iteration | Type | Variant ID | Corresponding ADR | Fitness Metric / Coverage | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| v0.2.0 | Roadmap | ROADMAP-001 | TBD | bootstrap installs KONDUCTOR_HANDOFF; evaluations configurable | Add KONDUCTOR_HANDOFF.md template, CI/CD workflow, housekeeping --dry-run, configurable evaluations |
| v0.2.0 | Roadmap | ROADMAP-002 | TBD | upgrade --apply flag; smoke test passes | Make upgrade.ts optionally apply the bootstrap rather than only printing the command |
| v0.3.0 | Roadmap | ROADMAP-003 | TBD | claim/release protocol validated | Multi-agent coordination primitives: structured claim format, stale-claim detection |

## Completed Milestones

| Date / Iteration | Variant ID | Corresponding ADR | Fitness Metric / Coverage | Notes |
| :--- | :--- | :--- | :--- | :--- |
| YYYY-MM-DD | Initial Bootstrap | N/A | Baseline | Installed starter files |
| 2026-04-04 | Framework Versioning | ADR-001 | N/A | Added VERSION, CHANGELOG, install-time version manifest, and pinned upgrade workflow |
| 2026-04-04 | Upgrade Helper | ADR-002 | N/A | Added .konductor/scripts/upgrade.ts and npm run upgrade for version discovery |
| 2026-04-04 | Vision Objectives | ADR-003 | N/A | Added .konductor/memory/KONDUCTOR_VISION_ROADMAP.md as the framework's stable WHY document |
| 2026-04-04 | KONDUCTOR_HANDOFF Template | N/A | N/A | Added .konductor/KONDUCTOR_HANDOFF.md starter template; ships with bootstrap for live coordination |

## Logging Guidance

Use `ROADMAP_MILESTONES` for planned work and convert or retire entries there as work lands.

Append a row to the completed milestones table when you:

- change the maintenance loop
- add or replace evaluation signals
- discover a major regression or recovery
- deploy a new workflow default that future agents should inherit
