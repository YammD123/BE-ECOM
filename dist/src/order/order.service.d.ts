import { PrismaService } from 'prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { BuyOrderDto } from './dto/buy-order.dto';
import { PaginationOrderDto } from './dto/pagination-order.dto';
export declare class OrderService {
    private prisma;
    constructor(prisma: PrismaService);
    createOrder(userId: any, createOrderDto: CreateOrderDto): Promise<{
        message: string;
        data: {
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            productId: string;
        };
    }>;
    getOrder(userId: any): Promise<{
        message: string;
        data: ({
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                product_name: string;
                price: number;
                description: string | null;
                product_image: string;
                categoryId: string;
                storeId: string;
            };
        } & {
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            productId: string;
        })[];
    }>;
    deleteOrder(userId: any, id: string): Promise<{
        message: string;
        data: import(".prisma/client").Prisma.BatchPayload;
    }>;
    buyProductOrder(userId: any, buyOrderDto: BuyOrderDto): Promise<{
        message: string;
        snapToken: any;
        product: ({
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                product_name: string;
                price: number;
                description: string | null;
                product_image: string;
                categoryId: string;
                storeId: string;
            };
        } & {
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            productId: string;
        }) | null;
    }>;
    getSuccess(userId: any): Promise<{
        message: string;
        data: ({
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                product_name: string;
                price: number;
                description: string | null;
                product_image: string;
                categoryId: string;
                storeId: string;
            };
        } & {
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            productId: string;
        })[];
    }>;
    getAllOrder(paginationOrderDto: PaginationOrderDto): Promise<{
        message: string;
        totalOrder: number;
        totalPage: number;
        totalData: number;
        data: {
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            productId: string;
        }[];
    }>;
}
