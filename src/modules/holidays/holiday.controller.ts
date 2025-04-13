import { Body, Controller, Delete, Get, Param, Put, Response, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostNacionalHolidaysService } from './services/post-nacional-holidays/post-nacional-holidays.service';
import { GetHolidayService } from './services/get-holiday/get-holiday.service';
import { DeleteHolidayService } from './services/delete-holiday/delete-holiday.service';
import { PutHolidayService } from './services/put-holiday/put-holiday.service';
import { ICreateHoliday } from './dtos/create-holiday/create-holiday.interface';
import { GetHolidaysService } from './services/get-holidays/get-holidays.service';
import { Holiday } from './entities/holiday.entity';
import { CreateHolidayDto } from './dtos/create-holiday/create-holiday.dto';

@ApiTags('Feriados')
@Controller('feriados')
export class HolidayController {
	constructor(
		private readonly getHolidayService: GetHolidayService,
		private readonly getHolidaysService: GetHolidaysService,
		private readonly postNacionalHolidaysService: PostNacionalHolidaysService,
		private readonly putHolidayService: PutHolidayService,
		private readonly deleteHolidayService: DeleteHolidayService,
	) {}

	@Get(':ibge_code/:date')
	@ApiResponse({
		status: 200,
		description: 'Retorna o nome do feriado',
	})
	@ApiResponse({
		status: 404,
		description: 'Feriado não encontrado',
	})
	@ApiResponse({
		status: 500,
		description: 'Erro interno do servidor',
	})
	@ApiOperation({
		summary: 'Obtém um feriado',
		description: 'Obtém o feriado com base no código IBGE e na data',
	})
	async getHoliday(@Param('ibge_code') ibge_code: string, @Param('date') date: string): Promise<string> {
		return this.getHolidayService.execute(ibge_code, date);
	}

	@Get('todos')
	@ApiResponse({
		status: 200,
		description: 'Retorna todos os feriados',
	})
	@ApiResponse({
		status: 500,
		description: 'Erro interno do servidor',
	})
	@ApiOperation({
		summary: 'Obtém todos os feriados',
		description: 'Obtém todos os feriados do banco de dados',
	})
	async getHolidays(): Promise<Holiday[]> {
		return this.getHolidaysService.execute();
	}

	@Post('')
	@ApiOperation({
		summary: 'Cria feriados nacionais',
	})
	@ApiResponse({
		status: 201,
		description: 'Feriados nacionais criados com sucesso',
	})
	@ApiResponse({
		status: 400,
		description: 'Erro ao criar feriados nacionais',
	})
	@ApiBody({
		description: 'Array de feriados nacionais a serem criados',
		type: [CreateHolidayDto],
	})
	async createNacionalHolidays(@Body() nacionalHolidays: ICreateHoliday[]) {
		return this.postNacionalHolidaysService.execute(nacionalHolidays);
	}

	@Put(':ibge_code/:date')
	@ApiOperation({ summary: 'Atualiza ou cria feriado baseado no código IBGE e data' })
	@ApiResponse({ status: 200, description: 'Feriado já existente atualizado com sucesso' })
	@ApiResponse({ status: 201, description: 'Feriado criado com sucesso' })
	async updateHolidays(
		@Param('ibge_code') ibge_code: string,
		@Param('date') date: string,
		@Body() holiday: CreateHolidayDto,
	): Promise<Holiday> {
		const result = await this.putHolidayService.execute(ibge_code, date, holiday.name);

		return result;
	}

	@Delete(':ibge_code/:name')
	@ApiOperation({
		summary: 'Apaga um feriado baseado no código IBGE e nome',
		description: 'Apaga o feriado com base no código IBGE e no nome',
	})
	@ApiResponse({
		status: 200,
		description: 'Feriado apagado com sucesso!',
	})
	@ApiResponse({
		status: 404,
		description: 'Feriado não encontrado...',
	})
	@ApiResponse({
		status: 403,
		description: 'Não é possível apagar um feriado nacional!',
	})
	async deleteHolidays(@Param('ibge_code') ibge_code: string, @Param('name') name: string): Promise<void> {
		return this.deleteHolidayService.execute(ibge_code, name);
	}
}
