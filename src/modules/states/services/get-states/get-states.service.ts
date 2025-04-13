import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { StatesRepository } from '../../repositories/implementations/states';
import { State } from '../../entities/state.entity';

@Injectable()
export class GetStatesService {
	constructor(private readonly statesRepository: StatesRepository) {}

	async execute(): Promise<State[]> {
		const states = await this.statesRepository.findAll();

		if (!states) {
			throw new InternalServerErrorException('Erro ao buscar estados');
		}

		return states;
	}
}
