import { Page } from '@playwright/test';
import { LoginPage } from './pageObjects/loginPage';
import { ProductsPage } from './pageObjects/productsPage';
import { CartPage } from './pageObjects/cartPage';
import { IEmailProvider } from './emailProvider/iEmailProvider';
import { configParameters } from '../../config/loadedConfig';
import { OutlookPage } from './emailProvider/outlookPage';
import { GmailPage } from './emailProvider/gmailPage';

// Wrapper class that consolidates all page objects for the Sauce Labs Store POM in 1 place. 
// This class is used to create a single instance of all page objects, which can be reused across tests. It also provides a single point of access to all page objects, making it easier to manage and maintain the POM structure.
export class PagesSauceLabs {

    // All page objects are private to ensure encapsulation and prevent external modification
    private _loginPage!: LoginPage; // where only 1 behavior is avilable we can declare directly as CLASS
    private _productsPage!: ProductsPage // where only 1 behavior is avilable we can declare directly as CLASS
    private _cartPage!: CartPage; // where only 1 behavior is avilable we can declare directly as CLASS
    private _emailPage!: IEmailProvider; // to achieve behavior SWAPPING we must declare it as INTERFACES

    constructor(page: Page) {
        // Use the private setters to initialize the page objects
        this.loginPage = new LoginPage(page);
        this.productsPage = new ProductsPage(page);
        this.cartPage = new CartPage(page);

        // Now depending on the boolean value (CONFIG) we will instantiate the interface differently
        if(configParameters.erickVarBoolean) {
            // Use POLYMORPHISM: interface will take the form of 'OutlookPage'
            this._emailPage = new OutlookPage(page);
        }
        else {
            // Use POLYMORPHISM: interface will take the form of 'GmailPage'
            this._emailPage = new GmailPage(page);
        }
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

    public get emailPage(): IEmailProvider {
        return this._emailPage;
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

    private set emailPage(value: IEmailProvider) {
        this._emailPage = value;
    }
}