import { ProductsConstants } from "../../pom/sauceLabs/constants/productsConstants";
import { test } from "../parentTests/baseTestSauceLabs";
//import dataSep16

test.describe('Sauce Labs Store DEMO - POM WITH CUSTOM TEST MORE COMPLEX', () => {

  test('Add product #1', async ({ Pages }) => {
    await Pages.loginPage.loginWithCredentials();
    await Pages.productsPage.addProducts('Sauce Labs Backpack');
  });

  test('Add product #2', async ({ Pages }) => {
    await Pages.loginPage.loginWithCredentials();
    await Pages.productsPage.addProducts('Sauce Labs Bike Light');
  });

  test('Add product #3', async ({ Pages }) => {
    await Pages.loginPage.loginWithCredentials();
    await Pages.productsPage.addProducts('Sauce Labs Bolt T-Shirt');
  });

  test('Add product #4', async ({ Pages }) => {
    await Pages.loginPage.loginWithCredentials();
    await Pages.productsPage.addProducts('Sauce Labs Fleece Jacket');
  });

  test('Add product #5', async ({ Pages }) => {
    await Pages.loginPage.loginWithCredentials();
    await Pages.productsPage.addProducts('Sauce Labs Onesie');
  });

  test('Add product #6', async ({ Pages }) => {
    await Pages.loginPage.loginWithCredentials();
    await Pages.productsPage.addProducts('Test.allTheThings() T-Shirt (Red)');
  });
});

test.describe('Sauce Labs Store DEMO - POM WITH CUSTOM TEST MORE COMPLEX AND DDT', () => {

  const testData: ProductsConstants = new ProductsConstants();

  testData.availableProducts.forEach(product => {
    test('Add product DDT ' + product, async ({ Pages }) => {
      await Pages.loginPage.loginWithCredentials();
      await Pages.productsPage.addProducts(product);
    });
  });  
});