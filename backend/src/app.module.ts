import { Module } from '@nestjs/common';
import { SnippetsModule } from './snippets/snippets.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/snippet-vault',
    ),
    SnippetsModule,
  ],
})
export class AppModule {}
