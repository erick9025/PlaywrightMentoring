import { test } from '@playwright/test';
import { LoginPage } from '../../pom/sauceLabs/pageObjects/loginPage';
import { ProductsPage } from '../../pom/sauceLabs/pageObjects/productsPage';
import { CartPage } from '../../pom/sauceLabs/pageObjects/cartPage';

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

  test('Complete login with POM (sep 1st)', async () => {
    await loginPage.loginWithCredentials();
    await productsPage.addProducts('Jack');
    await productsPage.addProducts('Backpack');
    await cartPage.goToCart();    
    await cartPage.goToCheckout();
    await cartPage.enterCheckoutInformationAndContinue('Erick', 'Jimenez', '12345');
    await cartPage.verifyTotalPriceIsGreaterThanZero();
  });
});
