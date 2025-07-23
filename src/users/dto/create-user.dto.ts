import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";


class Address {
    @IsOptional()
    @IsNumber()
    homeNumber: number

    @IsOptional()
    @IsString()
    city: string

    @IsOptional()
    @IsString()
    street: string
}

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    fullName: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsNumber()
    age: number

    @IsOptional()
    address: Address

    @IsString()
    @MinLength(6)
    password: string;
}
