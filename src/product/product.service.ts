import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import cloudinary from 'src/config/claudinary.config';
import { updateProductDto } from './dto/update-prduct.dto';


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
            if(!file){
                throw new HttpException('Image tidak ada',HttpStatus.BAD_REQUEST)
            }
            
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

    async getAllProduct(){
        try {
            
            const getAllProduct = await  this.prisma.product.findMany({
                include:{
                    category:{
                        select:{
                            category_name:true,
                        },
                    },
                    store:{
                        select:{
                            store_name:true,
                        }
                    }
                },orderBy:{createdAt:'desc'}
            })
            if(getAllProduct.length === 0){
                throw new HttpException('Product belum ada',HttpStatus.NOT_FOUND)
            }
            return {message:"Product berhasil di ambil",data:getAllProduct};
        } catch (error) {
            throw error
        }
    }

    async getProductById(id:string){
        try {
            const findProduct = await this.prisma.product.findUnique({
                where:{
                    id:id
                },
                include:{
                    category:{
                        select:{
                            category_name:true,
                        },
                    },
                    store:{
                        select:{
                            store_name:true,
                        }
                    }
                }
            })
            if(!findProduct){
                throw new HttpException('Product tidak di temukan',HttpStatus.NOT_FOUND)
            }
            return {message:"Product berhasil di ambil",data:findProduct};
        } catch (error) {
            throw error
        }
    }

    async updateProduct(userId,file:Express.Multer.File,updateProductDto:updateProductDto,id:string){
        try {
            
            const findProduct = await this.prisma.product.findFirst({
                where:{
                    userId:userId,
                    id:id
                }
            })
            if(!findProduct){
                throw new HttpException('Product tidak di temukan',HttpStatus.NOT_FOUND)
            }
            let product_image = findProduct.product_image

            if(file){
                const result : any = await new Promise((resolve,reject)=>{
                    const upload_stream = cloudinary.uploader.upload_stream({
                        folder:'uploads',
                        public_id:file.originalname.split('.')[0],
                        format:'png'
                    },
                    (error,response)=>{
                        if(error){
                            reject(error)
                        }else{
                            resolve(response)
                        }
                    }
                )
                upload_stream.end(file.buffer)
                }
            )
            product_image = result.secure_url
            }

            const updateProduct = await this.prisma.product.update({
                where:{
                    id:id,
                    userId:userId
                },
                data:{
                    ...updateProductDto,
                    price:Number(updateProductDto.price),
                    product_image:product_image
                }
            })
            if(!updateProduct){
                throw new HttpException('Product tidak di temukan',HttpStatus.NOT_FOUND)
            }
            return {message:"Product berhasil di update",data:updateProduct};
        } catch (error) {
            throw error
        }
    }

    async searchProduct(name:string){
        try {
            const searchProduct = await this.prisma.product.findMany({
                where:{
                    product_name:{
                        contains:name,
                        mode:'insensitive'
                    }
                }
            })
            if(searchProduct.length === 0){
                throw new HttpException('Product tidak di temukan',HttpStatus.NOT_FOUND)
            }
            return {message:"Product berhasil di ambil",data:searchProduct};
        } catch (error) {
            throw error
        }
    }
}