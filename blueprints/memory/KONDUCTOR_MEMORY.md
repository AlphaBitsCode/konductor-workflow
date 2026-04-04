# Working Memory

This document is the active state constraint log for the repository. It should be read before meaningful metacognitive self-modification and updated when durable constraints or anti-patterns are discovered.

## Foundational Stack Constraints

Replace these examples with hard constraints for the adopting repository.

1. Runtime versions:
2. Database constraints:
3. Authentication or security boundaries:
4. Infrastructure or deployment limits:
5. Performance or cost ceilings:

## Active Hypotheses and Heuristics

Use this section for current operating beliefs that are strong enough to guide implementation but not yet strong enough to be elevated into an ADR.

- `.konductor/memory/KONDUCTOR_VISION_ROADMAP.md` is the stable WHY reference; `.konductor/KONDUCTOR_WORKFLOW.md` is the HOW reference.
- Framework upgrades should be additive by default: preserve repo-specific customizations and update version metadata explicitly.
- Avoid introducing new background jobs until the synchronous path is validated.
- Favor additive schema changes over destructive rewrites.
- Prioritize testable refactors over broad prompt-only behavior changes.

## Known Anti-Patterns

Document patterns that have already caused regressions.

- Hardcoded absolute paths in application code
- Evaluation commands that only measure happy-path behavior
- Routing changes without end-to-end verification

## Update Rule

Update this file when a new hard constraint, recurring failure mode, or cross-cutting implementation rule is discovered.
