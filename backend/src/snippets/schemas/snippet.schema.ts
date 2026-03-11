import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SnippetType } from '../dto/create-snippet.dto';

export type SnippetDocument = Snippet & Document;

@Schema({
  timestamps: true,
})
export class Snippet {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({
    required: true,
    enum: SnippetType,
  })
  type: SnippetType;
}

export const SnippetSchema = SchemaFactory.createForClass(Snippet);

SnippetSchema.index({
  title: 'text',
  content: 'text',
});
