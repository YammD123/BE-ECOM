import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist:true,
      forbidNonWhitelisted:true,
      transform:true
    }
  ))
  app.enableCors({
		origin: '*', // Ganti dengan frontend URL kalau mau aman (misalnya 'https://frontend-mu.vercel.app')
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
		credentials: true,
	})
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
