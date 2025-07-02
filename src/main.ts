import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 👇 Habilita la validación automática con class-validator
  app.useGlobalPipes(new ValidationPipe());

  // 👇 Escuchar en todas las interfaces de red (no solo localhost)
  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port, '0.0.0.0');
}
bootstrap();
