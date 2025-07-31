import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schema/user.schema';
import { AswS3Module } from 'src/asw-s3/asw-s3.module';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {schema: userSchema, name: 'user'}
    ]),
    AswS3Module,
    PostsModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
