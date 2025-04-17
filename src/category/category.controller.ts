import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PaginationCategoryDto,  } from './dto/pagination-category.dto';
import { updateCategoryDto } from './dto/edit-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  async getAllCategory(@Query() paginationCategoryDto: PaginationCategoryDto) {
    return this.categoryService.getAllCategory(paginationCategoryDto);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }

  @Get(':name')
  async getCategoryByName(@Param('name') name:string){
    return this.categoryService.getCategoryByName(name)
  }

  @Patch('edit/:id')
  async editCategory(@Param('id') id: string,@Body() updateCategoryDtp: updateCategoryDto) {
    return this.categoryService.editCategory(id,updateCategoryDtp);
  }
}
