import { Injectable } from '@nestjs/common';
import { CitiesRepository } from '../../repositories/implementations/cities.repository';

@Injectable()
export class DeleteCitiesService {
	constructor(private readonly citiesRepository: CitiesRepository) {}

	async execute() {
		this.citiesRepository.deleteAll();
	}
}
