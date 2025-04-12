import { Injectable } from '@nestjs/common';
import { StatesRepository } from '../../repositories/implementations/states';
import { State } from '../../entities/state.entity';

@Injectable()
export class GetStateService {
    constructor(
        private readonly statesRepository: StatesRepository,
    ) { }

    async execute(id: number): Promise<State | null> {
        const state = await this.statesRepository.findById(Number(id));

        if (!state) {
            throw new Error('State not found');
        }

        return state;
    }

    async executeByPrefix(prefix: number): Promise<State | null> {
        const state = await this.statesRepository.findByPrefix(Number(prefix));

        if (!state) {
            throw new Error('State not found');
        }

        return state;
    }

    async executeByUf(uf: string): Promise<State | null> {
        const state = await this.statesRepository.findByUf(uf);

        if (!state) {
            throw new Error('State not found');
        }

        return state;
    }
}
