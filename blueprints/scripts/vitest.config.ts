import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'json'],
      reportsDirectory: './coverage',
      include: ['**/*.ts'],
      exclude: ['**/*.test.ts', 'vitest.config.ts']
    }
  }
});
