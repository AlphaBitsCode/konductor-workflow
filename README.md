# Konductor Framework

Konductor Framework is a reusable starter for running a Darwin Godel Machine with Hyperagents style workflow inside any software repository. It provides a top-level `AGENTS.md`, blueprint templates for memory and decision logging, and a TypeScript housekeeping loop that teams can adapt to their own evaluation commands and constraints.

This repo is a framework, not a complete autonomous maintainer. The installed files are intended to be customized to your stack, your safety boundaries, and your test/build signals.

## What it installs

- `AGENTS.md`
- `blueprints/HYPERAGENT_WORKFLOW.md`
- `blueprints/AGENT_MEMORY.md`
- `blueprints/AGENT_HISTORY.md`
- `blueprints/decisions/ADR_TEMPLATE.md`
- `blueprints/scripts/housekeeping.ts`
- `blueprints/scripts/package.json`

## Prerequisites

- Node `22.5.0+` for `node:sqlite`
- `npm`

## Start from a new repo

Run the bootstrap installer from the root of your new repository:

```bash
curl -fsSL https://raw.githubusercontent.com/AlphaBitsCode/konductor-framework/main/scripts/bootstrap.sh | bash
```

## Add to an existing repo

Run the same installer from the root of the existing repository:

```bash
curl -fsSL https://raw.githubusercontent.com/AlphaBitsCode/konductor-framework/main/scripts/bootstrap.sh | bash
```

Existing files are preserved by default. To overwrite framework-managed files intentionally:

```bash
curl -fsSL https://raw.githubusercontent.com/AlphaBitsCode/konductor-framework/main/scripts/bootstrap.sh | bash -s -- --force
```

## Manual curl examples

Pull only the top-level agent instructions:

```bash
curl -fsSL https://raw.githubusercontent.com/AlphaBitsCode/konductor-framework/main/AGENTS.md -o AGENTS.md
```

Pull only the workflow blueprint:

```bash
mkdir -p blueprints
curl -fsSL https://raw.githubusercontent.com/AlphaBitsCode/konductor-framework/main/blueprints/HYPERAGENT_WORKFLOW.md -o blueprints/HYPERAGENT_WORKFLOW.md
```

## First customization steps

1. Edit `AGENTS.md` to reflect your repo layout, review expectations, and safety constraints.
2. Edit `blueprints/AGENT_MEMORY.md` to record hard stack constraints and anti-patterns.
3. Edit `blueprints/scripts/housekeeping.ts` to replace the placeholder evaluation commands with your real checks.
4. Start logging important meta-level decisions under `blueprints/decisions/`.
5. Append meaningful entries to `blueprints/AGENT_HISTORY.md` as the workflow evolves.

## Run the housekeeping loop

From the repo where the framework has been installed:

```bash
cd blueprints/scripts
npm install
npm start
```

The script writes its archive database to `blueprints/agents.db` by default.

## References

- HyperAgents paper: `https://arxiv.org/abs/2603.19461`
- ADR guidance: `http://adr.github.io/`
