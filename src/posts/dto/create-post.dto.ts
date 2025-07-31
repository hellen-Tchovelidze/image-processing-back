import { O } from "@faker-js/faker/dist/airline-CLphikKp";
import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {
    @IsString()
    @Optional()
    title: string

    @IsString()
    @Optional()
    desc: string

     
    
    
}
