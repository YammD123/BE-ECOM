import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createStore(@Req() req, @Body() createStoreDto: CreateStoreDto) {
    return this.storeService.createStore(req.user.id, createStoreDto);
  }

  @Get()
  async getAllStore() {
    return this.storeService.getAllStore();
  }

  @Get('/user')
  @UseGuards(AuthGuard)
  async getStoreByUser(@Req() req) {
    return this.storeService.getStoreByUser(req.user.id);
  }
  
}
