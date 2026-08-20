import { test, expect } from '@playwright/test';

test('complete login in sauce demo', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); // Expect a title "to contain" a substring. This to avoid false positive test result, since the URL will not match the expected URL due to the incorrect password.
});
