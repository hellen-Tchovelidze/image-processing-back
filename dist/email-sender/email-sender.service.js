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
exports.EmailSenderService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
let EmailSenderService = class EmailSenderService {
    mailerService;
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendHtmlToSomeone(to, subject, content, token) {
        const options = {
            to,
            from: 'ImageProcessingService <elenechovelidze@gmail.com>',
            subject,
            html: `
               <table cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" style="padding: 40px 0;">h
        <table cellpadding="0" cellspacing="0" width="600" style="background-color:#ffffff; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); overflow:hidden;">
          <!-- Header -->
          <tr>
            <td align="center" style="background-color:#4CAF50; padding:20px 0;">
              <h1 style="margin:0; color:#ffffff;">Welcome to Our Service</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px;">
              <p style="margin:0 0 15px 0; font-size:16px; color:#333333;">
                Hi <strong>John Doe</strong>,
              </p>
              <p style="margin:0 0 15px 0; font-size:16px; color:#333333;">
                We're thrilled to have you here! Get ready to dive into your new account. We're here to help you get started and make the most out of our service.
              </p>
              <p style="margin:0 0 25px 0; font-size:16px; color:#333333;">
                Click the button below to activate your account and begin exploring:
              </p>
              <p style="text-align:center;">
                <a href="https://frontUrl.com/activate?token=${token}" style="display:inline-block; padding:12px 24px; background-color:#4CAF50; color:#ffffff; text-decoration:none; border-radius:5px; font-weight:bold;">
                  Activate Your Account
                </a>
              </p>
            </td>
          </tr>
          <button style="background: purple; text: white; padding: 5px;">${content}</button>

          <!-- Footer -->
          <tr>
            <td align="center" style="background-color:#f4f4f4; padding:20px; font-size:14px; color:#888888;">
              <p style="margin:0;">&copy; 2025 Company Name. All rights reserved.</p>
              <p style="margin:5px 0 0 0;">
                <a href="https://example.com/unsubscribe" style="color:#888888; text-decoration:underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
          `
        };
        await this.mailerService.sendMail(options);
    }
    async sendOTPCode(to, otpCode) {
        const options = {
            to,
            from: 'ImageProcessingService <elenechovelidze@gmail.com>',
            subject: "OTP Code",
            html: `
               <table cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" style="padding:40px 0;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td align="center" style="background-color:#2d89ef; padding:20px;">
              <h2 style="margin:0; color:#ffffff;">Your One-Time Password (OTP)</h2>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#333333;">
              <p style="font-size:16px; margin-top:0;">Hi <strong>User</strong>,</p>
              <p style="font-size:16px; margin-bottom:24px;">
                Use the following OTP to complete your action. This code is valid for the next 3 minutes:
              </p>

              <div style="text-align:center; margin:30px 0;">
                <span style="display:inline-block; font-size:32px; letter-spacing:6px; font-weight:bold; background-color:#f0f0f0; padding:15px 30px; border-radius:6px; color:#2d89ef;">
                  ${otpCode}
                </span>
              </div>

              <p style="font-size:14px; color:#666666;">
                If you did not request this code, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background-color:#f9f9f9; padding:20px; font-size:12px; color:#999999;">
              &copy; 2025 Your Company. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
          `
        };
        await this.mailerService.sendMail(options);
    }
};
exports.EmailSenderService = EmailSenderService;
exports.EmailSenderService = EmailSenderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], EmailSenderService);
//# sourceMappingURL=email-sender.service.js.map