import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    createProduct(createProductDto: CreateProductDto, req: any, file: Express.Multer.File, id: string): Promise<{
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
    getAllProductByUserId(req: any): Promise<{
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
    updateProduct(): Promise<void>;
}
