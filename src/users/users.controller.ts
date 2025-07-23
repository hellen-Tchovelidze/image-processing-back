import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  
@Delete('delete-file')
deleteFile(@Body('fileId') fileId: string) {
return this.usersService.DeleteFileById(fileId);
} 

@Post('get-file')
getFile(@Body('fileId') fileId: string) {

  return this.usersService.getFileById(fileId);
}


  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.usersService.uploadFile(file);
  }
  

  @Post('upload-many')
  @UseInterceptors(FilesInterceptor('file'))
  uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
   
    return this.usersService.uploadFiles(files);
  }


  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
