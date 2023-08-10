// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config(); // first import

import { json } from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';


const CLIENT_HOST = process.env.CLIENT_HOST;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: CLIENT_HOST,
      credentials: true,
    },
  });

  app.use(json({ limit: '50mb' }));

  const config = new DocumentBuilder()
    .setTitle('Recipe open API')
    .setDescription('The recipes API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(process.env.PORT);
}

bootstrap();
