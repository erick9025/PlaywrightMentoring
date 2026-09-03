import { Page, Locator } from '@playwright/test';
import { TestUtilities } from '../../utils/testUtilities';

export abstract class BasePage {
    protected page: Page;

    constructor(pwPage: Page) {
        // Assign to the class variable (<----)
        this.page = pwPage;
    }

    protected async openPage(url: string): Promise<void> {
        await this.page.goto(url);
        TestUtilities.logToConsole(`Opened page: ${url}`);
    }

    // timeoutMs is optional and has a default value of 5_000 milliseconds (5 seconds) = the maximum time to wait for the element to be clickable. If the element is not clickable within this time, an error will be thrown.
    protected async clickElement(locator: string, description: string, timeoutMs: number = 5_000): Promise<void> {        
        await this.page.click(locator, { timeout: timeoutMs });
        TestUtilities.logToConsole(`Clicked on element: ${description} using locator: ${locator}`);
    }

    protected async clickElementByLocator(locator: Locator, description: string, timeoutMs: number = 5_000): Promise<void> {        
        await locator.click({ timeout: timeoutMs });
        TestUtilities.logToConsole(`Clicked on element: ${description} using locator: ${locator}`);
    }

    protected async enterText(locator: string, description: string, value: string, timeoutMs: number = 5_000): Promise<void> {
        await this.page.fill(locator, value, { timeout: timeoutMs });
        TestUtilities.logToConsole(`Filled input: ${description} with value: ${value} using locator: ${locator}`);
    }

    protected async enterTextByLocator(locator: Locator, description: string, value: string, timeoutMs: number = 5_000): Promise<void> {
        await locator.fill(value, { timeout: timeoutMs });
        TestUtilities.logToConsole(`Filled input: ${description} with value: ${value} using locator: ${locator}`);
    }
}