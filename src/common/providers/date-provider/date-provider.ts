import { IDateProvider } from './date-provider.interface';

export class DateProvider implements IDateProvider {
	constructor(
		// Regex for full date in format YYYY-MM-DD
		private readonly fullDateRegex: RegExp = /^\d{4}-\d{2}-\d{2}$/,
		// Regex for month and day in format MM-DD
		private readonly monthDayRegex: RegExp = /^\d{2}-\d{2}$/,
	) {}

	// Obtém a data atual no formato YYYY-MM-DD
	dateNow(): string {
		const now = new Date();
		return now.toISOString().split('T')[0];
	}

	// Verifica qual o formato da data
	testRegex(date: string): string {
		if (this.fullDateRegex.test(date)) {
			return 'Full';
		} else if (this.monthDayRegex.test(date)) {
			return 'Short';
		} else {
			return 'Invalid';
		}
	}

	isDateValid(date: string): boolean {
		const testRegexResult = this.testRegex(date);
		let year;
		let month;
		let day;

		switch (testRegexResult) {
			case 'Full':
				year = date.split('-')[0];
				month = date.split('-')[1];
				day = date.split('-')[2];

				return this.isYearValid(year) && this.isMonthValid(month) && this.isDayValid(month, day);
			case 'Short':
				month = date.split('-')[0];
				day = date.split('-')[1];

				return this.isMonthValid(day) && this.isDayValid(month, day);

			default:
				return false;
		}
	}

	differenceInDays(startDate: string, endDate: string): number {
		const start = new Date(startDate);
		const end = new Date(endDate);
		const diffTime = Math.abs(end.getTime() - start.getTime());
		return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	}

	isMonthValid(month: string): boolean {
		if (month.length !== 2) {
			return false;
		}

		return parseInt(month, 10) > 0 && parseInt(month, 10) <= 12;
	}

	isYearValid(year: string): boolean {
		if (year.length !== 4) {
			return false;
		}

		return true;
	}

	isDayValid(month: string, day: string): boolean {
		const daysInMonth = new Date(2024, parseInt(month, 10), 0).getDate(); // Using a fixed year for calculation

		return parseInt(day, 10) > 0 && parseInt(day, 10) <= daysInMonth;
	}
}
