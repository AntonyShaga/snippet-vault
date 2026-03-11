import Link from 'next/link';
import { getSnippet } from '@/app/lib/api';
import SnippetEditor from '@/app/components/SnippetEditor';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const snippet = await getSnippet(id);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <Link
        href="/snippets"
        className="inline-flex items-center text-sm text-(--primary) hover:text-(--primary-hover) transition"
      >
        ← Back to snippets
      </Link>

      <SnippetEditor snippet={snippet} />
    </div>
  );
}
