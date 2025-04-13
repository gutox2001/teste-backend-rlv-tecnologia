import { DeleteResult } from 'typeorm';
import { ICreateCity } from '../dtos/create-cities/create-city.interface';
import { City } from '../entities/city.entity';

export interface ICitiesRepository {
	findAll(): Promise<City[]>;
	findById(id: number): Promise<City | null>;
	findByIbgeCode(ibge_code: string): Promise<City | null>;
	findByName(name: string): Promise<City | null>;
	create(data: ICreateCity): Promise<City>;
	// update(id: number, data: any): Promise<City | null>;
	delete(id: number): Promise<DeleteResult>;
	deleteAll(): Promise<DeleteResult>;
}
