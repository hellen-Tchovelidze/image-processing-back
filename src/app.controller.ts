import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/send-email')
  sendEmail(@Body() body) {
    return this.appService.sendEmail(body.to, body.subject, body.service);
  }
}

