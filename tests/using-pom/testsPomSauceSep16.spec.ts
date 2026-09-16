import { SortingOption } from "../../utils/enums/sortingOption";
import { test } from "../parentTests/baseTestSauceLabs";

test.describe('Sauce Labs Store DEMO - POM WITH CUSTOM TEST MORE COMPLEX', () => {
   
  test('BDD Base', async ({ Pages }) => { // INJECTION is to pass something from PARENT-TEST to TEST
    await Pages.loginPage.loginWithCredentials();
  });
});
