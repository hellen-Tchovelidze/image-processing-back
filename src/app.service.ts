import { Injectable } from '@nestjs/common';
import { EmailSenderService } from './email-sender/email-sender.service';

@Injectable()
export class AppService {
  constructor(private emailSenderService: EmailSenderService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async sendEmail(to, subject, content) {
    await this.emailSenderService.sendHtmlToSomeone(to, subject, content);
    console.log('sent successfully');
  }
}
