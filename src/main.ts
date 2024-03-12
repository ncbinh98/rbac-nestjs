import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { connectionSource } from './config/typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await connectionSource.initialize();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
}
bootstrap();
