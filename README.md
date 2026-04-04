# Konductor Framework

Konductor Framework is a reusable starter for running a Darwin Godel Machine with Hyperagents style workflow inside any software repository. It provides a top-level `KONDUCTOR.md` orchestration contract, with `AGENTS.md` kept only as a compatibility pointer, blueprint templates for memory and decision logging, and a TypeScript housekeeping loop that teams can adapt to their own evaluation commands and constraints.

This repo is a framework, not a complete autonomous maintainer. The installed files are intended to be customized to your stack, your safety boundaries, and your test/build signals.

The framework separates intent from execution:

- `.konductor/memory/KONDUCTOR_VISION_ROADMAP.md` is the WHY and true north
- `.konductor/KONDUCTOR_WORKFLOW.md` is the HOW framework
- `KONDUCTOR.md` is the short, repo-specific orchestration contract
- `AGENTS.md` stays only as a compatibility entry point for agent tooling
- `KONDUCTOR_HANDOFF.md` is the live shared working file for active agents

## Versioning

Konductor Framework now carries explicit release versioning.

- The framework's current version is stored in the root `VERSION` file.
- Human-readable release history lives in `CHANGELOG.md`.
- Every installed repository receives `.konductor/KONDUCTOR_VERSION.json`, which records the installed framework version, the source ref used for installation, and the install timestamp.

Roadmap and milestone tracking live in `.konductor/memory/KONDUCTOR_HISTORY.md` under `ROADMAP_MILESTONES` and the completed milestones table.

This is meant to answer three operational questions in adopted repos:

1. Which Konductor Framework version is installed here?
2. What changed since that version?
3. How should an AI agent upgrade the framework without clobbering repo-specific customizations?

## What it installs

- `KONDUCTOR.md`
- `AGENTS.md`
- `.konductor/memory/KONDUCTOR_VISION_ROADMAP.md`
- `.konductor/KONDUCTOR_HANDOFF.md`
- `.konductor/KONDUCTOR_WORKFLOW.md`
- `.konductor/memory/KONDUCTOR_MEMORY.md`
- `.konductor/memory/KONDUCTOR_HISTORY.md`
- `.konductor/KONDUCTOR_VERSION.json`
- `.konductor/memory/decisions/ADR_TEMPLATE.md`
- `.konductor/scripts/housekeeping.ts`
- `.konductor/scripts/upgrade.ts`
- `.konductor/scripts/package.json`

## Prerequisites

- Node `22.5.0+` for `node:sqlite`
- `npm`

## Start from a new repo

Run the npx installer from the root of your new repository:

```bash
npx the-konductor
```

Then paste this into your coding agent in IDE, Cursor, Antigravity, or a similar tool:

```text
You are working in a new repository that should adopt Konductor Framework.

First, inspect the repo root and determine the intended stack, entrypoints, and validation commands.
Then customize the installed framework files so they match this project:
- `KONDUCTOR.md`
- `AGENTS.md`
- `.konductor/memory/KONDUCTOR_VISION_ROADMAP.md`
- `.konductor/memory/KONDUCTOR_MEMORY.md`
- `.konductor/memory/KONDUCTOR_HISTORY.md`
- `.konductor/KONDUCTOR_VERSION.json`
- `.konductor/KONDUCTOR_WORKFLOW.md`
- `.konductor/scripts/housekeeping.ts`
- `.konductor/scripts/upgrade.ts`
- `.konductor/memory/decisions/`

Do not assume any default app structure. Create the smallest useful repo-specific setup, record the important constraints, make the first housekeeping loop runnable against the actual project checks, and preserve the installed framework version metadata.
```

## Add to an existing repo

Run the same installer from the root of the existing repository:

```bash
npx the-konductor
```

Existing files are preserved by default. To overwrite framework-managed files intentionally:

```bash
npx the-konductor --force
```

To install into a specific target directory:

```bash
npx the-konductor --target ./apps/my-app
```

Then paste this into your coding agent in IDE, Cursor, Antigravity, or a similar tool:

```text
You are working in an existing repository that should adopt Konductor Framework without losing its current structure.

First, inspect the repo and map the current applications, important directories, runtime boundaries, and validation commands.
Then integrate the framework files carefully:
- keep existing files unless I explicitly ask to replace them
- install or update `KONDUCTOR.md` and keep `AGENTS.md` only if compatibility is needed
- confirm `.konductor/memory/KONDUCTOR_VISION_ROADMAP.md` reflects the repo's stable WHY and product north star
- align `.konductor/memory/KONDUCTOR_MEMORY.md` with the repo's hard constraints
- start or continue `.konductor/memory/KONDUCTOR_HISTORY.md`
- preserve and update `.konductor/KONDUCTOR_VERSION.json`
- adapt `.konductor/KONDUCTOR_WORKFLOW.md` to the actual workflow
- customize `.konductor/scripts/housekeeping.ts` to use the repo's real checks
- customize `.konductor/scripts/upgrade.ts` if the repo wants a local upgrade helper
- add ADRs under `.konductor/memory/decisions/` when you discover or change important architectural rules

Do not rewrite the project structure unless it is necessary for the integration. Prefer additive changes, preserve the existing behavior, and only overwrite customized framework files when the human explicitly requests it or the upgrade requires a documented change.
```

## Upgrade workflow for AI agents

When an adopted repository wants to update Konductor Framework, the agent should:

1. Read `.konductor/KONDUCTOR_VERSION.json` to determine the currently installed framework version.
2. Review the target release in `CHANGELOG.md`.
3. Fetch the latest Version:

```bash
npx the-konductor --force
```

4. Merge the new framework templates into the adopted repository without wiping repo-specific customizations in:
   - `KONDUCTOR.md`
   - `AGENTS.md`
   - `.konductor/memory/KONDUCTOR_VISION_ROADMAP.md`
   - `.konductor/KONDUCTOR_HANDOFF.md`
   - `.konductor/memory/KONDUCTOR_MEMORY.md`
   - `.konductor/memory/KONDUCTOR_HISTORY.md`
   - `.konductor/KONDUCTOR_WORKFLOW.md`
   - `.konductor/scripts/housekeeping.ts`
5. Update `.konductor/KONDUCTOR_VERSION.json` to the new installed version and record the upgrade in `.konductor/memory/KONDUCTOR_HISTORY.md`.
6. Write an ADR if the upgrade changes workflow policy, architecture, or safety defaults rather than only template wording.

If you want a full template refresh, use `--force` intentionally and review the diff before accepting it.

## Local upgrade helper

Adopted repositories can inspect their current framework installation and upgrade via:

```bash
cd .konductor/scripts
npm install
npm run upgrade
```

The helper reads `.konductor/KONDUCTOR_VERSION.json`, compares it against the latest npm package version, and runs the upgrade command if necessary.

## CLI Features

You can check the version of the installed framework using the CLI:

```bash
konductor --version
# or
konductor status
# or, without installing locally
npx the-konductor --version
```

## First customization steps

Pull only the top-level agent instructions:

```bash
curl -fsSL https://raw.githubusercontent.com/AlphaBitsCode/konductor-framework/main/KONDUCTOR.md -o KONDUCTOR.md
curl -fsSL https://raw.githubusercontent.com/AlphaBitsCode/konductor-framework/main/AGENTS.md -o AGENTS.md
```

Pull only the workflow blueprint:

```bash
mkdir -p .konductor
curl -fsSL https://raw.githubusercontent.com/AlphaBitsCode/konductor-framework/main/.konductor/KONDUCTOR_WORKFLOW.md -o .konductor/KONDUCTOR_WORKFLOW.md
```

## First customization steps

1. Edit `KONDUCTOR.md` to reflect your repo layout, review expectations, and safety constraints.
2. Confirm `.konductor/memory/KONDUCTOR_VISION_ROADMAP.md` matches the repository's true north and product intent.
3. Create or update `KONDUCTOR_HANDOFF.md` as the live shared working file for active coordination between agents.
4. Edit `.konductor/memory/KONDUCTOR_MEMORY.md` to record hard stack constraints and anti-patterns.
5. Confirm `.konductor/KONDUCTOR_VERSION.json` reflects the framework version and ref you intended to install.
6. Edit `.konductor/scripts/housekeeping.ts` to replace the placeholder evaluation commands with your real checks.
7. Edit `.konductor/scripts/upgrade.ts` if you want a local helper for version comparisons and upgrade commands.
8. Start logging important meta-level decisions under `.konductor/memory/decisions/`.
9. Use `.konductor/memory/KONDUCTOR_HISTORY.md` for both roadmap milestones and completed history as the workflow evolves.

## Run the housekeeping loop

From the repo where the framework has been installed:

```bash
cd .konductor/scripts
npm install
npm start
```

The script writes its archive database to `.konductor/secondbrain.db` by default.

## References

- HyperAgents paper: `https://arxiv.org/abs/2603.19461`
- ADR guidance: `http://adr.github.io/`
