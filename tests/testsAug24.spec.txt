import { test, expect, Locator } from '@playwright/test';

const url1: string = 'https://www.testmuai.com/selenium-playground/checkbox-demo/';
const url2: string = 'https://www.testmuai.com/selenium-playground/radiobutton-demo/';

test('test wednesday aug 26', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); // Expect a title "to contain" a substring. This to avoid false positive test result, since the URL will not match the expected URL due to the incorrect password.

  // STORE LOCATORS INSIDE VARIABLES as LOCATOR objects, so that they can be reused later in the test
  const fleeceJacketButtonLocator: Locator = page.locator("//div[@class='inventory_item_description' and contains(.,'Fleece Jacket')]//button");
  const backpackButtonLocator: Locator = page.locator("//div[@class='inventory_item_description' and contains(.,'Backpack')]//button");

  await fleeceJacketButtonLocator.click();
  await backpackButtonLocator.click();

  // Check that button text changed to "Remove" after adding the items to the cart
  await expect(fleeceJacketButtonLocator).toHaveText('Remove');
  await expect(backpackButtonLocator).toHaveText('Remove');

  // Check that button does NOT say anymore "Add to cart" after adding the items to the cart
  await expect(fleeceJacketButtonLocator).not.toHaveText('Add to cart');
  await expect(backpackButtonLocator).not.toHaveText('Add to cart');

  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
});
