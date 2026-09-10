import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

const currentEnv: string = 'QA';

// Look for system environment variable 'TEST_ENV', if found will take its value, if not found will take whatever it's after "||"
export const env: string = process.env.TEST_ENV || currentEnv;

// Load the environment file
dotenv.config({
  path: path.resolve(__dirname, `${env}.env`)
});

console.log(`Running tests against: ${env}`);
console.log(`URL: ${process.env.URL}`);

export default defineConfig({
  timeout: 120_000,

  expect: {
    timeout: 5_000
  },

  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : 2,

  reporter: [
    ['html', { open: 'always' }]
  ],

  use: {
    baseURL: process.env.URL,

    trace: 'on',

    viewport: {
      width: 1980,
      height: 1080
    },

    launchOptions: {
      slowMo: 1
    },

    headless: true
  }
});