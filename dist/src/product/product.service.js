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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const claudinary_config_1 = require("../config/claudinary.config");
const abstrac_product_create_1 = require("../common/abstrac-product-create");
let ProductService = class ProductService extends abstrac_product_create_1.AbstractProductCreate {
    prisma;
    succesMessage = 'Product berhasil di tambahkan';
    constructor(prisma) {
        super();
        this.prisma = prisma;
    }
    async createProduct(createProductDto, userId, file, id) {
        const result = await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Request Timeout'));
                clearTimeout(timeout);
            }, 30000);
            const uploadStream = claudinary_config_1.default.uploader.upload_stream({ folder: 'uploads', public_id: file.originalname.split('.')[0], format: 'png', timeout: 30000 }, (error, response) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(response);
                }
            });
            uploadStream.end(file.buffer);
        });
        try {
            if (!file) {
                throw new common_1.HttpException('Image tidak ada', common_1.HttpStatus.BAD_REQUEST);
            }
            const createProduct = await this.prisma.product.create({
                data: {
                    ...createProductDto,
                    price: Number(createProductDto.price),
                    userId: userId,
                    product_image: result.secure_url,
                    storeId: id,
                }
            });
            return this.formatedSucces(this.succesMessage, createProduct);
        }
        catch (error) {
            this.handleException(error);
        }
    }
    async getAllProductByUserId(userId) {
        try {
            const getAllProduct = await this.prisma.product.findMany({
                where: {
                    userId: userId
                },
            });
            return { message: "Product berhasil di ambil", data: getAllProduct };
        }
        catch (error) {
            throw error;
        }
    }
    async getAllProduct() {
        try {
            const getAllProduct = await this.prisma.product.findMany({
                include: {
                    category: {
                        select: {
                            category_name: true,
                        },
                    },
                    store: {
                        select: {
                            store_name: true,
                        }
                    }
                }, orderBy: { createdAt: 'desc' },
                take: 10
            });
            if (getAllProduct.length === 0) {
                throw new common_1.HttpException('Product belum ada', common_1.HttpStatus.NOT_FOUND);
            }
            return { message: "Product berhasil di ambil", data: getAllProduct };
        }
        catch (error) {
            throw error;
        }
    }
    async getProductById(id) {
        try {
            const findProduct = await this.prisma.product.findUnique({
                where: {
                    id: id
                },
                include: {
                    category: {
                        select: {
                            category_name: true,
                        },
                    },
                    store: {
                        select: {
                            store_name: true,
                        }
                    }
                }
            });
            if (!findProduct) {
                throw new common_1.HttpException('Product tidak di temukan', common_1.HttpStatus.NOT_FOUND);
            }
            return { message: "Product berhasil di ambil", data: findProduct };
        }
        catch (error) {
            throw error;
        }
    }
    async updateProduct(userId, file, updateProductDto, id) {
        try {
            const findProduct = await this.prisma.product.findFirst({
                where: {
                    userId: userId,
                    id: id
                }
            });
            if (!findProduct) {
                throw new common_1.HttpException('Product tidak di temukan', common_1.HttpStatus.NOT_FOUND);
            }
            let product_image = findProduct.product_image;
            if (file) {
                const result = await new Promise((resolve, reject) => {
                    const upload_stream = claudinary_config_1.default.uploader.upload_stream({
                        folder: 'uploads',
                        public_id: file.originalname.split('.')[0],
                        format: 'png'
                    }, (error, response) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            resolve(response);
                        }
                    });
                    upload_stream.end(file.buffer);
                });
                product_image = result.secure_url;
            }
            const updateProduct = await this.prisma.product.update({
                where: {
                    id: id,
                    userId: userId
                },
                data: {
                    ...updateProductDto,
                    price: Number(updateProductDto.price),
                    product_image: product_image
                }
            });
            if (!updateProduct) {
                throw new common_1.HttpException('Product tidak di temukan', common_1.HttpStatus.NOT_FOUND);
            }
            return { message: "Product berhasil di update", data: updateProduct };
        }
        catch (error) {
            throw error;
        }
    }
    async searchProduct(name) {
        try {
            const searchProduct = await this.prisma.product.findMany({
                where: {
                    product_name: {
                        contains: name,
                        mode: 'insensitive'
                    }
                }
            });
            if (searchProduct.length === 0) {
                throw new common_1.HttpException('Product tidak di temukan', common_1.HttpStatus.NOT_FOUND);
            }
            return { message: "Product berhasil di ambil", data: searchProduct };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map