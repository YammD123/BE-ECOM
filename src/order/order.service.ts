import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import * as MidtransClient from 'midtrans-client';
import { BuyOrderDto } from './dto/buy-order.dto';


@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) {}
    async createOrder(userId, createOrderDto:CreateOrderDto) {
        try {
            const createOrder = await this.prisma.order.create({
                data:{
                    ...createOrderDto,
                    userId: userId
                }
            })
            if(!createOrder) {
                throw new HttpException('Order gagal dibuat', HttpStatus.BAD_REQUEST);
            }
            return { message: 'Order berhasil dibuat', data: createOrder };
        } catch (error) {
            throw error;
        }
    }

    async getOrder(userId) {
        try {
            const getOrder = await this.prisma.order.findMany({
                where:{
                    userId: userId,
                    status:"PENDING"
                },
                include:{
                    product:true
                }
            })
            if(getOrder.length === 0) {
                throw new HttpException('Order belum ada', HttpStatus.NOT_FOUND);
            }
            return { message: 'Order berhasil ditemukan', data: getOrder };
        } catch (error) {
            throw error;
        }
    }

    
    async deleteOrder(userId, id:string){
        try {
            const deleteOrder = await this.prisma.order.deleteMany({
                where:{
                    userId: userId,
                    productId: id
                }
            })
            if(!deleteOrder){
                throw new HttpException('Order gagal dihapus', HttpStatus.BAD_REQUEST);
            }
            return { message: 'Order berhasil dihapus', data: deleteOrder };
        } catch (error) {
            throw error
        }
    }

    async buyProductOrder(userId, buyOrderDto:BuyOrderDto) {
        try {
            const product = await this.prisma.product.findUnique({
                where:{
                    id: buyOrderDto.productId
                }
            })
            if(!product){
                throw new HttpException('Product tidak ditemukan', HttpStatus.NOT_FOUND)
            }
                await this.prisma.order.updateMany({
                where:{
                    userId: userId,
                    productId: buyOrderDto.productId
                },data:{
                    status:"ORDERING"
                }
            })

            
            const snap = new MidtransClient.Snap({
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY,
                clientKey: process.env.MIDTRANS_CLIENT_KEY,
            });
            
            const transaction = await snap.createTransaction({
                transaction_details: {
                    order_id: `ORDER-${Date.now()}`,
                    gross_amount: product.price,
                },
            });
            const updatedOrder = await this.prisma.order.findFirst({
                where:{
                    userId: userId,
                    productId: buyOrderDto.productId,
                    status:"SUCCESS"
                },
                include:{
                    product:true
                }
            })

            await this.prisma.order.updateMany({
                where:{
                    userId: userId,
                    productId: buyOrderDto.productId
                },data:{
                    status:"SUCCESS"
                }
            })
            return { message: 'Order berhasil dibeli', snapToken: transaction.token,product:updatedOrder };
        } catch (error) {
            throw error
        }
    }

    async getSuccess(userId) {
        try {
            const getSuccess = await this.prisma.order.findMany({
                where:{
                    userId: userId,
                    status:"SUCCESS"
                },
                include:{
                    product:true
                }
            })
            if(getSuccess.length === 0) {
                throw new HttpException('Order belum ada', HttpStatus.NOT_FOUND);
            }
            return { message: 'Order berhasil ditemukan', data: getSuccess };
        } catch (error) {
            throw error;
        }
    }
}