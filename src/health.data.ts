// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Callback, Context, Handler } from 'aws-lambda';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import serverlessExpress from '@vendia/serverless-express';

let server: Handler;

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  // Swagger configuration
  const options = new DocumentBuilder()
    .setTitle('Health Data App')
    .setDescription('API documentation for Health Data App')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp })
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  if (event.path === '/api') {
    event.path = '/api/';
  }
  event.path = event.path.includes('swagger-ui') ? `/api${event.path}` : event.path;
  
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
