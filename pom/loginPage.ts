import { expect } from '@playwright/test';
import { BasePage } from './parent/basePage';

export class LoginPage extends BasePage {
    
    public async loginWithCredentials(username: string, password: string): Promise<void> {
        await this.page.goto('https://www.saucedemo.com/');
        
        await this.page.fill('#user-name', 'standard_user');
        await this.page.fill('#password', 'secret_sauce');
        await this.page.click('#login-button');
        
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html'); // Expect a title "to contain" a substring. This to avoid false positive test result, since the URL will not match the expected URL due to the incorrect password.
    }
}