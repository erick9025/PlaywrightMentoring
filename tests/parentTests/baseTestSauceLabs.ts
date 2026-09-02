import { test as base, Page, BrowserContext, Browser } from "@playwright/test";
import { PagesSauceLabs } from "../../pom/sauceLabs/pagesSauceLabs";
import globalSetup from './globalSetup';
import globalTeardown from './globalTeardown';

/** Tier 1: Types / Fixture contract
 * Defines the resources available for Customers Portal tests
 */
type SauceLabsFixtures = {
  createContextBeforeEachTest: boolean;
  contextCP: BrowserContext;
  pageCP: Page;
  Pages: PagesSauceLabs;
};

/** Tier 2: Controlled shared state
 * References stored only for shared mode
 */
let sharedContextCP: BrowserContext | undefined;
let sharedPageCP: Page | undefined;
let sharedAllPagesCP: PagesSauceLabs | undefined;
let globalSetupExecuted = false;

/** Tier 3: Internal helper functions
 * Utility logic used by fixtures
 */

// Create the shared context only once and reuse it across tests
async function ensureSharedContext(browser: Browser): Promise<void> {
  if (!sharedContextCP) {
    sharedContextCP = await browser.newContext();
    sharedPageCP = await sharedContextCP.newPage();
    await sharedPageCP.setViewportSize({ width: 1920, height: 1080 });
    sharedAllPagesCP = new PagesSauceLabs(sharedPageCP);
  }
}

/** Tier 4: Fixture implementation
 * Defines how each resource is created or reused
 */
export const test = base.extend<SauceLabsFixtures>({
  createContextBeforeEachTest: [true, { option: true }], // Default: isolated context per test

  // This fixture provides a browser context based on the selected mode
  // If createContextBeforeEachTest = true:
  // → A new isolated context is created for each test
  // → The context is passed to the test
  // → The context is automatically closed after the test finishes

  // If createContextBeforeEachTest = false:
  // → A shared context is created only once (lazy initialization)
  // → The same context is reused across tests
  // → The context is closed later in the afterAll hook

  contextCP: async ({ browser, createContextBeforeEachTest }, use) => {
    if (createContextBeforeEachTest) {
      const context: BrowserContext = await browser.newContext();

      try {
        await use(context);
      } finally {
        await context.close();
      }

      return;
    }

    await ensureSharedContext(browser);
    await use(sharedContextCP!);
  },

  // This fixture creates the page using the correct context
  // If createContextBeforeEachTest = true:
  // → Uses the isolated context created for the test
  // → Creates a new page for that context
  // → Provides the page to the test

  // If createContextBeforeEachTest = false:
  // → Reuses the shared page created in the shared context

  pageCP: async ({ contextCP, browser, createContextBeforeEachTest }, use) => {
    if (createContextBeforeEachTest) {
      const page: Page = await contextCP.newPage();
      await page.setViewportSize({ width: 1920, height: 1080 });
      await use(page);
      return;
    }

    await ensureSharedContext(browser);
    await use(sharedPageCP!);
  },

  // This fixture builds or reuses the consolidated POM (PagesCP)
  // If createContextBeforeEachTest = true:
  // → Creates a new PagesCP instance using the test page

  // If createContextBeforeEachTest = false:
  // → Reuses the shared PagesCP instance created once

  Pages: async ({ pageCP, browser, createContextBeforeEachTest }, use) => {
    if (createContextBeforeEachTest) {
      const allPagesCP: PagesSauceLabs = new PagesSauceLabs(pageCP);
      await use(allPagesCP);
      return;
    }

    await ensureSharedContext(browser);
    await use(sharedAllPagesCP!);
  }
});

/** Tier 5: Lifecycle hooks
 * Setup, logging and teardown handled by the base file
 */

// Runs once before the tests in this base scope
test.beforeAll(async () => {
  console.log('beforeAll block (inside baseTestSauceLabs)');

  if (!globalSetupExecuted) {
    await globalSetup();
    globalSetupExecuted = true;
  }
});

// Optional: log test execution start
test.beforeEach(async ({}, testInfo) => {
  console.log(`beforeEach block (inside baseTestSauceLabs): ${testInfo.title}`);
});

// Log API performance data collected during each test
test.afterEach(async ({}, testInfo) => {
  console.log(`afterEach block (inside baseTestSauceLabs): ${testInfo.title}`);
});

// Runs once after all tests in this base scope
test.afterAll(async () => {
  console.log('afterAll block (inside baseTestSauceLabs)');

  if (sharedContextCP) {
    await sharedContextCP.close();
    sharedContextCP = undefined;
    sharedPageCP = undefined;
    sharedAllPagesCP = undefined;
  }

  if (globalSetupExecuted) {
    await globalTeardown();
    globalSetupExecuted = false;
  }
});

//export { expect } from '@playwright/test'; // Not really necessary because we have our custom Asserts class
