import { Injectable } from '@nestjs/common';
import { ICreateState } from '../../dtos/create-states/create-state.interface';
import { State } from '../../entities/state.entity';
import { StatesRepository } from '../../repositories/implementations/states';

@Injectable()
export class PostStateService {
    constructor(
        private readonly statesRepository: StatesRepository,
    ) { }

    async execute(data: ICreateState): Promise<State> {
        const state = await this.statesRepository.create(data);

        if (!state) {
            throw new Error('State not created');
        }

        return state;
    }
}
