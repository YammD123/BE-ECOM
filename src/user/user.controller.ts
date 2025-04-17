import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { updateUserDto } from './dto/update-user.dto';
import { PaginationUserDto } from './dto/pagination-user.dto';
import { UpdateRoleUserDto } from './dto/update-role-user.dto';

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
  @UseInterceptors(FileInterceptor('image'))
  async updateProfile(@Req()req,@UploadedFile() file:Express.Multer.File,){
    return await this.userService.updateProfile(req.user.id,file)
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  async getprofile(@Req() req){
    return this.userService.getProfile(req.user.id)
  }

  @Patch('/update')
  @UseGuards(AuthGuard)
  async updateUser(@Body() updateUserDto:updateUserDto,@Req() req){
    return this.userService.updateUser(req.user.id,updateUserDto)
  }

  @Get()
  async getAllUser(@Query() paginationUserDto:PaginationUserDto){
    return this.userService.getAllUser(paginationUserDto)
  }

  @Delete(':id')
  async deleteUser(@Param('id') id:string){
    return this.userService.deleteUser(id)
  }

  @Patch(':id')
  async updateRoleUser(@Body() updateRoleUserDto: UpdateRoleUserDto,@Param('id') id:string){
    return this.userService.updateRoleUser(updateRoleUserDto,id)
  }
}