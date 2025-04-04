import { IsOptional } from "class-validator"

export class PaginationCategoryDto {
    @IsOptional()
    page: number = 1
    @IsOptional()
    limit: number=10
}