import { expect } from '@playwright/test';
import { BasePage } from './parent/basePage';

export class ProductsPage extends BasePage {

    public async addTwoProducts(): Promise<void> {
        // STORE LOCATORS INSIDE VARIABLES as strings, so that they can be reused later in the test
        const fleeceJacketButtonLocator: string = "//div[@class='inventory_item_description' and contains(.,'Fleece Jacket')]//button"; // '//div[@class='inventory_item_description' and contains(.,'Fleece Jacket')]//child::button' OR '//div[@class='inventory_item_description' and contains(.,'Fleece Jacket')]//descendant::button'
        const backpackButtonLocator: string = "//div[@class='inventory_item_description' and contains(.,'Backpack')]//button";

        // Add them
        await this.page.click(fleeceJacketButtonLocator);
        await this.page.click(backpackButtonLocator);

        // Check that button text changed to "Remove" after adding the items to the cart
        await expect(this.page.locator(fleeceJacketButtonLocator)).toHaveText('Remove');
        await expect(this.page.locator(backpackButtonLocator)).toHaveText('Remove');

        // Check that button does NOT say anymore "Add to cart" after adding the items to the cart
        await expect(this.page.locator(fleeceJacketButtonLocator)).not.toHaveText('Add to cart');
        await expect(this.page.locator(backpackButtonLocator)).not.toHaveText('Add to cart');

        // Check that counter was updated correctly
        await expect(this.page.locator('.shopping_cart_badge')).toHaveText('2');
    }
}