import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
    constructor(private commentService:CommentService){}

    @Post(':id')
    @UseGuards(AuthGuard)
    async createComment(@Req() req, @Body() createCommentDto:CreateCommentDto,@Param('id') id:string){
        return this.commentService.createComment(req.user.id,createCommentDto,id)
    }

    @Get(':id')
    async getAllComment(@Param('id') id:string){
        return this.commentService.getAllCommentForProduct(id)
    }
}
