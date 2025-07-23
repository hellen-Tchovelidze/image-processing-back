import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { EmailSenderService } from 'src/email-sender/email-sender.service';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('user') private userModel: Model<User>,
    private jwtService: JwtService,
    private emailSenderService: EmailSenderService,
  ) {}

  async signUp({ age, email, fullName, password }: SignUpDto) {
    const existUser = await this.userModel.findOne({ email });
    if (existUser) {
      throw new BadRequestException('user already exist');
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
    if (!user) throw new NotFoundException('user not found');

    if (user.isActive) throw new BadRequestException('user already verifeid');
    if (new Date(user.OTPValidationDate as string) < new Date())
      throw new BadRequestException('OTP Code is outdated');

    if (user.OTPCode !== otpCode)
      throw new BadRequestException('invalid otp code provided');

    await this.userModel.updateOne(
      { _id: user._id },
      {
        $set: { OTPCode: null, OTPValidationDate: null, isActive: true },
      },
    );

    const payload = {
      id: user._id,
    };

    const token = this.jwtService.sign(payload, { expiresIn: '1h' });
    return { token, verify: 'ok' };
  }

  async resendOTPCode(email) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException('user not found');

    const otpCode = Math.random().toString().slice(2, 8);
    const validationDate = new Date();
    validationDate.setTime(validationDate.getTime() + 3 * 60 * 1000);

    await this.userModel.updateOne(
      { _id: user._id },
      {
        $set: { OTPCode: otpCode, OTPValidationDate: validationDate },
      },
    );
    await this.emailSenderService.sendOTPCode(email, otpCode);

    return 'check email to verify process';
  }

  async signIn({ email, password }: SignInDto) {
    const existUser = await this.userModel
      .findOne({ email })
      .select('password isActive');

    if (!existUser) {
      throw new BadRequestException('invalid credentials');
    }

    const isPassEqual = await bcrypt.compare(password, existUser.password);
    if (!isPassEqual) {
      throw new BadRequestException('invalid credentials');
    }

    if (!existUser.isActive)
      throw new BadRequestException(
        'Your account is not active. Please verify your email.',
      );

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
}
