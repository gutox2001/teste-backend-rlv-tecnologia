import { Controller, Delete, Get, Put } from '@nestjs/common';

@Controller('feriados')
export class HolidayController {
    constructor() { }

    @Get(':ibge_code/:date')
    async getHolidays(): Promise<string> {
        return 'Holidays';
    }

    @Put(':ibge_code/:date')
    async updateHolidays(): Promise<string> {
        return 'Holidays updated';
    }

    @Delete(':ibge_code/:name')
    async deleteHolidays(): Promise<string> {
        return 'Holidays deleted';
    }
}
