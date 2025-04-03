import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      const createCategory = await this.prisma.category.create({
        data: {
          ...createCategoryDto,
        },
      });
      return { message: 'Category berhasil di buat', data: createCategory };
    } catch (error) {
      throw error;
    }
  }

  async getAllCategory(paginationDto: PaginationDto) {
    try {
      const getAllCategory = await this.prisma.category.findMany({
        take:Number (paginationDto.limit),
        skip: Number (paginationDto.page - 1) * paginationDto.limit,
      });
      if (getAllCategory.length === 0) {
        throw new HttpException('Category belum ada', HttpStatus.NOT_FOUND);
      }
      const totalCategory = await this.prisma.category.count();
      const totalPage = Math.ceil(totalCategory / paginationDto.limit);
      return { message: 'Category berhasil ditemukan',totalCategory,totalPage,totalData:paginationDto.limit, data: getAllCategory };
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(id: string) {
    try {
      const deleteCategory = await this.prisma.category.delete({
        where: {
          id: id,
        }
      })
      if(!deleteCategory){
        throw new HttpException('Category gagal dihapus',HttpStatus.BAD_REQUEST)
      }
      return { message: 'Category berhasil dihapus', data: deleteCategory };
    } catch (error) {
      throw error
    }
  }
}
