import { expect } from '@playwright/test';
import { BasePage } from '../../parent/basePage';
import { Transfer } from '../../../oop/transfer';

export class CartPageNotUsable extends BasePage {

    public async goToCart(): Promise<void> {
        await this.clickElement('.shopping_cart_link', 'Cart icon');

        // Check that we are on the cart page
        await expect(this.page).toHaveURL(/.*cart.html/);

        // Expect checkout button is there
        await expect(this.page.locator('#checkout')).toBeVisible();
    }

    public async goToCheckout(): Promise<void> {
        await this.clickElement('#checkout', 'Checkout button');

        // Check that we are on the checkout page
        await expect(this.page).toHaveURL(/.*checkout-step-one.html/);
    }

    // Enter firstname, lastname and postal code in the checkout page
    public async enterCheckoutInformationAndContinue(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.enterText('#first-name', 'First Name [input]', firstName);
        await this.enterText('#last-name', 'Last Name [input]', lastName);
        await this.enterText('#postal-code', 'Postal Code [input]', postalCode);
        await this.clickElement('#continue', 'Continue button');
    }

    public async verifyTotalPriceIsGreaterThanZero(): Promise<void> {
         // await is the keyword that tells us what to "extract" from the promise that is returned by the locator.textContent() method. The textContent() method returns a promise that resolves to the text content of the element, or null if the element does not exist. The await keyword allows us to wait for the promise to resolve and get the actual value of the text content.
        const totalPriceText = await this.page.locator('.summary_total_label').textContent(); // should have only numbers: 103.5
        if (!totalPriceText) {
            throw new Error('Total price text not found');
        }
        const totalPrice: number = parseFloat(totalPriceText.replace('Total: $', '')); // Remove the "Total: $" prefix and convert to number
        if (totalPrice <= 0) {
            throw new Error(`Total price is not greater than zero: ${totalPrice}`);
        }

        // Force an error just to test try-catch
        const listOfNumbers = [1, 2, 3];

        try {
            // Attempt to get the 6th element (index 5) of the array, which does not exist
            const nonExistentElement = listOfNumbers[5];

            console.log('Accessed array element:', nonExistentElement); // This will log 'undefined' since the element does not exist
        } 
        catch (error) {
            console.log('INDEX OUT OF BOUNDARIES: Error occurred while accessing array element:', error);
            throw new Error('INDEX OUT OF BOUNDARIES: Attempted to access an element outside the array boundaries.');
        }

        let transferObject!: Transfer; // just declaring WITHOUT initializing it

        try {
            console.log('Transfer account from:', transferObject!.fromAccount); // This will throw an error because transferObject is undefined
            console.log('Transfer account to:', transferObject!.toAccount);
            console.log('Transfer amount:', transferObject!.amount);
        } 
        catch (error) {
            // Cannot read properties of undefined -> means that transferObject is undefined (never initialized) and we are trying to access its property
            console.log('UNDEFINED OBJECT: Error occurred while accessing transferObject:', error);
            throw new Error('UNDEFINED OBJECT: Attempted to access a property of an undefined object.'); // Rethrow the error to propagate it further if needed and force the test to fail
        }
        finally {
            console.log('Finally block ALWAYS executed.');
            // now let's define a valid object and access its properties
            let transferObject2 = new Transfer();
            transferObject2.fromAccount = 'Account A';
            transferObject2.toAccount = 'Account B';
            transferObject2.amount = 100.99;

            console.log('Transfer account from:', transferObject2.fromAccount);
            console.log('Transfer account to:', transferObject2.toAccount);
            console.log('Transfer amount:', transferObject2.amount);
        }

        console.log('Finally block ALWAYS executed.');
    }
}