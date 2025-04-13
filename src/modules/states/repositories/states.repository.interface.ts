import { DeleteResult } from 'typeorm';
import { ICreateState } from '../dtos/create-states/create-state.interface';
import { State } from '../entities/state.entity';

export interface IStatesRepository {
	findAll(): Promise<State[]>;
	findById(id: number): Promise<State | null>;
	findByIbgeCode(ibge_code: string): Promise<State | null>;
	findByUf(uf: string): Promise<State | null>;
	create(data: ICreateState): Promise<State>;
	// update(id: number, data: any): Promise<State | null>;
	delete(id: number): Promise<DeleteResult>;
	deleteAll(): Promise<DeleteResult>;
}
