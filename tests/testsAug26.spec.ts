import { test, expect, Page, BrowserContext, BrowserType } from '@playwright/test';
import { firefox } from 'playwright'; // driver for browser it comes from a different library

const url1: string = 'https://www.testmuai.com/selenium-playground/checkbox-demo/';
const url2: string = 'https://www.testmuai.com/selenium-playground/radiobutton-demo/';

/* 3 possible instances in our tests related to playwright
 BROWSER > CONTEXT > PAGE

browser:
 -Chrome/Firefox/Safari/Edge -> chromium/firefox/webkit

browserContext:
-Represents a session inside a browser.
-Manages cookies, storage, and isolates pages from each other.
-Can have multiple page objects/instances.

page:
-Represents a single tab or window within a browser context.
-Used to interact with web elements (click, fill, waitForSelector, etc.).
-Cannot exist outside a context.

Analogy:
-browser = the browser app itself (Chrome, Firefox).
-browserContext = a separate browser profile or session.
-page = a tab inside that session.

*/

test.describe('Checkboxes and Radio Buttons Tests', () => {

  // ToDo Erick Aug 27 - change injection to inject browser or context and build page locally with a different resolution and demonstrate

  test('test wednesday aug 26 - CHECKBOXES inject PAGE (FULL RESOLUTION X 1 TAB)', async ({ page }) => { // we are INJECTING a 'PAGE' instance, we forget about declaring it, it is done automatically
    await page.goto(url1);
    

    const checkAlone: string = "(//input[@type='checkbox'])[1]";
    const checkVerticalGroup1: string = "//label[contains(.,'Option 1')]/child::input[@type='checkbox' and not(@name)]";
    const checkVerticalGroup2: string = "//label[contains(.,'Option 2')]/child::input[@type='checkbox' and not(@name)]";
    const checkVerticalGroup3: string = "//label[contains(.,'Option 3')]/child::input[@type='checkbox' and not(@name)]"; //should be disabled
    const checkVerticalGroup4: string = "//label[contains(.,'Option 4')]/child::input[@type='checkbox' and not(@name)]"; //should be disabled
    const checkHorizontalGroup1: string = "//label[contains(.,'Option 1')]/child::input[@type='checkbox' and contains(@name,'option')]";
    const checkHorizontalGroup2: string = "//label[contains(.,'Option 2')]/child::input[@type='checkbox' and contains(@name,'option')]";
    const checkHorizontalGroup3: string = "//label[contains(.,'Option 3')]/child::input[@type='checkbox' and contains(@name,'option')]";
    const checkHorizontalGroup4: string = "//label[contains(.,'Option 4')]/child::input[@type='checkbox' and contains(@name,'option')]"; 

    // Validate that all 9 checkboxes are visible
    await expect(page.locator(checkAlone)).toBeVisible();
    await expect(page.locator(checkVerticalGroup1)).toBeVisible();
    await expect(page.locator(checkVerticalGroup2)).toBeVisible();
    await expect(page.locator(checkVerticalGroup3)).toBeVisible();
    await expect(page.locator(checkVerticalGroup4)).toBeVisible();
    await expect(page.locator(checkHorizontalGroup1)).toBeVisible();
    await expect(page.locator(checkHorizontalGroup2)).toBeVisible();
    await expect(page.locator(checkHorizontalGroup3)).toBeVisible();
    await expect(page.locator(checkHorizontalGroup4)).toBeVisible();

    // 7 checkboxes should be enabled, 2 checkboxes should be disabled
    await expect(page.locator(checkAlone)).toBeEnabled();
    await expect(page.locator(checkVerticalGroup1)).toBeEnabled();
    await expect(page.locator(checkVerticalGroup2)).toBeEnabled();
    await expect(page.locator(checkVerticalGroup3)).toBeDisabled(); //should be disabled
    await expect(page.locator(checkVerticalGroup4)).toBeDisabled(); //should be disabled
    await expect(page.locator(checkHorizontalGroup1)).toBeEnabled();
    await expect(page.locator(checkHorizontalGroup2)).toBeEnabled();
    await expect(page.locator(checkHorizontalGroup3)).toBeEnabled();
    await expect(page.locator(checkHorizontalGroup4)).toBeEnabled();

    //await expect(page.locator(checkAlone)).toBeChecked(); // trigger an error

    // Click alone
    await page.locator(checkAlone).click(); // check

    // Check that the checkbox is checked
    await expect(page.locator(checkAlone)).toBeChecked();

    // Click again to uncheck
    await page.locator(checkAlone).click(); // uncheck

    // Check that the checkbox is unchecked
    await expect(page.locator(checkAlone)).not.toBeChecked();

    // Remaining 8 checkboxes are unchecked
    await expect(page.locator(checkVerticalGroup1)).not.toBeChecked();
    await expect(page.locator(checkVerticalGroup2)).not.toBeChecked();
    await expect(page.locator(checkVerticalGroup3)).not.toBeChecked();
    await expect(page.locator(checkVerticalGroup4)).not.toBeChecked();
    await expect(page.locator(checkHorizontalGroup1)).not.toBeChecked();
    await expect(page.locator(checkHorizontalGroup2)).not.toBeChecked();
    await expect(page.locator(checkHorizontalGroup3)).not.toBeChecked();
    await expect(page.locator(checkHorizontalGroup4)).not.toBeChecked();

    console.log("All 9 checkboxes are visible and the first checkbox can be checked and unchecked successfully.");

    console.log("Will attempt to click a disabled checkbox and expect an error to be thrown.");

    // Below lines should TRIGGER ERRORS BECAUSE THE CHECKBOXES ARE DISABLED
    //await page.locator(checkVerticalGroup3).click({timeout: 1_000}); // check SHOULD TRIGGER ERROR BECAUSE IT IS DISABLED
    //await page.locator(checkVerticalGroup4).click({timeout: 100}); // check SHOULD TRIGGER ERROR BECAUSE IT IS DISABLED
  });

  test('test wednesday aug 26 - CHECKBOXES inject CONTEXT (FULL RESOLUTION X 2 TABS)', async ({ context }) => { // we are INJECTING a 'CONTEXT' instance, we are responsible of creating the page from it
    const page: Page = await context.newPage();
    const page2: Page = await context.newPage();
    
    await page.goto(url1);

    const fullName: string = "Erick Jimenez Rodriguez";
    const firstName: string = "Erick";

    expect(fullName.includes(firstName)).toBe(true); // should pass (SYNCHRONOUS EXPECT)
    expect(fullName.includes("Messi")).toBe(true); // should FAIL (SYNCHRONOUS EXPECT)    

    const checkAlone: string = "(//input[@type='checkbox'])[1]";
    const checkVerticalGroup1: string = "//label[contains(.,'Option 1')]/child::input[@type='checkbox' and not(@name)]";
    const checkVerticalGroup2: string = "//label[contains(.,'Option 2')]/child::input[@type='checkbox' and not(@name)]";
    const checkVerticalGroup3: string = "//label[contains(.,'Option 3')]/child::input[@type='checkbox' and not(@name)]"; //should be disabled
    const checkVerticalGroup4: string = "//label[contains(.,'Option 4')]/child::input[@type='checkbox' and not(@name)]"; //should be disabled
    const checkHorizontalGroup1: string = "//label[contains(.,'Option 1')]/child::input[@type='checkbox' and contains(@name,'option')]";
    const checkHorizontalGroup2: string = "//label[contains(.,'Option 2')]/child::input[@type='checkbox' and contains(@name,'option')]";
    const checkHorizontalGroup3: string = "//label[contains(.,'Option 3')]/child::input[@type='checkbox' and contains(@name,'option')]";
    const checkHorizontalGroup4: string = "//label[contains(.,'Option 4')]/child::input[@type='checkbox' and contains(@name,'option')]"; 

    // Validate that all 9 checkboxes are visible (ASYNCHRONOUS)
    await expect(page.locator(checkAlone)).toBeVisible();
    await expect(page.locator(checkVerticalGroup1)).toBeVisible();
    await expect(page.locator(checkVerticalGroup2)).toBeVisible();
    await expect(page.locator(checkVerticalGroup3)).toBeVisible();
    await expect(page.locator(checkVerticalGroup4)).toBeVisible();
    await expect(page.locator(checkHorizontalGroup1)).toBeVisible();
    await expect(page.locator(checkHorizontalGroup2)).toBeVisible();
    await expect(page.locator(checkHorizontalGroup3)).toBeVisible();
    await expect(page.locator(checkHorizontalGroup4)).toBeVisible();

    // 7 checkboxes should be enabled, 2 checkboxes should be disabled
    await expect(page.locator(checkAlone)).toBeEnabled();
    await expect(page.locator(checkVerticalGroup1)).toBeEnabled();
    await expect(page.locator(checkVerticalGroup2)).toBeEnabled();
    await expect(page.locator(checkVerticalGroup3)).toBeDisabled(); //should be disabled
    await expect(page.locator(checkVerticalGroup4)).toBeDisabled(); //should be disabled
    await expect(page.locator(checkHorizontalGroup1)).toBeEnabled();
    await expect(page.locator(checkHorizontalGroup2)).toBeEnabled();
    await expect(page.locator(checkHorizontalGroup3)).toBeEnabled();
    await expect(page.locator(checkHorizontalGroup4)).toBeEnabled();

    //await expect(page.locator(checkAlone)).toBeChecked(); // trigger an error

    // Click alone
    await page.locator(checkAlone).click(); // check

    // Check that the checkbox is checked
    await expect(page.locator(checkAlone)).toBeChecked();

    // Click again to uncheck
    await page.locator(checkAlone).click(); // uncheck

    // Check that the checkbox is unchecked
    await expect(page.locator(checkAlone)).not.toBeChecked();

    // Remaining 8 checkboxes are unchecked
    await expect(page.locator(checkVerticalGroup1)).not.toBeChecked();
    await expect(page.locator(checkVerticalGroup2)).not.toBeChecked();
    await expect(page.locator(checkVerticalGroup3)).not.toBeChecked();
    await expect(page.locator(checkVerticalGroup4)).not.toBeChecked();
    await expect(page.locator(checkHorizontalGroup1)).not.toBeChecked();
    await expect(page.locator(checkHorizontalGroup2)).not.toBeChecked();
    await expect(page.locator(checkHorizontalGroup3)).not.toBeChecked();
    await expect(page.locator(checkHorizontalGroup4)).not.toBeChecked();

    console.log("All 9 checkboxes are visible and the first checkbox can be checked and unchecked successfully.");

    console.log("Will attempt to click a disabled checkbox and expect an error to be thrown.");

    // Below lines should TRIGGER ERRORS BECAUSE THE CHECKBOXES ARE DISABLED
    //await page.locator(checkVerticalGroup3).click({timeout: 1_000}); // check SHOULD TRIGGER ERROR BECAUSE IT IS DISABLED
    //await page.locator(checkVerticalGroup4).click({timeout: 100}); // check SHOULD TRIGGER ERROR BECAUSE IT IS DISABLED
  });

  test('test wednesday aug 26 - CHECKBOXES inject BROWSER (SMALLER RESOLUTION X 3 TABS)', async ({ browser }) => { // we are INJECTING a 'BROWSER' instance, we have to manually 1) create a context (define customized settings), 2) create page(s) from it
    const context: BrowserContext = await browser.newContext({
      viewport: {
        width: 640,
        height: 480,
      },
    });

    const page: Page = await context.newPage();
    const page2: Page = await context.newPage();
    const page3: Page = await context.newPage();
    
    await page.goto(url1);
    

    const checkAlone: string = "(//input[@type='checkbox'])[1]";
    const checkVerticalGroup1: string = "//label[contains(.,'Option 1')]/child::input[@type='checkbox' and not(@name)]";
    const checkVerticalGroup2: string = "//label[contains(.,'Option 2')]/child::input[@type='checkbox' and not(@name)]";
    const checkVerticalGroup3: string = "//label[contains(.,'Option 3')]/child::input[@type='checkbox' and not(@name)]"; //should be disabled
    const checkVerticalGroup4: string = "//label[contains(.,'Option 4')]/child::input[@type='checkbox' and not(@name)]"; //should be disabled
    const checkHorizontalGroup1: string = "//label[contains(.,'Option 1')]/child::input[@type='checkbox' and contains(@name,'option')]";
    const checkHorizontalGroup2: string = "//label[contains(.,'Option 2')]/child::input[@type='checkbox' and contains(@name,'option')]";
    const checkHorizontalGroup3: string = "//label[contains(.,'Option 3')]/child::input[@type='checkbox' and contains(@name,'option')]";
    const checkHorizontalGroup4: string = "//label[contains(.,'Option 4')]/child::input[@type='checkbox' and contains(@name,'option')]"; 

    // Validate that all 9 checkboxes are visible
    await expect(page.locator(checkAlone)).toBeVisible();
    await expect(page.locator(checkVerticalGroup1)).toBeVisible();
    await expect(page.locator(checkVerticalGroup2)).toBeVisible();
    await expect(page.locator(checkVerticalGroup3)).toBeVisible();
    await expect(page.locator(checkVerticalGroup4)).toBeVisible();
    await expect(page.locator(checkHorizontalGroup1)).toBeVisible();
    await expect(page.locator(checkHorizontalGroup2)).toBeVisible();
    await expect(page.locator(checkHorizontalGroup3)).toBeVisible();
    await expect(page.locator(checkHorizontalGroup4)).toBeVisible();

    // 7 checkboxes should be enabled, 2 checkboxes should be disabled
    await expect(page.locator(checkAlone)).toBeEnabled();
    await expect(page.locator(checkVerticalGroup1)).toBeEnabled();
    await expect(page.locator(checkVerticalGroup2)).toBeEnabled();
    await expect(page.locator(checkVerticalGroup3)).toBeDisabled(); //should be disabled
    await expect(page.locator(checkVerticalGroup4)).toBeDisabled(); //should be disabled
    await expect(page.locator(checkHorizontalGroup1)).toBeEnabled();
    await expect(page.locator(checkHorizontalGroup2)).toBeEnabled();
    await expect(page.locator(checkHorizontalGroup3)).toBeEnabled();
    await expect(page.locator(checkHorizontalGroup4)).toBeEnabled();

    //await expect(page.locator(checkAlone)).toBeChecked(); // trigger an error

    // Click alone
    await page.locator(checkAlone).click(); // check

    // Check that the checkbox is checked
    await expect(page.locator(checkAlone)).toBeChecked();

    // Click again to uncheck
    await page.locator(checkAlone).click(); // uncheck

    // Check that the checkbox is unchecked
    await expect(page.locator(checkAlone)).not.toBeChecked();

    // Remaining 8 checkboxes are unchecked
    await expect(page.locator(checkVerticalGroup1)).not.toBeChecked();
    await expect(page.locator(checkVerticalGroup2)).not.toBeChecked();
    await expect(page.locator(checkVerticalGroup3)).not.toBeChecked();
    await expect(page.locator(checkVerticalGroup4)).not.toBeChecked();
    await expect(page.locator(checkHorizontalGroup1)).not.toBeChecked();
    await expect(page.locator(checkHorizontalGroup2)).not.toBeChecked();
    await expect(page.locator(checkHorizontalGroup3)).not.toBeChecked();
    await expect(page.locator(checkHorizontalGroup4)).not.toBeChecked();

    console.log("All 9 checkboxes are visible and the first checkbox can be checked and unchecked successfully.");

    console.log("Will attempt to click a disabled checkbox and expect an error to be thrown.");

    // Below lines should TRIGGER ERRORS BECAUSE THE CHECKBOXES ARE DISABLED
    //await page.locator(checkVerticalGroup3).click({timeout: 1_000}); // check SHOULD TRIGGER ERROR BECAUSE IT IS DISABLED
    //await page.locator(checkVerticalGroup4).click({timeout: 100}); // check SHOULD TRIGGER ERROR BECAUSE IT IS DISABLED
  });

  test('test wednesday aug 26 - CHECKBOXES inject NOTHING and declare firefox.launch locally', async () => {
    const browser = await firefox.launch({
      headless: false,
    });

    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();

    await page.goto(url1);
    

    const checkAlone: string = "(//input[@type='checkbox'])[1]";
    const checkVerticalGroup1: string = "//label[contains(.,'Option 1')]/child::input[@type='checkbox' and not(@name)]";
    const checkVerticalGroup2: string = "//label[contains(.,'Option 2')]/child::input[@type='checkbox' and not(@name)]";
    const checkVerticalGroup3: string = "//label[contains(.,'Option 3')]/child::input[@type='checkbox' and not(@name)]"; //should be disabled
    const checkVerticalGroup4: string = "//label[contains(.,'Option 4')]/child::input[@type='checkbox' and not(@name)]"; //should be disabled
    const checkHorizontalGroup1: string = "//label[contains(.,'Option 1')]/child::input[@type='checkbox' and contains(@name,'option')]";
    const checkHorizontalGroup2: string = "//label[contains(.,'Option 2')]/child::input[@type='checkbox' and contains(@name,'option')]";
    const checkHorizontalGroup3: string = "//label[contains(.,'Option 3')]/child::input[@type='checkbox' and contains(@name,'option')]";
    const checkHorizontalGroup4: string = "//label[contains(.,'Option 4')]/child::input[@type='checkbox' and contains(@name,'option')]"; 

    // Validate that all 9 checkboxes are visible
    await expect(page.locator(checkAlone)).toBeVisible();
    await expect(page.locator(checkVerticalGroup1)).toBeVisible();
    await expect(page.locator(checkVerticalGroup2)).toBeVisible();
    await expect(page.locator(checkVerticalGroup3)).toBeVisible();
    await expect(page.locator(checkVerticalGroup4)).toBeVisible();
    await expect(page.locator(checkHorizontalGroup1)).toBeVisible();
    await expect(page.locator(checkHorizontalGroup2)).toBeVisible();
    await expect(page.locator(checkHorizontalGroup3)).toBeVisible();
    await expect(page.locator(checkHorizontalGroup4)).toBeVisible();

    // 7 checkboxes should be enabled, 2 checkboxes should be disabled
    await expect(page.locator(checkAlone)).toBeEnabled();
    await expect(page.locator(checkVerticalGroup1)).toBeEnabled();
    await expect(page.locator(checkVerticalGroup2)).toBeEnabled();
    await expect(page.locator(checkVerticalGroup3)).toBeDisabled(); //should be disabled
    await expect(page.locator(checkVerticalGroup4)).toBeDisabled(); //should be disabled
    await expect(page.locator(checkHorizontalGroup1)).toBeEnabled();
    await expect(page.locator(checkHorizontalGroup2)).toBeEnabled();
    await expect(page.locator(checkHorizontalGroup3)).toBeEnabled();
    await expect(page.locator(checkHorizontalGroup4)).toBeEnabled();

    //await expect(page.locator(checkAlone)).toBeChecked(); // trigger an error

    // Click alone
    await page.locator(checkAlone).click(); // check

    // Check that the checkbox is checked
    await expect(page.locator(checkAlone)).toBeChecked();

    // Click again to uncheck
    await page.locator(checkAlone).click(); // uncheck

    // Check that the checkbox is unchecked
    await expect(page.locator(checkAlone)).not.toBeChecked();

    // Remaining 8 checkboxes are unchecked
    await expect(page.locator(checkVerticalGroup1)).not.toBeChecked();
    await expect(page.locator(checkVerticalGroup2)).not.toBeChecked();
    await expect(page.locator(checkVerticalGroup3)).not.toBeChecked();
    await expect(page.locator(checkVerticalGroup4)).not.toBeChecked();
    await expect(page.locator(checkHorizontalGroup1)).not.toBeChecked();
    await expect(page.locator(checkHorizontalGroup2)).not.toBeChecked();
    await expect(page.locator(checkHorizontalGroup3)).not.toBeChecked();
    await expect(page.locator(checkHorizontalGroup4)).not.toBeChecked();

    console.log("All 9 checkboxes are visible and the first checkbox can be checked and unchecked successfully.");

    console.log("Will attempt to click a disabled checkbox and expect an error to be thrown.");

    // Below lines should TRIGGER ERRORS BECAUSE THE CHECKBOXES ARE DISABLED
    //await page.locator(checkVerticalGroup3).click({timeout: 1_000}); // check SHOULD TRIGGER ERROR BECAUSE IT IS DISABLED
    //await page.locator(checkVerticalGroup4).click({timeout: 100}); // check SHOULD TRIGGER ERROR BECAUSE IT IS DISABLED
  });

  test('test wednesday aug 26 - RADIOS', async ({ page }) => {
    await page.goto(url2);

    const radioMale: string = "input[value='Male'][name='gender']";
    const radioFemale: string = "input[value='Female'][name='gender']";
    const radioOther: string = "input[value='Other'][name='gender']";

    // All radio buttons should be visible and enabled
    await expect(page.locator(radioMale)).toBeVisible();
    await expect(page.locator(radioFemale)).toBeVisible();
    await expect(page.locator(radioOther)).toBeVisible();
    await expect(page.locator(radioMale)).toBeEnabled();
    await expect(page.locator(radioFemale)).toBeEnabled();
    await expect(page.locator(radioOther)).toBeEnabled();

    await page.locator(radioMale).click();
    await page.locator(radioOther).click();

    // Only 1 should be checked
    await expect(page.locator(radioMale)).not.toBeChecked();
    await expect(page.locator(radioOther)).toBeChecked();   

  });

  test('test wednesday aug 26 - SELECT DROPDOWN', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // default sorting is 'name ASCENDING'

    await page.locator('.product_sort_container').selectOption('hilo'); // 'price DESCENDING'
  });
});


