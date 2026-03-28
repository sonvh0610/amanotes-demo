import type {
  MonthlySummaryResponse,
  WalletResponse,
  WalletTransactionItem,
  WalletTransactionsResponse,
} from '@org/shared';
import { apiRequest } from '../../lib/api';

export async function fetchWallet(): Promise<WalletResponse['wallet']> {
  const result = await apiRequest<WalletResponse>('/wallet');
  return result.wallet;
}

export async function fetchWalletTransactions(
  cursor?: string | null,
  limit = 20
): Promise<WalletTransactionsResponse> {
  const params = new URLSearchParams();
  params.set('limit', String(limit));
  if (cursor) params.set('cursor', cursor);

  return apiRequest<WalletTransactionsResponse>(
    `/wallet/transactions?${params.toString()}`
  );
}

export async function fetchMonthlySummary(force = false) {
  const params = new URLSearchParams();
  if (force) {
    params.set('force', '1');
  }
  return apiRequest<MonthlySummaryResponse>(
    `/ai/monthly-summary${params.toString() ? `?${params.toString()}` : ''}`
  );
}

export type {
  MonthlySummaryResponse,
  WalletResponse,
  WalletTransactionItem,
  WalletTransactionsResponse,
};
