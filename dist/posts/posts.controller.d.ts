import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { QueryParams } from './dto/query-params.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(userId: string, createPostDto: CreatePostDto, file: Express.Multer.File): Promise<{
        success: string;
        data: import("mongoose").Document<unknown, {}, import("./schema/post.schema").Post, {}> & import("./schema/post.schema").Post & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    deleteFile(fileId: string): Promise<any>;
    getFile(fileId: string): Promise<string | undefined>;
    uploadFile(file: Express.Multer.File): Promise<string>;
    uploadFiles(files: Express.Multer.File[]): Promise<string[]>;
    getMyPosts(userId: string, queryParamsDto: QueryParams): Promise<{
        images: {
            image: string;
            title?: string;
            desc?: string;
            author: import("mongoose").Schema.Types.ObjectId;
            _id: import("mongoose").Types.ObjectId;
            __v: number;
        }[];
        total: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<import("./schema/post.schema").Post>;
    findAll(queryParamsDto: QueryParams): Promise<{
        total: number;
        take: number;
        page: number;
        posts: (import("mongoose").Document<unknown, {}, import("./schema/post.schema").Post, {}> & import("./schema/post.schema").Post & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    update(id: string, updatePostDto: UpdatePostDto, req: Request & {
        user: {
            _id: string;
        };
    }): Promise<{
        success: string;
        data: (import("mongoose").Document<unknown, {}, import("./schema/post.schema").Post, {}> & import("./schema/post.schema").Post & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }) | null;
    }>;
    remove(id: string): Promise<{
        success: string;
        message: string;
    }>;
}
