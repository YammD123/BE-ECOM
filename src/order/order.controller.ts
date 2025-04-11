import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { BuyOrderDto } from './dto/buy-order.dto';

@Controller('order')
export class OrderController {
    constructor(private orderService:OrderService){}

    @Post()
    @UseGuards(AuthGuard)
    async createOrder(@Req() req, @Body() createOrderDto:CreateOrderDto){
        return await this.orderService.createOrder(req.user.id, createOrderDto);
    }

    @Get()
    @UseGuards(AuthGuard)
    async getOrder(@Req() req){
        return await this.orderService.getOrder(req.user.id);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteOrderDto(@Req() req, @Param('id') id:string){
        return await this.orderService.deleteOrder(req.user.id,id);
    }

    @Post('/buy')
    @UseGuards(AuthGuard)
    async buyProductOrder(@Req() req,@Body() buyOrderDto:BuyOrderDto){
        return await this.orderService.buyProductOrder(req.user.id,buyOrderDto);
    }
}
