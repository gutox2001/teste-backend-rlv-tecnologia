import { forwardRef, Module } from '@nestjs/common';

import { CitiesController } from './cities.controller';

import { PostCitiesService } from './services/post-cities/post-cities.service';

import { DatabaseModule } from '../database/database.module';
import { cityProviders } from '../database/database.providers';
import { CitiesRepository } from './repositories/implementations/cities.repository';
import { DeleteCitiesService } from './services/delete-cities/delete-cities.service';
import { DeleteCityService } from './services/delete-cities/delete-city.service';
import { GetCitiesService } from './services/get-cities/get-cities.service';
import { GetCityService } from './services/get-city/get-city.service';
import { PostCityService } from './services/post-city/post-city.service';
import { HolidaysModule } from '../holidays/holidays.module';
import { City } from './entities/city.entity';

@Module({
	imports: [
		DatabaseModule,
		forwardRef(() => HolidaysModule),

	],
	providers: [
		...cityProviders,
		CitiesRepository,
		PostCitiesService,
		PostCityService,
		DeleteCityService,
		DeleteCitiesService,
		GetCityService,
		GetCitiesService,
	],
	controllers: [
		CitiesController
	],
	exports: [
		CitiesRepository
	],
})
export class CitiesModule { }
