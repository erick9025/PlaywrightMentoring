import { test } from "../parentTests/baseTestSauceLabsSimpler";

test.describe('Sauce Labs Store DEMO - POM WITH CUSTOM TEST SIMPLER', () => {

  test('Complete login with POM (sep 7th)', async ({ Pages }) => {
    await Pages.loginPage.loginWithCredentials();
    await Pages.productsPage.addProducts('Jack');
    await Pages.productsPage.addProducts('Backpack');
    await Pages.cartPage.goToCart();
    await Pages.cartPage.goToCheckout();
    await Pages.cartPage.enterCheckoutInformationAndContinue('Erick', 'Jimenez', '12345');
    await Pages.cartPage.verifyTotalPriceIsGreaterThanZero();
  });

  test('Complete login with POM (sep 7th) with nickname', async ({ Pages: Nickname }) => {
    await Nickname.loginPage.loginWithCredentials();
    await Nickname.productsPage.addProducts('Jack');
    await Nickname.productsPage.addProducts('Backpack');
    await Nickname.cartPage.goToCart();
    await Nickname.cartPage.goToCheckout();
    await Nickname.cartPage.enterCheckoutInformationAndContinue('Erick', 'Jimenez', '12345');
    await Nickname.cartPage.verifyTotalPriceIsGreaterThanZero();
  });
});
