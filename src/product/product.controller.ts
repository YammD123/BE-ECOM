import { Body, Controller, Get, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';

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

    @Patch()
    async updateProduct(){
        
    }

}
