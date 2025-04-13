import { Injectable } from '@nestjs/common';
import { HolidaysRepository } from '../../repositories/implementations/holidays.repository';
import { Holiday } from '../../entities/holiday.entity';

@Injectable()
export class GetHolidaysService {
    constructor(
        private readonly holidaysRepository: HolidaysRepository,
    ) {}

    execute(): Promise<Holiday[]> {
        return this.holidaysRepository.findAll();
    }
}
