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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AswS3Service = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const stream_1 = require("stream");
const sharp = require("sharp");
let AswS3Service = class AswS3Service {
    bucketName;
    s3;
    constructor() {
        this.bucketName = process.env.AWS_BUCKET_NAME;
        this.s3 = new client_s3_1.S3Client({
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
            region: process.env.AWS_REGION,
        });
    }
    async uploadFile(fileId, file) {
        if (!fileId || !file) {
            throw new common_1.BadRequestException('File ID and file content are required');
        }
        const processedBuffer = await sharp(file.buffer)
            .resize(800)
            .toFormat('webp')
            .webp({ quality: 80 })
            .toBuffer();
        const config = {
            Key: fileId.endsWith('.webp') ? fileId : `${fileId}.webp`,
            Body: processedBuffer,
            Bucket: this.bucketName,
            ContentType: 'image/webp',
        };
        const uploadCommand = new client_s3_1.PutObjectCommand(config);
        await this.s3.send(uploadCommand);
        return config.Key;
    }
    async getFileById(fileId) {
        if (!fileId)
            throw new common_1.BadRequestException('File ID is required');
        const config = {
            Key: fileId,
            Bucket: this.bucketName,
        };
        const getCommand = new client_s3_1.GetObjectCommand(config);
        const fileStream = await this.s3.send(getCommand);
        if (fileStream.Body instanceof stream_1.Readable) {
            const chunks = [];
            for await (const chunk of fileStream.Body) {
                chunks.push(chunk);
            }
            const fileBuffer = Buffer.concat(chunks);
            const base64 = fileBuffer.toString('base64');
            const file = `data:${fileStream.ContentType};base64,${base64}`;
            return file;
        }
        console.log(fileStream, 'fileStream');
    }
    async deleteFileById(fileId) {
        if (!fileId)
            throw new common_1.BadRequestException('File ID is required');
        const config = {
            Key: fileId,
            Bucket: this.bucketName,
        };
        const deleteCommand = new client_s3_1.DeleteObjectCommand(config);
        await this.s3.send(deleteCommand);
        return fileId;
    }
};
exports.AswS3Service = AswS3Service;
exports.AswS3Service = AswS3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AswS3Service);
//# sourceMappingURL=asw-s3.service.js.map