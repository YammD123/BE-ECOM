import { IsOptional, MinLength } from "class-validator";

export class updateUserDto {
    @IsOptional()
    user_name: string

    @IsOptional()
    email: string

    @IsOptional()
    @MinLength(6)
    password: string
}