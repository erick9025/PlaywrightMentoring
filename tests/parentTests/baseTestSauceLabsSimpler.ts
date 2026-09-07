import { test as base } from '@playwright/test';
import { Page, BrowserContext } from '@playwright/test';
import { PagesSauceLabs } from "../../pom/sauceLabs/pagesSauceLabs";

// Playwright objects
let myContext: BrowserContext;
let myPage: Page;

// Page objects (POM) into a consolidate object
let AllPages: PagesSauceLabs;

// Use DEPENCENCY INJECTION to make the consolidated Pages object for Sauce Labs (POM) available in all tests that import this file
export const test = base.extend<{ Pages: PagesSauceLabs }>({
  // Define here what is going to be injected into the tests that import this file (baseTestSauceLabsSimpler.ts)
  // Injecting the consolidated Pages object (POM) for Sauce Labs into the tests that import this file, its name is "Pages" and it will be available in the test function as a parameter
  Pages: async ({ }, use) => {
    await use(AllPages);
  },
});

test.beforeAll(async ({ browser }) => {
  console.log('beforeAll block (inside baseTestSauceLabsSimpler.ts)');

  myContext = await browser.newContext();
  myPage = await myContext.newPage();
  await myPage.setViewportSize({ width: 1920, height: 1080 }); // Set the viewport size to 1920x1080 for the page, Resolution = 1920x1080 (Full HD) - Aspect Ratio = 16:9

  AllPages = new PagesSauceLabs(myPage); // Initialize the consolidated Pages object/instance
  
});

test.beforeEach(async () => {
  console.log('beforeEach block (inside baseTestSauceLabsSimpler.ts)');
});

test.afterEach(async () => {
  console.log('afterEach block (inside baseTestSauceLabsSimpler.ts)');
});

test.afterAll(async () => {
  console.log('afterAll block (inside baseTestSauceLabsSimpler.ts)');
});

//export { expect } from '@playwright/test'; // Not really necessary because we have our custom Asserts.ts class