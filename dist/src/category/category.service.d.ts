import { PrismaService } from 'prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PaginationCategoryDto } from './dto/pagination-category.dto';
import { updateCategoryDto } from './dto/edit-category.dto';
import { AbstractCategoryCreate } from 'src/common/abstrac-category-create';
export declare class CategoryService extends AbstractCategoryCreate {
    private prisma;
    private readonly succesMessage;
    constructor(prisma: PrismaService);
    createCategory(createCategoryDto: CreateCategoryDto): Promise<{
        message: string;
        data: any;
    } | undefined>;
    getAllCategory(paginationCategoryDto: PaginationCategoryDto): Promise<{
        message: string;
        totalCategory: number;
        totalPage: number;
        totalData: number;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            category_name: string;
        }[];
    }>;
    deleteCategory(id: string): Promise<{
        message: string;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            category_name: string;
        };
    }>;
    getCategoryByName(name: string): Promise<{
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
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            category_name: string;
        })[];
    }>;
    editCategory(id: string, updateCategoryDto: updateCategoryDto): Promise<{
        message: string;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            category_name: string;
        };
    }>;
}
