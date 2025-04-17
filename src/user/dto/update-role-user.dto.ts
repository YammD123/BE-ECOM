import { IsEnum, IsOptional, IsString } from "class-validator";
import { UpdateUserRoleEnum } from "../enum/update-user.enum";

export class UpdateRoleUserDto {
    @IsOptional()
    @IsEnum(UpdateUserRoleEnum)
    role: UpdateUserRoleEnum;
}