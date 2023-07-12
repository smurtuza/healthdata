// src/main.ts
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  // Enable CORS if needed
  app.enableCors();

  // Swagger configuration
  const options = new DocumentBuilder()
    .setTitle('Health Data App')
    .setDescription('API documentation for Health Data App')
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Local Development')
    .addServer('https://83jwgd1yw4.execute-api.ap-south-1.amazonaws.com/dev/', 'lambda')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
