import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { randomUUID } from 'crypto';

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
                token:true
            }
        })
        
        return {message:"User berhasil login",data:user};
    } catch (error) {
        throw error
    }
  }
}
