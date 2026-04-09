# Changelog

All notable changes to Konductor Workflow should be recorded in this file.

## [0.1.9] - 2026-04-09

### Added

- Explicit self-improvement and self-upgrading mission language in the core `KONDUCTOR.md` contract and adopter blueprint.
- Up-to-the-hour documentation rule for recording WIP, intended next moves, and emerging upgrade direction to support self-retrospection and future updates.
- Stronger testing requirement in the core contract and adopter blueprint: maintain `>90%` coverage standards across unit tests and end-to-end or integration suites, including mobile e2e where relevant.

### Changed

- Root package version, `VERSION`, and blueprint install manifest now report `0.1.9`.
- AI-agent installation prompts now reference `npx the-konductor@0.1.9`.
- CI smoke-test expectations now match the Markdown-only layout with `docs/CHECK_IN.md` and `.konductor/memory/KONDUCTOR_ADR_HISTORY.md`, without the removed scripts or decision directory.

## [0.1.8] - 2026-04-09

### Added

- `KONDUCTOR.md` as the short orchestration-level contract, with `AGENTS.md` retained only as a compatibility pointer.
- Seed template updates to make the public starter files generic while continuing to install live tracking files under `.konductor/` and `docs/`.
- `.konductor/memory/KONDUCTOR_VISION_ROADMAP.md` as the canonical true-north document (WHY reference), separate from the HOW workflow in `KONDUCTOR_WORKFLOW.md`.
- `docs/CHECK_IN.md` starter template for live agent-to-agent and agent-to-human coordination; ships with bootstrap and is meant to be kept short and cleared of stale entries.
- `.konductor/memory/KONDUCTOR_ADR_HISTORY.md` as the durable architectural decision ledger for the framework.
- compactness guidance that keeps `KONDUCTOR.md`, `KONDUCTOR_WORKFLOW.md`, `KONDUCTOR_VISION_ROADMAP.md`, and `docs/CHECK_IN.md` short and agent-oriented.
- `KONDUCTOR_VISION_ROADMAP.md` added to the bootstrap file list, the upgrade review checklist, and all first-customization guides.
- `docs/CHECK_IN.md` guidance in `KONDUCTOR.md`, `AGENTS.md`, `README.md`, and `KONDUCTOR_WORKFLOW.md`.
- Explicit copy/paste installation prompt for AI coding agents using `npx the-konductor@0.1.8`.
- Adoption guidance to consolidate existing repository documentation into the Konductor structure.

### Changed

- Root package version, `VERSION`, and installed version manifests now report `0.1.8`.
- Framework contract now makes documentation consolidation part of the adoption standard.

## [0.1.0] - 2026-04-04

### Added

- Framework version tracking via the root `VERSION` file.
- Install-time `.konductor/KONDUCTOR_VERSION.json` manifest so adopted repositories can see which framework version they have installed.
- `--ref` support in `scripts/meet-konductor.sh` so repositories can install or upgrade to a specific tag, branch, or commit.
- Upgrade guidance in `KONDUCTOR.md`, `AGENTS.md`, and `README.md` for AI agents maintaining adopted repositories.
- Initial embedded ADR entry for framework versioning.
