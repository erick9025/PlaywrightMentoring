import { test } from '@playwright/test';
import { LoginPage } from '../pom/loginPage';
import { ProductsPage } from '../pom/productsPage';
import { CartPage } from '../pom/cartPage';

test.describe('Sauce Labs Store DEMO - POM', () => {

  const todaysDate: Date = new Date(); // nothing specified as parameters = current date and time
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;

  test.beforeEach('ONE TIME SETUP', async ({page}) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
  });

  test('complete login with POM (sep 1st)', async () => {
    await loginPage.loginWithCredentials();
    await productsPage.addProducts('Jack');
    await productsPage.addProducts('Backpack');
    await cartPage.goToCart();
  });

  // PENDING Thursday Sep 3rd
  // ToDo 1: Once on cart extract the total and expect it is greater than 0.00
  // ToDo 2: Create ASSERTS class with custom asserts
  // ToDo 3: Create enum to store the 4 options to sort the products on the products page. 
  // ToDo 4: Then create a method in the ProductsPage class to sort the products based on the enum value passed as parameter
});
