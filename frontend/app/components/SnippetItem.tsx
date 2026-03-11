'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { deleteSnippet } from '@/app/lib/api';

type Snippet = {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  type: 'link' | 'note' | 'command';
  createdAt: string;
};

type Props = {
  snippet: Snippet;
};

export default function SnippetItem({ snippet }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const date = new Intl.DateTimeFormat('en-CA').format(new Date(snippet.createdAt));

  async function handleDelete() {
    const ok = confirm('Delete this snippet?');
    if (!ok) return;

    try {
      await deleteSnippet(snippet._id);
      router.refresh();
    } catch {
      alert('Failed to delete snippet');
    }
  }

  function buildTagUrl(tag: string) {
    const params = new URLSearchParams(searchParams.toString());

    params.set('tag', tag);
    params.set('page', '1');

    return `/snippets?${params.toString()}`;
  }

  return (
    <div className="bg-(--card) border border-(--border) rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-foreground">{snippet.title}</h2>

        <span className="text-xs px-2 py-1 rounded-md bg-(--input) text-gray-400">
          {snippet.type}
        </span>
      </div>

      <p className="text-sm text-gray-400 mb-4 line-clamp-3">{snippet.content}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {snippet.tags.map((tag) => (
          <Link
            key={tag}
            href={buildTagUrl(tag)}
            className="text-xs px-2 py-1 rounded-md bg-(--input) text-(--primary) hover:underline"
          >
            #{tag}
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>{date}</span>

        <div className="flex items-center gap-4">
          <Link
            href={`/snippets/${snippet._id}`}
            className="text-(--primary) hover:text-(--primary-hover) transition"
          >
            View
          </Link>

          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-400 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
