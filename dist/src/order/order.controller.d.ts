import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { BuyOrderDto } from './dto/buy-order.dto';
import { PaginationOrderDto } from './dto/pagination-order.dto';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    createOrder(req: any, createOrderDto: CreateOrderDto): Promise<{
        message: string;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            status: string;
            productId: string;
        };
    }>;
    getOrder(req: any): Promise<{
        message: string;
        data: ({
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                product_name: string;
                price: number;
                description: string | null;
                product_image: string;
                categoryId: string;
                userId: string;
                storeId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            status: string;
            productId: string;
        })[];
    }>;
    deleteOrderDto(req: any, id: string): Promise<{
        message: string;
        data: import(".prisma/client").Prisma.BatchPayload;
    }>;
    buyProductOrder(req: any, buyOrderDto: BuyOrderDto): Promise<{
        message: string;
        snapToken: any;
        product: ({
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                product_name: string;
                price: number;
                description: string | null;
                product_image: string;
                categoryId: string;
                userId: string;
                storeId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            status: string;
            productId: string;
        }) | null;
    }>;
    getSuccess(req: any): Promise<{
        message: string;
        data: ({
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                product_name: string;
                price: number;
                description: string | null;
                product_image: string;
                categoryId: string;
                userId: string;
                storeId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            status: string;
            productId: string;
        })[];
    }>;
    getAllOrder(paginationOrderDto: PaginationOrderDto): Promise<{
        message: string;
        totalOrder: number;
        totalPage: number;
        totalData: number;
        data: ({
            user: {
                user_name: string;
                email: string;
                password: string;
                role: string;
                id: string;
                profile_image: string;
                createdAt: Date;
                token: string | null;
                updatedAt: Date;
            };
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                product_name: string;
                price: number;
                description: string | null;
                product_image: string;
                categoryId: string;
                userId: string;
                storeId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            status: string;
            productId: string;
        })[];
    }>;
}
