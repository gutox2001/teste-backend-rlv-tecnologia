import { Injectable } from '@nestjs/common';
import { CitiesRepository } from '../../repositories/implementations/cities.repository';
import { City } from '../../entities/city.entity';

@Injectable()
export class PostCityService {
	constructor(
		private readonly citiesRepository: CitiesRepository, // Replace with actual repository type
	) {}

	async execute(cityData: any): Promise<City> {
		const city = this.citiesRepository.create(cityData);

		return city;
	}
}
