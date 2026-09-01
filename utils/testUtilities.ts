export class TestUtilities {
    public static logToConsole(message: string): void {
        const timestamp: string = TestUtilities.returnCurrentTimeStamp();
        console.log(`${timestamp}: ${message}`);
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
}