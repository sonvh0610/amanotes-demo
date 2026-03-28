import { useEffect, useRef, useState } from 'react';
import type { NotificationItem, NotificationsResponse } from '@org/shared';
import { apiRequest, wsUrl } from '../lib/api';
import { getUserFacingError } from '../lib/user-errors';

export default function Notifications() {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const loadNotifications = async (nextCursor?: string | null) => {
    const append = Boolean(nextCursor);
    try {
      if (append) {
        setLoadingMore(true);
      }
      const params = new URLSearchParams();
      params.set('limit', '20');
      if (nextCursor) params.set('cursor', nextCursor);

      const result = await apiRequest<NotificationsResponse>(
        `/notifications?${params.toString()}`
      );
      setItems((prev) => (append ? [...prev, ...result.items] : result.items));
      setCursor(result.nextCursor);
      setHasMore(Boolean(result.nextCursor));
      setError(null);
    } catch (requestError) {
      setError(
        getUserFacingError(requestError, {
          context: 'notifications-load',
          fallback: 'Unable to load notifications right now. Please try again.',
        })
      );
    } finally {
      if (append) {
        setLoadingMore(false);
      }
    }
  };

  useEffect(() => {
    void loadNotifications(null);
  }, []);

  useEffect(() => {
    const socket = new WebSocket(wsUrl('/notifications/stream'));
    socket.onmessage = (event) => {
      const payload = JSON.parse(event.data) as {
        event: string;
      };
      if (payload.event === 'notification.new') {
        void loadNotifications(null);
      }
    };
    return () => {
      socket.close();
    };
  }, []);

  const markAllRead = async () => {
    await apiRequest('/notifications/read', { method: 'POST' });
    void loadNotifications(null);
  };

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || !hasMore || loadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting && cursor) {
          void loadNotifications(cursor);
        }
      },
      { rootMargin: '220px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [cursor, hasMore, loadingMore]);

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-on-surface">Notifications</h1>
        <button
          className="rounded-md border border-secondary-fixed/40 bg-secondary px-3 py-2 text-sm text-on-secondary hover:bg-secondary-fixed transition-colors"
          onClick={() => void markAllRead()}
          type="button"
        >
          Mark all read
        </button>
      </div>
      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={`rounded-lg border p-4 ${
              item.readAt
                ? 'border-surface-container bg-surface-container-lowest'
                : 'border-primary/30 bg-primary-container/30'
            }`}
          >
            <p className="text-sm font-semibold text-on-surface">{item.type}</p>
            <pre className="mt-2 overflow-auto text-xs text-on-surface-variant">
              {JSON.stringify(item.payloadJson, null, 2)}
            </pre>
            <p className="mt-2 text-xs text-on-surface-variant">
              {new Date(item.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      {hasMore ? <div className="mt-3 h-8" ref={loadMoreRef} /> : null}
      {loadingMore ? (
        <p className="mt-2 text-sm text-on-surface-variant">Loading more notifications...</p>
      ) : null}
    </div>
  );
}
