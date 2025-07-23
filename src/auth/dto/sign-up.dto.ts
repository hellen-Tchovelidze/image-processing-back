// import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator"


// export class SignUpDto {
//     @IsNotEmpty()
//     @IsString()
//     fullName: string

//     @IsNotEmpty()
//     @IsEmail()
//     email: string

//     @IsNotEmpty()
//     @IsNumber()
//     age: number

//     @IsString()
//     @IsNotEmpty()
//     @Length(6, 20)
//     password: string
// }


import { Type } from 'class-transformer'
import { IsNumber, IsString, IsEmail, IsNotEmpty, Length } from 'class-validator'

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  fullName: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)  
  age: number

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string
}
