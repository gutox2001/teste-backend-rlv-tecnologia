import { Injectable } from '@nestjs/common';
import { CitiesRepository } from '../../repositories/implementations/cities.repository';

@Injectable()
export class DeleteCityService {
	constructor(private readonly citiesRepository: CitiesRepository) {}

	async execute(id: number) {
		const city = await this.citiesRepository.findById(Number(id));

		if (!city) {
			throw new Error('City not found');
		}

		return this.citiesRepository.delete(id);
	}
}
