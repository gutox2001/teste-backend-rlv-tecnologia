import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { HolidaysRepository } from '../../repositories/implementations/holidays.repository';
import { DateProvider } from 'src/common/providers/date-provider/date-provider';
import { StatesRepository } from 'src/modules/states/repositories/implementations/states';
import { CitiesRepository } from 'src/modules/cities/repositories/implementations/cities.repository';
import { State } from 'src/modules/states/entities/state.entity';
import { City } from 'src/modules/cities/entities/city.entity';

@Injectable()
export class DeleteHolidayService {
	constructor(
		private readonly holidaysRepository: HolidaysRepository,
		private readonly dateProvider: DateProvider,
		private readonly statesRepository: StatesRepository,
		private readonly citiesRepository: CitiesRepository,
	) {}

	async execute(ibge_code: string, date: string): Promise<void> {
		// Verifica se a data é válida
		if (!this.dateProvider.isDateValid(date)) {
			throw new BadRequestException('Data inválida', date);
		}

		const resumedDate = this.dateProvider.getMonthAndDay(date);

		const holidaysByDate = await this.holidaysRepository.findByDate(date);
		if (holidaysByDate.length === 0) {
			throw new NotFoundException('Nenhum feriado encontrado para a data', date);
		}

		if (holidaysByDate[0].type === 'NACIONAL') {
			throw new ForbiddenException('Não é possível deletar feriados nacionais!');
		}

		// Verifica se o código IBGE é válido
		switch (ibge_code.length) {
			case 2:
				this.verifyStateIbgeCode(ibge_code);

				const stateHolidays = await this.holidaysRepository.findByStateIbgeCode(ibge_code);
				if (!stateHolidays || stateHolidays.length === 0) {
					throw new NotFoundException('Nenhum feriado encontrado para o estado'+ ibge_code);
				}

				const stateHoliday = stateHolidays.find(holiday => holiday.date === resumedDate);
				if (!stateHoliday) {
					throw new NotFoundException('Nenhum feriado encontrado para o estado', ibge_code);
				}

				await this.holidaysRepository.delete(stateHoliday.id);
				break;
			
			case 7:
				this.verifyCityIbgeCode(ibge_code);

				// Verifica se o feriado já está cadastrado no estado, se sim município não pode mudar
				const temp = holidaysByDate.find(holiday => holiday.type === 'ESTADUAL');
				if (temp?.date === resumedDate) {
					throw new ForbiddenException('Não é possível deletar feriados estaduais!');
				}

				const cityHolidays = await this.holidaysRepository.findByCityIbgeCode(ibge_code);
				if (!cityHolidays || cityHolidays.length === 0) {
					throw new NotFoundException('Nenhum feriado encontrado para o município' + ibge_code);
				}

				const cityHoliday = cityHolidays.find(holiday => holiday.date === resumedDate);
				if (!cityHoliday) {
					throw new NotFoundException('Nenhum feriado encontrado para o município', ibge_code);
				}

				await this.holidaysRepository.delete(cityHoliday.id);
				break;
		
			default:
				throw new BadRequestException('Código IBGE inválido', ibge_code);
				// O código IBGE deve ter 2 ou 7 dígitos
		}
	}

	// Esse método valida o formato do código IBGE do estado (2 dígitos)
		async verifyStateIbgeCode(ibge_code: string): Promise<State> {
			const state = await this.statesRepository.findByIbgeCode(ibge_code);
			if (!state) {
				throw new NotFoundException('Estado não encontrado!');
			}
	
			return state;
		}
	
		// Esse método valida o formato do código IBGE da cidade (7 dígitos)
		async verifyCityIbgeCode(ibge_code: string): Promise<City> {
			const city = await this.citiesRepository.findByIbgeCode(ibge_code);
			if (!city) {
				throw new NotFoundException('Município não encontrado!');
			}
	
			return city;
		}
}
