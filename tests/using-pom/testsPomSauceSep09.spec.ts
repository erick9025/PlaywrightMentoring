import { SortingOption } from "../../utils/enums/sortingOption";
import { test } from "../parentTests/baseTestSauceLabs";

test.describe.serial('Sauce Labs Store DEMO - POM WITH CUSTOM TEST MORE COMPLEX', () => {
  // If TEST want to change a param from the PARENT-TEST, it can do it here, before the tests run
  test.use({ createContextBeforeEachTest: false }); // Modify the test suite to not create a new context before each test

  test('SOLID PRINCIPLES', async ({ Pages }) => { // INJECTION is to pass something from PARENT-TEST to TEST
    await Pages.loginPage.loginWithCredentials();

    Pages.productsPage.printProducts(); // Lambda function ONE LINE
    Pages.productsPage.printProductsMultiple();  // Lambda function MULTIPLE LINES/INSTRUCTION
    Pages.productsPage.printProductsNoLambda(); // NO-Lambda: regular for

    // default
    await Pages.productsPage.verifySortingIsCorrect(SortingOption.AlphabeticalAscending); // verify DEFAULT SORTING

    // sort #1
    await Pages.productsPage.sortProducts(SortingOption.AlphabeticalDescending); // change
    await Pages.productsPage.verifySortingIsCorrect(SortingOption.AlphabeticalDescending); // verify

    // sort 2
    await Pages.productsPage.sortProducts(SortingOption.NumericAscending);  // change
    await Pages.productsPage.verifySortingIsCorrect(SortingOption.NumericAscending); // verify

    // add the products
    await Pages.productsPage.addProducts('Jack');
    await Pages.productsPage.addProducts('Backpack');

    // 3
    await Pages.productsPage.sortProducts(SortingOption.NumericDescending);  // change
    await Pages.productsPage.verifySortingIsCorrect(SortingOption.NumericDescending); // verify

    // 4
    await Pages.productsPage.sortProducts(SortingOption.AlphabeticalAscending);  // change
    await Pages.productsPage.verifySortingIsCorrect(SortingOption.AlphabeticalAscending); // verify

    // proceed with remaining actions
    await Pages.cartPage.goToCart();
    await Pages.cartPage.goToCheckout();
    await Pages.cartPage.enterCheckoutInformationAndContinue('Erick', 'Jimenez', '12345');
    await Pages.cartPage.verifyTotalPriceIsGreaterThanZero();
  });
});
