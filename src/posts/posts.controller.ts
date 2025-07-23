import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers, Query, UseInterceptors, UploadedFile, UploadedFiles, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { HasUserId } from 'src/common/guards/has-user-id.guard';
import { IsAuthGuard } from 'src/auth/guards/isAuth.guard';
import { UserId } from 'src/users/decorators/user.decorator';
import { QueryParams } from './dto/query-params.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
@UseGuards(IsAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

    
@Delete('delete-file')
deleteFile(@Body('fileId') fileId: string) {
return this.postsService.DeleteFileById(fileId);
} 

@Post('get-file')
getFile(@Body('fileId') fileId: string) {

  return this.postsService.getFileById(fileId);
}


  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.postsService.uploadFile(file);
  }
  

  @Post('upload-many')
  @UseInterceptors(FilesInterceptor('file'))
  uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
   
    return this.postsService.uploadFiles(files);
  }



  @Post()
  create(@UserId() userId: string, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto, userId);
  }

  @Get()
  findAll(@Query() queryParamsDto: QueryParams) {
    return this.postsService.findAll(queryParamsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: Request & { user: { _id: string } } 
  ) {
    const userId = req.user._id;
    return this.postsService.update(id, updatePostDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request & { user: { _id: string } }) {
    const userId = req.user._id;
    return this.postsService.remove(id, userId);
  }
}
