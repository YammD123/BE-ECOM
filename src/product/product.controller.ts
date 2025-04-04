import { Body, Controller, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
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
    async createProduct(@Body() createProductDto:CreateProductDto,@Param() id:string,@Req() req,@UploadedFile() file:Express.Multer.File ){
        return await this.productService.createProduct(createProductDto,req.user.id,file,id)
    }


}
