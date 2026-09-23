import { ProductsConstants } from "../../pom/sauceLabs/constants/productsConstants";
import { test } from "../parentTests/baseTestSauceLabs";
import testData from '../testData/dataSep16.json';

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

  const listOfProducts: ProductsConstants = new ProductsConstants();

  // ********* APPROACH 1 - ITERATING OVER A LIST *********
  listOfProducts.availableProducts.forEach(product => {
    test('Add product LIST DDT ' + product, async ({ Pages }) => {
      await Pages.loginPage.loginWithCredentials();
      await Pages.productsPage.addProducts(product);
    });
  }); 
  
  // ********* APPROACH 2 - ITERATING OVER A JSON NODE *********

  for(const dataSet of testData) {
    test('Add product JSON DDT ' + dataSet.product, async ({ Pages }) => {
      await Pages.loginPage.loginWithCredentials();
      await Pages.productsPage.addProducts(dataSet.product);
    });
  }
});