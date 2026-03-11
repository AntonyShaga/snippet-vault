const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/snippets';

type SnippetType = 'link' | 'note' | 'command';

export type Snippet = {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
  createdAt: string;
};

type GetSnippetsParams = {
  q?: string;
  tag?: string;
  page?: number;
  limit?: number;
};

export async function getSnippets(params?: GetSnippetsParams) {
  const searchParams = new URLSearchParams();

  if (params?.q) searchParams.append('q', params.q);
  if (params?.tag) searchParams.append('tag', params.tag);
  if (params?.page) searchParams.append('page', String(params.page));
  if (params?.limit) searchParams.append('limit', String(params.limit));

  const res = await fetch(`${API_URL}?${searchParams.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch snippets');
  }

  return res.json();
}

export async function getSnippet(id: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch snippet');
  }

  return res.json();
}

export async function deleteSnippet(id: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete snippet');
  }

  return res.json();
}

export async function updateSnippet(
  id: string,
  data: {
    title: string;
    content: string;
    tags: string[];
    type: SnippetType;
  },
) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to update snippet');
  }

  return res.json();
}

export async function createSnippet(data: {
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to create snippet');
  }

  return res.json();
}
