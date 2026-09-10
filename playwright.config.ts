import { defineConfig } from '@playwright/test';
import { ProjectTestConfig } from './config/models/projectTestConfig';
import * as fs from 'fs';
import * as path from 'path';

export const env = process.env.TEST_ENV || 'DEV';

// Build path to the correct config file
export const configPath = path.resolve(__dirname, `./config/environment/${env}.json`);

// Parse JSON config when an environment-specific file is available.
export const configFile = fs.existsSync(configPath)
  ? JSON.parse(fs.readFileSync(configPath, 'utf-8'))
  : {};

/**
 * Read environment variables from file.
 * motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export const config: ProjectTestConfig = {
  timeout: 120_000, // 60 seconds = 1 minute
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in await expect(locator).toHaveText();
     */
    timeout: 5_000
  },
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'always' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    //Variables from root
    baseURL: configFile.baseURL,
    erickVar: configFile.erickVar,
    erickVarString: configFile.erickVarString,  
    erickVarInt: configFile.erickVarInt,
    erickVarFloat: configFile.erickVarFloat,
    erickVarBoolean : configFile.erickVarBoolean,
    //Variables from object nodes
    users: configFile.users,
    /* Base URL to use in actions like await page.goto(''). */
    // baseURL: 'http://localhost:3000',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    viewport: { width: 1980, height: 1080 }, // HD resolution but is being overriden by projects config (chromiu, etc.)
    launchOptions: {
      slowMo: 1, // Slow down by 300ms
    },
    headless: true // false is HEADED/VISIBLE, true is HEADLESS/INVISIBLE
  },
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
};

export default defineConfig(config);
