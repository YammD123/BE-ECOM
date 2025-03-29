import { Body, Controller, Delete, Get, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/config/claudinary.config';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.userService.register(registerUserDto);
  }

  @Post('/login')
  async login(@Body() loginUserDto : LoginUserDto) {
    return await this.userService.login(loginUserDto);
  }

  @Delete('/logout')
  @UseGuards(AuthGuard)
  async logout(@Req() req){
    return await this.userService.logout(req.user.id)
  }

  @Patch('/update/profile')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image',{storage}))
  async updateProfile(@Req()req,@UploadedFile() file:Express.Multer.File){
    return await this.userService.updateProfile(req.user.id,file)
  }
}
