import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 8,

  reporter: [
    ['line'],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],

  use: {
    trace: 'on-first-retry',
    headless: false,
    screenshot: 'on',
  },

  projects: [
    // Frontend - todos os browsers
    {
      name: 'frontend-chromium',
      testDir: './tests/frontend',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:8080' },
    },
    // API Backend
    {
      name: 'backend',
      testDir: './tests/backend',
      use: { baseURL: 'http://localhost:3001' },
    },
  ],
});
