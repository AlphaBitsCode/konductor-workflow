import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as readFile from './read-file';
import * as fs from 'node:fs';
import * as child_process from 'node:child_process';

vi.mock('node:fs', async () => {
  const actual = await vi.importActual('node:fs') as any;
  const overrides = {
    existsSync: vi.fn(),
    mkdirSync: vi.fn(),
    readFileSync: vi.fn(),
  };
  return {
    ...actual,
    ...overrides,
    default: { ...actual, ...overrides },
  };
});

vi.mock('node:child_process', () => ({
  execSync: vi.fn()
}));

describe('read-file.ts coverage', () => {
  const originalArgv = process.argv;
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.argv = [...originalArgv];
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.argv = originalArgv;
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it('callGroqAPI should return content on success', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ choices: [{ message: { content: 'mock summary' } }] })
    } as any);

    const result = await readFile.callGroqAPI('some content', 'fake-key');
    expect(result).toBe('mock summary');
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    fetchSpy.mockRestore();
  });

  it('callGroqAPI should throw if all models fail', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 500
    } as any);

    await expect(readFile.callGroqAPI('some content', 'fake-key')).rejects.toThrow('All Groq models failed.');
    expect(fetchSpy).toHaveBeenCalledTimes(2); // Retries next model
    fetchSpy.mockRestore();
  });

  it('main should exit if no file path provided', async () => {
    process.argv = ['node', 'read-file.ts']; // No file provided
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => { throw new Error('exit'); }) as any);
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(readFile.main()).rejects.toThrow('exit');
    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Usage'));
  });

  it('main should exit if no API key provided', async () => {
    process.argv = ['node', 'read-file.ts', 'test.md'];
    delete process.env.GROQ_API_KEY;
    delete process.env.AI_LLM_API_KEY;
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => { throw new Error('exit'); }) as any);
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(readFile.main()).rejects.toThrow('exit');
    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Missing GROQ_API_KEY'));
  });

  it('main should parse file and call API when inputs are correct', async () => {
    process.argv = ['node', 'read-file.ts', 'test.md'];
    process.env.GROQ_API_KEY = 'test-key';

    vi.mocked(fs.existsSync).mockReturnValue(false);
    vi.mocked(fs.mkdirSync).mockReturnValue(undefined);
    vi.mocked(child_process.execSync).mockImplementation(() => Buffer.from(''));
    vi.mocked(fs.readFileSync).mockReturnValue('mock parsed content');
    
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ choices: [{ message: { content: 'mock summary' } }] })
    } as any);
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    await readFile.main();

    expect(child_process.execSync).toHaveBeenCalled();
    expect(fs.readFileSync).toHaveBeenCalled();
    expect(fetchSpy).toHaveBeenCalled();
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('mock summary'));

    fetchSpy.mockRestore();
  });

  it('main should catch JSON parsing / callGroqAPI error and exit', async () => {
    process.argv = ['node', 'read-file.ts', 'test.md'];
    process.env.GROQ_API_KEY = 'test-key';
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(child_process.execSync).mockImplementation(() => Buffer.from(''));
    vi.mocked(fs.readFileSync).mockReturnValue('mock parsed content');
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 500
    } as any);
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => { throw new Error('exit'); }) as any);
    await expect(readFile.main()).rejects.toThrow('exit');
    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  it('main should catch execSync error and exit', async () => {
    process.argv = ['node', 'read-file.ts', 'test.md'];
    process.env.GROQ_API_KEY = 'test-key';
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(child_process.execSync).mockImplementation(() => { throw new Error('exec fail'); });
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => { throw new Error('exit'); }) as any);
    await expect(readFile.main()).rejects.toThrow('exit');
    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  it('main should exit if parsed file is empty', async () => {
    process.argv = ['node', 'read-file.ts', 'test.md'];
    process.env.GROQ_API_KEY = 'test-key';
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(child_process.execSync).mockImplementation(() => Buffer.from(''));
    vi.mocked(fs.readFileSync).mockReturnValue('   \n  '); // empty after trim

    const exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => { throw new Error('exit'); }) as any);
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(readFile.main()).rejects.toThrow('exit');
    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Parsed file is empty'));
  });

  it('callGroqAPI should fallback to the next model if first fails', async () => {
    let callCount = 0;
    const fetchSpy = vi.spyOn(global, 'fetch').mockImplementation(async () => {
      callCount++;
      if (callCount === 1) {
        return { ok: false, status: 500 } as any;
      }
      return { ok: true, json: async () => ({ choices: [{ message: { content: 'second attempt worked' } }] }) } as any;
    });

    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    const result = await readFile.callGroqAPI('test', 'key');
    expect(result).toBe('second attempt worked');
    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Falling back to the next model'));
    fetchSpy.mockRestore();
  });
});

