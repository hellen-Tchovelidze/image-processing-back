import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { postSchema } from './schema/post.schema';
import { userSchema } from 'src/users/schema/user.schema';
import { AswS3Module } from 'src/asw-s3/asw-s3.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {schema: postSchema, name: 'post'},
      {schema: userSchema, name: 'user'},
    ]),
    AswS3Module,
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
