import { test } from "../parentTests/baseTestSauceLabsSimpler";
import { expect } from "@playwright/test";
import { Asserts } from "../../utils/asserts";

test.describe('Sauce Labs Store DEMO - POM WITH CUSTOM TEST SIMPLER', () => {

  test.afterEach(async () => {
    console.log('afterEach block (inside THE TEST FILE)'); // First here, then the afterEach block in baseTestSauceLabsSimpler.ts will run
  });

  test('Complete login with POM (sep 7th)', async ({ Pages }) => {
    await Pages.loginPage.loginWithCredentials();
    await Pages.productsPage.addProducts('Jack');
    await Pages.productsPage.addProducts('Backpack');
    await Pages.cartPage.goToCart();
    await Pages.cartPage.goToCheckout();
    await Pages.cartPage.enterCheckoutInformationAndContinue('Erick', 'Jimenez', '12345');
    await Pages.cartPage.verifyTotalPriceIsGreaterThanZero();

    // ***************************** COMPARISON 1 *****************************
    let fullName: string = "Erick Jimenez";
    let firstName: string = "Erick";
    expect(fullName.includes(firstName)).toBe(true); // Should PASS
    
    // Print a message that indicates above strings are being compared and the result of the comparison
    console.log(`Comparing strings: "${fullName}" and "${firstName}". Result: ${fullName.includes(firstName)}`);

    // ***************************** COMPARISON 2 *****************************
    fullName = "Jesus Rodriguez";
    firstName = "Jesus";
    expect(fullName.includes(firstName)).toBe(true); // Should PASS
    
    // Print a message that indicates above strings are being compared and the result of the comparison
    console.log(`Comparing strings: "${fullName}" and "${firstName}". Result: ${fullName.includes(firstName)}`);
  });

  test('Complete login with POM (sep 7th) with nickname', async ({ Pages: Nickname }) => {
    await Nickname.loginPage.loginWithCredentials();
    await Nickname.productsPage.addProducts('Jack');
    await Nickname.productsPage.addProducts('Backpack');
    await Nickname.cartPage.goToCart();
    await Nickname.cartPage.goToCheckout();
    await Nickname.cartPage.enterCheckoutInformationAndContinue('Erick', 'Jimenez', '12345');
    await Nickname.cartPage.verifyTotalPriceIsGreaterThanZero();

    const fullName: string = "Erick Jimenez";
    const firstName: string = "Erick";

    // USE MY OWN ASSERTION CLASS
    Asserts.assertStringContains(fullName, firstName, "");
  });
});
