import { Injectable } from '@nestjs/common';
import { HolidaysRepository } from '../../repositories/implementations/holidays.repository';
import { Holiday } from '../../entities/holiday.entity';

@Injectable()
export class GetHolidayService {
    constructor(
        private readonly holidaysRepository: HolidaysRepository,
    ) { }

    // REQUISIÇÃO SERÁ FEITA NO FORMATO 'feriados/4305439/2020-05-01'
    async execute(ibge_code: string, date: string): Promise<string> {
        const holidaysByDate = await this.holidaysRepository.findByDate(date);

        if (holidaysByDate.length === 0) {
            throw new Error('No holidays found for this date');
        }

        if (holidaysByDate[0].type === 'NACIONAL') {
            return holidaysByDate[0].name;
        }

        const holiday = holidaysByDate.find(holiday => holiday.city.ibgeCode === ibge_code);
        if (!holiday) {
            const stateHoliday = holidaysByDate.find(holiday => holiday.state.ibgeCode === ibge_code);

            if (!stateHoliday) {
                throw new Error('Holiday not found');
            }

            return stateHoliday.name;
        }

        if (!holiday) {
            throw new Error('Holiday not found');
        }

        return holiday.name;
    }
}
