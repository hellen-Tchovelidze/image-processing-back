import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose from 'mongoose';

@Schema()
class Address {
  @Prop({
    type: String,
  })
  city: string;

  @Prop({
    type: Number,
  })
  homeNumber: number;

  @Prop({
    type: String,
  })
  street: number;
}

@Schema({ timestamps: true })
export class User {
  @Prop({
    type: String,
    required: true,
  })
  fullName: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  isActive: boolean;

  @Prop({
    type: Number,
  })
  OTPCode: number;

  @Prop({
    type: String,
  })
  OTPValidationDate: string;

  @Prop({
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    select: false,
  })
  password: string;

  @Prop({
    type: Number,
    required: true,
  })
  age: number;

  @Prop({
    type: Boolean,
  })
  isAdult: boolean;

  @Prop({
    type: [mongoose.Types.ObjectId],
    ref: 'post',
    default: [],
  })
  posts: mongoose.Types.ObjectId[];

  @Prop({
    type: Address,
  })
  address: Address;
}

export const userSchema = SchemaFactory.createForClass(User);
