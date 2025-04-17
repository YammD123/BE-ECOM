import { PrismaService } from 'prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { PaginationUserDto } from './dto/pagination-user.dto';
import { UpdateRoleUserDto } from './dto/update-role-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    register(registerUserDto: RegisterUserDto): Promise<{
        message: string;
        data: {
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
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        message: string;
        data: {
            email: string;
            role: string;
            id: string;
            token: string | null;
        };
    }>;
    logout(userId: any): Promise<{
        message: string;
        data: {
            email: string;
            password: string;
            id: string;
            token: string | null;
        };
    }>;
    updateProfile(UserId: any, file: Express.Multer.File): Promise<{
        message: string;
        data: {
            user_name: string;
            id: string;
            profile_image: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    getProfile(userId: any): Promise<{
        message: string;
        data: {
            user_name: string;
            email: string;
            password: string;
            role: string;
            id: string;
            profile_image: string;
            createdAt: Date;
            token: string | null;
            updatedAt: Date;
        } | null;
    }>;
    updateUser(updateUserDto: updateUserDto, userId: any): Promise<{
        message: string;
        data: {
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
    }>;
    getAllUser(paginationUserDto: PaginationUserDto): Promise<{
        message: string;
        totalUser: number;
        totalPage: number;
        totalData: number;
        data: {
            user_name: string;
            email: string;
            password: string;
            role: string;
            id: string;
            profile_image: string;
            createdAt: Date;
            token: string | null;
            updatedAt: Date;
        }[];
    }>;
    deleteUser(id: string): Promise<{
        message: string;
        data: import(".prisma/client").Prisma.BatchPayload;
    }>;
    updateRoleUser(updateUserDto: UpdateRoleUserDto, id: string): Promise<{
        message: string;
        data: {
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
    }>;
}
