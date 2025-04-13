import { Injectable, NotFoundException } from '@nestjs/common';
import { StatesRepository } from '../../repositories/implementations/states';

@Injectable()
export class DeleteStateService {
	constructor(private readonly statesRepository: StatesRepository) {}

	async execute(id: number) {
		const state = await this.statesRepository.findById(Number(id));

		if (!state) {
			throw new NotFoundException('Estado não encontrado');
		}

		return this.statesRepository.delete(id);
	}
}
