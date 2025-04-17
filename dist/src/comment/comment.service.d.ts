import { PrismaService } from 'prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class CommentService {
    private prisma;
    constructor(prisma: PrismaService);
    createComment(userId: any, createCommentDto: CreateCommentDto, id: any): Promise<{
        message: string;
        data: {
            comment: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            productId: string;
            orderId: string;
        };
    }>;
    getAllCommentForProduct(id: string): Promise<{
        message: string;
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
        } & {
            comment: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            productId: string;
            orderId: string;
        })[];
    }>;
}
