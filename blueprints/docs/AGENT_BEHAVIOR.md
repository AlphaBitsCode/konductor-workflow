# Agent Behavior

This file is the compact behavior reference for day-to-day coding work. Use it to avoid common agent failure modes while keeping the repository Markdown-only.

## Hidden Assumptions

Anti-pattern:

> Request is ambiguous. Agent silently picks one architecture or data-shape interpretation and implements it.

Preferred behavior:

> State the assumption or ask before editing when ambiguity changes architecture, behavior, or external interfaces.

Why this reduces error:

It prevents clean-looking but wrong implementations that are expensive to unwind later.

## Over-Abstraction

Anti-pattern:

> Small requested change becomes new helper layer, config surface, plugin system, or generic framework without current need.

Preferred behavior:

> Implement the smallest change that solves the current request. Add abstraction only when the existing codebase already demands it.

Why this reduces error:

It keeps the code easier to review, test, and maintain under real repository constraints instead of hypothetical future ones.

## Drive-By Refactoring

Anti-pattern:

> While fixing one issue, agent also reformats files, renames unrelated symbols, or rewrites neighboring code "for cleanliness."

Preferred behavior:

> Keep every edited line traceable to the current task. Only include cleanup that is required to make the requested change safe or correct.

Why this reduces error:

It shrinks review surface and makes regressions easier to attribute.

## Vague Execution

Anti-pattern:

> Agent starts editing immediately from a vague request such as "fix it" or "make it faster" without defining what success means.

Preferred behavior:

> Translate the request into a repro, failing test, metric, or explicit acceptance check before implementation.

Why this reduces error:

It turns subjective intent into something verifiable and lowers the chance of solving the wrong problem.
