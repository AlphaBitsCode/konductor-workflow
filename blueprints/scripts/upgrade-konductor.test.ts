import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as upgrade from './upgrade-konductor';
import * as fs from 'node:fs';
import * as child_process from 'node:child_process';

vi.mock('node:fs', async () => {
  const actual = await vi.importActual('node:fs') as any;
  const overrides = {
    readFileSync: vi.fn(),
  };
  return {
    ...actual,
    ...overrides,
    default: { ...actual, ...overrides }
  };
});

vi.mock('node:child_process', () => ({
  execSync: vi.fn()
}));

describe('upgrade-konductor coverage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetchRemoteVersion should return trimmed output', async () => {
    vi.mocked(child_process.execSync).mockReturnValue(' 1.0.0 \n');
    const ver = await upgrade.fetchRemoteVersion('latest');
    expect(ver).toBe('1.0.0');
  });

  it('fetchRemoteVersion should throw on failure', async () => {
    vi.mocked(child_process.execSync).mockImplementation(() => { throw new Error('fail'); });
    await expect(upgrade.fetchRemoteVersion('latest')).rejects.toThrow('Failed to fetch version from npm for ref: latest');
  });

  it('main should log Already on requested framework version if up to date', async () => {
    const mockManifest = {
      framework: 'konductor',
      installed_version: '1.0.0',
      installed_ref: 'latest',
      installed_from: 'npm',
      installed_at: 'now'
    };
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockManifest));
    vi.mocked(child_process.execSync).mockReturnValue('1.0.0');
    
    // Default argv has '--ref', 'latest' or doesn't have it, fallback is 'latest'
    const originalArgv = process.argv;
    process.argv = ['node', 'upgrade.ts', '--ref']; // covers fallback
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    await upgrade.main();

    expect(consoleLogSpy).toHaveBeenCalledWith('Already on the requested framework version.');
    process.argv = originalArgv;
  });

  it('main should log Upgrade command and files to review if not up to date', async () => {
    const mockManifest = {
      framework: 'konductor',
      installed_version: '1.0.0',
      installed_ref: 'latest',
      installed_from: 'npm',
      installed_at: 'now'
    };
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockManifest));
    vi.mocked(child_process.execSync).mockReturnValue('2.0.0');
    
    const originalArgv = process.argv;
    process.argv = ['node', 'upgrade.ts', '--ref', 'next'];
    
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    await upgrade.main();

    expect(consoleLogSpy).toHaveBeenCalledWith('Upgrade command:');
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('npx konductor-workflow@next'));
    
    process.argv = originalArgv;
  });
});
