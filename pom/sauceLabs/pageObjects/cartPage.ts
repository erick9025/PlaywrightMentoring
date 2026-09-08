import { expect, Page } from '@playwright/test';
import { CartElements } from '../elements/cartElements';
import { BasePage } from '../../parent/basePage';

export class CartPage extends BasePage {

    private readonly cartElements: CartElements;

    constructor(page: Page) {
        super(page);
        this.cartElements = new CartElements();        
    }

    public async goToCart(): Promise<void> {
        await this.clickElement(this.cartElements.shoppingCartLinkLocator, 'Cart icon');

        // Check that we are on the cart page
        await expect(this.page).toHaveURL(/.*cart.html/);

        // Expect checkout button is there
        await expect(this.page.locator(this.cartElements.checkoutButtonLocator)).toBeVisible();
    }

    public async goToCheckout(): Promise<void> {
        await this.clickElement(this.cartElements.checkoutButtonLocator, 'Checkout button');

        // Check that we are on the checkout page
        await expect(this.page).toHaveURL(/.*checkout-step-one.html/);
    }

    // Enter firstname, lastname and postal code in the checkout page
    public async enterCheckoutInformationAndContinue(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.enterText(this.cartElements.firstNameInputLocator, 'First Name [input]', firstName);
        await this.enterText(this.cartElements.lastNameInputLocator, 'Last Name [input]', lastName);
        await this.enterText(this.cartElements.postalCodeInputLocator, 'Postal Code [input]', postalCode);
        await this.clickElement(this.cartElements.continueButtonLocator, 'Continue button');
    }

    public async verifyTotalPriceIsGreaterThanZero(): Promise<void> {
         // await is the keyword that tells us what to "extract" from the promise that is returned by the locator.textContent() method. The textContent() method returns a promise that resolves to the text content of the element, or null if the element does not exist. The await keyword allows us to wait for the promise to resolve and get the actual value of the text content.
        const totalPriceText = await this.page.locator(this.cartElements.summaryTotalLabelLocator).textContent(); // should have only numbers: 103.5
        if (!totalPriceText) {
            throw new Error('Total price text not found');
        }
        const totalPrice: number = parseFloat(totalPriceText.replace('Total: $', '')); // Remove the "Total: $" prefix and convert to number
        if (totalPrice <= 0) {
            throw new Error(`Total price is not greater than zero: ${totalPrice}`);
        }
    }
}