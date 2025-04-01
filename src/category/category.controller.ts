import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
    constructor(private categoryService:CategoryService){}

    @Post()
    async createCategory(@Body() createCategoryDto:CreateCategoryDto){
        return this.categoryService.createCategory(createCategoryDto)
    }

    @Get()
    async getAllCategory(){
        return this.categoryService.getAllCategory()
    }
}
