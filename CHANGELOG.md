# Changelog

All notable changes to Konductor Workflow should be recorded in this file.

## [0.2.1] - 2026-04-17

### Added

- Made the framework architecture blueprint logo clickable to the open-source announcement.

### Changed

- Optimized the blueprint SVG bundle size by compressing and resizing the embedded logo Base64 payload, and added `framework-blueprint.svg` to the npm published files.

## [0.2.0] - 2026-04-17

### Added

- Explicit behavior-layer rules in `KONDUCTOR.md` and `blueprints/KONDUCTOR.md` for assumption discipline, simplicity first, surgical diffs, and verification-first execution.
- `docs/AGENT_BEHAVIOR.md` as a compact anti-pattern and preferred-response guide, plus matching blueprint installer support.

### Changed

- `KONDUCTOR_WORKFLOW.md` now includes a dedicated behavior-layer section with compact execution transforms for bug fixes, refactors, and performance work.
- README and skill guidance now describe Konductor as a Markdown-only workflow with explicit behavior guardrails, not only memory and governance.

## [0.1.32] - 2026-04-16

### Changed

- Upgrade flow now always replaces `KONDUCTOR.md` and `.konductor/KONDUCTOR_WORKFLOW.md` from the framework package, while keeping the rest of the bootstrap files preserve-by-default.
- Installer copy logic was simplified around a small explicit replace-on-upgrade rule for those two framework control files.
- Version bump automation now force-adds tracked `KONDUCTOR.md` files so `npm version` works even though the root contract is ignored by repo packaging rules.

## [0.1.31] - 2026-04-16

### Changed

- Framework version source moved into a minimal `<framework_version>` tag inside `KONDUCTOR.md` and `blueprints/KONDUCTOR.md`.
- Release sync and verification now compare `package.json` against embedded `KONDUCTOR.md` version tags instead of separate version manifest files.
- Installer version output now reads the embedded contract tag and no longer installs `.konductor/KONDUCTOR_VERSION.json`.

## [0.1.9] - 2026-04-09

### Added

- Explicit self-improvement and self-upgrading mission language in the core `KONDUCTOR.md` contract and adopter blueprint.
- Up-to-the-hour documentation rule for recording WIP, intended next moves, and emerging upgrade direction to support self-retrospection and future updates.
- Stronger testing requirement in the core contract and adopter blueprint: maintain `>90%` coverage standards across unit tests and end-to-end or integration suites, including mobile e2e where relevant.

### Changed

- Root package version, `VERSION`, and blueprint install manifest now report `0.1.9`.
- AI-agent installation prompts now reference `npx konductor-workflow@0.1.9`.
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
- Explicit copy/paste installation prompt for AI coding agents using `npx konductor-workflow@0.1.8`.
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
