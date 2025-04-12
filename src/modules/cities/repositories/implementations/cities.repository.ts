import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { ICitiesRepository } from '../cities.repository.interface';
import { City } from '../../entities/city.entity';
import { CITY_REPOSITORY } from 'src/modules/database/constants';
import { ICreateCity } from '../../dtos/create-cities/create-city.interface';

@Injectable()
export class CitiesRepository implements ICitiesRepository {
	constructor(
		@Inject(CITY_REPOSITORY)
		private cityRepository: Repository<City>,
	) {}

	async findAll(): Promise<City[]> {
		return this.cityRepository.find();
	}

	findById(id: number): Promise<City | null> {
		const city = this.cityRepository.findOne({
			select: {
				id: true,
				name: true,
				ibge_code: true,
			},
			where: {
				id: id,
			},
		});

		return city;
	}

	findByIbgeCode(ibge_code: string): Promise<City | null> {
		const city = this.cityRepository.findOne({
			select: {
				id: true,
				name: true,
				ibge_code: true,
			},
			where: {
				ibge_code: ibge_code,
			},
		});

		return city;
	}

	findByName(name: string): Promise<City | null> {
		const city = this.cityRepository.findOne({
			select: {
				id: true,
				name: true,
				ibge_code: true,
			},
			where: {
				name: name,
			},
		});

		return city;
	}

	create(data: ICreateCity): Promise<City> {
		const newCity = this.cityRepository.create(data);

		return this.cityRepository.save(newCity);
	}

	delete(id: number): Promise<DeleteResult> {
		return this.cityRepository.delete(id);
	}

	deleteAll(): Promise<DeleteResult> {
		return this.cityRepository.delete({});
	}
}
