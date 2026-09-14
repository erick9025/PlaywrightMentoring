import { TestUtilities } from "../../utils/testUtilities";
import { test } from "../parentTests/baseTestSauceLabs";

test.describe('SOLID: Dependency Inversion', () => {

  test('Testing email provider with Polymorphism', async ({ Pages }) => { // INJECTION is to pass something from PARENT-TEST to TEST
    await Pages.emailPage.login("test@email.com", "ThisIsaF@akePazzw0rd");
    await Pages.emailPage.goToInbox();
    const emailContent: string = await Pages.emailPage.openEmail("erick.jimenez@unosquare.com", "You have received a transfer");

    TestUtilities.logToConsole("Email content: " + emailContent);
  });
});
