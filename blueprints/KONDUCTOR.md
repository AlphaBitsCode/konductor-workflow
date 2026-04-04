# Konductor

This is the repository's orchestration-level contract. Keep it short enough to tag in almost any prompt.

- Read `.konductor/memory/KONDUCTOR_VISION_ROADMAP.md` for durable intent.
- Read `.konductor/memory/KONDUCTOR_MEMORY.md` for lasting constraints and anti-patterns.
- Read `.konductor/KONDUCTOR_WORKFLOW.md` for the operating loop.
- Use `.konductor/KONDUCTOR_HANDOFF.md` for live coordination and `.konductor/memory/KONDUCTOR_HISTORY.md` for durable milestones.
- Update the live `.konductor/memory/` files before making long-lived behavior changes.
- **AI Model-Agnostic Team**: Assume you are part of a multi-model workflow. Pass context cleanly because the next agent reviewing or continuing your work may be a completely different AI model highly specialized for a different task.
- **Test Coverage Focus**: Always calculate and clearly display test code coverage by % whenever adding tests. Systematically prioritize asserting exceptionally high (>90%) coverage.
