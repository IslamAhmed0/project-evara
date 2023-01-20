import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as express from 'express';
const server: express.Express = express();


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    // .addBearerAuth()
    .setTitle('project')

    .setDescription('The cats API description')
    .setVersion('1.00000')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const corsOptions = {
    allowedHeaders: '*',
    credentials: true,
    origin: '*',
  };
  app.enableCors(corsOptions);
  await app.listen(5000);
}
bootstrap();
