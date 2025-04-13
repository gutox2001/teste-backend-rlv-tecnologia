import { forwardRef, Module } from '@nestjs/common';

import { holidayProviders } from '../database/database.providers';
import { HolidaysRepository } from './repositories/implementations/holidays.repository';
import { HolidayController } from './holiday.controller';

import { DatabaseModule } from '../database/database.module';
import { CitiesModule } from '../cities/cities.module';
import { StatesModule } from '../states/states.module';

import { GetHolidayService } from './services/get-holiday/get-holiday.service';
import { DeleteHolidayService } from './services/delete-holiday/delete-holiday.service';
import { PutHolidayService } from './services/put-holiday/put-holiday.service';
import { PostNacionalHolidaysService } from './services/post-nacional-holidays/post-nacional-holidays.service';
import { CitiesRepository } from '../cities/repositories/implementations/cities.repository';
import { StatesRepository } from '../states/repositories/implementations/states';
import { DateProvider } from 'src/common/providers/date-provider/date-provider';
import { GetHolidaysService } from './services/get-holidays/get-holidays.service';

@Module({
    imports: [
        DatabaseModule,
        forwardRef(() => CitiesModule),
        forwardRef(() => StatesModule),
    ],
    providers: [
        ...holidayProviders,
        HolidaysRepository,
        CitiesRepository,
        StatesRepository,
        PutHolidayService,
        DeleteHolidayService,
        GetHolidayService,
        PostNacionalHolidaysService,
        DateProvider,
        GetHolidaysService
    ],
    controllers: [
        HolidayController
    ],
    exports: [],
})
export class HolidaysModule { }
