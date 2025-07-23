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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const email_sender_service_1 = require("../email-sender/email-sender.service");
let AuthService = class AuthService {
    userModel;
    jwtService;
    emailSenderService;
    constructor(userModel, jwtService, emailSenderService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.emailSenderService = emailSenderService;
    }
    async signUp({ age, email, fullName, password }) {
        const existUser = await this.userModel.findOne({ email });
        if (existUser) {
            throw new common_1.BadRequestException('user already exist');
        }
        const hashedPass = await bcrypt.hash(password, 10);
        const otpCode = Math.random().toString().slice(2, 8);
        const validationDate = new Date();
        validationDate.setTime(validationDate.getTime() + 3 * 60 * 1000);
        const newUser = await this.userModel.create({
            email,
            age,
            fullName,
            password: hashedPass,
            isAdult: age >= 18,
            OTPCode: otpCode,
            OTPValidationDate: validationDate,
        });
        await this.emailSenderService.sendOTPCode(email, otpCode);
        return 'check your email for OTP code to verify your account';
    }
    async verifyEmail(email, otpCode) {
        const user = await this.userModel.findOne({ email });
        console.log(user);
        if (!user)
            throw new common_1.NotFoundException('user not found');
        if (user.isActive)
            throw new common_1.BadRequestException('user already verifeid');
        if (new Date(user.OTPValidationDate) < new Date())
            throw new common_1.BadRequestException('OTP Code is outdated');
        if (user.OTPCode !== otpCode)
            throw new common_1.BadRequestException('invalid otp code provided');
        await this.userModel.updateOne({ _id: user._id }, {
            $set: { OTPCode: null, OTPValidationDate: null, isActive: true },
        });
        const payload = {
            id: user._id,
        };
        const token = this.jwtService.sign(payload, { expiresIn: '1h' });
        return { token, verify: 'ok' };
    }
    async resendOTPCode(email) {
        const user = await this.userModel.findOne({ email });
        if (!user)
            throw new common_1.NotFoundException('user not found');
        const otpCode = Math.random().toString().slice(2, 8);
        const validationDate = new Date();
        validationDate.setTime(validationDate.getTime() + 3 * 60 * 1000);
        await this.userModel.updateOne({ _id: user._id }, {
            $set: { OTPCode: otpCode, OTPValidationDate: validationDate },
        });
        await this.emailSenderService.sendOTPCode(email, otpCode);
        return 'check email to verify process';
    }
    async signIn({ email, password }) {
        const existUser = await this.userModel
            .findOne({ email })
            .select('password isActive');
        if (!existUser) {
            throw new common_1.BadRequestException('invalid credentials');
        }
        const isPassEqual = await bcrypt.compare(password, existUser.password);
        if (!isPassEqual) {
            throw new common_1.BadRequestException('invalid credentials');
        }
        if (!existUser.isActive)
            throw new common_1.BadRequestException('Your account is not active. Please verify your email.');
        const payload = {
            id: existUser._id,
        };
        const token = this.jwtService.sign(payload, { expiresIn: '1h' });
        return { token };
    }
    async getCurrentUser(userId) {
        console.log(userId, 'userId');
        const user = await this.userModel.findById(userId);
        console.log(user, 'user');
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('user')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        email_sender_service_1.EmailSenderService])
], AuthService);
//# sourceMappingURL=auth.service.js.map