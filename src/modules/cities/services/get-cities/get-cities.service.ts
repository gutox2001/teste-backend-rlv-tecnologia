import { Injectable } from '@nestjs/common';
import { CitiesRepository } from '../../repositories/implementations/cities.repository';
import { City } from '../../entities/city.entity';

@Injectable()
export class GetCitiesService {
	constructor(private readonly citiesRepository: CitiesRepository) {}

	async execute(): Promise<City[]> {
		const cities = await this.citiesRepository.findAll();

		return cities;
	}
}
