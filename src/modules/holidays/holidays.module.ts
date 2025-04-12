import { forwardRef, Module } from '@nestjs/common';

import { holidayProviders } from '../database/database.providers';
import { HolidaysRepository } from './repositories/implementations/holidays.repository';
import { HolidayController } from './holiday.controller';

import { DatabaseModule } from '../database/database.module';
import { CitiesModule } from '../cities/cities.module';
import { StatesModule } from '../states/states.module';

import { Holiday } from './entities/holiday.entity';
import { PutHolidayService } from './put-holiday/put-holiday.service';
import { DeleteHolidayService } from './delete-holiday/delete-holiday.service';
import { GetHolidayService } from './get-holiday/get-holiday.service';
import { GetHolidayService } from './services/get-holiday/get-holiday.service';
import { DeleteHolidayService } from './services/delete-holiday/delete-holiday.service';
import { PutHolidayService } from './services/put-holiday/put-holiday.service';

@Module({
    imports: [
        DatabaseModule,
        forwardRef(() => CitiesModule),
        forwardRef(() => StatesModule),
    ],
    providers: [
        ...holidayProviders,
        HolidaysRepository,
        PutHolidayService,
        DeleteHolidayService,
        GetHolidayService,
    ],
    controllers: [
        HolidayController
    ],
    exports: [
    ],
})
export class HolidaysModule { }
