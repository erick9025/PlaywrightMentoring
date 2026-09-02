import { test } from "../parentTests/baseTestSauceLabs";

test.describe('Sauce Labs Store DEMO - POM WITH CUSTOM TEST', () => {

  test('Complete login with POM (sep 3rd)', async ({ Pages: AllPagesSauceLabs }) => {
    await AllPagesSauceLabs.loginPage.loginWithCredentials();
    await AllPagesSauceLabs.productsPage.addProducts('Jack');
    await AllPagesSauceLabs.productsPage.addProducts('Backpack');
    await AllPagesSauceLabs.cartPage.goToCart();
  });
});
