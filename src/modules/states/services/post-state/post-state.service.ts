import { Injectable } from '@nestjs/common';
import { State } from '../../entities/state.entity';
import { StatesRepository } from '../../repositories/implementations/states';
import { CreateStateDto } from '../../dtos/create-states/create-state.dto';

@Injectable()
export class PostStateService {
    constructor(
        private readonly statesRepository: StatesRepository,
    ) { }

    async execute(data: CreateStateDto): Promise<State> {
        const state = await this.statesRepository.create({
            ibgeCode: data.ibge_code,
            uf: data.uf,
        });

        if (!state) {
            throw new Error('State not created');
        }

        return state;
    }
}
