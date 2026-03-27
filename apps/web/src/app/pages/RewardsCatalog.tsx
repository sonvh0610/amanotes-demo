import { useEffect, useState } from 'react';
import { apiRequest } from '../lib/api';

interface RewardItem {
  id: string;
  name: string;
  costPoints: number;
  stock: number;
  active: boolean;
}

export default function RewardsCatalog() {
  const [items, setItems] = useState<RewardItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [redeemingId, setRedeemingId] = useState<string | null>(null);

  const loadRewards = async () => {
    try {
      const result = await apiRequest<{ items: RewardItem[] }>('/rewards');
      setItems(result.items);
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : 'Cannot load rewards'
      );
    }
  };

  useEffect(() => {
    void loadRewards();
  }, []);

  const redeem = async (rewardId: string) => {
    try {
      setRedeemingId(rewardId);
      const key = crypto.randomUUID();
      await apiRequest(`/rewards/${rewardId}/redeem`, {
        method: 'POST',
        headers: {
          'x-idempotency-key': key,
        },
        body: { quantity: 1 },
      });
      await loadRewards();
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : 'Redeem failed'
      );
    } finally {
      setRedeemingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold text-slate-900">Rewards</h1>
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <article
            className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm"
            key={item.id}
          >
            <div>
              <p className="font-semibold text-slate-900">{item.name}</p>
              <p className="text-sm text-slate-600">
                {item.costPoints} points • stock: {item.stock}
              </p>
            </div>
            <button
              className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white disabled:opacity-50"
              disabled={item.stock <= 0 || redeemingId === item.id}
              onClick={() => void redeem(item.id)}
              type="button"
            >
              {redeemingId === item.id ? 'Redeeming...' : 'Redeem'}
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
