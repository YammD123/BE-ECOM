import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PaginationCategoryDto } from './dto/pagination-category.dto';

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

  async getAllCategory(paginationCategoryDto:PaginationCategoryDto) {
    try {
      const getAllCategory = await this.prisma.category.findMany({
        take: Number(paginationCategoryDto.limit),
        skip: Number(paginationCategoryDto.page - 1) * paginationCategoryDto.limit,
      });
      if (getAllCategory.length === 0) {
        throw new HttpException('Category belum ada', HttpStatus.NOT_FOUND);
      }
      const totalCategory = await this.prisma.category.count();
      const totalPage = Math.ceil(totalCategory / paginationCategoryDto.limit);
      return {
        message: 'Category berhasil ditemukan',
        totalCategory,
        totalPage,
        totalData: paginationCategoryDto.limit,
        data: getAllCategory,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(id: string) {
    try {
      const deleteCategory = await this.prisma.category.delete({
        where: {
          id: id,
        },
      });
      if (!deleteCategory) {
        throw new HttpException(
          'Category gagal dihapus',
          HttpStatus.BAD_REQUEST,
        );
      }
      return { message: 'Category berhasil dihapus', data: deleteCategory };
    } catch (error) {
      throw error;
    }
  }
}
