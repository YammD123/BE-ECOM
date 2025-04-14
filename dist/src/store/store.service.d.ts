import { PrismaService } from 'prisma/prisma.service';
import { CreateStoreDto } from './dto/create-store.dto';
export declare class StoreService {
    private prisma;
    constructor(prisma: PrismaService);
    createStore(userId: any, createStoreDto: CreateStoreDto): Promise<{
        message: string;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            store_name: string;
        };
    }>;
    getAllStore(): Promise<{
        message: string;
        data: ({
            product: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                categoryId: string;
                product_name: string;
                price: number;
                description: string | null;
                product_image: string;
                userId: string;
                storeId: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            store_name: string;
        })[];
    }>;
    getStoreByUser(userId: any): Promise<{
        message: string;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            store_name: string;
        }[];
    }>;
}
