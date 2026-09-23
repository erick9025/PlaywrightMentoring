import { Asserts } from "../../utils/asserts";
import { test } from "../parentTests/baseTestSauceLabs";

test.describe.serial('Sauce Labs Store DEMO - POM WITH CUSTOM TEST MORE COMPLEX', () => {
  test.use({ createContextBeforeEachTest: false }); // Modify the test suite to not create a new context before each test
  
  test('CREATION', async ({ Pages }) => { // INJECTION is to pass something from PARENT-TEST to TEST
    await Pages.loginPage.loginWithCredentials();
    await Pages.productsPage.addProducts('Jack');
    await Pages.productsPage.addProducts('Backpack');
  });

  test('EDIT', async ({ Pages }) => {
    // with boolean false i can continue where the previous test left off, without creating a new context, and saving time doing the login again. But if i set it to true, it will create a new context and do the login again.
    await Pages.productsPage.addProducts('Bike');
  });

  test('DELETE', async ({ Pages }) => {
    // with boolean false i can continue where the previous test left off, without creating a new context, and saving time doing the login again. But if i set it to true, it will create a new context and do the login again.
    await Pages.productsPage.addProducts('Onesie');
  });
});
