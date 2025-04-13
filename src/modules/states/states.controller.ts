import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';

import { DeleteStateService } from './services/delete-state/delete-state.service';
import { DeleteStatesService } from './services/delete-states/delete-states.service';
import { GetStateService } from './services/get-state/get-state.service';
import { GetStatesService } from './services/get-states/get-states.service';
import { PostStateService } from './services/post-state/post-state.service';
import { PostStatesService } from './services/post-states/post-states.service';
import { CreateStateDto } from './dtos/create-states/create-state.dto';
import { State } from './entities/state.entity';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Estados')
@Controller('estados')
export class StatesController {
    constructor(
        private readonly postStateService: PostStateService,
        private readonly deleteStateService: DeleteStateService,
        private readonly deleteStatesService: DeleteStatesService,
        private readonly getStatesService: GetStatesService,
        private readonly getStateService: GetStateService,
        private readonly postStatesService: PostStatesService,
    ) { }

    @Post('')
    @ApiOperation({
        summary: 'Cria um novo estado',
        description: 'Essa rota cria um novo estado no banco de dados do sistema.',
    })
    @ApiResponse({
        status: 200,
        description: 'Estado criado com sucesso',
        type: State,
    })
    @ApiResponse({
        status: 400,
        description: 'Erro ao criar o estado',
        type: String,
    })
    @ApiBody({
        description: 'Dados do estado a ser criado',
        type: CreateStateDto,
    })
    async createState(@Body() createStateDto: CreateStateDto): Promise<State> {
        // Logic to create a new city
        const newState = await this.postStateService.execute(createStateDto);

        return newState;
    }

    @ApiOperation({
        summary: 'Cria novos estados',
        description: 'Essa rota cria um novo conjunto de estados no banco de dados do sistema.',
    })
    @Post('todos')
    @ApiBody({
        description: 'Array de estados a serem criados',
        type: [CreateStateDto],
    })
    @ApiResponse({
        status: 201,
        description: 'States created successfully.',
        type: [State],
    })
    async createStates(@Body() createStateDto: CreateStateDto[]): Promise<State[]> {
        // Logic to create multiple cities
        const newStates = await this.postStatesService.execute(createStateDto);

        return newStates;
    }

    @Get('todos')
    async getAllStates(): Promise<State[]> {
        const states = await this.getStatesService.execute();

        return states;
    }

    @Get('ibge-code/:ibge_code')
    async getStateByIbgeCode(@Param('ibge_code') ibge_code: string): Promise<State | null> {
        const state = await this.getStateService.executeByIbgeCode(ibge_code);

        return state;
    }

    @Delete(':id')
    async deleteState(@Param('id') id: number): Promise<void> {
        await this.deleteStateService.execute(id);
    }

    @Delete('todos')
    async deleteAllStates(): Promise<void> {
        await this.deleteStatesService.execute();
    }
}
