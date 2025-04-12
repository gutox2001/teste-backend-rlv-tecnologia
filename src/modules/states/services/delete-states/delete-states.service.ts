import { Injectable } from '@nestjs/common';
import { StatesRepository } from '../../repositories/implementations/states';

@Injectable()
export class DeleteStatesService {
    constructor(
        private readonly statesRepository: StatesRepository,
    ) { }

    async execute() {
        const states = await this.statesRepository.findAll();

        if (!states) {
            throw new Error('States not found');
        }

        return this.statesRepository.deleteAll();
    }
}
