import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'verbose', 'log'],
  });
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  const builder = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, builder);
  SwaggerModule.setup('docs', app, document);
  await app.listen(configService.get('PORT'));
}
bootstrap();
