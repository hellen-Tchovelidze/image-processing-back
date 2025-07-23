import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailSenderService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendHtmlToSomeone(to: any, subject: any, content: any, token?: string): Promise<void>;
    sendOTPCode(to: any, otpCode: any): Promise<void>;
}
