import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { AswS3Service } from 'src/asw-s3/asw-s3.service';
export declare class UsersService {
    private userModel;
    private aswS3Service;
    constructor(userModel: Model<User>, aswS3Service: AswS3Service);
    DeleteFileById(fileId: string): Promise<any>;
    getFileById(fileId: string): Promise<string | undefined>;
    uploadFile(file: Express.Multer.File): Promise<string>;
    uploadFiles(files: Express.Multer.File[]): Promise<string[]>;
    create({ age, email, fullName, password }: CreateUserDto): Promise<{
        success: string;
        data: import("mongoose").Document<unknown, {}, User, {}> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, User, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, User, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, User, "find", {}>;
    findOne(id: number): Promise<(import("mongoose").Document<unknown, {}, User, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<(import("mongoose").Document<unknown, {}, User, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    remove(id: number): Promise<(import("mongoose").Document<unknown, {}, User, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}
