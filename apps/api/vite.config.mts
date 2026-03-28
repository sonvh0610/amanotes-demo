/// <reference types='vitest' />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    name: '@org/api',
    watch: false,
    globals: true,
    environment: 'node',
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
    },
  },
});
