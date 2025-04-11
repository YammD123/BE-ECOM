import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from 'prisma/prisma.service';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { StoreModule } from './store/store.module';
import { OrderModule } from './order/order.module';
import { CommentModule } from './comment/comment.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [UserModule, CategoryModule, ProductModule, StoreModule, OrderModule, CommentModule,HttpModule.register({
    timeout: 30000,
    maxRedirects:5
  })],
  controllers: [AppController],
  providers: [AppService,PrismaService],
})
export class AppModule {}
