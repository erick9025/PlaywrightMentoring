import { test, expect } from '@playwright/test';
import { LoginPage } from '../pom/loginPage';
import { ProductsPage } from '../pom/productsPage';

test.describe('Sauce Labs Store DEMO - POM', () => {

  test('complete login with POM', async ({ page }) => {
    const loginPage: LoginPage = new LoginPage(page);
    const productsPage: ProductsPage = new ProductsPage(page);

    await loginPage.loginWithCredentials("standard_user", "secret_sauce");
    await productsPage.addTwoProducts();
  });
});
