const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/snippets';

export type SnippetType = 'link' | 'note' | 'command';

export interface Snippet {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
  createdAt: string;
}

export interface SnippetPayload {
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
}

export interface GetSnippetsParams {
  q?: string;
  tag?: string;
  page?: number;
  limit?: number;
}

export interface GetSnippetsResponse {
  data: Snippet[];
  total: number;
  page: number;
  limit: number;
}

export async function getSnippets(
  params?: GetSnippetsParams,
): Promise<GetSnippetsResponse> {
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

  const data = (await res.json()) as GetSnippetsResponse;

  return data;
}

export async function getSnippet(id: string): Promise<Snippet> {
  const res = await fetch(`${API_URL}/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch snippet');
  }

  const data = (await res.json()) as Snippet;

  return data;
}

export async function createSnippet(payload: SnippetPayload): Promise<Snippet> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to create snippet');
  }

  const data = (await res.json()) as Snippet;

  return data;
}

export async function updateSnippet(
  id: string,
  payload: SnippetPayload,
): Promise<Snippet> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to update snippet');
  }

  const data = (await res.json()) as Snippet;

  return data;
}

export async function deleteSnippet(id: string): Promise<{ success: boolean }> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete snippet');
  }

  const data = (await res.json()) as { success: boolean };

  return data;
}
