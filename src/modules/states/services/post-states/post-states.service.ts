import { Injectable } from '@nestjs/common';

import { State } from '../../entities/state.entity';
import { StatesRepository } from '../../repositories/implementations/states';
import { CreateStateDto } from '../../dtos/create-states/create-state.dto';

@Injectable()
export class PostStatesService {
    constructor(
        private readonly statesRepository: StatesRepository
    ) { }

    async execute(states: CreateStateDto[]): Promise<State[]> {
        let createdStates: State[] = [];

        for (const state of states) {
            createdStates.push(await this.statesRepository.create({
                ibgeCode: state.ibge_code,
                uf: state.uf,
            }));
        }

        return createdStates;
    }
}
