import { PrismaService } from 'prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { updateProductDto } from './dto/update-prduct.dto';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    createProduct(createProductDto: CreateProductDto, userId: any, file: Express.Multer.File, id: string): Promise<{
        message: string;
        data: {
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
    }>;
    getAllProductByUserId(userId: string): Promise<{
        message: string;
        data: {
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
        }[];
    }>;
    getAllProduct(): Promise<{
        message: string;
        data: ({
            category: {
                category_name: string;
            };
            store: {
                store_name: string;
            };
        } & {
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
        })[];
    }>;
    getProductById(id: string): Promise<{
        message: string;
        data: {
            category: {
                category_name: string;
            };
            store: {
                store_name: string;
            };
        } & {
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
    }>;
    updateProduct(userId: any, file: Express.Multer.File, updateProductDto: updateProductDto, id: string): Promise<{
        message: string;
        data: {
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
    }>;
    searchProduct(name: string): Promise<{
        message: string;
        data: {
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
        }[];
    }>;
}
