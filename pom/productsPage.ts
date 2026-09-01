import { expect } from '@playwright/test';
import { BasePage } from './parent/basePage';

export class ProductsPage extends BasePage {

    private _howManyProductsAdded: number = 0;
    private _buttonAnyProduct: string = "//div[@class='inventory_item_description' and contains(.,'{{key}}')]//button";

    public async addProducts(wantedProduct: string): Promise<void> {
        const finalLocator: string = this._buttonAnyProduct.replace("{{key}}", wantedProduct);

        // Add them
        await this.clickElement(finalLocator, `Add Product: ${wantedProduct}`);

        this._howManyProductsAdded++; // 1st call: 0->1, 2nd call: 1->2, 3rd call: 2->3, etc.

        // Check that button text changed to "Remove" after adding the items to the cart
        await expect(this.page.locator(finalLocator)).toHaveText('Remove');

        // Check that button does NOT say anymore "Add to cart" after adding the items to the cart
        await expect(this.page.locator(finalLocator)).not.toHaveText('Add to cart');

        // Check that counter was updated correctly
        await expect(this.page.locator('.shopping_cart_badge')).toHaveText(this._howManyProductsAdded.toString());

        console.log("So far we have added " + this._howManyProductsAdded + " products to the cart.");
    }
}