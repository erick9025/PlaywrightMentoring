import {
  test as base,
  expect as baseExpect,
  Page,
  BrowserContext
} from '@playwright/test';

import { PagesSauceLabs } from "../../pom/sauceLabs/pagesSauceLabs";

// Playwright objects
let myContext: BrowserContext;
let myPage: Page;

// Page objects (POM)
let AllPages: PagesSauceLabs;

// ======================================================
// Custom test (fixtures)
// ======================================================

export const test = base.extend<{
  Pages: PagesSauceLabs;
}>({
  Pages: async ({}, use) => {
    await use(AllPages);
  },
});

// ======================================================
// Hooks
// ======================================================

test.beforeAll(async ({ browser }) => {

  console.log('beforeAll block (inside baseTestSauceLabsSimpler.ts)');

  myContext = await browser.newContext();

  myPage = await myContext.newPage();

  await myPage.setViewportSize({
    width: 1920,
    height: 1080
  });

  AllPages = new PagesSauceLabs(myPage);

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

// ======================================================
// Custom expect
// ======================================================

export const expect = baseExpect.extend({

  async toBeLoggedIn(page: Page) {

    const avatar = page.getByTestId('avatar');

    const pass = await avatar.isVisible();

    return {
      pass,
      message: () =>
        pass
          ? 'Expected user NOT to be logged in.'
          : 'Expected user to be logged in.',
    };
  },

  async toHavePrice(locator, expectedPrice: string) {

    const actualPrice = (await locator.textContent())?.trim();

    const pass = actualPrice === expectedPrice;

    return {
      pass,
      message: () =>
        `Expected price "${expectedPrice}" but found "${actualPrice}"`,
    };
  },

});