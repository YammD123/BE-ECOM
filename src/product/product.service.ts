import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import cloudinary from 'src/config/claudinary.config';


@Injectable()
export class ProductService {
    constructor(private prisma:PrismaService) {}

    async createProduct( createProductDto : CreateProductDto,userId,file: Express.Multer.File,id:string){
        const result : any = await new Promise((resolve,reject)=>{
            const timeout = setTimeout(()=>{
                reject(new Error('Request Timeout'))
                clearTimeout(timeout)
            },30000)
            const uploadStream = cloudinary.uploader.upload_stream(
                {folder:'uploads',public_id:file.originalname.split('.')[0],format:'png',timeout:30000},
                (error,response)=>{
                    if(error){
                        reject(error)
                    }
                    else{
                        resolve(response)
                    }
                }
            )
            uploadStream.end(file.buffer)
        })

        
        try {
            
            const createProduct = await this.prisma.product.create({
                data:{
                    ...createProductDto,
                    price:Number(createProductDto.price),
                    userId:userId,
                    product_image:result.secure_url,
                    storeId:id,
                }
            })
            return {message:"Product berhasil di tambahkan",data:createProduct};
        } catch (error) {
            throw error
        }
    }


    async getAllProductByUserId(userId:string){
        try {
            const getAllProduct = await this.prisma.product.findMany({
                where:{
                    userId:userId
                },
            })
            return {message:"Product berhasil di ambil",data:getAllProduct};
        } catch (error) {
            throw error
        }
    }
}
