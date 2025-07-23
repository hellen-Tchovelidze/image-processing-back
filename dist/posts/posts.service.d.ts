import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import mongoose, { Model } from 'mongoose';
import { Post } from './schema/post.schema';
import { User } from 'src/users/schema/user.schema';
import { QueryParams } from './dto/query-params.dto';
import { AswS3Service } from 'src/asw-s3/asw-s3.service';
export declare class PostsService {
    private postModel;
    private userModel;
    private aswS3Service;
    constructor(postModel: Model<Post>, userModel: Model<User>, aswS3Service: AswS3Service);
    DeleteFileById(fileId: string): Promise<any>;
    getFileById(fileId: string): Promise<string | undefined>;
    uploadFile(file: Express.Multer.File): Promise<string>;
    uploadFiles(files: Express.Multer.File[]): Promise<string[]>;
    create({ desc, title }: CreatePostDto, userId: string): Promise<{
        success: string;
        data: mongoose.Document<unknown, {}, Post, {}> & Post & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    findAll({ page, take }: QueryParams): Promise<{
        total: number;
        take: number;
        page: number;
        posts: (mongoose.Document<unknown, {}, Post, {}> & Post & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    findOne(id: number): mongoose.Query<(mongoose.Document<unknown, {}, Post, {}> & Post & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }) | null, mongoose.Document<unknown, {}, Post, {}> & Post & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, {}, Post, "findOne", {}>;
    update(id: string, updatePostDto: UpdatePostDto, userId: string): Promise<{
        success: string;
        data: (mongoose.Document<unknown, {}, Post, {}> & Post & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        }) | null;
    }>;
    remove(id: string, userId: string): Promise<{
        success: string;
    }>;
}
