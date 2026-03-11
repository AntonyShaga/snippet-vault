'use client';

export default function Error({ error }: { error: Error }) {
  return (
    <div className="max-w-3xl mx-auto p-6 text-center space-y-4">
      <h2 className="text-red-500 text-lg font-semibold">Something went wrong</h2>

      <p className="text-gray-400">{error.message}</p>

      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-(--primary) text-white rounded-lg"
      >
        Try again
      </button>
    </div>
  );
}
