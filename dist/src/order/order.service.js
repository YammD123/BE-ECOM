"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const MidtransClient = require("midtrans-client");
let OrderService = class OrderService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrder(userId, createOrderDto) {
        try {
            const createOrder = await this.prisma.order.create({
                data: {
                    ...createOrderDto,
                    userId: userId
                }
            });
            if (!createOrder) {
                throw new common_1.HttpException('Order gagal dibuat', common_1.HttpStatus.BAD_REQUEST);
            }
            return { message: 'Order berhasil dibuat', data: createOrder };
        }
        catch (error) {
            throw error;
        }
    }
    async getOrder(userId) {
        try {
            const getOrder = await this.prisma.order.findMany({
                where: {
                    userId: userId,
                    status: "PENDING"
                },
                include: {
                    product: true
                }
            });
            if (getOrder.length === 0) {
                throw new common_1.HttpException('Order belum ada', common_1.HttpStatus.NOT_FOUND);
            }
            return { message: 'Order berhasil ditemukan', data: getOrder };
        }
        catch (error) {
            throw error;
        }
    }
    async deleteOrder(userId, id) {
        try {
            const deleteOrder = await this.prisma.order.deleteMany({
                where: {
                    userId: userId,
                    productId: id
                }
            });
            if (!deleteOrder) {
                throw new common_1.HttpException('Order gagal dihapus', common_1.HttpStatus.BAD_REQUEST);
            }
            return { message: 'Order berhasil dihapus', data: deleteOrder };
        }
        catch (error) {
            throw error;
        }
    }
    async buyProductOrder(userId, buyOrderDto) {
        try {
            const product = await this.prisma.product.findUnique({
                where: {
                    id: buyOrderDto.productId
                }
            });
            if (!product) {
                throw new common_1.HttpException('Product tidak ditemukan', common_1.HttpStatus.NOT_FOUND);
            }
            await this.prisma.order.updateMany({
                where: {
                    userId: userId,
                    productId: buyOrderDto.productId
                }, data: {
                    status: "ORDERING"
                }
            });
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
                where: {
                    userId: userId,
                    productId: buyOrderDto.productId,
                    status: "SUCCESS"
                },
                include: {
                    product: true
                }
            });
            await this.prisma.order.updateMany({
                where: {
                    userId: userId,
                    productId: buyOrderDto.productId
                }, data: {
                    status: "SUCCESS"
                }
            });
            return { message: 'Order berhasil dibeli', snapToken: transaction.token, product: updatedOrder };
        }
        catch (error) {
            throw error;
        }
    }
    async getSuccess(userId) {
        try {
            const getSuccess = await this.prisma.order.findMany({
                where: {
                    userId: userId,
                    status: "SUCCESS"
                },
                include: {
                    product: true
                }
            });
            if (getSuccess.length === 0) {
                throw new common_1.HttpException('Order belum ada', common_1.HttpStatus.NOT_FOUND);
            }
            return { message: 'Order berhasil ditemukan', data: getSuccess };
        }
        catch (error) {
            throw error;
        }
    }
    async getAllOrder(paginationOrderDto) {
        try {
            const findAll = await this.prisma.order.findMany({
                skip: (paginationOrderDto.page - 1) * paginationOrderDto.limit,
                take: paginationOrderDto.limit
            });
            const totalOrder = await this.prisma.order.count();
            const totalPage = Math.ceil(totalOrder / paginationOrderDto.limit);
            if (findAll.length === 0) {
                throw new common_1.HttpException('Order belum ada', common_1.HttpStatus.NOT_FOUND);
            }
            return { message: 'Order berhasil ditemukan', totalOrder, totalPage, totalData: paginationOrderDto.limit, data: findAll };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
//# sourceMappingURL=order.service.js.map