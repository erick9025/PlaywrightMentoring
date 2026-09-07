import { TestUtilities } from "../utils/testUtilities";
 
export class ErrorsHandler {
    public static ensureError(value: unknown): Error {
        if (value instanceof Error) {
            return value;
        }
       
        // Convert non-Error values to Error objects
        return new Error(String(value));
    }
 
    public static throwError(originAssertMethodName: string, exception: Error, userMessage: string, assertionMessage: string = ""): void {
        const timestamp: string = TestUtilities.returnCurrentTimeStamp();
        console.error(timestamp + ": Assert FAILED! " + originAssertMethodName);
        console.error("Native error type: " + exception.constructor.name);
        console.error("Native error message: " + exception.message);
        console.error("User message: " + userMessage);
 
        if (!TestUtilities.isNullOrEmpty(assertionMessage)) {
            console.error("Assertion message: " + assertionMessage);
        }
 
        throw exception;
    }
}