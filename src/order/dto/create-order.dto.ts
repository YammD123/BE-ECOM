import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { OrderStatus } from "../enum/order-status.enum";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsEnum(OrderStatus)
    status: OrderStatus;

    @IsNotEmpty()
    @IsString()
    productId: string;
}