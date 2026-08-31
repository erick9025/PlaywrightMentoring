import { Page } from '@playwright/test';

export abstract class BasePage {
    protected page: Page;

    constructor(pwPage: Page) {
        // Assign to the class variable (<----)
        this.page = pwPage;
    }
}