import { Injectable } from '@nestjs/common';
import { CitiesRepository } from '../../repositories/implementations/cities.repository';
import { ICreateCity } from '../../dtos/create-cities/create-city.interface';
import { City } from '../../entities/city.entity';

@Injectable()
export class PostCitiesService {
	constructor(private readonly cityRepository: CitiesRepository) {}

	async execute(cities: ICreateCity[]): Promise<City[]> {
		let createdCities: City[] = [];

		for (const city of cities) {
            createdCities.push(await this.cityRepository.create(city));
		}

        return createdCities;
	}
}
