import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { HolidaysRepository } from '../../repositories/implementations/holidays.repository';
import { StatesRepository } from 'src/modules/states/repositories/implementations/states';
import { CitiesRepository } from 'src/modules/cities/repositories/implementations/cities.repository';

import { DateProvider } from 'src/common/providers/date-provider/date-provider';
import { State } from 'src/modules/states/entities/state.entity';
import { City } from 'src/modules/cities/entities/city.entity';
import { Holiday } from '../../entities/holiday.entity';

@Injectable()
export class PutHolidayService {
	constructor(
		private readonly holidaysRepository: HolidaysRepository,
		private readonly statesRepository: StatesRepository,
		private readonly citiesRepository: CitiesRepository,
		private readonly dateProvider: DateProvider,
	) {}

	async execute(ibge_code: string, date: string, name: string): Promise<Holiday> {
		// Valida o formato da data
		if (!this.dateProvider.isDateValid(date)) {
			throw new BadRequestException('Formato de data inválido');
		}

		// Obtém todos os feriados nacionais do banco de dados
		const holidaysByType = await this.holidaysRepository.findByType('NACIONAL');
		if (holidaysByType.length === 0) {
			throw new NotFoundException('Nenhum feriado nacional encontrado');
		}

		const resumedDate = this.dateProvider.getMonthAndDay(date);

		// Verifica se o feriado é nacional
		const nationalHoliday = holidaysByType.find(holiday => holiday.date === resumedDate);
		if (nationalHoliday) {
			return nationalHoliday;
		} else {
			// Nesse caso será um feriado estadual ou municipal

			switch (ibge_code.length) {
				// Em caso de feriado estadual:
				case 2:
					// Verifica se o código IBGE do estado existe
					const tempState = await this.verifyStateIbgeCode(ibge_code);

					// Verifica se o feriado já existe no estado
					const stateHolidays = (await this.holidaysRepository.findByStateIbgeCode(ibge_code))
					const stateHoliday = stateHolidays.find(
						holiday => holiday.date === resumedDate,
					);

					// Caso o feriado não exista é necessário criar um novo
					if (!stateHoliday) {
						// Cria o novo feriado estadual,  relacionando-o com a tabela State
						const newStateHoliday = this.holidaysRepository.create({
							name,
							date: resumedDate,
							type: 'ESTADUAL',
							stateId: tempState.id,
						});

						return newStateHoliday;
					} else {
						// Caso o feriado já exista, atualiza o nome
						stateHoliday.name = name;

						// Atualiza o nome do feriado estadual
						return await this.holidaysRepository.update(stateHoliday.id, {
							id: stateHoliday.id,
							name: name,
							date: resumedDate,
							type: 'ESTADUAL',
							state: tempState,
						});
					}

				// Em caso de feriado municipal:
				case 7:
					// Verifica se o código IBGE da cidade existe
					const tempCity = await this.verifyCityIbgeCode(ibge_code);

					// Verifica se o feriado já existe na cidade
					const cityHoliday = (await this.holidaysRepository.findByCityIbgeCode(ibge_code)).find(
						holiday => holiday.date === resumedDate,
					);

					// Caso o feriado não exista é necessário criar um novo
					if (!cityHoliday) {
						// Cria o novo feriado municipal,  relacionando-o com a tabela City
						const newCityHoliday = this.holidaysRepository.create({
							name,
							date: resumedDate,
							type: 'MUNICIPAL',
							cityId: tempCity.id,
						});

						return newCityHoliday;
					} else {
						// Caso o feriado já exista, atualiza o nome
						cityHoliday.name = name;

						// Atualiza o nome do feriado municipal
						return await this.holidaysRepository.update(cityHoliday.id, {
							id: cityHoliday.id,
							name: name,
							date: resumedDate,
							type: 'MUNICIPAL',
							city: tempCity,
						});
					}

				default:
					throw new BadRequestException('Formato de código IBGE inválido, deve ter 2 ou 7 dígitos');
			}
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
