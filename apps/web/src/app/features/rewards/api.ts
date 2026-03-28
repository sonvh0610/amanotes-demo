import type {
  CreateRewardBody,
  RewardsResponse,
  RewardItem,
  UpdateRewardBody,
} from '@org/shared';
import { apiRequest } from '../../lib/api';

export async function fetchRewards(
  cursor?: string | null,
  limit = 20
): Promise<RewardsResponse> {
  const params = new URLSearchParams();
  params.set('limit', String(limit));
  if (cursor) params.set('cursor', cursor);

  return apiRequest<RewardsResponse>(`/rewards?${params.toString()}`);
}

export async function redeemReward(rewardId: string): Promise<void> {
  const key = crypto.randomUUID();
  await apiRequest(`/rewards/${rewardId}/redeem`, {
    method: 'POST',
    headers: {
      'x-idempotency-key': key,
    },
    body: { quantity: 1 },
  });
}

export async function createReward(input: CreateRewardBody): Promise<void> {
  await apiRequest('/rewards', {
    method: 'POST',
    body: input,
  });
}

export async function updateReward(
  rewardId: string,
  input: UpdateRewardBody
): Promise<void> {
  await apiRequest(`/rewards/${rewardId}`, {
    method: 'PUT',
    body: input,
  });
}

export type { RewardItem };
