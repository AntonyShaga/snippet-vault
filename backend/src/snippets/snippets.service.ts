import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Snippet, SnippetDocument } from './schemas/snippet.schema';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { Model } from 'mongoose';

@Injectable()
export class SnippetsService {
  constructor(
    @InjectModel(Snippet.name)
    private readonly snippetModel: Model<SnippetDocument>,
  ) {}

  async create(dto: CreateSnippetDto) {
    const snippet = new this.snippetModel(dto);
    return snippet.save();
  }

  async findAll(query: { q?: string; tag?: string; page?: number; limit?: number }) {
    const { q, tag } = query;

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const filter: any = {};

    if (q) {
      filter.$or = [
        { title: { $regex: `^${q}`, $options: 'i' } },
        { content: { $regex: `^${q}`, $options: 'i' } },
      ];
    }

    /*
    Alternative using MongoDB text index:

    if (q) {
      filter.$text = { $search: q };
    }
    */

    if (tag) {
      filter.tags = tag;
    }

    const snippets = await this.snippetModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await this.snippetModel.countDocuments(filter);

    return {
      data: snippets,
      page,
      limit,
      total,
    };
  }

  async findOne(id: string) {
    const snippet = await this.snippetModel.findById(id);

    if (!snippet) {
      throw new NotFoundException('Snippet not found');
    }

    return snippet;
  }

  async update(id: string, dto: UpdateSnippetDto) {
    const snippet = await this.snippetModel.findByIdAndUpdate(id, dto, { new: true });

    if (!snippet) {
      throw new NotFoundException('Snippet not found');
    }

    return snippet;
  }

  async remove(id: string) {
    const snippet = await this.snippetModel.findByIdAndDelete(id);

    if (!snippet) {
      throw new NotFoundException('Snippet not found');
    }

    return { message: 'Snippet deleted' };
  }
}
