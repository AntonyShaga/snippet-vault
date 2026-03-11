import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { SnippetSchema } from '../snippets/schemas/snippet.schema';

async function run() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/snippet-vault';

  console.log('Connecting to MongoDB...');

  await mongoose.connect(uri);

  const SnippetModel = mongoose.model('Snippet', SnippetSchema);

  const count = await SnippetModel.countDocuments();

  if (count > 0) {
    console.log('Database already seeded. Skipping.');
    await mongoose.disconnect();
    return;
  }

  const filePath = path.join(__dirname, '../../seed/snippets.json');

  const raw = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw);

  await SnippetModel.insertMany(data);

  console.log(`Seeded ${data.length} snippets`);

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
