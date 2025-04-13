import { Body, Controller, Get, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { updateProductDto } from './dto/update-prduct.dto';

@Controller('product')
export class ProductController {
    constructor(private productService:ProductService){}

    @Post(':id')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    async createProduct(@Body() createProductDto:CreateProductDto,@Req() req,@UploadedFile() file:Express.Multer.File,@Param('id') id:string){
        return await this.productService.createProduct(createProductDto,req.user.id,file,id)
    }

    @Get()
    @UseGuards(AuthGuard)
    async getAllProductByUserId(@Req() req){
        return await this.productService.getAllProductByUserId(req.user.id)
    }

    @Get('/all')
    async getAllProduct(){
        return await this.productService.getAllProduct()
    }

    @Get(':id')
    async getProductById(@Param('id') id:string){
        return await this.productService.getProductById(id)
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    async updateProduct(@Req() req,@UploadedFile() file:Express.Multer.File,@Body() updadateProductDto:updateProductDto,@Param('id') id:string){
        return await this.productService.updateProduct(req.user.id,file,updadateProductDto,id)
    }

    @Get('search/:name')
    async searchProduct(@Param('name') name:string){
        return await this.productService.searchProduct(name)
    }
}
