export declare class AswS3Service {
    private readonly bucketName;
    private s3;
    constructor();
    uploadFile(fileId: any, file: any): Promise<any>;
    getFileById(fileId: any): Promise<string | undefined>;
    deleteFileById(fileId: any): Promise<any>;
}
