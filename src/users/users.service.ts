import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { AswS3Service } from 'src/asw-s3/asw-s3.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private userModel: Model<User>,
    private aswS3Service: AswS3Service
  ){}



  async DeleteFileById(fileId: string) {
    return this.aswS3Service.deleteFileById(fileId);
  }

  async getFileById(fileId: string) {
    return this.aswS3Service.getFileById(fileId);
  }

  async uploadFile(file: Express.Multer.File) {
    const fileId = `images/${uuidv4()}.webp`;  
    await this.aswS3Service.uploadFile(fileId, file);
    return fileId;
  }
  async uploadFiles(files: Express.Multer.File[]) {
    const uploadFileIds: string[] = [];
    for (let file of files) {
      const fileId = `images/meny/${uuidv4()}.webp`;  
      console.log(file, 'file');
      await this.aswS3Service.uploadFile(fileId, file);
      uploadFileIds.push(fileId);
    }
    return uploadFileIds;
  }
  

  async create({ age, email, fullName, password }: CreateUserDto) {
    const isAdult = age >= 18;
  
    const existUser = await this.userModel.findOne({ email });
    if (existUser) {
      throw new BadRequestException('Email already in use');
    }
  
    const newUser = await this.userModel.create({
      age,
      email,
      fullName,
      password, 
      isAdult,
    });
  
    return { success: 'ok', data: newUser };
  }
  

  findAll() {
    return this.userModel.find()
  }

  findOne(id: number) {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const {address, age, email, fullName} = updateUserDto
    console.log(address, "adress")
    const user = await this.userModel.findByIdAndUpdate(
      id,
      {
        address,
        age,
        email,
        fullName,
        
      },
      {
        new: true
      }
    )
    return user
  }

  remove(id: number) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
