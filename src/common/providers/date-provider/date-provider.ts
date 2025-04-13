import { BadRequestException } from '@nestjs/common';
import { IDateProvider } from './date-provider.interface';

export class DateProvider implements IDateProvider {
	constructor(
		private readonly fullDateRegex: RegExp = /^\d{4}-\d{2}-\d{2}$/,
		private readonly monthDayRegex: RegExp = /^\d{2}-\d{2}$/,
	) {}

	// Retorna a data atual no formato YYYY-MM-DD
	dateNow(): string {
		const now = new Date();
		return now.toISOString().split('T')[0];
	}

	// Determina o formato da data (Full: YYYY-MM-DD, Short: MM-DD)
	testRegex(date: string): 'Full' | 'Short' {
		if (this.fullDateRegex.test(date)) return 'Full';
		if (this.monthDayRegex.test(date)) return 'Short';

		throw new BadRequestException('Formato de data inválido. Use YYYY-MM-DD ou MM-DD');
	}

	// Verifica se a data informada é válida
	isDateValid(date: string): boolean {
		const format = this.testRegex(date);

		if (format === 'Full') {
			const [yearStr, monthStr, dayStr] = date.split('-');

			if (!this.isYearValid(yearStr)) throw new BadRequestException(`Ano inválido: ${yearStr}`);

			if (!this.isMonthValid(monthStr)) throw new BadRequestException(`Mês inválido: ${monthStr}`);

			if (!this.isDayValid(monthStr, dayStr, parseInt(yearStr, 10))) {
				throw new BadRequestException(`Dia inválido: ${dayStr} para o mês ${monthStr}`);
			}
			return true;
		}

		if (format === 'Short') {
			const [monthStr, dayStr] = date.split('-');

			if (!this.isMonthValid(monthStr)) throw new BadRequestException(`Mês inválido: ${monthStr}`);

			if (!this.isDayValid(monthStr, dayStr, 2024)) {
				throw new BadRequestException(`Dia inválido: ${dayStr} para o mês ${monthStr}`);
			}
			return true;
		}

		return false;
	}

	// Diferença em dias entre duas datas no formato YYYY-MM-DD
	differenceInDays(startDate: string, endDate: string): number {
		const start = new Date(startDate);
		const end = new Date(endDate);

		if (isNaN(start.getTime()) || isNaN(end.getTime())) {
			throw new BadRequestException('Datas inválidas para cálculo');
		}

		const diffTime = Math.abs(end.getTime() - start.getTime());
		return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	}

	isMonthValid(month: string): boolean {
		const m = parseInt(month, 10);
		return month.length === 2 && m >= 1 && m <= 12;
	}

	isYearValid(year: string): boolean {
		return year.length === 4 && !isNaN(parseInt(year, 10));
	}

	isDayValid(month: string, day: string, year: number): boolean {
		const m = parseInt(month, 10);
		const d = parseInt(day, 10);

		if (isNaN(m) || isNaN(d)) return false;

		// Usa 0 para o dia seguinte ao último do mês
		const daysInMonth = new Date(year, m, 0).getDate();
		return day.length === 2 && d >= 1 && d <= daysInMonth;
	}

	getMonthAndDay(date: string): string {
		// Entrada no formato YYYY-MM-DD ou MM-DD
		// Saída no formato MM-DD
		const format = this.testRegex(date);
		
		if (format === 'Full') {
			// Retorna o mês e o dia no formato MM-DD
			return date.slice(5);
		} else {
			return date;
		}
	}

	getYear(date: string): string {
		const format = this.testRegex(date);
		if (format === 'Full') {
			return date.slice(0, 4);
		} else {
			return '2024'; // Retorna um ano padrão para datas curtas
		}
	}
}
