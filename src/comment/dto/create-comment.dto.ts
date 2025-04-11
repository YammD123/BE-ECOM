import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto{
    @IsString()
    @IsNotEmpty()
    comment:string

    @IsString()
    @IsNotEmpty()
    productId:string
}