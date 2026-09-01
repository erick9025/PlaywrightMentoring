import { expect, Locator } from '@playwright/test';
import { BasePage } from './parent/basePage';

export class LoginPage extends BasePage {
    
    // Declare locators as private readonly STRINGS
    private readonly _usernameInputLocator: string = "#user-name"; // Way #1: declare them as strings
    private readonly _passwordInputLocator: string = "#password";
    private readonly _loginButtonLocator: Locator = this.page.locator("#login-button"); // Way #2: declare them as Locator objects

    public async loginWithCredentials(username: string = "standard_user", password: string = "secret_sauce"): Promise<void> {
        await this.openPage("https://www.saucedemo.com/");
        
        await this.enterText(this._usernameInputLocator, "Username", username);
        await this.enterText(this._passwordInputLocator, "Password", password);
        await this.clickElementByLocator(this._loginButtonLocator, "Login Button");

        await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html"); // Expect a title "to contain" a substring. This to avoid false positive test result, since the URL will not match the expected URL due to the incorrect password.
    }
}