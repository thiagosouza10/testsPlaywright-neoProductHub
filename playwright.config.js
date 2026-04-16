import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config({ path: 'playwright.env', quiet: true });

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
    headless: true,
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'frontend',
      testDir: './tests/frontend',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:8080' },
    },
    {
      name: 'backend',
      testDir: './tests/backend',
      use: { baseURL: 'http://localhost:3001' },
    },
  ],
});
