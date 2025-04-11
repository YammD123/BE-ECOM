import { IsNotEmpty, IsString } from "class-validator";

export class BuyOrderDto{
    @IsNotEmpty()
    @IsString()
    productId:string
}