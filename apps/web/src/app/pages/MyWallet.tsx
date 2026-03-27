import { useEffect, useState } from 'react';
import { apiRequest, wsUrl } from '../lib/api';

interface Wallet {
  userId: string;
  availablePoints: number;
  updatedAt: string;
}

export default function MyWallet() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadWallet = async () => {
    try {
      const result = await apiRequest<{ wallet: Wallet }>('/wallet');
      setWallet(result.wallet);
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : 'Cannot load wallet'
      );
    }
  };

  useEffect(() => {
    void loadWallet();
  }, []);

  useEffect(() => {
    const socket = new WebSocket(wsUrl('/notifications/stream'));
    socket.onmessage = (event) => {
      const payload = JSON.parse(event.data) as {
        event: string;
      };
      if (payload.event === 'wallet.points_received') {
        void loadWallet();
      }
    };
    return () => socket.close();
  }, []);

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold text-slate-900">My Wallet</h1>
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      <div className="mt-5 rounded-xl bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">Available points</p>
        <p className="mt-2 text-4xl font-bold text-blue-700">
          {wallet?.availablePoints ?? 0}
        </p>
        <p className="mt-2 text-xs text-slate-500">
          Last updated:{' '}
          {wallet ? new Date(wallet.updatedAt).toLocaleString() : 'Not available'}
        </p>
      </div>
    </div>
  );
}
