import { Page } from '@playwright/test';
import { LoginPage } from './pageObjects/loginPage';
import { ProductsPage } from './pageObjects/productsPage';
import { CartPage } from './pageObjects/cartPage';

export class PagesSauceLabs {

    private _loginPage!: LoginPage;
    private _productsPage!: ProductsPage
    private _cartPage!: CartPage;

    constructor(page: Page) {
        // Use the private setters to initialize the page objects
        this.loginPage = new LoginPage(page);
        this.productsPage = new ProductsPage(page);
        this.cartPage = new CartPage(page);
    }

    // GETTERS (Encapsulation: Expose only the necessary methods and properties to interact with the page objects)
    public get loginPage(): LoginPage {
        return this._loginPage;
    }

    public get productsPage(): ProductsPage {
        return this._productsPage;
    }

    public get cartPage(): CartPage {
        return this._cartPage;
    }

    // SETTERS (Encapsulation: Control how the page objects are initialized and updated -> PRIVATE to prevent external modification)
    private set loginPage(value: LoginPage) {
        this._loginPage = value;
    }

    private set productsPage(value: ProductsPage) {
        this._productsPage = value;
    }    

    private set cartPage(value: CartPage) {
        this._cartPage = value;
    }

}