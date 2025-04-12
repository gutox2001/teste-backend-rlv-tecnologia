import { Injectable } from '@nestjs/common';
import { CitiesRepository } from '../../repositories/implementations/cities.repository';

@Injectable()
export class GetCitiesService {
    constructor(
        private readonly citiesRepository: CitiesRepository,
    ) { }

    async execute() {
        const cities = await this.citiesRepository.findAll();
        
        return cities;
    }
}
