import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
    constructor(private prisma:PrismaService) {}
    async createProduct( createProductDto : CreateProductDto,userId,file: Express.Multer.File){
        try {
            
            const createProduct = await this.prisma.product.create({
                data:{
                    ...createProductDto,
                    userId:userId,
                    product_image:file.path
                }
            })
            return {message:"Product berhasil di tambahkan",data:createProduct};
        } catch (error) {
            throw error
        }
    }
}
