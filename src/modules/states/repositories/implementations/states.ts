import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';

import { STATE_REPOSITORY } from 'src/modules/database/constants';
import { IStatesRepository } from '../states.repository.interface';

import { ICreateState } from '../../dtos/create-states/create-state.interface';
import { State } from '../../entities/state.entity';

@Injectable()
export class StatesRepository implements IStatesRepository {
	constructor(
		@Inject(STATE_REPOSITORY)
		private stateRepository: Repository<State>,
	) { }

	async findAll(): Promise<State[]> {
		return this.stateRepository.find();
	}

	findById(id: number): Promise<State | null> {
		const state = this.stateRepository.findOne({
			select: {
				id: true,
				ibgeCode: true,
				uf: true,
			},
			where: {
				id: id,
			},
		});

		return state;
	}

	findByIbgeCode(ibge_code: string): Promise<State | null> {
		const city = this.stateRepository.findOne({
			select: {
				id: true,
				ibgeCode: true,
				uf: true,
			},
			where: {
				ibgeCode: ibge_code,
			},
		});

		return city;
	}

	findByUf(uf: string): Promise<State | null> {
		const state = this.stateRepository.findOne({
			select: {
				id: true,
				ibgeCode: true,
				uf: true,
			},
			where: {
				uf: uf,
			},
		});

		return state;
	}

	create(data: ICreateState): Promise<State> {
		const newState = this.stateRepository.create(data);

		return this.stateRepository.save(newState);
	}

	delete(id: number): Promise<DeleteResult> {
		return this.stateRepository.delete(id);
	}

	deleteAll(): Promise<DeleteResult> {
		return this.stateRepository.delete({});
	}
}
