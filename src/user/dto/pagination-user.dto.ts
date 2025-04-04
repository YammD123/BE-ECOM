import { IsOptional } from "class-validator"

export class PaginationUserDto{
    @IsOptional()
    page:number = 1
    @IsOptional()
    limit:number = 10
}