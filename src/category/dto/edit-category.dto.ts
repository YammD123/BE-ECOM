import { IsNotEmpty, IsString } from "class-validator";

export class updateCategoryDto {
    @IsString()
    @IsString()
    @IsNotEmpty()
    category_name: string
}