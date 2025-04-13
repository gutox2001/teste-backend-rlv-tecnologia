import { Injectable, NotFoundException } from '@nestjs/common';
import { StatesRepository } from '../../repositories/implementations/states';

@Injectable()
export class DeleteStatesService {
	constructor(private readonly statesRepository: StatesRepository) {}

	async execute() {
		const states = await this.statesRepository.findAll();

		if (!states) {
			throw new NotFoundException('Nenhum estado encontrado');
		}

		return this.statesRepository.deleteAll();
	}
}
