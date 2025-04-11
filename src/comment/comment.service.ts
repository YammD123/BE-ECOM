import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
    constructor(private prisma:PrismaService){}
    

    async createComment(userId,createCommentDto:CreateCommentDto,id){
        try {     
            const createComment = await this.prisma.comment.create({
                data:{
                    userId:userId,
                    productId:createCommentDto.productId,
                    comment:createCommentDto.comment,
                    orderId:id
                }
            })
            if(!createComment){
                throw new HttpException('Komentar gagal ditambahkan',HttpStatus.BAD_REQUEST)
            }
            return { message: 'Komentar berhasil ditambahkan', data: createComment };
        } catch (error) {
            throw error
        }
    }

    async getAllCommentForProduct(id:string){
        try {
            const getComment = await this.prisma.comment.findMany({
                where:{productId:id},
                include:{
                    user:true
                }
            })
            if(!getComment){
                throw new HttpException('Komentar tidak ditemukan',HttpStatus.NOT_FOUND)
            }
            return { message: 'Komentar berhasil ditemukan', data: getComment };
        } catch (error) {
            throw error
        }
    }
}
