'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Input from '@/app/components/ui/Input';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') || '');

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }

    params.set('page', '1');

    router.push(`/snippets?${params.toString()}`);
  }

  function clearSearch() {
    setQuery('');

    const params = new URLSearchParams(searchParams);
    params.delete('q');
    params.set('page', '1');

    router.push(`/snippets?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="bg-(--card) border border-(--border) rounded-xl p-4 mb-6 flex items-center gap-3 shadow-sm"
    >
      <div className="relative flex-1">
        <Input
          className="flex-1 pr-10 placeholder:text-gray-400"
          placeholder="Search snippets..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      <button
        className="bg-(--primary) hover:bg-(--primary-hover) text-white px-5 py-3 rounded-lg transition font-medium"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}
