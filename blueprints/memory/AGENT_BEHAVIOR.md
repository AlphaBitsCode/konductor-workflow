# Agent Behavior

This file is the compact behavior reference for day-to-day coding work. Use it to avoid common agent failure modes while keeping the repository Markdown-only.

## Hidden Assumptions

Anti-pattern:

> Feature request says "add filtering" and agent silently chooses server-side filtering, a new query parameter shape, and default sort behavior without confirming the contract.

Concrete examples:

- Feature work: "Add filtering to the jobs page" is not enough to choose client-side vs server-side filtering, URL persistence, or default filter semantics.
- API work: "Support batch create" is not enough to choose partial success vs all-or-nothing behavior.
- UI work: "Match the design" is not enough to infer mobile behavior, empty states, or loading interactions.

Preferred behavior:

> State the assumption or ask before editing when ambiguity changes architecture, behavior, data shape, or external interfaces.

Concrete response pattern:

- "I can implement filtering client-side against the existing payload, but server-side filtering changes the API contract. I’m proceeding with client-side unless you want the API expanded."

Why this reduces error:

It prevents clean-looking but wrong implementations that are expensive to unwind later.

## Over-Abstraction

Anti-pattern:

> Small requested change becomes a new helper layer, config surface, plugin system, or generic framework without current need.

Concrete examples:

- Bug fix: null-check request becomes a new validation framework.
- Feature work: one new export format becomes an extensible exporter registry.
- Refactor: duplicate logic in two files becomes a broad shared abstraction touching six modules.
- CLI work: one optional flag becomes a configuration file format and precedence system.

Preferred behavior:

> Implement the smallest change that solves the current request. Add abstraction only when repeated existing patterns or current code pressure actually demand it.

Concrete response pattern:

- "This only needs one new JSON export path, so I added a direct branch beside the existing CSV path instead of introducing a pluggable exporter layer."

Why this reduces error:

It keeps the code easier to review, test, and maintain under real repository constraints instead of hypothetical future ones.

## Drive-By Refactoring

Anti-pattern:

> While fixing one issue, agent also reformats files, renames unrelated symbols, or rewrites neighboring code "for cleanliness."

Concrete examples:

- Bug fix: timeout fix also renames variables across the whole module.
- Refactor: target function cleanup also reorders imports and changes formatting in unrelated files.
- Test update: one flaky test fix also rewrites neighboring test suites to a different style.
- Frontend change: button behavior fix also rewrites adjacent components to a new pattern.

Preferred behavior:

> Keep every edited line traceable to the current task. Only include cleanup that is required to make the requested change safe, correct, or testable.

Concrete response pattern:

- "I limited the patch to the timeout path and the affected test. I did not rename the surrounding helpers because that is unrelated to the failure."

Why this reduces error:

It shrinks review surface and makes regressions easier to attribute.

## Vague Execution

Anti-pattern:

> Agent starts editing immediately from a vague request such as "fix it" or "make it faster" without defining what success means.

Concrete examples:

- Bug fix: edits code before reproducing the reported failure.
- Refactor: changes structure without stating what behavior must remain unchanged.
- Performance work: optimizes code without a baseline metric or identified bottleneck.
- Reliability work: retries are added without specifying the failing scenario or expected recovery behavior.

Preferred behavior:

> Translate the request into a repro, failing test, metric, or explicit acceptance check before implementation.

Concrete response patterns:

- Bug fix: "I reproduced the failure with this test, then fixed the parser and reran the affected suite."
- Refactor: "I treated current CLI output and exit codes as the preserved behavior and verified both before and after the edit."
- Performance: "I used request latency at 1k items as the metric, confirmed the hot path, then measured the targeted change."

Why this reduces error:

It turns subjective intent into something verifiable and lowers the chance of solving the wrong problem.
