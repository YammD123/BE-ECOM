import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/config/claudinary.config';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
    constructor(private productService:ProductService){}

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image',{storage}))
    async createProduct(@Body() createProductDto:CreateProductDto,@Req() req,@UploadedFile() file:Express.Multer.File ){
        return await this.productService.createProduct(createProductDto,req.user.id,file)
    }


}
