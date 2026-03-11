'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/app/components/ui/Input';
import { createSnippet } from '@/app/lib/api';

export default function SnippetForm() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [type, setType] = useState('note');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('Title and Content are required');
      return;
    }

    setLoading(true);

    try {
      await createSnippet({
        title,
        content,
        tags: tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        type: type as 'link' | 'note' | 'command',
      });

      setTitle('');
      setContent('');
      setTags('');
      setType('note');

      router.refresh();
    } catch {
      alert('Failed to create snippet');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-(--card) border border-(--border) rounded-xl p-6 space-y-5 mb-8 shadow-sm"
    >
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="w-full bg-(--input) border border-(--border) text-foreground p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--primary) min-h-30"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <Input
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <div className="flex justify-between items-center">
        <select
          className="bg-(--input) border border-(--border) text-foreground p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--primary)"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="note">note</option>
          <option value="link">link</option>
          <option value="command">command</option>
        </select>

        <button
          className="bg-(--primary) hover:bg-(--primary-hover) text-white px-5 py-3 rounded-lg transition font-medium disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Snippet'}
        </button>
      </div>
    </form>
  );
}
