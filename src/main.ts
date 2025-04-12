import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json, urlencoded } from 'express';

import { AppModule } from './app.module';

import { EnvService } from './common/env/env.service';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Configurações para permitir requisições com arquivos grandes
	app.use(json({ limit: '10mb' }));
	app.use(urlencoded({ limit: '10mb', extended: true }));

	const swaggerConfig = new DocumentBuilder()
		.setTitle('Teste Técnico RLV Tecnologia - Aroldo Augusto')
		.setDescription('API Rest criada com Nest, Postgres , TypeORM e .')
		.setVersion('0.1')
		.addServer('http://localhost:3000/', 'Local environment')
		// .addServer('https://', 'Production')
		.build();
	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup('api', app, document);

	const configService = app.get(EnvService);
	const port = configService.get('PORT_NEST_LOCALHOST');


	await app.listen(port);
}
bootstrap();
