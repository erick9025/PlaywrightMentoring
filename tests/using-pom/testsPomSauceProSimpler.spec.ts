import { test, expect } from "../parentTests/baseTestSauceLabsSimpler";
import { Locator } from '@playwright/test';


test.describe('Sauce Labs Store DEMO - POM WITH CUSTOM TEST SIMPLER', () => {

  test('Complete login with POM (sep 7th)', async ({ Pages }) => {
    await Pages.loginPage.loginWithCredentials();
    await Pages.productsPage.addProducts('Jack');
    await Pages.productsPage.addProducts('Backpack');
    await Pages.cartPage.goToCart();
    await Pages.cartPage.goToCheckout();
    await Pages.cartPage.enterCheckoutInformationAndContinue('Erick', 'Jimenez', '12345');
    await Pages.cartPage.verifyTotalPriceIsGreaterThanZero();

    const fullName: string = "Erick Jimenez";
    const firstName: string = "Erick";

    expect(fullName.includes(firstName)).toBe(true);
    const locator: Locator = Pages.cartPage.page.locator('.summary_info_label.summary_total_label');
    await expect(locator).erickExpectCustom('$103.50');
  });

    test('Complete login with POM (sep 7th) with nickname', async ({ Pages: Wrapper }) => {
    await Wrapper.loginPage.loginWithCredentials();
    await Wrapper.productsPage.addProducts('Jack');
    await Wrapper.productsPage.addProducts('Backpack');
    await Wrapper.cartPage.goToCart();
    await Wrapper.cartPage.goToCheckout();
    await Wrapper.cartPage.enterCheckoutInformationAndContinue('Erick', 'Jimenez', '12345');
    await Wrapper.cartPage.verifyTotalPriceIsGreaterThanZero();
  });
});
