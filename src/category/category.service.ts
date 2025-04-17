import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PaginationCategoryDto } from './dto/pagination-category.dto';
import { updateCategoryDto } from './dto/edit-category.dto';
import { AbstractCategoryCreate } from 'src/common/abstrac-category-create';

@Injectable()
export class CategoryService extends AbstractCategoryCreate {
  private readonly succesMessage = 'Category berhasil di dibuat';
  constructor(private prisma: PrismaService) {
    super();
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      const createCategory = await this.prisma.category.create({
        data: {
          ...createCategoryDto,
        },
      });
      return this.formatedSucces(this.succesMessage, createCategory);
    } catch (error) {
      this.handleException(error);
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

  async getCategoryByName(name: string) {
    try {
        const getCategoryByName = await this.prisma.category.findMany({
          where:{
            category_name:name
          },
          include:{
            product:true
          }
        })
        return {message:"Category dan product berhasil ditemukan",data:getCategoryByName};
    } catch (error) {
      throw error;
    }
  }

  async editCategory(id:string,updateCategoryDto:updateCategoryDto){
    try {
      const editCategory = await this.prisma.category.update({
        where:{
          id:id
        },
        data:{
          category_name:updateCategoryDto.category_name
        }
      })
      if(!editCategory){
        throw new HttpException('Category gagal di update',HttpStatus.BAD_REQUEST)
      }
      return {message:"Category berhasil di update",data:editCategory};
    } catch (error) {
      throw error
    }
  }
}
