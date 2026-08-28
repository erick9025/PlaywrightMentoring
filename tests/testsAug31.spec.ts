import { test, expect } from '@playwright/test';

test.describe('Checkboxes and Radio Buttons Tests', () => {

  const url1: string = 'https://www.testmuai.com/selenium-playground/checkbox-demo/';

  test('Check checkboxes 1 by 1', async ({ page }) => {
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

    // Click the remaining enabled checkboxes
    await page.locator(checkVerticalGroup1).click();
    await page.locator(checkVerticalGroup2).click();
    await page.locator(checkHorizontalGroup1).click();
    await page.locator(checkHorizontalGroup2).click();
    await page.locator(checkHorizontalGroup3).click();
    await page.locator(checkHorizontalGroup4).click();
    
  });

  test('Check checkboxes all at once', async ({ page }) => {
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

    // Click the remaining enabled checkboxes
    await page.locator(checkVerticalGroup1).click();
    await page.locator(checkVerticalGroup2).click();
    await page.locator(checkHorizontalGroup1).click();
    await page.locator(checkHorizontalGroup2).click();
    await page.locator(checkHorizontalGroup3).click();
    await page.locator(checkHorizontalGroup4).click();

    // Click multiple checkboxes at the same time
    await Promise.all([
      page.locator(checkVerticalGroup1).click(),
      page.locator(checkVerticalGroup2).click(),
      page.locator(checkHorizontalGroup1).click(),
      page.locator(checkHorizontalGroup2).click(),
      page.locator(checkHorizontalGroup3).click(),
      page.locator(checkHorizontalGroup4).click()
    ]);    
  });
});
