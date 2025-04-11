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
    origin: [
      'https://your-svelte-frontend.vercel.app', // Replace with your actual Svelte frontend Vercel URL
      'http://localhost:5173', // Allow local development
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // If your app uses cookies or auth tokens
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
