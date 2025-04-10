import { NestFactory } from '@nestjs/core';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

import { EnvService } from './common/env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
