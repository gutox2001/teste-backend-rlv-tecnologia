import { Injectable, NotFoundException } from '@nestjs/common';
import { StatesRepository } from '../../repositories/implementations/states';
import { State } from '../../entities/state.entity';

@Injectable()
export class GetStateService {
	constructor(private readonly statesRepository: StatesRepository) {}

	async execute(id: number): Promise<State | null> {
		const state = await this.statesRepository.findById(Number(id));

		if (!state) {
			throw new NotFoundException('Estado não encontrado');
		}

		return state;
	}

	async executeByIbgeCode(ibge_code: string): Promise<State | null> {
		const state = await this.statesRepository.findByIbgeCode(ibge_code);

		if (!state) {
			throw new NotFoundException('Estado não encontrado');
		}

		return state;
	}

	async executeByUf(uf: string): Promise<State | null> {
		const state = await this.statesRepository.findByUf(uf);

		if (!state) {
			throw new NotFoundException('Estado não encontrado');
		}

		return state;
	}
}
