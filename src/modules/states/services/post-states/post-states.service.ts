import { Injectable } from '@nestjs/common';

import { ICreateState } from '../../dtos/create-states/create-state.interface';
import { State } from '../../entities/state.entity';
import { StatesRepository } from '../../repositories/implementations/states';

@Injectable()
export class PostStatesService {
    constructor(
        private readonly statesRepository: StatesRepository
    ) { }

    async execute(states: ICreateState[]): Promise<State[]> {
        let createdStates: State[] = [];

        for (const state of states) {
            createdStates.push(await this.statesRepository.create(state));
        }

        return createdStates;
    }
}
