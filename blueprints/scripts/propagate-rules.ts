#!/usr/bin/env tsx
/**
 * propagate-rules.ts
 *
 * Propagates rule changes from the canonical konductor-workflow KONDUCTOR.md
 * to all adopting sibling repos.
 *
 * Strategy:
 *  - For repos where `priority="3"` matches the OLD framework text → replace it with the new text.
 *  - For repos where `priority="3"` is repo-specific (custom text) → inject the CI/coverage rule
 *    as a new rule appended after the last existing <rule> entry, renumbering if needed.
 *  - Updates `.konductor/KONDUCTOR_VERSION.json` installed_version in each repo.
 *
 * Usage:
 *   npx tsx blueprints/scripts/propagate-rules.ts [--dry-run] [--version <semver>]
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

// ─── Config ──────────────────────────────────────────────────────────────────

const SCRIPT_DIR = path.resolve(__dirname);
const FRAMEWORK_ROOT = path.resolve(SCRIPT_DIR, '../../');
const FLEET_ROOT = path.resolve(FRAMEWORK_ROOT, '../');

const NEW_VERSION = getArg('--version', fs.readFileSync(path.join(FRAMEWORK_ROOT, 'VERSION'), 'utf-8').trim());
const DRY_RUN = process.argv.includes('--dry-run');

/**
 * Rules to propagate. Each entry defines:
 *  - priority: the <rule priority="N"> to target
 *  - oldText:  the framework-generic text that SHOULD be replaced (exact match, trimmed)
 *  - newText:  the new canonical text to write
 *  - injectIfMissing: if true, append rule when no matching-old-text rule is found
 *  - injectPriority: priority number to assign when injecting (uses next available slot)
 */
const RULE_PROPAGATIONS: RulePropagation[] = [
  {
    priority: 3,
    oldText: 'Maintain >90% coverage standards across unit tests and end-to-end or integration suites, including mobile e2e where relevant; display coverage calculations clearly on test edits.',
    newText: 'Keep CI fast and lean: prefer caching, incremental builds, and parallelism; avoid redundant install or build steps. Maintain >90% coverage across unit, integration, and end-to-end suites (including mobile e2e where relevant); display coverage calculations clearly on test edits.',
    injectIfMissing: true,
    injectLabel: 'ci_coverage',
  },
  {
    // New rule — always injected (no old framework text to replace)
    priority: 11,
    oldText: '',
    newText: 'In all GitHub Actions workflow files, set `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true` in the top-level `env:` block to suppress Node.js version deprecation warnings from third-party actions.',
    injectIfMissing: true,
    injectLabel: 'gha_node24',
  },
];

// ─── Types ───────────────────────────────────────────────────────────────────

type RulePropagation = {
  priority: number;
  oldText: string;
  newText: string;
  injectIfMissing: boolean;
  injectLabel: string;
};

type RepoResult = {
  repo: string;
  path: string;
  action: 'replaced' | 'injected' | 'already-current' | 'no-konductor-md' | 'skipped-self';
  detail: string;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getArg(name: string, fallback = ''): string {
  const index = process.argv.indexOf(name);
  if (index === -1) return fallback;
  const value = process.argv[index + 1];
  return value && !value.startsWith('--') ? value : fallback;
}

function discoverRepos(): string[] {
  return fs.readdirSync(FLEET_ROOT, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => path.join(FLEET_ROOT, d.name))
    .filter(repoPath => {
      const versionFile = path.join(repoPath, '.konductor', 'KONDUCTOR_VERSION.json');
      if (!fs.existsSync(versionFile)) return false;
      // Also check nested (e.g. MAUA/maua-pay)
      return true;
    });
}

function discoverNestedRepos(): string[] {
  const results: string[] = [];
  for (const top of fs.readdirSync(FLEET_ROOT, { withFileTypes: true })) {
    if (!top.isDirectory()) continue;
    const topPath = path.join(FLEET_ROOT, top.name);
    // Check for nested repos (MAUA/*)
    try {
      for (const nested of fs.readdirSync(topPath, { withFileTypes: true })) {
        if (!nested.isDirectory()) continue;
        const nestedPath = path.join(topPath, nested.name);
        const versionFile = path.join(nestedPath, '.konductor', 'KONDUCTOR_VERSION.json');
        if (fs.existsSync(versionFile)) results.push(nestedPath);
      }
    } catch { /* not readable */ }
  }
  return results;
}

function getAllAdoptingRepos(): string[] {
  const direct = discoverRepos();
  const nested = discoverNestedRepos();
  const all = [...new Set([...direct, ...nested])];
  // Exclude the framework repo itself
  return all.filter(r => path.resolve(r) !== path.resolve(FRAMEWORK_ROOT));
}

function propagateRule(konductorMd: string, rule: RulePropagation): { content: string; action: RepoResult['action']; detail: string } {
  // Check if new text is already present
  if (konductorMd.includes(rule.newText)) {
    return { content: konductorMd, action: 'already-current', detail: `Rule ${rule.priority} already has the new text.` };
  }

  // Try to replace by matching old text at the target priority
  const oldRulePattern = new RegExp(
    `(<rule priority="${rule.priority}">)${escapeRegex(rule.oldText)}(</rule>)`,
    's'
  );

  if (oldRulePattern.test(konductorMd)) {
    const updated = konductorMd.replace(oldRulePattern, `$1${rule.newText}$2`);
    return { content: updated, action: 'replaced', detail: `Replaced rule priority="${rule.priority}" with new CI/coverage text.` };
  }

  // Old text not found at priority 3 — repo has custom rule 3. Inject as new rule after last </rule>.
  if (rule.injectIfMissing) {
    const lastRuleMatch = konductorMd.match(/.*<rule priority="(\d+)">[^<]+<\/rule>/gs);
    if (!lastRuleMatch) {
      return { content: konductorMd, action: 'skipped-self', detail: 'No <rule> blocks found — skipping injection.' };
    }
    // Find the highest existing priority number
    const priorities = [...konductorMd.matchAll(/<rule priority="(\d+)">/g)].map(m => parseInt(m[1], 10));
    const nextPriority = Math.max(...priorities) + 1;
    const newRuleTag = `    <rule priority="${nextPriority}">${rule.newText}</rule>`;
    // Insert before </rules>
    const updated = konductorMd.replace('  </rules>', `${newRuleTag}\n  </rules>`);
    return {
      content: updated,
      action: 'injected',
      detail: `Injected CI/coverage rule as priority="${nextPriority}" (repo has custom rule 3).`,
    };
  }

  return { content: konductorMd, action: 'skipped-self', detail: 'No match and injectIfMissing=false.' };
}

function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function updateVersionFile(versionFilePath: string, newVersion: string): void {
  const raw = fs.readFileSync(versionFilePath, 'utf-8');
  const manifest = JSON.parse(raw);
  manifest.installed_version = newVersion;
  manifest.installed_at = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
  if (!Array.isArray(manifest.notes)) manifest.notes = [];
  const note = `Rule 3 updated to CI/coverage mandate in ${newVersion} propagation (${new Date().toISOString().split('T')[0]}).`;
  if (!manifest.notes.includes(note)) manifest.notes.push(note);
  if (!DRY_RUN) fs.writeFileSync(versionFilePath, JSON.stringify(manifest, null, 2) + '\n');
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main() {
  const repos = getAllAdoptingRepos();

  console.log(`Konductor Rule Propagation`);
  console.log(`New version: ${NEW_VERSION}`);
  console.log(`Dry run: ${DRY_RUN}`);
  console.log(`Repos discovered: ${repos.length}`);
  console.log('');

  const results: RepoResult[] = [];

  for (const repoPath of repos) {
    const repoName = path.relative(FLEET_ROOT, repoPath);
    const konductorMdPath = path.join(repoPath, 'KONDUCTOR.md');
    const versionFilePath = path.join(repoPath, '.konductor', 'KONDUCTOR_VERSION.json');

    if (!fs.existsSync(konductorMdPath)) {
      results.push({ repo: repoName, path: repoPath, action: 'no-konductor-md', detail: 'No KONDUCTOR.md found.' });
      continue;
    }

    let content = fs.readFileSync(konductorMdPath, 'utf-8');
    let finalAction: RepoResult['action'] = 'already-current';
    const details: string[] = [];

    for (const rule of RULE_PROPAGATIONS) {
      const { content: updated, action, detail } = propagateRule(content, rule);
      content = updated;
      if (action !== 'already-current') finalAction = action;
      details.push(detail);
    }

    if (!DRY_RUN && finalAction !== 'already-current' && finalAction !== 'no-konductor-md') {
      fs.writeFileSync(konductorMdPath, content);
      updateVersionFile(versionFilePath, NEW_VERSION);
    }

    results.push({ repo: repoName, path: repoPath, action: finalAction, detail: details.join(' ') });
  }

  // Summary
  const icon: Record<RepoResult['action'], string> = {
    'replaced': '✅',
    'injected': '✅',
    'already-current': '⏭️ ',
    'no-konductor-md': '⚠️ ',
    'skipped-self': '⏭️ ',
  };

  console.log('Results:');
  for (const r of results) {
    console.log(`  ${icon[r.action]} ${r.repo.padEnd(30)} ${r.action.padEnd(16)} ${r.detail}`);
  }

  const updated = results.filter(r => r.action === 'replaced' || r.action === 'injected').length;
  console.log('');
  console.log(`${updated} repo(s) updated → version bumped to ${NEW_VERSION}`);
  if (DRY_RUN) console.log('(dry run — no files written)');
}

main();
