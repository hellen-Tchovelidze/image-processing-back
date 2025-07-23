"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const asw_s3_service_1 = require("../asw-s3/asw-s3.service");
const uuid_1 = require("uuid");
let PostsService = class PostsService {
    postModel;
    userModel;
    aswS3Service;
    constructor(postModel, userModel, aswS3Service) {
        this.postModel = postModel;
        this.userModel = userModel;
        this.aswS3Service = aswS3Service;
    }
    async DeleteFileById(fileId) {
        return this.aswS3Service.deleteFileById(fileId);
    }
    async getFileById(fileId) {
        return this.aswS3Service.getFileById(fileId);
    }
    async uploadFile(file) {
        const fileId = `images/${(0, uuid_1.v4)()}.webp`;
        await this.aswS3Service.uploadFile(fileId, file);
        return fileId;
    }
    async uploadFiles(files) {
        const uploadFileIds = [];
        for (let file of files) {
            const fileId = `images/meny/${(0, uuid_1.v4)()}.webp`;
            console.log(file, 'file');
            await this.aswS3Service.uploadFile(fileId, file);
            uploadFileIds.push(fileId);
        }
        return uploadFileIds;
    }
    async create({ desc, title }, userId) {
        const existUser = await this.userModel.findById(userId);
        if (!existUser)
            throw new common_1.BadRequestException('User not found');
        const newPost = await this.postModel.create({ title, desc, author: existUser._id });
        await this.userModel.findByIdAndUpdate(existUser._id, { $push: { posts: newPost._id } });
        return { success: 'ok', data: newPost };
    }
    async findAll({ page, take }) {
        const total = await this.postModel.countDocuments();
        console.log(page, take);
        const posts = await this.postModel
            .find()
            .populate({ path: 'author', select: 'email fullName' })
            .skip((page - 1) * take)
            .limit(take)
            .sort({ _id: -1 });
        console.log(posts.length, "length");
        return { total, take, page, posts };
    }
    findOne(id) {
        return this.postModel.findById(id);
    }
    async update(id, updatePostDto, userId) {
        const post = await this.postModel.findById(id);
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        if (post.author.toString() !== userId) {
            throw new common_1.ForbiddenException('You are not the author of this post');
        }
        const updatedPost = await this.postModel.findByIdAndUpdate(id, updatePostDto, {
            new: true,
        });
        return { success: 'ok', data: updatedPost };
    }
    async remove(id, userId) {
        const post = await this.postModel.findById(id);
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        if (post.author.toString() !== userId) {
            throw new common_1.ForbiddenException('You are not allowed to delete this post');
        }
        await this.userModel.findByIdAndUpdate(userId, {
            $pull: { posts: post._id },
        });
        await this.postModel.findByIdAndDelete(id);
        return { success: 'Post deleted successfully' };
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('post')),
    __param(1, (0, mongoose_1.InjectModel)('user')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        asw_s3_service_1.AswS3Service])
], PostsService);
//# sourceMappingURL=posts.service.js.map