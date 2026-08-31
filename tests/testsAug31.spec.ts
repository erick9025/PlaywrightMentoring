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

// ToDo move object creation to BEFORE hook
// ToDo declare locators as private readonly STRINGS
// ToDo update login method to receive default user and password
// ToDo refactor addTwoProducts to addProduct that receives a list and increment the counter
// ToDo protected click method in basePage with extended logs (string description)
