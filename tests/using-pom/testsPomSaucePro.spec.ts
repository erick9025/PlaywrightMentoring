import { test } from "../parentTests/baseTestSauceLabs";

test.describe.serial('Sauce Labs Store DEMO - POM WITH CUSTOM TEST MORE COMPLEX', () => {
  // If TEST want to change a param from the PARENT-TEST, it can do it here, before the tests run
  test.use({ createContextBeforeEachTest: false }); // Modify the test suite to not create a new context before each test

  test('Complete login with POM (sep 3rd) a', async ({ Pages }) => { // INJECTION is to pass something from PARENT-TEST to TEST
    await Pages.loginPage.loginWithCredentials();
    await Pages.productsPage.addProducts('Jack');
    await Pages.productsPage.addProducts('Backpack');
    await Pages.cartPage.goToCart();
    await Pages.cartPage.goToCheckout();
    await Pages.cartPage.enterCheckoutInformationAndContinue('Erick', 'Jimenez', '12345');
    await Pages.cartPage.verifyTotalPriceIsGreaterThanZero();
  });

  test('Complete login with POM (sep 3rd) b', async ({ Pages }) => {
    // with boolean false i can continue where the previous test left off, without creating a new context, and saving time doing the login again. But if i set it to true, it will create a new context and do the login again.
    await Pages.productsPage.openProductsPage();
    await Pages.productsPage.addProducts('Sauce Labs Bike Light');
    await Pages.productsPage.addProducts('Sauce Labs Bolt T-Shirt');
    await Pages.cartPage.goToCart();
    await Pages.cartPage.goToCheckout();
    await Pages.cartPage.enterCheckoutInformationAndContinue('Erick', 'Jimenez', '12345');
    await Pages.cartPage.verifyTotalPriceIsGreaterThanZero();
  });
});
