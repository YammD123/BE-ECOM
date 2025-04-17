"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const abstrac_category_create_1 = require("../common/abstrac-category-create");
let CategoryService = class CategoryService extends abstrac_category_create_1.AbstractCategoryCreate {
    prisma;
    succesMessage = 'Category berhasil di dibuat';
    constructor(prisma) {
        super();
        this.prisma = prisma;
    }
    async createCategory(createCategoryDto) {
        try {
            const createCategory = await this.prisma.category.create({
                data: {
                    ...createCategoryDto,
                },
            });
            return this.formatedSucces(this.succesMessage, createCategory);
        }
        catch (error) {
            this.handleException(error);
        }
    }
    async getAllCategory(paginationCategoryDto) {
        try {
            const getAllCategory = await this.prisma.category.findMany({
                take: Number(paginationCategoryDto.limit),
                skip: Number(paginationCategoryDto.page - 1) * paginationCategoryDto.limit,
            });
            if (getAllCategory.length === 0) {
                throw new common_1.HttpException('Category belum ada', common_1.HttpStatus.NOT_FOUND);
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
        }
        catch (error) {
            throw error;
        }
    }
    async deleteCategory(id) {
        try {
            const deleteCategory = await this.prisma.category.delete({
                where: {
                    id: id,
                },
            });
            if (!deleteCategory) {
                throw new common_1.HttpException('Category gagal dihapus', common_1.HttpStatus.BAD_REQUEST);
            }
            return { message: 'Category berhasil dihapus', data: deleteCategory };
        }
        catch (error) {
            throw error;
        }
    }
    async getCategoryByName(name) {
        try {
            const getCategoryByName = await this.prisma.category.findMany({
                where: {
                    category_name: name
                },
                include: {
                    product: true
                }
            });
            return { message: "Category dan product berhasil ditemukan", data: getCategoryByName };
        }
        catch (error) {
            throw error;
        }
    }
    async editCategory(id, updateCategoryDto) {
        try {
            const editCategory = await this.prisma.category.update({
                where: {
                    id: id
                },
                data: {
                    category_name: updateCategoryDto.category_name
                }
            });
            if (!editCategory) {
                throw new common_1.HttpException('Category gagal di update', common_1.HttpStatus.BAD_REQUEST);
            }
            return { message: "Category berhasil di update", data: editCategory };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryService);
//# sourceMappingURL=category.service.js.map