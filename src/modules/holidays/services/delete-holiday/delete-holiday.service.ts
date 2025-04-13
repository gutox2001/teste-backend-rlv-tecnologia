import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { HolidaysRepository } from '../../repositories/implementations/holidays.repository';

@Injectable()
export class DeleteHolidayService {
    constructor(
        private readonly holidaysRepository: HolidaysRepository,
    ) {}

    async execute(ibge_code: string, date: string): Promise<void> {
        const holidaysByDate = await this.holidaysRepository.findByDate(date);
        if (holidaysByDate.length === 0) {
            throw new NotFoundException('No holidays found for this date');
        }
        
        if (holidaysByDate[0].type === 'NACIONAL') {
            throw new ForbiddenException('Cannot delete national holidays');
        }

        const holiday = holidaysByDate.find(holiday => holiday.city.ibgeCode === ibge_code);
        if (!holiday) {
            const stateHoliday = holidaysByDate.find(holiday => holiday.state.ibgeCode === ibge_code);

            if (!stateHoliday) {
                throw new NotFoundException('Holiday not found');
            }

            await this.holidaysRepository.delete(stateHoliday?.id);
            return;
        }
    }
}
