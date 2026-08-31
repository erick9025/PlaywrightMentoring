import { test } from '@playwright/test';
import { LoginPage } from '../pom/loginPage';
import { ProductsPage } from '../pom/productsPage';

test.describe('Sauce Labs Store DEMO - POM', () => {

  test('complete login with POM (aug 31st)', async ({ page }) => {
    const loginPage: LoginPage = new LoginPage(page);
    const productsPage: ProductsPage = new ProductsPage(page);

    await loginPage.loginWithCredentials("standard_user", "secret_sauce");
    await productsPage.addTwoProducts();
  });

  test('complete login with POM (sep 1st)', async ({ page }) => {
    const loginPage: LoginPage = new LoginPage(page);
    const productsPage: ProductsPage = new ProductsPage(page);

    await loginPage.loginWithCredentials("standard_user", "secret_sauce");
    await productsPage.addTwoProducts();
  });
});

// ToDo 1 move object creation to BEFORE hook
// ToDo 2 declare locators as private readonly STRINGS
// ToDo 3 update login method to receive default user and password
// ToDo 4 refactor addTwoProducts to addProduct that receives a list and increment the counter
// ToDo 5 protected click method in basePage with extended logs (string description)
// ToDo 6 productsPage create a locator with {{key}} and new utility method to replace it to make it dynamic
