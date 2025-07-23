import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signUpDto: SignUpDto): Promise<string>;
    verifyEmail(body: any): Promise<{
        token: string;
        verify: string;
    }>;
    verficationCode(email: string): Promise<string>;
    signIn(signInDto: SignInDto): Promise<{
        token: string;
    }>;
    getCurrentUser(userId: any): Promise<(import("mongoose").Document<unknown, {}, import("../users/schema/user.schema").User, {}> & import("../users/schema/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}
