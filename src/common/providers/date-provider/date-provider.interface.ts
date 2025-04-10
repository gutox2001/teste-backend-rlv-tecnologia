export interface IDateProvider {
    dateNow(): string;
    testRegex(date: string): string;
    isDateValid(date: string): boolean;
    differenceInDays(startDate: string, endDate: string): number;
    isMonthValid(month: string): boolean;
    isYearValid(year: string): boolean;
    isDayValid(month: string, day: string): boolean;
}