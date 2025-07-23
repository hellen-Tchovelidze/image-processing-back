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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const asw_s3_service_1 = require("../asw-s3/asw-s3.service");
const uuid_1 = require("uuid");
let UsersService = class UsersService {
    userModel;
    aswS3Service;
    constructor(userModel, aswS3Service) {
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
    async create({ age, email, fullName, password }) {
        const isAdult = age >= 18;
        const existUser = await this.userModel.findOne({ email });
        if (existUser) {
            throw new common_1.BadRequestException('Email already in use');
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
        return this.userModel.find();
    }
    findOne(id) {
        return this.userModel.findById(id).exec();
    }
    async update(id, updateUserDto) {
        const { address, age, email, fullName } = updateUserDto;
        console.log(address, "adress");
        const user = await this.userModel.findByIdAndUpdate(id, {
            address,
            age,
            email,
            fullName,
        }, {
            new: true
        });
        return user;
    }
    remove(id) {
        return this.userModel.findByIdAndDelete(id).exec();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('user')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        asw_s3_service_1.AswS3Service])
], UsersService);
//# sourceMappingURL=users.service.js.map