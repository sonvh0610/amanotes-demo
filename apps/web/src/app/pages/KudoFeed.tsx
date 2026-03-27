import { useEffect, useState } from 'react';
import { apiRequest, wsUrl } from '../lib/api';

interface FeedItem {
  id: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  description: string;
  points: number;
  coreValue: string;
  createdAt: string;
}

interface FeedResponse {
  items: FeedItem[];
  nextCursor: string | null;
}

export default function KudoFeed() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFeed = async (nextCursor?: string | null) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiRequest<FeedResponse>(
        `/feed${nextCursor ? `?cursor=${encodeURIComponent(nextCursor)}` : ''}`
      );
      setItems((prev) => (nextCursor ? [...prev, ...result.items] : result.items));
      setCursor(result.nextCursor);
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : 'Cannot load feed'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadFeed(null);
  }, []);

  useEffect(() => {
    const socket = new WebSocket(wsUrl('/notifications/stream'));
    socket.onmessage = (event) => {
      const payload = JSON.parse(event.data) as {
        event: string;
      };
      if (payload.event === 'feed.new') {
        void loadFeed(null);
      }
    };
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Live Kudos Feed</h1>
        <button
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          onClick={() => void loadFeed(null)}
          type="button"
        >
          Refresh
        </button>
      </div>
      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <article key={item.id} className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              {new Date(item.createdAt).toLocaleString()}
            </p>
            <h2 className="mt-1 font-semibold text-slate-900">
              {item.senderName} gave {item.points} points
            </h2>
            <p className="mt-2 text-sm text-slate-700">{item.description}</p>
            <p className="mt-2 text-xs font-medium uppercase text-blue-700">
              {item.coreValue}
            </p>
            <div className="mt-3 flex gap-2">
              <button
                className="rounded-md border border-slate-300 px-2 py-1 text-xs"
                onClick={() =>
                  void apiRequest(`/kudos/${item.id}/reactions`, {
                    method: 'POST',
                    body: { emoji: '👏' },
                  })
                }
                type="button"
              >
                React 👏
              </button>
              <button
                className="rounded-md border border-slate-300 px-2 py-1 text-xs"
                onClick={() =>
                  void apiRequest(`/kudos/${item.id}/comments`, {
                    method: 'POST',
                    body: { text: 'Great work!' },
                  })
                }
                type="button"
              >
                Comment
              </button>
            </div>
          </article>
        ))}
      </div>
      {cursor ? (
        <button
          className="mt-6 rounded-md bg-slate-900 px-4 py-2 text-white"
          disabled={loading}
          onClick={() => void loadFeed(cursor)}
          type="button"
        >
          Load more
        </button>
      ) : null}
    </div>
  );
}
