import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import * as sharp from 'sharp';

@Injectable()
export class AswS3Service {
  private readonly bucketName: string;
  private s3;

  constructor() {
    this.bucketName = process.env.AWS_BUCKET_NAME!;
    this.s3 = new S3Client({
      credentials: {
       
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
      region: process.env.AWS_REGION,
    });
  }

  async uploadFile(fileId, file) {
    if (!fileId || !file) {
      throw new BadRequestException('File ID and file content are required');
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

    const uploadCommand = new PutObjectCommand(config);

    await this.s3.send(uploadCommand);
    return config.Key;
  }

  async getFileById(fileId) {
    if (!fileId) throw new BadRequestException('File ID is required');

    const config = {
      Key: fileId,

      Bucket: this.bucketName,
    };

    const getCommand = new GetObjectCommand(config);
    const fileStream = await this.s3.send(getCommand);

    if (fileStream.Body instanceof Readable) {
      const chunks: any = [];
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
    if (!fileId) throw new BadRequestException('File ID is required');

    const config = {
      Key: fileId,
      Bucket: this.bucketName,
    };

    const deleteCommand = new DeleteObjectCommand(config);
    await this.s3.send(deleteCommand);
    return fileId;
  }
}
