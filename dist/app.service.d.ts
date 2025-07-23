import { EmailSenderService } from './email-sender/email-sender.service';
export declare class AppService {
    private emailSenderService;
    constructor(emailSenderService: EmailSenderService);
    getHello(): string;
    sendEmail(to: any, subject: any, content: any): Promise<void>;
}
