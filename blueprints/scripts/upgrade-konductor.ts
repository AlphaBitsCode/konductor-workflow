import * as fs from 'node:fs';
import * as path from 'node:path';
import { execSync } from 'node:child_process';

type InstalledManifest = {
  framework: string;
  installed_version: string;
  installed_ref: string;
  installed_from: string;
  installed_at: string;
  notes?: string[];
};

const ROOT_DIR = path.resolve(__dirname, '../../');
const MANIFEST_PATH = path.resolve(ROOT_DIR, '.konductor/KONDUCTOR_VERSION.json');

function getArg(name: string, fallback = ''): string {
  const index = process.argv.indexOf(name);
  if (index === -1) return fallback;
  const value = process.argv[index + 1];
  return value && !value.startsWith('--') ? value : fallback;
}

export function readManifest(): InstalledManifest {
  const raw = fs.readFileSync(MANIFEST_PATH, 'utf-8');
  return JSON.parse(raw) as InstalledManifest;
}

export async function fetchRemoteVersion(ref: string): Promise<string> {
  try {
    const output = execSync(`npm show konductor-workflow@${ref} version`, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] });
    return output.trim();
  } catch (err) {
    throw new Error(`Failed to fetch version from npm for ref: ${ref}`);
  }
}

export async function main() {
  const manifest = readManifest();
  const targetRef = getArg('--ref', 'latest');
  const targetVersion = await fetchRemoteVersion(targetRef);

  console.log(`Installed framework: ${manifest.framework}`);
  console.log(`Installed version: ${manifest.installed_version}`);
  console.log(`Installed ref: ${manifest.installed_ref}`);
  console.log(`Installed from: ${manifest.installed_from}`);
  console.log(`Installed at: ${manifest.installed_at}`);
  console.log();
  console.log(`Target ref: ${targetRef}`);
  console.log(`Target version: ${targetVersion}`);
  console.log();

  if (
    manifest.installed_version === targetVersion &&
    manifest.installed_ref === targetRef
  ) {
    console.log('Already on the requested framework version.');
    return;
  }

  console.log('Upgrade command:');
  console.log(
    `npx konductor-workflow@${targetRef} --ref ${targetRef} --force`,
  );
  console.log();
  console.log('Review these files after upgrade:');
  console.log('- KONDUCTOR.md');
  console.log('- AGENTS.md (compatibility shim only)');
  console.log('- .konductor/memory/KONDUCTOR_VISION_ROADMAP.md');
  console.log('- docs/CHECK_IN.md');
  console.log('- .konductor/memory/KONDUCTOR_MEMORY.md');
  console.log('- .konductor/memory/KONDUCTOR_ADR_HISTORY.md');
  console.log('- .konductor/KONDUCTOR_VERSION.json');
  console.log('- .konductor/KONDUCTOR_WORKFLOW.md');
  console.log('- .konductor/memory/KONDUCTOR_ADR_HISTORY.md');
}

/* v8 ignore start */
const isMainModule = typeof require !== 'undefined' && require.main === module;
const isMainTsx = typeof process.argv[1] === 'string' && process.argv[1].endsWith('upgrade-konductor.ts');

if (isMainModule || isMainTsx) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
/* v8 ignore stop */
