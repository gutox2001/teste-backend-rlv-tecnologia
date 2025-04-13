import { Injectable } from '@nestjs/common';
import { HolidaysRepository } from '../../repositories/implementations/holidays.repository';
import { Holiday } from '../../entities/holiday.entity';
import { ICreateHoliday } from '../../dtos/create-holiday/create-holiday.interface';
import { DateProvider } from 'src/common/providers/date-provider/date-provider';

@Injectable()
export class PostNacionalHolidaysService {
    constructor(
        private readonly holidaysRepository: HolidaysRepository,
        private dateProvider: DateProvider,
    ) { }

    execute(nacionalHolidays: ICreateHoliday[]): Promise<Holiday[]> {
        nacionalHolidays.forEach(holiday => {
            if (this.dateProvider.isDateValid(holiday.date)) {
                throw new Error('Invalid date format');
            }

            this.holidaysRepository.create({
                name: holiday.name,
                date: holiday.date,
                type: 'NACIONAL',
            });
        });

        return this.holidaysRepository.findByType('NACIONAL');
    }
}
