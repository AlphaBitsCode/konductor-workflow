# Changelog

All notable changes to Konductor Framework should be recorded in this file.

## [Unreleased]

### Added

- `KONDUCTOR.md` as the short orchestration-level contract, with `AGENTS.md` retained only as a compatibility pointer.
- Seed template updates to make the public starter files generic while continuing to install live tracking files under `.konductor/`.
- `.konductor/memory/KONDUCTOR_VISION_ROADMAP.md` as the canonical true-north document (WHY reference), separate from the HOW workflow in `KONDUCTOR_WORKFLOW.md`.
- `.konductor/KONDUCTOR_HANDOFF.md` starter template for live agent-to-agent and agent-to-human coordination; ships with bootstrap and is meant to be kept short and cleared of stale entries.
- `ROADMAP_MILESTONES` section in `.konductor/memory/KONDUCTOR_HISTORY.md` so planned work is visible to future agents before it lands.
- ADR-003 recording the vision objectives decision.
- `KONDUCTOR_VISION_ROADMAP.md` added to the bootstrap file list, the upgrade review checklist, and all first-customization guides.
- `KONDUCTOR_HANDOFF.md` guidance in `KONDUCTOR.md`, `AGENTS.md`, `README.md`, and `KONDUCTOR_WORKFLOW.md`.

## [0.1.0] - 2026-04-04

### Added

- Framework version tracking via the root `VERSION` file.
- Install-time `.konductor/KONDUCTOR_VERSION.json` manifest so adopted repositories can see which framework version they have installed.
- `--ref` support in `scripts/meet-konductor.sh` so repositories can install or upgrade to a specific tag, branch, or commit.
- Upgrade guidance in `KONDUCTOR.md`, `AGENTS.md`, and `README.md` for AI agents maintaining adopted repositories.
- Initial ADR and history entry for framework versioning.
