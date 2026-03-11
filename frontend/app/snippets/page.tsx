import SnippetItem from '@/app/components/SnippetItem';
import { getSnippets } from '@/app/lib/api';
import SnippetForm from '@/app/components/SnippetForm';
import Link from 'next/link';
import SearchBar from '@/app/components/SearchBar';

type Snippet = {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  type: 'link' | 'note' | 'command';
  createdAt: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; tag?: string }>;
}) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const q = params.q;
  const tag = params.tag;

  const limit = 2;

  const clearTagUrl = () => {
    const query = new URLSearchParams();

    if (q) query.set('q', q);
    query.set('page', '1');

    return `/snippets?${query.toString()}`;
  };

  const data = await getSnippets({ page, limit, q, tag });
  const snippets: Snippet[] = data.data;

  const totalPages = Math.ceil(data.total / data.limit);

  const buildUrl = (newPage: number) => {
    const query = new URLSearchParams();

    query.set('page', String(newPage));

    if (q) query.set('q', q);
    if (tag) query.set('tag', tag);

    return `/snippets?${query.toString()}`;
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <SearchBar />

      <SnippetForm />

      {tag && (
        <div className="flex items-center gap-3 bg-(--input) border border-(--border) px-4 py-2 rounded-lg text-sm">
          <span className="text-gray-400">Filter:</span>

          <span className="text-(--primary)">#{tag}</span>

          <Link
            href={clearTagUrl()}
            className="ml-auto text-red-400 hover:text-red-300 transition"
          >
            Clear filter
          </Link>
        </div>
      )}

      {snippets.length === 0 ? (
        <div className="bg-(--card) border border-(--border) rounded-xl p-6 text-center text-gray-400">
          No snippets found
        </div>
      ) : (
        <div className="space-y-4">
          {snippets.map((snippet) => (
            <SnippetItem key={snippet._id} snippet={snippet} />
          ))}
        </div>
      )}

      <div className="flex justify-center items-center gap-4 pt-6">
        {page > 1 && (
          <Link
            href={buildUrl(page - 1)}
            className="bg-(--input) border border-(--border) px-4 py-2 rounded-lg hover:bg-(--card) transition"
          >
            Prev
          </Link>
        )}

        <span className="text-sm text-gray-400">
          Page {page} / {totalPages || 1}
        </span>

        {page < totalPages && (
          <Link
            href={buildUrl(page + 1)}
            className="bg-(--input) border border-(--border) px-4 py-2 rounded-lg hover:bg-(--card) transition"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
