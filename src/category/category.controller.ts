import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('category')
export class CategoryController {
    constructor(private categoryService:CategoryService){}

    @Post()
    async createCategory(@Body() createCategoryDto:CreateCategoryDto){
        return this.categoryService.createCategory(createCategoryDto)
    }

    @Get()
    async getAllCategory(@Query() paginationDto:PaginationDto){
        return this.categoryService.getAllCategory(paginationDto)
    }

    @Delete(':id')
    async deleteCategory(@Param('id') id:string){
        return this.categoryService.deleteCategory(id)
    }
}
