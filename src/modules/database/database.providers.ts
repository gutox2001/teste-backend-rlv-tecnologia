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
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
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