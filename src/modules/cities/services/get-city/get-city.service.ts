import { Injectable } from '@nestjs/common';
import { CitiesRepository } from '../../repositories/implementations/cities.repository';
import { City } from '../../entities/city.entity';

@Injectable()
export class GetCityService {
    constructor(
        private readonly citiesRepository: CitiesRepository,
    ) { }

    async executeByIbgeCode(ibge_code: string): Promise<City | null> {
        const city = await this.citiesRepository.findByIbgeCode(ibge_code);

        return city;
    }

    async executeByName(name: string) {
        const city = await this.citiesRepository.findByName(name);

        return city;
    }

    async executeById(id: number) {
        const city = await this.citiesRepository.findById(id);

        return city;
    }
}
