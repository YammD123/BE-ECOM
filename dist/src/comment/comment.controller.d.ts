import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class CommentController {
    private commentService;
    constructor(commentService: CommentService);
    createComment(req: any, createCommentDto: CreateCommentDto, id: string): Promise<{
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
    getAllComment(id: string): Promise<{
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
