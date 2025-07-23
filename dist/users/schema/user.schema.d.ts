import mongoose from 'mongoose';
declare class Address {
    city: string;
    homeNumber: number;
    street: number;
}
export declare class User {
    fullName: string;
    isActive: boolean;
    OTPCode: number;
    OTPValidationDate: string;
    email: string;
    password: string;
    age: number;
    isAdult: boolean;
    posts: mongoose.Types.ObjectId[];
    address: Address;
}
export declare const userSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User, any> & User & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>, {}> & mongoose.FlatRecord<User> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export {};
