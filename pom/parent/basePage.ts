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

    protected async clickElement(locator: string, description: string): Promise<void> {        
        await this.page.click(locator);
        TestUtilities.logToConsole(`Clicked on element: ${description} using locator: ${locator}`);
    }

    protected async clickElementByLocator(locator: Locator, description: string): Promise<void> {        
        await locator.click();
        TestUtilities.logToConsole(`Clicked on element: ${description} using locator: ${locator}`);
    }

    protected async enterText(locator: string, description: string, value: string, ): Promise<void> {
        await this.page.fill(locator, value);
        TestUtilities.logToConsole(`Filled input: ${description} with value: ${value} using locator: ${locator}`);
    }

    protected async enterTextByLocator(locator: Locator, description: string, value: string): Promise<void> {
        await locator.fill(value);
        TestUtilities.logToConsole(`Filled input: ${description} with value: ${value} using locator: ${locator}`);
    }
}