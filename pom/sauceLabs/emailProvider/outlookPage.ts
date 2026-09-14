import { TestUtilities } from "../../../utils/testUtilities";
import { BasePage } from "../../parent/basePage";
import { IEmailProvider } from "./iEmailProvider";

export class OutlookPage extends BasePage implements IEmailProvider {
    public async login(user: string, password: string): Promise<void> {
        this.openPage("https://outlook.cloud.microsoft");
        this.page.waitForTimeout(7_000);
        this.enterText("input[type='email']", "Email [Input]", user);
        this.clickElement("input[type='submit']", "Next [Button]");
    }

    public async goToInbox(): Promise<void> {
        TestUtilities.logToConsole("We are simulating going to Outlook inbox");
    }

    public async openEmail(fromWho: string, subject: string): Promise<string> {
        TestUtilities.logToConsole(`We are simulating opening an email inside OUTLOOK from '${fromWho}' and with subject '${subject}'`);

        const dummyContent: string = "You received a bank transfer of $100.34";

        return dummyContent;
    }
}