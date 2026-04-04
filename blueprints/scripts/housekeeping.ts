import { DatabaseSync } from 'node:sqlite';
import { spawnSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

type EvaluationResult = {
  name: string;
  ok: boolean;
  weight: number;
  stdout: string;
  stderr: string;
  exitCode: number | null;
};

type FitnessResult = {
  score: number;
  maxScore: number;
  checks: EvaluationResult[];
};

type EvaluationCommand = {
  name: string;
  cwd: string;
  command: string;
  args: string[];
  weight: number;
};

const ROOT_DIR = path.resolve(__dirname, '../../');
const KONDUCTOR_DIR = path.resolve(ROOT_DIR, '.konductor');
const DB_PATH = path.resolve(KONDUCTOR_DIR, 'secondbrain.db');

const INITIAL_PROMPT = `You are a hyperagent that combines task-solving and meta-optimization.
Your job is to help keep the current repository healthy, measurable, and improvable.

Core expectations:
1. Inspect repository health through explicit evaluation commands.
2. Identify both code-level issues and weaknesses in the maintenance workflow itself.
3. Prefer small, auditable improvements over opaque large rewrites.
4. Log durable architectural or workflow decisions in the repository's decision records.

This starter loop is intentionally generic. Customize its prompts, evaluation commands, and safety limits for the adopting repository.`;

const EVALUATION_COMMANDS: EvaluationCommand[] = [
  {
    name: 'node-version',
    cwd: ROOT_DIR,
    command: 'node',
    args: ['--version'],
    weight: 10,
  },
  {
    name: 'npm-version',
    cwd: ROOT_DIR,
    command: 'npm',
    args: ['--version'],
    weight: 10,
  },
  {
    name: 'git-status',
    cwd: ROOT_DIR,
    command: 'git',
    args: ['status', '--short'],
    weight: 5,
  },
];

export class Archive {
  db: DatabaseSync;

  constructor() {
    this.db = new DatabaseSync(DB_PATH);
    this.initDb();
  }

  initDb() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS agents_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        score INTEGER NOT NULL,
        max_score INTEGER NOT NULL,
        timestamp TEXT NOT NULL,
        metadata TEXT NOT NULL,
        prompt TEXT NOT NULL,
        agent_code TEXT NOT NULL
      )
    `);
  }

  getBestAgent() {
    const stmt = this.db.prepare(`
      SELECT * FROM agents_history
      ORDER BY score DESC, id DESC
      LIMIT 1
    `);
    return stmt.get();
  }

  saveVariant(agentCode: string, result: FitnessResult, metadata: Record<string, unknown>) {
    const stmt = this.db.prepare(`
      INSERT INTO agents_history (score, max_score, timestamp, metadata, prompt, agent_code)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const timestamp = new Date().toISOString();
    stmt.run(
      result.score,
      result.maxScore,
      timestamp,
      JSON.stringify(metadata),
      INITIAL_PROMPT,
      agentCode,
    );

    return {
      score: result.score,
      maxScore: result.maxScore,
      timestamp,
      metadata,
    };
  }
}

export function runCheck(check: EvaluationCommand): EvaluationResult {
  const result = spawnSync(check.command, check.args, {
    cwd: check.cwd,
    encoding: 'utf-8',
  });

  return {
    name: check.name,
    ok: result.status === 0,
    weight: check.weight,
    stdout: result.stdout || '',
    stderr: result.stderr || '',
    exitCode: result.status,
  };
}

export function evaluateFitness(): FitnessResult {
  const checks = EVALUATION_COMMANDS.map(runCheck);
  const maxScore = EVALUATION_COMMANDS.reduce((sum, check) => sum + check.weight, 0);
  const score = checks.reduce((sum, check) => sum + (check.ok ? check.weight : 0), 0);

  return { score, maxScore, checks };
}

export function readCurrentAgentCode(): string {
  const agentFile = typeof __filename !== 'undefined' ? __filename : /* v8 ignore next */ process.argv[1];
  return fs.readFileSync(agentFile, 'utf-8');
}

export function runDgmHLoop(iterations = 3) {
  fs.mkdirSync(KONDUCTOR_DIR, { recursive: true });
  const archive = new Archive();

  for (let i = 0; i < iterations; i += 1) {
    console.log(`\n--- Iteration ${i + 1}/${iterations} ---`);

    const bestAgent = archive.getBestAgent();
    if (bestAgent) {
      console.log(`[ARCHIVE] Current best score: ${bestAgent.score}/${bestAgent.max_score}`);
    } else {
      console.log('[ARCHIVE] No archived variants yet.');
    }

    const current = evaluateFitness();
    console.log(`[EVAL] Current fitness score: ${current.score}/${current.maxScore}`);

    for (const check of current.checks) {
      const status = check.ok ? 'PASS' : 'FAIL';
      console.log(`[CHECK] ${status} ${check.name} (${check.weight} pts)`);
    }

    console.log('[META] Placeholder self-modification step. Customize this section for your repository.');

    const modifiedAgentCode = readCurrentAgentCode();
    const reevaluated = evaluateFitness();

    archive.saveVariant(modifiedAgentCode, reevaluated, {
      iteration: i,
      checks: reevaluated.checks.map((check) => ({
        name: check.name,
        ok: check.ok,
        weight: check.weight,
        exitCode: check.exitCode,
      })),
    });

    console.log(`[ARCHIVE] Saved variant with score ${reevaluated.score}/${reevaluated.maxScore}`);
  }
}

/* v8 ignore start */
const isMainModule = typeof require !== 'undefined' && require.main === module;
const isMainTsx = typeof process.argv[1] === 'string' && process.argv[1].endsWith('housekeeping.ts');

if (isMainModule || isMainTsx) {
  runDgmHLoop();
}
/* v8 ignore stop */
