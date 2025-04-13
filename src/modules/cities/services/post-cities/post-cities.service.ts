import { Injectable } from '@nestjs/common';
import { CitiesRepository } from '../../repositories/implementations/cities.repository';
import { City } from '../../entities/city.entity';
import { CreateCityDto } from '../../dtos/create-cities/create-city.dto';

@Injectable()
export class PostCitiesService {
	constructor(private readonly cityRepository: CitiesRepository) {}

	async execute(cities: CreateCityDto[]): Promise<City[]> {
		let createdCities: City[] = [];

		for (const city of cities) {
			createdCities.push(
				await this.cityRepository.create({
					name: city.name,
					ibgeCode: city.ibge_code,
				}),
			);
		}

		return createdCities;
	}
}
