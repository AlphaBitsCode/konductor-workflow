# ADR-003: Vision Objectives as the Stable True North

## Status

Accepted

## Context

The framework already had a workflow document for execution behavior and a working-memory file for mutable constraints. What was missing was a single, stable source of truth for the repository's WHY context: the long-lived objectives that should guide prioritization, adoption decisions, and agent behavior across upgrades.

Without that separation, agents can accidentally treat workflow mechanics as product intent, or rewrite high-level goals every time the implementation changes.

## Decision

We introduce `.konductor/memory/KONDUCTOR_VISION_ROADMAP.md` as the canonical true-north document for the starter.

This file will:

1. define the framework's WHY context
2. stay short and durable
3. survive routine workflow changes
4. act as the first reference when evaluating whether a framework change aligns with the project's long-term intent

`.konductor/KONDUCTOR_WORKFLOW.md` remains the HOW reference, and `.konductor/memory/KONDUCTOR_MEMORY.md` remains the mutable constraint log.

## Consequences

- **Positive:** Agents can distinguish mission from mechanism more reliably.
- **Positive:** Upgrades and local customizations have a stable north star to compare against.
- **Positive:** The framework docs become easier to tag and reuse in prompts because the intent document is concise and durable.
- **Negative:** Adopted repositories must now maintain one additional blueprint file.
