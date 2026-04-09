# Working Memory

This document is the long-term memory file for the repository. Read it before meaningful work and update it when durable constraints, anti-patterns, or lessons must persist across sessions.

## Foundational Stack Constraints

Replace these examples with hard constraints for the adopting repository.

1. Runtime versions:
2. Database constraints:
3. Authentication or security boundaries:
4. Infrastructure or deployment limits:
5. Performance or cost ceilings:

## Active Hypotheses and Heuristics

Use this section for durable operating beliefs and working heuristics that future agents should inherit.

- `.konductor/memory/KONDUCTOR_VISION_ROADMAP.md` is the stable WHY reference; `.konductor/KONDUCTOR_WORKFLOW.md` is the HOW reference.
- `docs/CHECK_IN.md` is short-term memory only and should stay compact.
- `.konductor/memory/KONDUCTOR_ADR_HISTORY.md` is for critical architectural decisions only.
- Framework upgrades should be additive by default: preserve repo-specific customizations and update version metadata explicitly.
- Keep the framework Markdown-only unless a concrete need justifies bringing runtime tooling back.
- Avoid introducing new background jobs until the synchronous path is validated.
- Favor additive schema changes over destructive rewrites.
- Prioritize testable refactors over broad prompt-only behavior changes.

## Known Anti-Patterns

Document patterns that have already caused regressions.

- Hardcoded absolute paths in application code
- Evaluation commands that only measure happy-path behavior
- Routing changes without end-to-end verification

## Update Rule

Update this file when a new hard constraint, recurring failure mode, or durable cross-cutting implementation rule is discovered.
