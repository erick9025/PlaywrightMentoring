import { test } from '@playwright/test';

export class TestUtilities {
    public static logToConsoleBasic(message: string): void {
        const timestamp: string = TestUtilities.returnCurrentTimeStamp();
        console.log(`${timestamp}: ${message}`);
    }

    public static logToConsole(message: string): void {
        // Timestamp is local when running locally, is easter when running on CI
        const timestamp: string = this.returnCurrentTimeStamp();
        TestUtilities.safeAnnotationsPush({
            type: `${timestamp}`, // bold
            description: `${message}` // regular text
        });
    }

    //--------------------------------------------------------- SAFE ANNOTATION HELPER ---------------------------------------------------------
    /**
     * Safely push annotations to test info. Only works within an active test context.
     * Silently fails if no test context is available (e.g., during module initialization).
     */
    private static safeAnnotationsPush(annotation: any): void {
        try {
            // Skip annotations in CI to prevent JUnit XML entity expansion limit (>1000)
            // from breaking the PublishTestPlanResults pipeline task.
            // Traces and console output are still captured on CI.
            if (process.env.CI) return;
            test.info().annotations.push(annotation);
        } 
        catch (error: Error | unknown) {
            // test.info() is only available during active test execution
            // Silently skip annotation if not in a test context
            
            // If not possible to send output to test.info() > annotations, log to console instead
            console.info(`[TestUtilities] Unable to push annotation: ${JSON.stringify(annotation)}. Error: ${error}`);
        }
    }

    // Print the current timestamp in the format: YYYY-MM-DD hh:mm:ss.000 AM/PM
    public static returnCurrentTimeStamp(): string {
        const now = new Date();
        
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
        
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 hours should be 12
        
        const hoursStr = String(hours).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hoursStr}:${minutes}:${seconds}.${milliseconds} ${ampm}`;
    }

    // locator with 2 different keys, e.g., "//div[@class='inventory_item_description' and contains(.,'{{key1}}')]//button[contains(.,'{{key2}}')]"
    // for above example do 2 calls to replaceCustomKey() to replace key1 and key2 with their respective values
    // let newLocator = TestUtilities.replaceCustomKey(originalLocator, value1, "key1");
    // newLocator = TestUtilities.replaceCustomKey(originalLocator, value2, "key2");
    public static replaceCustomKey(original: string, replaceValue: string, keyName: string): string {
        return original.replace(`{{${keyName}}}`, replaceValue);
    }

    // if there is just one key and it is called "key", then use this method instead of replaceCustomKey()
    public static replaceKeyInLocator(original: string, replaceValue: string): string {
        return original.replace("{{key}}", replaceValue);
    }
}