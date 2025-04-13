import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { HolidaysRepository } from '../../repositories/implementations/holidays.repository';
import { DateProvider } from 'src/common/providers/date-provider/date-provider';

@Injectable()
export class GetHolidayService {
	constructor(
		private readonly holidaysRepository: HolidaysRepository,
		private readonly dateProvider: DateProvider,
	) { }

	// REQUISIÇÃO SERÁ FEITA NO FORMATO 'feriados/4305439/2020-05-01'
	async execute(ibge_code: string, date: string): Promise<string> {
		// Verifica se a data é válida
		if (!this.dateProvider.isDateValid(date)) {
			throw new BadRequestException('Formato de data inválido');
		}

		// Procura entre os feriados nacionais
		const holidaysByType = await this.holidaysRepository.findByType('NACIONAL');

		if (holidaysByType.length === 0) {
			throw new NotFoundException('Nenhum feriado nacional encontrado');
		}

		const resumedDate = this.dateProvider.getMonthAndDay(date);

		// Filtra os feriados nacionais pela data
		const nacionalHolidayByDate = holidaysByType.find(holiday => holiday.date === resumedDate);

		if (nacionalHolidayByDate)
			return nacionalHolidayByDate.name;
		else {
			// Procura entre os feriados estaduais e municipais
			const holidaysByDate = await this.holidaysRepository.findByDate(resumedDate);
			if (holidaysByDate.length === 0) {
				throw new NotFoundException('Nenhum feriado encontrado para a data ' + resumedDate);
			}

			// Verifica entre os feriados municipais
			const cityHoliday = holidaysByDate.find(
				holiday => holiday.city && holiday.city.ibgeCode === ibge_code,
			);

			if (!cityHoliday) {
				// Verifica entre os feriados estaduais
				const stateHoliday = holidaysByDate.find(
					holiday => holiday.state && holiday.state.ibgeCode === ibge_code,
				);

				if (!stateHoliday) {
					const stateHoliday = holidaysByDate.find(
						holiday => holiday.date === resumedDate && holiday.type === 'ESTADUAL',
					);
					if (stateHoliday) {
						return stateHoliday.name;
					} else {
						throw new NotFoundException('Nenhum feriado encontrado');
					}
				}
				return stateHoliday.name;
			}

			return cityHoliday.name;
		}
	}
}
