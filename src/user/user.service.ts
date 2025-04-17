import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { randomUUID } from 'crypto';
import { updateUserDto } from './dto/update-user.dto';
import cloudinary from 'src/config/claudinary.config';
import { PaginationUserDto } from './dto/pagination-user.dto';
import { UpdateRoleUserDto } from './dto/update-role-user.dto';


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async register(registerUserDto: RegisterUserDto) {
    try {
        const findUser = await this.prisma.user.findUnique({
            where:{
                email:registerUserDto.email
            }
        })

        if(findUser){
            throw new HttpException('Email sudah terdaftar',HttpStatus.CONFLICT)
        }

      const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
      const createUser = await this.prisma.user.create({
        data: {
            ...registerUserDto,
            password: hashedPassword
        },
      });

      return {message:"User berhasil di buat",data:createUser};
    } catch (error) {
        throw error
    }
  }


  async login(loginUserDto : LoginUserDto) {
    try {
        //mencari user
        const findUser = await this.prisma.user.findUnique({
            where:{
                email:loginUserDto.email
            }
        })
        if(!findUser){
            throw new HttpException('Email belum terdaftar',HttpStatus.NOT_FOUND)
        }

        //check password
        const cheakPassword = await bcrypt.compare(loginUserDto.password,findUser.password)
        if(!cheakPassword){
            throw new HttpException('Password salah',HttpStatus.BAD_REQUEST)
        }

        //update token user
        const user = await this.prisma.user.update({
            where:{
                email:loginUserDto.email
            },
            data:{
                token:randomUUID()
            },
            select:{
                id:true,
                email:true,
                token:true,
                role:true
            }
        })
        
        return {message:"User berhasil login",data:user};
    } catch (error) {
        throw error
    }
  }

  async logout(userId){
    try {
        const userLogout = await this.prisma.user.update({
            where:{
                id:userId
            },
            data:{
                token:null
            },
            select:{
                id:true,
                email:true,
                password:true,
                token:true
            }
        })

        return {message:"User berhasil logout",data:userLogout};
    } catch (error) {
        throw error
    }
  }


  async updateProfile(UserId, file: Express.Multer.File) {
    try {
        const result : any = await new Promise((resolve, reject)=>{
            const timeout = setTimeout(()=>{
                reject(new Error('Request Timeoutttttttt'))
                clearTimeout(timeout)
            },30000)
            const uploadStream = cloudinary.uploader.upload_stream(
                {folder:'uploads',public_id:file.originalname.split('.')[0],format:'png',timeout:30000},
                (error,respone)=>{
                    if(error){
                        reject(error)
                    }
                    else{
                        resolve(respone)
                    }
                } 
            )
            uploadStream.end(file.buffer)
        })
        const updateProfile = await this.prisma.user.update({
            where:{
                id:UserId
            },
            data:{
                profile_image:result.secure_url
            },
            select:{
                id:true,
                user_name:true,
                profile_image:true,
                createdAt:true,
                updatedAt:true
            }
        })

        return {message:"User berhasil di update",data:updateProfile};
    } catch (error) {
        throw error
    }
  }

  async getProfile(userId){
    try {
        const getProfile = await this.prisma.user.findUnique({
            where:{
                id:userId
            }
        })
        return {message:"User berhasil ditemukan",data:getProfile};
    } catch (error) {
        throw error
    }
  }

  async updateUser(updateUserDto:updateUserDto,userId){
    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
    try {
        const updateUser = await this.prisma.user.update({
            where:{
                id:userId
            },
            data:{
                ...updateUserDto,
                password:hashedPassword
            }
        })
        return {message:"User berhasil di update",data:updateUser};
    } catch (error) {
        throw error
    }
  }

  async getAllUser(paginationUserDto:PaginationUserDto){
    try {
        const findAllUser = await this.prisma.user.findMany({
            take: Number(paginationUserDto.limit),
            skip: Number(paginationUserDto.page - 1) * paginationUserDto.limit
        })
        if(findAllUser.length === 0){
            throw new HttpException('User belum ada',HttpStatus.NOT_FOUND)
        }
        const totalUser = await this.prisma.user.count()
        const totalPage = Math.ceil(totalUser / paginationUserDto.limit)
        return {message:"All user berhasil ditemukan",totalUser,totalPage,totalData:Number(paginationUserDto.limit),data:findAllUser};
    } catch (error) {
        throw error
    }
  }

  async deleteUser(id:string){
    try {
        const findUser = await this.prisma.user.findUnique({
            where:{
                id:id
            }
        })
        if(!findUser){
            throw new HttpException('User tidak ditemukan',HttpStatus.NOT_FOUND)
        }
        const deleteUser = await this.prisma.user.deleteMany({
            where:{
                id:id
            }
        })
        return {message:"User berhasil dihapus",data:deleteUser};
    } catch (error) {
        throw error
    }
  }

  async updateRoleUser(updateUserDto:UpdateRoleUserDto,id:string){
    try {
        const updateRole= await this.prisma.user.update({
            where:{
                id:id
            },
            data:{
                role:updateUserDto.role
            }
        })
        if(!updateRole){
            throw new HttpException('User tidak ditemukan',HttpStatus.NOT_FOUND)
        }
        return {message:"User berhasil di update",data:updateRole};
    } catch (error) {
        throw error
    }
  }
}
