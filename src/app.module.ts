import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvModule } from './common/env/env.module';
import { CitiesModule } from './modules/cities/cities.module';
import { DatabaseModule } from './modules/database/database.module';
import { StatesModule } from './modules/states/states.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { envSchema } from './common/env/env';
import { HolidaysModule } from './modules/holidays/holidays.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: env => envSchema.parse(env),
			isGlobal: true,
		}),
		EnvModule,
		DatabaseModule,
		CitiesModule,
		StatesModule,
		HolidaysModule,
	],
	controllers: [
		AppController
	],
	providers: [AppService],
})
export class AppModule { }
