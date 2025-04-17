import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateProductDto{
    @IsString()
    @IsNotEmpty()
    categoryId:string

    @IsString()
    @IsNotEmpty()
    product_name: string

    @IsString()
    @IsNotEmpty()
    price: number

    @IsString()
    @IsOptional()
    description: string

    @IsOptional()
    image?:any
}