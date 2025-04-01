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
  app.getHttpServer().setTimeout(60000); // Mengatur timeout menjadi 60 detik

  app.use(cors())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
