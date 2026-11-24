import { defineConfig, devices } from '@playwright/test';

// One run id per invocation, shared by both projects and all workers,
// so baseline and upgraded render the same timestamped data.
process.env.PARITY_RUN_ID ||= String(Date.now());

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 15_000 },
  fullyParallel: true,
  workers: 4,
  retries: 1,
  reporter: [['list'], ['json', { outputFile: 'test-results/results.json' }]],
  use: {
    ...devices['Desktop Chrome'],
    viewport: { width: 1366, height: 900 },
    locale: 'en-US',
    timezoneId: 'UTC',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'baseline', use: { baseURL: process.env.BASELINE_URL || 'http://localhost:4000' } },
    { name: 'upgraded', use: { baseURL: process.env.UPGRADED_URL || 'http://localhost:4200' } },
  ],
});
