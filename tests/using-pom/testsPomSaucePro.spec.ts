import { test } from "../parentTests/baseTestSauceLabs";

test.describe('Sauce Labs Store DEMO - POM WITH CUSTOM TEST', () => {

  test('Complete login with POM (sep 3rd)', async ({ Pages }) => {
    await Pages.loginPage.loginWithCredentials();
    await Pages.productsPage.addProducts('Jack');
    await Pages.productsPage.addProducts('Backpack');
    await Pages.cartPage.goToCart();
    await Pages.cartPage.goToCheckout();
    await Pages.cartPage.enterCheckoutInformationAndContinue('Erick', 'Jimenez', '12345');
    await Pages.cartPage.verifyTotalPriceIsGreaterThanZero();
  });
});
