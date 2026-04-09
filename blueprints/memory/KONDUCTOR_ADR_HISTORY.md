# ADR History

This document is the durable architectural decision ledger for the repository. Use ADR format here for critical decisions that future agents must inherit.

### ADR-001: Explicit Framework Versioning

- Status: Accepted
- Context: Adopting repositories need a machine-readable way to see which Konductor workflow version is installed.
- Decision: Keep a root `VERSION` file in the framework repo and install `.konductor/KONDUCTOR_VERSION.json` into adopting repositories.
- Consequences: Upgrades stay reviewable and version drift becomes visible without external tooling.

### ADR-002: Vision Objectives As Stable WHY

- Status: Accepted
- Context: The workflow needed a stable WHY document separate from day-to-day execution instructions.
- Decision: Keep `.konductor/memory/KONDUCTOR_VISION_ROADMAP.md` as the durable intent file and keep `KONDUCTOR_WORKFLOW.md` focused on HOW.
- Consequences: Agents can separate enduring purpose from operational procedure with less prompt churn.

### ADR-003: Markdown-Only Baseline

- Status: Accepted
- Context: The SQLite archive and installed script toolchain were not being used and added unnecessary complexity.
- Decision: Standardize the framework on plain Markdown for workflow, memory, check-in, and decision history; keep ADR format embedded in `KONDUCTOR_ADR_HISTORY.md`.
- Consequences: The install footprint is smaller, easier to audit, and simpler to carry across repositories.

### ADR-004: Memory Layer Split

- Status: Accepted
- Context: The previous history file mixed roadmap, progress, reasoning, and architecture. That blurred the boundary between short-term coordination, long-term memory, and critical decisions.
- Decision: Use `docs/CHECK_IN.md` as short-term memory, `.konductor/memory/KONDUCTOR_MEMORY.md` as long-term memory, and `.konductor/memory/KONDUCTOR_ADR_HISTORY.md` for critical architectural decisions only.
- Consequences: Agents get a clearer storage model, less drift between temporary and durable context, and a smaller contract surface in normal prompts.

## Logging Guidance

Add a short ADR entry when a decision changes architecture, durable workflow structure, or cross-repo standards future agents must obey.

Do not use this file for short-term coordination, routine progress logging, or generic project memory.
