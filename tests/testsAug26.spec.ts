import { test, expect, Locator } from '@playwright/test';

const url1: string = 'https://www.testmuai.com/selenium-playground/checkbox-demo/';
const url2: string = 'https://www.testmuai.com/selenium-playground/radiobutton-demo/';

test('test wednesday aug 26', async ({ page }) => {
  await page.goto(url1);

  const checkAlone: string = "(//input[@type='checkbox'])[1]";
  const checkVerticalGroup1: string = "//label[contains(.,'Option 1')]/child::input[@type='checkbox' and not(@name)]";
  const checkVerticalGroup2: string = "//label[contains(.,'Option 2')]/child::input[@type='checkbox' and not(@name)]";
  const checkVerticalGroup3: string = "//label[contains(.,'Option 3')]/child::input[@type='checkbox' and not(@name)]";
  const checkVerticalGroup4: string = "//label[contains(.,'Option 4')]/child::input[@type='checkbox' and not(@name)]";
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

});
