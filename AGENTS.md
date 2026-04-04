# Agent Context for This Repository

## AI-Driven Development Workflow

This repository is intended to be developed collaboratively by humans and coding agents.

Primary operating rules:

1. Reach observable validation quickly. Prefer visual, functional, or test confirmation over speculative refactoring.
2. Ask for human review when changes affect user-facing behavior and no automated validation is available.
3. Use browser automation or project-native test tooling when available to validate progress early.
4. Do not over-engineer before the current behavior is visible and understood.

## Hyperagent Self-Improvement Mandate

This repository operates with a Darwin Godel Machine with Hyperagents style workflow.

Agents working in this repo must:

- consult `blueprints/AGENT_MEMORY.md` before significant meta-level changes
- append meaningful events to `blueprints/AGENT_HISTORY.md`
- use `blueprints/HYPERAGENT_WORKFLOW.md` as the workflow reference
- write an ADR under `blueprints/decisions/` when introducing a significant architectural or metacognitive change

## Repository Context

Replace this section with a concise description of:

1. the main applications or services in this repo
2. the important runtime boundaries
3. the local development entrypoints

## Architectural Rules

Record the decisions that must not be violated by future agents. Examples:

- required language/runtime versions
- database constraints
- auth or security boundaries
- deployment assumptions
- performance or cost ceilings

## Project-Specific Notes

Use this section for roadmap caveats, deferred integrations, or local rules that do not belong in the global workflow document.
