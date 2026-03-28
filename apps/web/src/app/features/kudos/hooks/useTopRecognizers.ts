import { useCallback, useEffect, useState } from 'react';
import type { TopRecognizerItem } from '@org/shared';
import { getUserFacingError } from '../../../lib/user-errors';
import { fetchTopRecognizers } from '../api';

export function useTopRecognizers(limit = 5) {
  const [items, setItems] = useState<TopRecognizerItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTopRecognizers = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fetchTopRecognizers(limit);
      setItems(result.items);
      setError(null);
    } catch (requestError) {
      setError(
        getUserFacingError(requestError, {
          context: 'dashboard-load',
          fallback:
            'Unable to load the top recognizing leaderboard right now. Please try again.',
        })
      );
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    void loadTopRecognizers();
  }, [loadTopRecognizers]);

  return {
    items,
    loading,
    error,
    loadTopRecognizers,
  };
}
