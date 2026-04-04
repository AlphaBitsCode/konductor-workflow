import { describe, it, expect, vi } from 'vitest';
import * as housekeeping from './housekeeping';
import * as upgrade from './upgrade-konductor';
import * as fs from 'fs';
import * as path from 'path';

describe('Konductor Scripts', () => {
  it('should load upgrade script successfully', () => {
    expect(upgrade).toBeDefined();
  });

  describe('housekeeping.ts coverage', () => {
    it('should initialize Archive and save/get variant', () => {
      // Clean up previous test DB if any
      const dbPath = path.resolve(__dirname, '../../.konductor/secondbrain.db');
      if (fs.existsSync(dbPath)) {
        try { fs.unlinkSync(dbPath); } catch (e) {}
      }
      fs.mkdirSync(path.dirname(dbPath), { recursive: true });

      const archive = new housekeeping.Archive();
      
      const result = archive.saveVariant('console.log("test");', { score: 10, maxScore: 10, checks: [] }, { version: 1 });
      expect(result.score).toBe(10);
      expect(result.maxScore).toBe(10);
      
      const best = archive.getBestAgent();
      expect(best).toBeDefined();
      expect(best!.score).toBe(10);
      expect(best!.agent_code).toBe('console.log("test");');
      
      // Run the loop with the best agent available
      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      housekeeping.runDgmHLoop(1);
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ARCHIVE] Current best score: 10/10'));
      logSpy.mockRestore();
    });

    it('should run a check successfully', () => {
      const result = housekeeping.runCheck({
        name: 'test-node',
        command: 'node',
        args: ['--version'],
        cwd: __dirname,
        weight: 5
      });
      expect(result.name).toBe('test-node');
      expect(result.exitCode).toBe(0);
      expect(result.ok).toBe(true);
      expect(result.weight).toBe(5);
    });

    it('should evaluate fitness based on configured commands and handle falsy stdout', () => {
      const fitness = housekeeping.evaluateFitness();
      expect(fitness.checks.length).toBeGreaterThan(0);
      expect(fitness.maxScore).toBeGreaterThan(0);
      expect(typeof fitness.score).toBe('number');
      
      const checkResult = housekeeping.runCheck({
        name: 'test-fail-stdout',
        command: 'node',
        args: ['-e', 'process.exit(1)'], // produces no stdout
        cwd: __dirname,
        weight: 5
      });
      expect(checkResult.stdout).toBe('');
      expect(checkResult.ok).toBe(false);
      
      // We process checks using `.reduce` manually to trigger false branches
      // The overall checks hit different lines
      const checks = [checkResult];
      const maxScore = checks.reduce((sum, c) => sum + c.weight, 0);
      const score = checks.reduce((sum, c) => sum + (c.ok ? c.weight : 0), 0);
      expect(score).toBe(0);
      expect(maxScore).toBe(5);
    });

    it('should read current agent code', () => {
      const code = housekeeping.readCurrentAgentCode();
      expect(code).toBeTypeOf('string');
      expect(code.length).toBeGreaterThan(0);
    });

    it('should run the DGM loop', () => {
      // Clean up DB before loop to cover the empty branch
      const dbPath = path.resolve(__dirname, '../../.konductor/secondbrain.db');
      if (fs.existsSync(dbPath)) {
        try { fs.unlinkSync(dbPath); } catch (e) {}
      }

      // Mock console logging to avoid noise and test iteration
      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      housekeeping.runDgmHLoop(1);
      
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('--- Iteration 1/1 ---'));
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ARCHIVE] No archived variants yet.'));
      logSpy.mockRestore();
    });
  });
});
