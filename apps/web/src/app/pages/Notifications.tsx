import { useEffect, useState } from 'react';
import { apiRequest, wsUrl } from '../lib/api';

interface NotificationItem {
  id: string;
  type: string;
  payloadJson: Record<string, unknown>;
  readAt: string | null;
  createdAt: string;
}

export default function Notifications() {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadNotifications = async () => {
    try {
      const result = await apiRequest<{ items: NotificationItem[] }>('/notifications');
      setItems(result.items);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Cannot load notifications'
      );
    }
  };

  useEffect(() => {
    void loadNotifications();
  }, []);

  useEffect(() => {
    const socket = new WebSocket(wsUrl('/notifications/stream'));
    socket.onmessage = (event) => {
      const payload = JSON.parse(event.data) as {
        event: string;
      };
      if (payload.event === 'notification.new') {
        void loadNotifications();
      }
    };
    return () => {
      socket.close();
    };
  }, []);

  const markAllRead = async () => {
    await apiRequest('/notifications/read', { method: 'POST' });
    void loadNotifications();
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
        <button
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
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
              item.readAt ? 'border-slate-200 bg-white' : 'border-blue-200 bg-blue-50'
            }`}
          >
            <p className="text-sm font-semibold text-slate-900">{item.type}</p>
            <pre className="mt-2 overflow-auto text-xs text-slate-600">
              {JSON.stringify(item.payloadJson, null, 2)}
            </pre>
            <p className="mt-2 text-xs text-slate-500">
              {new Date(item.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
