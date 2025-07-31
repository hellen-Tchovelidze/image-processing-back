import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { isValidObjectId, Model } from 'mongoose';
import { Post } from './schema/post.schema';
import { User } from 'src/users/schema/user.schema';
import { QueryParams, queryParamsDto } from './dto/query-params.dto';
import { AswS3Service } from 'src/asw-s3/asw-s3.service';
import { v4 as uuidv4 } from 'uuid';
import { Types } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('post') private postModel: Model<Post>,
    @InjectModel('user') private userModel: Model<User>,
    private aswS3Service: AswS3Service,
  ) {}

  async findByUserId(userId: string, queryParamsDto: queryParamsDto) {
    const { page = 1, limit = 12 } = queryParamsDto;
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      this.postModel.find({ author: userId }).skip(skip).limit(limit).exec(),
      this.postModel.countDocuments({ author: userId }),
    ]);

    const totalPages = Math.ceil(total / limit);

    // const cloudfrontDomain = 'https://dbkfyk3j7z0hk.cloudfront.net/';
    const cloudfrontDomain = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;

    const postsWithFullImageUrl = posts.map((post) => ({
      ...post.toObject(),
      image: cloudfrontDomain + post.image,
    }));

    return {
      images: postsWithFullImageUrl,
      total,
      totalPages,
    };
  }

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

  async create(
    createPostDto: CreatePostDto,
    userId: string,
    file?: Express.Multer.File,
  ) {
    const existUser = await this.userModel.findById(userId);
    if (!existUser) throw new BadRequestException('User not found');

    if (!file) {
      throw new BadRequestException('File is required');
    }

    const imageId = `images/${uuidv4()}.webp`;
    await this.aswS3Service.uploadFile(imageId, file);

    const newPostData = {
      author: existUser._id,
      image: imageId,
    };

    const newPost = await this.postModel.create(newPostData);
    await this.userModel.findByIdAndUpdate(existUser._id, {
      $push: { posts: newPost._id },
    });

    return { success: 'ok', data: newPost };
  }

  async findAll({ page, take }: QueryParams) {
    const total = await this.postModel.countDocuments();
    console.log(page, take);
    const posts = await this.postModel
      .find()
      .populate({ path: 'author', select: 'email fullName image' })
      .skip((page - 1) * take)
      .limit(take)
      .sort({ _id: -1 });
    console.log(posts.length, 'length');
    return { total, take, page, posts };
  }

  async findOne(id: string): Promise<Post> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid post ID');
    }

    const post = await this.postModel.findById(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto, userId: string) {
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.author.toString() !== userId) {
      throw new ForbiddenException('You are not the author of this post');
    }

    const updatedPost = await this.postModel.findByIdAndUpdate(
      id,
      updatePostDto,
      {
        new: true,
      },
    );

    return { success: 'ok', data: updatedPost };
  }

  async findById(id: string) {
    return this.postModel.findById(id);
  }

  async remove(id: string) {
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    await this.postModel.findByIdAndDelete(id);

    return { success: 'ok', message: 'Post deleted successfully' };
  }
}
