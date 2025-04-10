import { DataSource } from "typeorm";

/*
    Provider utilizado para conectar ao banco de dados.
*/
export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            return new DataSource({
                type: 'postgres',
                host: 'localhost',
                port: Number(process.env.DATABASE_PORT),
                username: 'postgres',
                password: '',
                database: 'mydb',
                synchronize: true,
                logging: true,
                entities: [
                    // aqui você pode adicionar suas entidades
                    // User,
                    // Post,
                ],
            }).initialize();
        },
    },
];