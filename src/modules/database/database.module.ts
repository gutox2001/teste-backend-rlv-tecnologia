import { Module } from '@nestjs/common';
import { cityProviders, databaseProviders, stateProviders } from './database.providers';

@Module({
	imports: [],
	controllers: [],
	providers: [
		...databaseProviders,
		...cityProviders, 
		...stateProviders,
	],
	exports: [...databaseProviders, ...cityProviders, ...stateProviders],
})
export class DatabaseModule {}
