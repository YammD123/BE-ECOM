import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
export declare class StoreController {
    private storeService;
    constructor(storeService: StoreService);
    createStore(req: any, createStoreDto: CreateStoreDto): Promise<{
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
    getStoreByUser(req: any): Promise<{
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
