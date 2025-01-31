export default function convertToIST(milliseconds: number): string {
    if(!milliseconds) return "";
    const date = new Date(milliseconds);

    // Convert to IST (UTC+5:30)
    const options: Intl.DateTimeFormatOptions = { 
        timeZone: "Asia/Kolkata", 
        day: "2-digit", 
        month: "2-digit", 
        year: "numeric" 
    };

    return new Intl.DateTimeFormat("en-IN", options).format(date).replace(/\//g, "-");
}