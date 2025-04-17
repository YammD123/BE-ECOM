import { IsOptional, IsString } from "class-validator";

export class UpdateRoleUserDto {
    @IsOptional()
    @IsString()
    role: string;
}