import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // 👇 Escuchar en todas las interfaces de red y mostrar el puerto
  const port = Number(process.env.PORT ?? 3017);
  await app.listen(port, '0.0.0.0');
  
}
bootstrap();
