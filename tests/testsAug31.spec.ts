import { test, expect, Page } from '@playwright/test';

test.describe('Checkboxes and Radio Buttons Tests', () => {

  const url1: string = 'https://www.testmuai.com/selenium-playground/checkbox-demo/';
  const checkAlone: string = "(//input[@type='checkbox'])[1]";
  const checkVerticalGroup1: string = "//label[contains(.,'Option 1')]/child::input[@type='checkbox' and not(@name)]";
  const checkVerticalGroup2: string = "//label[contains(.,'Option 2')]/child::input[@type='checkbox' and not(@name)]";
  const checkVerticalGroup3: string = "//label[contains(.,'Option 3')]/child::input[@type='checkbox' and not(@name)]"; //should be disabled (NOT CLICKABLE)
  const checkVerticalGroup4: string = "//label[contains(.,'Option 4')]/child::input[@type='checkbox' and not(@name)]"; //should be disabled (NOT CLICKABLE)
  const checkHorizontalGroup1: string = "//label[contains(.,'Option 1')]/child::input[@type='checkbox' and contains(@name,'option')]";
  const checkHorizontalGroup2: string = "//label[contains(.,'Option 2')]/child::input[@type='checkbox' and contains(@name,'option')]";
  const checkHorizontalGroup3: string = "//label[contains(.,'Option 3')]/child::input[@type='checkbox' and contains(@name,'option')]";
  const checkHorizontalGroup4: string = "//label[contains(.,'Option 4')]/child::input[@type='checkbox' and contains(@name,'option')]"; 

  test('Check checkboxes 1 by 1', async ({ page }) => {
    await page.goto(url1);    

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

    // Click again to check
    await page.locator(checkAlone).click(); // check

    // Click the remaining enabled checkboxes
    await page.locator(checkVerticalGroup1).click();
    await page.locator(checkVerticalGroup2).click();
    await page.locator(checkHorizontalGroup1).click();
    await page.locator(checkHorizontalGroup2).click();
    await page.locator(checkHorizontalGroup3).click();
    await page.locator(checkHorizontalGroup4).click();

    await verifyAllCheckboxesAreEnabled(page);
  });

  test('Check checkboxes all at once', async ({ page }) => {
    await page.goto(url1);

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

    // Click again to check
    await page.locator(checkAlone).click(); // check

    const evaluateBeforeClicking: boolean = true;

    /* IMPORTANT NOTE FOR PARALLEL ACTIONS
    The page bundle confirms the deeper issue: these are real mouse actions on one shared Page, so concurrent .click() calls compete for the page’s single mouse position and event sequence. 
    Promise.all does not create six independent browser inputs; it interleaves action steps, which can land clicks on the wrong checkbox. 
    I’ll keep the parallel structure but use DOM element.click() inside each parallel task, which triggers each checkbox’s native click independently and still exercises the page behavior.
    Promise.all does not provide six independent mouse inputs. All clicks share one Playwright Page and one mouse, so their mouse movement and click steps interleave. Some clicks land on the wrong checkbox, causing intermittent failures.
    I kept the parallel structure in testsAug31.spec.ts:111-118, using each checkbox’s native element.click() inside Promise.all. This preserves parallel activation without competing for Playwright’s shared mouse.
    Both tests pass:
    2 passed (9.8s)
    Note: native DOM clicks do not perform Playwright’s mouse/actionability simulation. For true user-like Playwright clicks, the reliable approach is sequential clicking.
    */

    // Click multiple checkboxes at the same time
    if(evaluateBeforeClicking) {
      await Promise.all([
        page.locator(checkVerticalGroup1).evaluate((checkbox: HTMLInputElement) => checkbox.click()),
        page.locator(checkVerticalGroup2).evaluate((checkbox: HTMLInputElement) => checkbox.click()),
        page.locator(checkHorizontalGroup1).evaluate((checkbox: HTMLInputElement) => checkbox.click()),
        page.locator(checkHorizontalGroup2).evaluate((checkbox: HTMLInputElement) => checkbox.click()),
        page.locator(checkHorizontalGroup3).evaluate((checkbox: HTMLInputElement) => checkbox.click()),
        page.locator(checkHorizontalGroup4).evaluate((checkbox: HTMLInputElement) => checkbox.click())
      ]);
    }
    else {
      await Promise.all([
        page.locator(checkVerticalGroup1).click(),
        page.locator(checkVerticalGroup2).click(),
        page.locator(checkHorizontalGroup1).click(),
        page.locator(checkHorizontalGroup2).click(),
        page.locator(checkHorizontalGroup3).click(),
        page.locator(checkHorizontalGroup4).click()
      ]);
    }

    await verifyAllCheckboxesAreEnabled(page);
  });

  async function verifyAllCheckboxesAreEnabled(page: Page): Promise<void> {
    await expect(page.locator(checkAlone)).toBeChecked();
    await expect(page.locator(checkVerticalGroup1)).toBeChecked();
    await expect(page.locator(checkVerticalGroup2)).toBeChecked();
    await expect(page.locator(checkHorizontalGroup1)).toBeChecked();
    await expect(page.locator(checkHorizontalGroup2)).toBeChecked();
    await expect(page.locator(checkHorizontalGroup3)).toBeChecked();
    await expect(page.locator(checkHorizontalGroup4)).toBeChecked();

    console.log("All 7 clickable checkboxes are enabled before finishing test");
  }
});