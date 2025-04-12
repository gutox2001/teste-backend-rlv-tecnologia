import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvModule } from './common/env/env.module';
import { DatabaseModule } from './modules/database/database.module';
import { StatesModule } from './modules/states/states.module';
import { CitiesModule } from './modules/cities/cities.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { envSchema } from './common/env/env';

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: env => envSchema.parse(env),
			isGlobal: true,
		}),
		DatabaseModule,
		CitiesModule,
		StatesModule,
		EnvModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
