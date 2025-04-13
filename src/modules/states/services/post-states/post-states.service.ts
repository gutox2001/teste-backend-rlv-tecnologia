import { BadRequestException, Injectable } from '@nestjs/common';

import { State } from '../../entities/state.entity';
import { StatesRepository } from '../../repositories/implementations/states';
import { CreateStateDto } from '../../dtos/create-states/create-state.dto';

@Injectable()
export class PostStatesService {
	constructor(private readonly statesRepository: StatesRepository) {}

	async execute(states: CreateStateDto[]): Promise<State[]> {
		let createdStates: State[] = [];

		for (const state of states) {
			const newState = await this.statesRepository.create({
				uf: state.uf,
				ibgeCode: state.ibge_code,
			});

			if (!newState) {
				throw new BadRequestException('Erro ao criar estado ' + state.ibge_code);
			}
			createdStates.push(newState);
		}

		return createdStates;
	}
}
