import { Page, Locator, expect } from '@playwright/test';
import { TestUtilities } from '../../utils/testUtilities';
import { SortingOption } from '../../utils/enums/sortingOption';
import { Asserts } from '../../utils/asserts';

export abstract class BasePage {
    protected page: Page;

    constructor(pwPage: Page) {
        // Assign to the class variable (<----)
        this.page = pwPage;
    }

    protected info(messsage: string): void {
        TestUtilities.logToConsole(messsage);
    }

    protected infoBold(messsage: string): void {
        TestUtilities.logToConsoleBold(messsage);
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

    protected async verifyElementIsVisible(locator : string, elementDescription : string = "") : Promise<void> {
        await this.info("Verifying that '" + elementDescription + "' element is visible");
        expect(await this.page.locator(locator).count()).toBeGreaterThanOrEqual(1);
        expect(await this.page.locator(locator).isVisible()).toBe(true);
    }

    protected async selectDropdownOptionByValue(ddlLocator : string, valueStr : string, elementDescription : string = "") : Promise<void> {        
        await this.verifyElementIsVisible(ddlLocator, "Dropdown " + ddlLocator);
        await this.page.locator(ddlLocator).selectOption({ value: valueStr });
        var selectedValue = await this.page.locator(ddlLocator).inputValue();
        expect(selectedValue).toBe(valueStr);
        this.info("Selected by value: " + valueStr);
    }

    protected async selectDropdownOptionByLabel(ddlLocator : string, labelStr : string, elementDescription : string = "") : Promise<void> {
        await this.page.locator(ddlLocator).selectOption({ label: labelStr });
        this.info("Selected by label: " + labelStr);
    }

    protected async selectDropdownOptionByIndex(ddlLocator : string, indexInt : number, elementDescription : string = "") : Promise<void> {
        await this.page.locator(ddlLocator).selectOption({ index : indexInt });
        this.info("Selected by index: " + indexInt);
    }

    protected async verifyListIsSorted(locatorForList: string, orderByOptionSelected: SortingOption, printListContents: boolean = false): Promise<void> {
        const allTexts: string[] = await this.page.locator(locatorForList).allInnerTexts();

        expect(allTexts.length).toBeGreaterThanOrEqual(2); // native assertion does not print anything unless failed
        Asserts.assertNumberGreaterThanOrEqual(allTexts.length, 2, "There are at least 2 items in the list to be sorted"); // our custom assertion always prints

        if (printListContents) {
            this.infoBold(`When sorted info is by '${orderByOptionSelected.toString()}'. All texts from list below:`);
            allTexts.forEach(text => this.info(text));
        }

        switch (orderByOptionSelected) {
            case SortingOption.AlphabeticalAscending:
            case SortingOption.AlphabeticalDescending:
                for (let index = 0; index < allTexts.length - 1; index++) {
                    const itemBefore: string = allTexts[index];
                    const itemAfter: string = allTexts[index + 1];

                    // Ternary operator ( question ? if-true : if-false)
                    orderByOptionSelected == SortingOption.AlphabeticalAscending
                        ? Asserts.assertTextLessThanOrEqual(itemBefore, itemAfter, orderByOptionSelected)
                        : Asserts.assertTextGreaterThanOrEqual(itemBefore, itemAfter, orderByOptionSelected);
                }
                break;
            case SortingOption.NumericAscending:
            case SortingOption.NumericDescending:
                for (let index = 0; index < allTexts.length - 1; index++) {
                    const itemBefore: number = TestUtilities.convertStringToDoubleNumber(allTexts[index]);
                    const itemAfter: number = TestUtilities.convertStringToDoubleNumber(allTexts[index + 1]);

                    // Ternary operator ( question ? if-true : if-false)
                    orderByOptionSelected == SortingOption.NumericAscending
                        ? Asserts.assertNumberLessThanOrEqual(itemBefore, itemAfter, orderByOptionSelected)
                        : Asserts.assertNumberGreaterThanOrEqual(itemBefore, itemAfter, orderByOptionSelected);
                }
                break;
            default:
                Asserts.assertFail("Invalid sorting option provided: " + orderByOptionSelected);
        }        
    }

    public async wait2Seconds(): Promise<void> {
        await this.page.waitForTimeout(2_000);
    }
}