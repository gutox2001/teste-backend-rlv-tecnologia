import { DataSource } from 'typeorm';
import { CITY_REPOSITORY, DATA_SOURCE, STATE_REPOSITORY } from './constants';
import { City } from '../cities/entities/city.entity';
import { State } from '../states/entities/state.entity';

/*
    Provider utilizado para conectar ao banco de dados.
*/
export const databaseProviders = [
	{
		provide: DATA_SOURCE,
		useFactory: async () => {
			return new DataSource({
				type: 'postgres',
				host: 'localhost',
				port: Number(process.env.DATABASE_PORT),
				username: process.env.DATABASE_USERNAME,
				password: process.env.DATABASE_PASSWORD,
				database: process.env.DATABASE_NAME,
				synchronize: true,
				logging: true,
				entities: [City, State],
			}).initialize();
		},
	},
];

export const cityProviders = [
	{
		provide: CITY_REPOSITORY,
		useFactory: (dataSource: DataSource) => dataSource.getRepository(City),
		inject: [DATA_SOURCE],
	},
];

export const stateProviders = [
	{
		provide: STATE_REPOSITORY,
		useFactory: (dataSource: DataSource) => dataSource.getRepository(State),
		inject: [DATA_SOURCE],
	},
];
