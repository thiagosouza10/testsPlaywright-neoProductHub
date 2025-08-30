import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 1,
  workers: 8,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    headless: false,
  },

  projects: [
    // Frontend - todos os browsers
    {
      name: 'frontend-chromium',
      testDir: './tests/frontend',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:8080' },
    },
    {
      name: 'frontend-firefox',
      testDir: './tests/frontend',
      use: { ...devices['Desktop Firefox'], baseURL: 'http://localhost:8080' },
    },
    // API Backend
    {
      name: 'backend',
      testDir: './tests/backend',
      use: { baseURL: 'http://localhost:3001' },
    },
  ],
});