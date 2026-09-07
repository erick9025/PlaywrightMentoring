import { expect } from "@playwright/test";
import { ErrorsHandler } from "./errorsHandler";
import { TestUtilities } from "../utils/testUtilities";
// import { z } from "zod"; // API testing

export class Asserts {
    
    private static _useHardAsserts = true;
    
    public static set UseHardAsserts(falseIfWantSoft : boolean) {
        Asserts._useHardAsserts = falseIfWantSoft;
    }

    public static get UseHardAsserts(): boolean {
        return Asserts._useHardAsserts; // true = HARD | false = SOFT
    }    

    //----------------------------------------- BASE ASSERTS -----------------------------------------

    public static assertFail(message: string): void {
        let error : Error = new Error("Test case FAILED! " + message);
        ErrorsHandler.throwError("assertFail", error, message, "Test case should not fail.");
    }

    //----------------------------------------- BOUNDARY TESTING -----------------------------------------


    public static assertNumberGreaterThanOrEqual(valueBigger: number, valueSmaller: number, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard && this.UseHardAsserts ? expect(valueBigger).toBeGreaterThanOrEqual(valueSmaller) : expect.soft(valueBigger).toBeGreaterThanOrEqual(valueSmaller);
            TestUtilities.logToConsole("Assert PASSED! [" + valueBigger + "] is greater or equal to [" + valueSmaller + "], " + message);
        } catch (error) {
            ErrorsHandler.throwError("assertNumberGreaterThanOrEqual", ErrorsHandler.ensureError(error), message, "[" + valueBigger + "] should be greater or equal to [" + valueSmaller + "]");
        }
    }

    public static assertNumberGreaterThan(valueBigger: number, valueSmaller: number, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard && this.UseHardAsserts ? expect(valueBigger).toBeGreaterThan(valueSmaller) : expect.soft(valueBigger).toBeGreaterThan(valueSmaller);
            TestUtilities.logToConsole("Assert PASSED! [" + valueBigger + "] is greater than [" + valueSmaller + "], " + message);
        } catch (error) {
            ErrorsHandler.throwError("assertNumberGreaterThan", ErrorsHandler.ensureError(error), message, "[" + valueBigger + "] should be greater than [" + valueSmaller + "]");
        }
    }

    public static assertNumberLessThanOrEqual(valueSmaller: number, valueBigger: number, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard && this.UseHardAsserts ? expect(valueSmaller).toBeLessThanOrEqual(valueBigger) : expect.soft(valueSmaller).toBeLessThanOrEqual(valueBigger);
            TestUtilities.logToConsole("Assert PASSED! [" + valueSmaller + "] is less or equal to [" + valueBigger + "], " + message);
        } catch (error) {
            ErrorsHandler.throwError("assertNumberLessThanOrEqual", ErrorsHandler.ensureError(error), message, "[" + valueSmaller + "] should be less or equal to [" + valueBigger + "]");
        }
    }

    public static assertNumberLessThan(valueSmaller: number, valueBigger: number, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard && this.UseHardAsserts ? expect(valueSmaller).toBeLessThan(valueBigger) : expect.soft(valueSmaller).toBeLessThan(valueBigger);
            TestUtilities.logToConsole("Assert PASSED! [" + valueSmaller + "] is less than [" + valueBigger + "], " + message);
        } catch (error) {
            ErrorsHandler.throwError("assertNumberLessThan", ErrorsHandler.ensureError(error), message, "[" + valueSmaller + "] should be less than [" + valueBigger + "]");
        }
    }

    public static assertIntegerWithinRange(value: number, minimum: number, maximum: number, message: string): void {
        if (value === undefined || value === null || !Number.isInteger(value) || value < minimum || value > maximum) {
            const msg: string = `The provided number '${value}' should be a valid integer within range [${minimum}-${maximum}]. Message: ${message}`;
            this.assertFail(msg);
        }
    }

    public static assertIntegerIsPositive(value: number, message: string): void {
        if (value === undefined || value === null || !Number.isInteger(value) || value < 1) {
            const msg: string = `The provided number '${value}' should be a valid POSITIVE integer (within range [1-infinite]). Message: ${message}`;
            this.assertFail(msg);
        }
    }

    public static assertTextGreaterThanOrEqual(stringZ: string, stringA: string, message: string, trueIfHard : boolean = true): void {
        try {
            // Number is negative when LEFT comes BEFORE RIGHT (L=Apple, R=Orange)
            trueIfHard && this.UseHardAsserts ? expect(stringA.localeCompare(stringZ) <= 0).toBe(true) : expect.soft(stringA.localeCompare(stringZ) <= 0).toBe(true);
            TestUtilities.logToConsole("Assert PASSED! [" + stringZ + "] is greater or equal to [" + stringA + "], " + message);
        } catch (error) {
            ErrorsHandler.throwError("assertTextGreaterThanOrEqual", ErrorsHandler.ensureError(error), message, "[" + stringZ + "] should be greater or equal to [" + stringA + "]");
        }
    }

    public static assertTextLessThanOrEqual(stringA: string, stringZ: string, message: string, trueIfHard : boolean = true): void {
        try {
            // Number is negative when LEFT comes BEFORE RIGHT (L=Apple, R=Orange)
            trueIfHard && this.UseHardAsserts ? expect(stringA.localeCompare(stringZ) <= 0).toBe(true) : expect.soft(stringA.localeCompare(stringZ) <= 0).toBe(true);
            TestUtilities.logToConsole("Assert PASSED! [" + stringA + "] is less or equal to [" + stringZ + "], " + message);
        } catch (error) {
            ErrorsHandler.throwError("assertTextLessThanOrEqual", ErrorsHandler.ensureError(error), message, "[" + stringA + "] should be less or equal to [" + stringZ + "]");
        }
    }

    public static assertDateGreaterThanOrEqual(dateA: Date, dateZ: Date, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard && this.UseHardAsserts ? expect(dateA.getTime()).toBeGreaterThanOrEqual(dateZ.getTime()) : expect.soft(dateA.getTime()).toBeGreaterThanOrEqual(dateZ.getTime());
            TestUtilities.logToConsole("Assert PASSED! [" + dateA + "] is greater or equal to [" + dateZ + "], " + message);
        } catch (error) {
            ErrorsHandler.throwError("assertDateGreaterThanOrEqual", ErrorsHandler.ensureError(error), message, "[" + dateA + "] should be greater or equal to [" + dateZ + "]");
        }   
    }

    public static assertDateLessThanOrEqual(dateZ: Date, dateA: Date, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard && this.UseHardAsserts ? expect(dateZ.getTime()).toBeLessThanOrEqual(dateA.getTime()) : expect.soft(dateZ.getTime()).toBeLessThanOrEqual(dateA.getTime());
            TestUtilities.logToConsole("Assert PASSED! [" + dateZ + "] is less or equal to [" + dateA + "], " + message);
        } catch (error) {
            ErrorsHandler.throwError("assertDateLessThanOrEqual", ErrorsHandler.ensureError(error), message, "[" + dateZ + "] should be less or equal to [" + dateA + "]");
        }
    }

    public static assertStringIsNumberGreaterThan(valueAsString: string, minValue: number, message: string, trueIfHard : boolean = true): void {
        try {
            const numericValue = parseFloat(valueAsString);
            trueIfHard && this.UseHardAsserts ? expect(numericValue).toBeGreaterThan(minValue) : expect.soft(numericValue).toBeGreaterThan(minValue);
            TestUtilities.logToConsole("Assert PASSED! '" + valueAsString + "' String is a number greater than " + minValue + ": " + message);
        } catch (error) {
            ErrorsHandler.throwError("assertStringIsNumberGreaterThan", ErrorsHandler.ensureError(error), message, "String should be a number greater than " + minValue + ".");
        }
    }

    public static assertNumberIncreasedByOne(originalValue: number, newValue: number, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard && this.UseHardAsserts ? expect(newValue).toBe(originalValue + 1) : expect.soft(newValue).toBe(originalValue + 1);
            TestUtilities.logToConsole("Assert PASSED! Number increased by exactly one. Original value: [" + originalValue + "], New value: [" + newValue + "], " + message);
        } catch (error) {
            ErrorsHandler.throwError("assertNumberIncreasedByOne", ErrorsHandler.ensureError(error), message, "Number should have increased by exactly one from original value: [" + originalValue + "] to new value: [" + (originalValue + 1) + "]");
        }
    }

    public static assertNumberDecreasedByOne(originalValue: number, newValue: number, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard && this.UseHardAsserts ? expect(newValue).toBe(originalValue - 1) : expect.soft(newValue).toBe(originalValue - 1);
            TestUtilities.logToConsole("Assert PASSED! Number decreased by exactly one. Original value: [" + originalValue + "], New value: [" + newValue + "], " + message);
        } catch (error) {
            ErrorsHandler.throwError("assertNumberDecreasedByOne", ErrorsHandler.ensureError(error), message, "Number should have decreased by exactly one from original value: [" + originalValue + "] to new value: [" + (originalValue - 1) + "]");
        }
    }

    //----------------------------------------- BINARY TESTING -----------------------------------------

    public static assertTrue(condition: boolean, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard && this.UseHardAsserts ? expect(condition).toBe(true) : expect.soft(condition).toBe(true);
            TestUtilities.logToConsole("Assert PASSED! Condition is true: " + message);
        } catch (error) {
            ErrorsHandler.throwError(
                "assertTrue", ErrorsHandler.ensureError(error), message, "Condition should be true."
            );
        }
    }

    public static assertFalse(condition: boolean, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard && this.UseHardAsserts ? expect(condition).toBe(false) : expect.soft(condition).toBe(false);
            TestUtilities.logToConsole("Assert PASSED! Condition is false: " + message);
        } catch (error) {
            ErrorsHandler.throwError("assertFalse", ErrorsHandler.ensureError(error), message, "Condition should be false.");
        }
    }

    //----------------------------------------- CONTAINS TESTING -----------------------------------------

    public static assertStringContains(outerString: string, innerString: string, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard && this.UseHardAsserts ? expect(outerString.includes(innerString)).toBe(true) : expect.soft(outerString.includes(innerString)).toBe(true);
            TestUtilities.logToConsole("Assert PASSED! [" + innerString + "] is contained within [" + outerString + "] " + message);
        } catch (error) {
            ErrorsHandler.throwError("assertStringContains", ErrorsHandler.ensureError(error), message, "[" + innerString + "] should be contained within [" + outerString + "]");
        }
    }

    public static assertStringDoesNotContain(outerString: string, innerString: string, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard && this.UseHardAsserts ? expect(outerString.includes(innerString)).toBe(false) : expect.soft(outerString.includes(innerString)).toBe(false)
            TestUtilities.logToConsole("Assert PASSED! [" + innerString + "] is not contained within [" + outerString + "] " + message);
        } catch (error) {
            ErrorsHandler.throwError("assertStringDoesNotContain", ErrorsHandler.ensureError(error), message, "[" + innerString + "] should NOT be contained within [" + outerString + "]");
        }
    }

    public static assertArrayContains(array: any[], item: any, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard && this.UseHardAsserts ? expect(array).toContain(item) : expect.soft(array).toContain(item);
            TestUtilities.logToConsole("Assert PASSED! Array contains item: " + message);
        } catch (error) {
            ErrorsHandler.throwError("assertArrayContains", ErrorsHandler.ensureError(error), message, "Array should contain the item.");
        }
    }

    public static assertArrayDoesNotContain(array: any[], item: any, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard && this.UseHardAsserts ? expect(array).not.toContain(item) : expect.soft(array).not.toContain(item);
            TestUtilities.logToConsole("Assert PASSED! Array does not contain item: " + message);
        } catch (error) {
            ErrorsHandler.throwError("assertArrayDoesNotContain", ErrorsHandler.ensureError(error), message, "Array should NOT contain the item.");
        }
    }

    //----------------------------------------- EQUALITY TESTING -----------------------------------------

    public static assertEquals(expectedValue: number | string, actualValue: number | string, message: string, trueIfHard : boolean = true): void {
        try {            
            trueIfHard && this.UseHardAsserts ? expect(actualValue).toBe(expectedValue) : expect.soft(actualValue).toBe(expectedValue); // ToDo REPLICATE THIS IN THE REMAINING ASSERTS
            TestUtilities.logToConsole("Assert PASSED! [" + expectedValue + "] is equal to [" + actualValue + "] " + message);
        } catch (error) {
            ErrorsHandler.throwError("assertEquals", ErrorsHandler.ensureError(error), message, "[" + actualValue + "] should be equal to [" + expectedValue + "]");
        }
    }

    public static assertNotEquals(value1: number | string, value2: number | string, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard && this.UseHardAsserts ? expect(value2).not.toBe(value1) : expect.soft(value2).not.toBe(value1);
            TestUtilities.logToConsole("Assert PASSED! [" + value1 + "] is not equal to [" + value2 + "] " + message);
        } catch (error) {
            ErrorsHandler.throwError(
                "assertNotEquals",
                ErrorsHandler.ensureError(error),
                message,
                "[" + value2 + "] should NOT be equal to [" + value1 + "]"
            );
        }
    }

    public static assertObjectsEqual(expectedObject: object, actualObject: object, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard && this.UseHardAsserts ? expect(actualObject).toEqual(expectedObject) : expect.soft(actualObject).toEqual(expectedObject);
            TestUtilities.logToConsole("Assert PASSED! Objects are equal: " + message);
        } catch (error) {
            ErrorsHandler.throwError("assertObjectsEqual", ErrorsHandler.ensureError(error), message, "Objects should be equal.");
        }
    }

    public static assertObjectsNotEqual(object1: object, object2: object, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard && this.UseHardAsserts ? expect(object1).not.toEqual(object2) : expect.soft(object1).not.toEqual(object2);
            TestUtilities.logToConsole("Assert PASSED! Objects are not equal: " + message);
        } catch (error) {
            ErrorsHandler.throwError("assertObjectsNotEqual", ErrorsHandler.ensureError(error), message, "Objects should NOT be equal.");
        }
    }

    //----------------------------------------- NULLNESS TESTING -----------------------------------------

    public static assertStringNullOrEmpty(text: string, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard && this.UseHardAsserts ? expect(TestUtilities.isNullOrEmpty(text)).toBe(true) : expect.soft(TestUtilities.isNullOrEmpty(text)).toBe(true);
            TestUtilities.logToConsole("Assert PASSED! String is null or empty: " + message);
        } catch (error) {
            ErrorsHandler.throwError("assertStringNullOrEmpty", ErrorsHandler.ensureError(error), message, "String should be null or empty.");
        }
    }

    public static assertStringNotNullNorEmpty(text: string, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard && this.UseHardAsserts ? expect(TestUtilities.isNullOrEmpty(text)).toBe(false) : expect.soft(TestUtilities.isNullOrEmpty(text)).toBe(false);
            TestUtilities.logToConsole("Assert PASSED! String is not null nor empty: " + message + " --> " + text);
        } catch (error) {
            ErrorsHandler.throwError("assertStringNotNullNorEmpty", ErrorsHandler.ensureError(error), message, "String should NOT be null nor empty.");
        }
    }

    public static assertObjectNull(object: Object, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard && this.UseHardAsserts ? expect(object).toBeNull() : expect.soft(object).toBeNull();
            TestUtilities.logToConsole("Assert PASSED! Object is null: " + message);
        } catch (error) {
            ErrorsHandler.throwError("assertObjectNull", ErrorsHandler.ensureError(error), message, "Object should be null.");
        }
    }

    public static assertObjectNotNull(object: Object, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard && this.UseHardAsserts ? expect(object).not.toBeNull() : expect.soft(object).not.toBeNull();
            TestUtilities.logToConsole("Assert PASSED! Object is not null: " + message);
        } catch (error) {
            ErrorsHandler.throwError("assertObjectNotNull", ErrorsHandler.ensureError(error), message, "Object should NOT be null.");
        }
    }

    //----------------------------------------- OTHER TESTING -----------------------------------------

    public static assertTruthy(result: any, message: string, trueIfHard : boolean = true): void {
        try {
            //Ensures that value is true in a boolean context, anything but false, 0, '', null, undefined or NaN. Use this method when you don't care about the specific value.
            trueIfHard && this.UseHardAsserts ? expect(result).toBeTruthy() : expect.soft(result).toBeTruthy();
            TestUtilities.logToConsole("Assert PASSED! Result is truthy: " + message);
        } catch (error) {
            ErrorsHandler.throwError("assertTruthy", ErrorsHandler.ensureError(error), message, "Result should be truthy.");
        }
    }

    /*public static assertCorrectZodSchema(jsonResponseFromApi: string, schema : z.ZodType<any, z.ZodTypeDef, any>, message: string, trueIfHard : boolean = true): void {
        const result : z.SafeParseReturnType<any, any>= schema.safeParse(jsonResponseFromApi);
        let itFailed : boolean = false;

        if (!result.success) {
            //console.error("Validation failed. Details:");
            result.error.errors.forEach((err) => {
                console.error(`❌ Path: ${err.path.join('.')} — ${err.message}`);
            });
            itFailed = true;
            const message: string  = "Result should be truthy when JSON corresponds to correct Zod schema. More details are displayed on stderr section on HTML Playwright report"; // a 'throw' happens here, preventing below try-catch block being executed
            const error : Error = new Error("Test case FAILED! " + message);
            throw error;
        } 
        
        try {
            //Ensures that value is true in a boolean context, anything but false, 0, '', null, undefined or NaN. Use this method when you don't care about the specific value.
            trueIfHard && this.UseHardAsserts ? expect(result).toBeTruthy() : expect.soft(result).toBeTruthy();
            TestUtilities.logToConsole("Assert PASSED! Result is truthy when JSON corresponds to correct Zod schema: " + message);
        } 
        // Below 'catch' block will not actually happen, because of above 'return' statement, if we got to the 'try' that means assert was already succesful ( we are just keeping it as second safe and to keep consistency with above asserts)
        catch (error) {
            if (error instanceof Error) {
                ErrorsHandler.throwError("assertTruthy", error, message, "Result should be truthy when JSON corresponds to correct Zod schema.");
            }
        }
    }*/
}
