import { IsOptional } from "class-validator"

export class PaginationOrderDto{
    @IsOptional()
    page: number = 1
    @IsOptional()
    limit: number=10
}