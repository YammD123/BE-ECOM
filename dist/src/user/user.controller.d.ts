import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { PaginationUserDto } from './dto/pagination-user.dto';
import { UpdateRoleUserDto } from './dto/update-role-user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
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
    logout(req: any): Promise<{
        message: string;
        data: {
            email: string;
            password: string;
            id: string;
            token: string | null;
        };
    }>;
    updateProfile(req: any, file: Express.Multer.File): Promise<{
        message: string;
        data: {
            user_name: string;
            id: string;
            profile_image: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    getprofile(req: any): Promise<{
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
    updateUser(updateUserDto: updateUserDto, req: any): Promise<{
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
    updateRoleUser(updateRoleUserDto: UpdateRoleUserDto, id: string): Promise<{
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
