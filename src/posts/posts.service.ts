import { BadRequestException, ForbiddenException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Post } from './schema/post.schema';
import { User } from 'src/users/schema/user.schema';
import { QueryParams } from './dto/query-params.dto';
import { AswS3Service } from 'src/asw-s3/asw-s3.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('post') private postModel: Model<Post>,
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
  

  async create({desc, title}: CreatePostDto, userId: string) {
    const existUser = await this.userModel.findById(userId)
    if(!existUser) throw new BadRequestException('User not found')

    const newPost = await this.postModel.create({title, desc, author: existUser._id})
    await this.userModel.findByIdAndUpdate(existUser._id, {$push: {posts: newPost._id}})
   

    return {success: 'ok', data: newPost}
  }

  async findAll({page, take}: QueryParams) {
    const total = await this.postModel.countDocuments()
    console.log(page, take)
    const posts = await this.postModel
                        .find()
                        .populate({path: 'author', select: 'email fullName'})
                        .skip((page - 1) * take)
                        .limit(take)
                        .sort({_id: -1})
    console.log(posts.length, "length")
    return {total, take, page, posts}
  }

  findOne(id: number) {
    return this.postModel.findById(id);
  }

  async update(id: string, updatePostDto: UpdatePostDto, userId: string) {
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
  
    if (post.author.toString() !== userId) {
      throw new ForbiddenException('You are not the author of this post');
    }
  
    const updatedPost = await this.postModel.findByIdAndUpdate(id, updatePostDto, {
      new: true,
    });
  
    return { success: 'ok', data: updatedPost };
  }
  
  async remove(id: string, userId: string) {
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
  
    if (post.author.toString() !== userId) {
      throw new ForbiddenException('You are not allowed to delete this post');
    }
  
    await this.userModel.findByIdAndUpdate(userId, {
      $pull: { posts: post._id },
    });
  
    await this.postModel.findByIdAndDelete(id);
  
    return { success: 'Post deleted successfully' };
  }
}
