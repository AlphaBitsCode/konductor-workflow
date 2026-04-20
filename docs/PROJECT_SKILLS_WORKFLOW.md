# Project Skills & Workflows

> **Note to Adopters:** This file contains custom project-specific workflows, shorthand slash commands, and repeatable AI skills. AI agents read this document to learn how to safely deploy your app, manage routine tasks, and respond to your custom commands. Edit the examples below to fit your repository's stack and tooling.

---

## Custom Skills

### ❖ Sync Version Tags

**Trigger phrases:** "Sync version tags", "Fix version mismatch"

**Steps for AI Agent:**

1. Run `node scripts/sync-version.js` — rewrites `<framework_version>` in `KONDUCTOR.md`, `blueprints/KONDUCTOR.md`, and `<konductor_workflow version="...">` in `blueprints/KONDUCTOR_WORKFLOW.md` to match `package.json`.
2. Run `node scripts/verify-release.js` to confirm all tags and the CLI `--version` output agree.
3. Stage the changed files: `git add -f KONDUCTOR.md blueprints/KONDUCTOR.md blueprints/KONDUCTOR_WORKFLOW.md`.
4. Report which files changed and the resolved version.

### ❖ Install Framework Locally for Smoke Test

**Trigger phrases:** "Test the installer", "Smoke test install"

**Steps for AI Agent:**

1. Create a temp directory: `mktemp -d`.
2. Run `node blueprints/scripts/meet-konductor.sh` (or `npx konductor-workflow@latest`) in that directory.
3. Verify `.konductor/`, `docs/CHECK_IN.md`, and `.agents/skills/konductor-workflow/SKILL.md` were written.
4. Report any missing files or install errors.

---

## Custom Workflows

### 🚀 Release — Patch / Minor / Major

**Trigger phrases:** "Release a patch", "Cut a release", "/k-release"

**Execution strictness:** HIGH — do not skip verification steps.

**Steps for AI Agent:**

1. **Pre-check:** Confirm working tree is clean (`git status`). Stop and report if there are uncommitted changes.
2. **CHANGELOG:** Confirm `CHANGELOG.md` has an entry for the new version. If not, draft one from recent commits and ask for approval before continuing.
3. **Bump version:**
   - Patch: `npm run release:patch` (calls `npm version patch`, then `verify:release`).
   - Minor: `npm version minor && npm run verify:release`.
   - Major: `npm version major && npm run verify:release`. Confirm with user before running.
4. **Version sync (automatic via npm `version` hook):** `scripts/sync-version.js` updates `<framework_version>` in `KONDUCTOR.md`, `blueprints/KONDUCTOR.md`, and `blueprints/KONDUCTOR_WORKFLOW.md`. Files are auto-staged.
5. **Verify tags:** `node scripts/verify-release.js` — checks all version tags match, CLI `--version` matches, and `npm pack --dry-run` includes all required files.
6. **Push git tag:** `git push origin main --follow-tags`.
7. **Publish:** `npm run publish-from-npm` (runs `prepublishOnly` → `verify:release` → `npm publish`).
8. **Confirm:** Run `npm view konductor-workflow@latest version` to verify npm reflects the new version.

**Files touched by this workflow:**

| File | Change |
|---|---|
| `package.json` | Version bumped by `npm version` |
| `KONDUCTOR.md` | `<framework_version>` synced by `scripts/sync-version.js` |
| `blueprints/KONDUCTOR.md` | `<framework_version>` synced |
| `blueprints/KONDUCTOR_WORKFLOW.md` | `<konductor_workflow version="...">` synced |

### 🚀 Update Framework in an Adopting Repo

**Trigger phrases:** "Update Konductor", "/k-update"

**Execution strictness:** MEDIUM

**Steps for AI Agent:**

1. Run `npx konductor-workflow@latest` from the adopting repo root.
2. Confirm `.agents/skills/konductor-workflow/SKILL.md` was written.
3. Confirm `KONDUCTOR.md`, `.konductor/KONDUCTOR_WORKFLOW.md`, and `docs/KONDUCTOR_GUIDE.md` were overwritten with the latest framework versions.
4. Check that repo-specific files (`docs/CHECK_IN.md`, `docs/PROJECT_SKILLS_WORKFLOW.md`, memory files) were preserved.
5. Report changed files and new framework version.

---

## Custom Slash Commands

- **`/k-init`**: Read `@KONDUCTOR.md`, review the current project docs and core workflow files, then summarize the repository state, active goals, and major tech debt in a concise Konductor-style check-in.
- **`/k-update`**: Run `npx konductor-workflow@latest` to refresh or reinstall the Konductor framework and install the universal skill into `.agents/skills/konductor-workflow/`.
- **`/k-history`**: Summarize `.konductor/memory/KONDUCTOR_MEMORY.md`, `.konductor/memory/KONDUCTOR_ADR_HISTORY.md`, `.konductor/memory/KONDUCTOR_VISION_ROADMAP.md`, and `docs/CHECK_IN.md` for durable memory, history, ADRs, roadmap, and live WIP.
- **`/k-compact`**: Read `@KONDUCTOR.md` and `docs/CHECK_IN.md`, classify check-in items, prune completed items from the live file first, archive durable facts when needed, trim stale notes, and return the smallest useful active-state summary.
- **`/k-checkin`**: Read `@KONDUCTOR.md` and `docs/CHECK_IN.md`, classify live items, prune completed entries before rewriting the live file, move durable facts into memory when needed, and return a compact check-in summary with the current status, active goals, blockers, and handoff point.
- **`/k-release`**: Follow the Release workflow above. Confirm CHANGELOG, bump version via `npm run release:patch` (or minor/major as specified), verify all tags, push tags, publish to npm.
- **`/k-sync-version`**: Run `node scripts/sync-version.js` then `node scripts/verify-release.js` to force-align all version tags with `package.json` without bumping.
