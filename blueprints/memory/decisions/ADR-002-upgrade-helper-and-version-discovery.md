# ADR-002. Add Upgrade Helper and Version Discovery Flow

Date: 2026-04-04

## Status

Accepted

## Context

The framework now records an installed version in adopted repositories, but agents still needed a simple local command to:

- inspect the currently installed framework version
- compare it against a target ref
- print the exact bootstrap command for an upgrade

The versioning docs were correct, but the operational path was still too manual.

## Decision

Add `.konductor/scripts/upgrade.ts` as a lightweight helper that reads `.konductor/KONDUCTOR_VERSION.json`, fetches the target `VERSION` from the starter repository, and prints a pinned upgrade command.

Expose the helper through `.konductor/scripts/package.json` as `npm run upgrade`.

Install the helper through `scripts/meet-konductor.sh` so adopting repositories get the same workflow by default.

## Consequences

- Positive: agents get a repeatable way to discover their current framework version and fetch the next one.
- Positive: upgrade instructions are generated from the same source of truth as the install metadata.
- Negative: the install surface is slightly larger and depends on network access when the helper is used.
