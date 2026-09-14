import { TestUtilities } from "../../../utils/testUtilities";
import { BasePage } from "../../parent/basePage";
import { IEmailProvider } from "./iEmailProvider";

export class GmailPage extends BasePage implements IEmailProvider {
    public async login(user: string, password: string): Promise<void> {
        await this.openPage("http://gmail.com/");
        await this.page.waitForTimeout(7_000);
        TestUtilities.logToConsole("We are simulating going to Google Gmail inbox");
    }

    public async goToInbox(): Promise<void> {
        TestUtilities.logToConsole("We are simulating going to Google Gmail inbox");
    }

    public async openEmail(fromWho: string, subject: string): Promise<string> {
        TestUtilities.logToConsole(`We are simulating opening a Google Gmail email from '${fromWho}' and with subject '${subject}'`);

        const dummyContent: string = "You received a bank transfer of $100.34";

        return dummyContent;
    }
}