'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateSnippet } from '@/app/lib/api';
import Input from '@/app/components/ui/Input';
import Textarea from '@/app/components/ui/Textarea';

type Snippet = {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  type: 'link' | 'note' | 'command';
  createdAt: string;
};
type SnippetType = 'link' | 'note' | 'command';

export default function SnippetEditor({ snippet }: { snippet: Snippet }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);

  const [title, setTitle] = useState(snippet.title);
  const [content, setContent] = useState(snippet.content);
  const [tags, setTags] = useState(snippet.tags.join(', '));
  const [type, setType] = useState<SnippetType>(snippet.type);

  async function handleSave() {
    try {
      await updateSnippet(snippet._id, {
        title,
        content,
        tags: tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        type,
      });

      setEditing(false);
      router.refresh();
    } catch {
      alert('Failed to update snippet');
    }
  }

  return (
    <div className="bg-(--card) border border-(--border) rounded-xl p-6 shadow-sm space-y-4">
      {editing ? (
        <>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />

          <Textarea value={content} onChange={(e) => setContent(e.target.value)} />

          <Input value={tags} onChange={(e) => setTags(e.target.value)} />

          <select
            className="bg-(--input) border border-(--border) p-3 rounded-lg"
            value={type}
            onChange={(e) => setType(e.target.value as SnippetType)}
          >
            <option value="note">note</option>
            <option value="link">link</option>
            <option value="command">command</option>
          </select>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="bg-(--primary) text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>

            <button
              onClick={() => setEditing(false)}
              className="border border-(--border) px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>

          <p className="text-gray-400 whitespace-pre-wrap">{content}</p>

          <div className="flex flex-wrap gap-2">
            {tags.split(',').map((tag) => (
              <span
                key={tag}
                className="bg-(--input) text-(--primary) text-xs px-2 py-1 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center text-xs text-gray-400 pt-2">
            <span>{new Date(snippet.createdAt).toLocaleDateString()}</span>

            <button
              onClick={() => setEditing(true)}
              className="text-(--primary) hover:text-(--primary-hover)"
            >
              Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
}
