import type {
  CreateCommentBody,
  CreateKudoBody,
  FeedResponse,
  KudoUserOption,
  TopRecognizersResponse,
} from '@org/shared';
import { apiRequest } from '../../lib/api';

export async function listKudoUsers(limit = 50) {
  const items: KudoUserOption[] = [];
  let cursor: string | null = null;

  do {
    const params = new URLSearchParams();
    params.set('limit', String(limit));
    if (cursor) params.set('cursor', cursor);

    const result = await apiRequest<{
      items: KudoUserOption[];
      nextCursor: string | null;
    }>(`/users?${params.toString()}`);
    items.push(...result.items);
    cursor = result.nextCursor;
  } while (cursor);

  return { items };
}

export async function sendKudo(input: CreateKudoBody) {
  return apiRequest('/kudos', {
    method: 'POST',
    body: input,
  });
}

export async function fetchFeed(cursor?: string | null) {
  return apiRequest<FeedResponse>(
    `/feed${cursor ? `?cursor=${encodeURIComponent(cursor)}` : ''}`
  );
}

export async function fetchTopRecognizers(limit = 5) {
  const params = new URLSearchParams();
  params.set('limit', String(limit));
  return apiRequest<TopRecognizersResponse>(
    `/feed/top-recognizers?${params.toString()}`
  );
}

export async function toggleReaction(input: { kudoId: string; emoji: string }) {
  return apiRequest(`/kudos/${input.kudoId}/reactions`, {
    method: 'POST',
    body: { emoji: input.emoji },
  });
}

export async function createComment(
  input: { kudoId: string } & Pick<CreateCommentBody, 'text' | 'mediaAssetIds'>
) {
  return apiRequest(`/kudos/${input.kudoId}/comments`, {
    method: 'POST',
    body: {
      text: input.text,
      mediaAssetIds: input.mediaAssetIds,
    },
  });
}
