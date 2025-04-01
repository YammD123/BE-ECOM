import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService){}

    async createCategory(createCategoryDto:CreateCategoryDto){
        try {
            const createCategory = await this.prisma.category.create({
                data:{
                    ...createCategoryDto
                }
            })
            return {message:"Category berhasil di buat",data:createCategory};
        } catch (error) {
            throw error
        }
    }

    async getAllCategory(){
        try {
            const getAllCategory = await this.prisma.category.findMany()
            if(getAllCategory.length === 0){
                throw new HttpException('Category belum ada',HttpStatus.NOT_FOUND)
            }
            return {message:"Category berhasil ditemukan",data:getAllCategory};
        } catch (error) {
            throw error
        }
    }
}
