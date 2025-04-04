import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from 'prisma/prisma.service';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [UserModule, CategoryModule, ProductModule, StoreModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
})
export class AppModule {}
