import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { QueryParams } from './dto/query-params.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    deleteFile(fileId: string): Promise<any>;
    getFile(fileId: string): Promise<string | undefined>;
    uploadFile(file: Express.Multer.File): Promise<string>;
    uploadFiles(files: Express.Multer.File[]): Promise<string[]>;
    create(userId: string, createPostDto: CreatePostDto): Promise<{
        success: string;
        data: import("mongoose").Document<unknown, {}, import("./schema/post.schema").Post, {}> & import("./schema/post.schema").Post & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
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
    findOne(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./schema/post.schema").Post, {}> & import("./schema/post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./schema/post.schema").Post, {}> & import("./schema/post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./schema/post.schema").Post, "findOne", {}>;
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
    remove(id: string, req: Request & {
        user: {
            _id: string;
        };
    }): Promise<{
        success: string;
    }>;
}
