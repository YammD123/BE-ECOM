import {  IsOptional, IsString } from "class-validator";

export class updateProductDto {
    @IsString()
    @IsOptional()
    product_name: string

    @IsString()
    @IsOptional()
    description: string

    @IsOptional()
    price: number
}