import { test } from '@playwright/test';
import { LoginPage } from '../pom/loginPage';
import { ProductsPage } from '../pom/productsPage';
import { CartPage } from '../pom/cartPage';

test.describe('Sauce Labs Store DEMO - POM', () => {

  const todaysDate: Date = new Date(); // nothing specified as parameters = current date and time
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;

  test.beforeEach('ONE TIME SETUP', async ({page}) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
  });

  test('complete login with POM (sep 1st)', async () => {
    await loginPage.loginWithCredentials();
    await productsPage.addProducts('Jack');
    await productsPage.addProducts('Backpack');
    await cartPage.goToCart();
  });
});
