import { expect } from '@playwright/test';
import { BasePage } from '../../parent/basePage';
import { TestUtilities } from '../../../utils/testUtilities';
import { ProductsElements } from '../elements/productsElements';
import { ProductsConstants } from '../constants/productsConstants';
import { SortingOption } from '../../../utils/enums/sortingOption';

export class ProductsPage extends BasePage {

    private _howManyProductsAdded: number = 0; // not a constant, remains here
    
    // Private elements necessary to access other stuff
    private _elements: ProductsElements = new ProductsElements();
    private _constants: ProductsConstants = new ProductsConstants();

    // Asynchronous methods

    public async openProductsPage(): Promise<void> {
        await this.openPage('https://www.saucedemo.com/inventory.html');
    }

    public async addProducts(wantedProduct: string): Promise<void> {
        const finalLocator: string = TestUtilities.replaceKeyInLocator(this._elements.buttonAnyProduct, wantedProduct);

        // Add them
        await this.clickElement(finalLocator, `Add Product: ${wantedProduct}`);

        this._howManyProductsAdded++; // 1st call: 0->1, 2nd call: 1->2, 3rd call: 2->3, etc.

        // Check that button text changed to "Remove" after adding the items to the cart
        await expect(this.page.locator(finalLocator)).toHaveText('Remove');

        // Check that button does NOT say anymore "Add to cart" after adding the items to the cart
        await expect(this.page.locator(finalLocator)).not.toHaveText('Add to cart');

        // Check that counter was updated correctly
        await expect(this.page.locator('.shopping_cart_badge')).toHaveText(this._howManyProductsAdded.toString());

        TestUtilities.logToConsole("So far we have added " + this._howManyProductsAdded + " products to the cart.");
    }

    public async sortProducts(byOption: SortingOption): Promise<void> {
        const correspondingValue: string = this._constants.options[byOption];
        await this.selectDropdownOptionByValue(this._elements.ddlSort, correspondingValue, "Sort by [Dropdown]");
    } 

    public async verifySortingIsCorrect(byOption: SortingOption): Promise<void> {
        await this.verifyListIsSorted(this._elements.returnLocatorForSorting(byOption), byOption, true);
    }

    // Synchronous methods

    public printProducts(): void {
        // Print all the available products
        TestUtilities.logToConsole("All available products (LAMBDA FUNCTION)");
        this._constants.availableProducts.forEach(product => TestUtilities.logToConsole("..." + product)); // Lambda function
    }

    public printProductsMultiple(): void {
        let ordinal: number = 1;

        // Print all the available products
        TestUtilities.logToConsole("All available products (LAMBDA FUNCTION 2)");
        this._constants.availableProducts.forEach(product => {
            TestUtilities.logToConsole("#" + ordinal++);
            TestUtilities.logToConsole("..." + product);
        }
            
        ); // Lambda function
    }

    public printProductsNoLambda(): void  {
        TestUtilities.logToConsole("All available products (REGULAR FOR)");
        for(let index: number = 0; index < this._constants.availableProducts.length; index++) {
            TestUtilities.logToConsole("..." + this._constants.availableProducts[index])
        }
    }

    // APPLY POLYMORPHISM (OPEN-CLOSED) TO DO OVERRIDING OF 'CLICK'
    protected override async clickElement(locator: string, description: string, timeoutMs: number = 5_000): Promise<void> {        
        await this.page.click(locator, { timeout: timeoutMs, force: true, scroll: "auto" });
        TestUtilities.logToConsole(`We have clicked on element: ${description} using locator: ${locator} and forcing while doing auto scroll first`);
        //super.clickElement(locator, description, timeoutMs); // combine child + parent (NOT HERE BECAUSE WILL CAUSE 2 CLICKS)
    }

    public async create(): Promise<void> {
        TestUtilities.logToConsole("Creating something");
    }

    public async edit(): Promise<void> {
        TestUtilities.logToConsole("Updating something");
    }

    public async delete(): Promise<void> {
        TestUtilities.logToConsole("Deleting something");
    }
}