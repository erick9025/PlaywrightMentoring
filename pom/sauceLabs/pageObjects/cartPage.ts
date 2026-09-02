import { expect } from '@playwright/test';
import { BasePage } from '../../parent/basePage';

export class CartPage extends BasePage {

    public async goToCart(): Promise<void> {
        await this.clickElement('.shopping_cart_link', 'Cart icon');

        // Check that we are on the cart page
        await expect(this.page).toHaveURL(/.*cart.html/);

        // Expect checkout button is there
        await expect(this.page.locator('#checkout')).toBeVisible();
    }
}