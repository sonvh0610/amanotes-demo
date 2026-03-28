import { useState } from 'react';
import type { TopRecognizerItem } from '@org/shared';
import { AppIcon } from '../../../components/ui/AppIcon';

interface TopRecognizersLeaderboardProps {
  items: TopRecognizerItem[];
  monthLabel: string;
  loading: boolean;
}

export function TopRecognizersLeaderboard({
  items,
  monthLabel,
  loading,
}: TopRecognizersLeaderboardProps) {
  const [failedAvatarIds, setFailedAvatarIds] = useState<
    Record<string, boolean>
  >({});

  const markAvatarFailed = (userId: string) => {
    setFailedAvatarIds((prev) => {
      if (prev[userId]) return prev;
      return { ...prev, [userId]: true };
    });
  };

  return (
    <section className="md:col-span-4 bg-surface-container-lowest rounded-xl p-6 shadow-[0_12px_40px_rgba(55,39,77,0.04)]">
      <div className="flex items-start justify-between gap-3 mb-5">
        <div>
          <h3 className="font-bold text-lg text-on-surface">Top Recognizing</h3>
          <p className="text-xs text-on-surface-variant uppercase tracking-wide">
            {monthLabel}
          </p>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-on-surface-variant py-4">
          Loading leaderboard...
        </p>
      ) : null}

      {!loading && items.length === 0 ? (
        <p className="text-sm text-on-surface-variant py-4">
          No recognitions yet this month.
        </p>
      ) : null}

      {!loading ? (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={item.userId}
              className="bg-surface-container-low rounded-2xl px-4 py-3 flex items-center gap-3"
            >
              <div className="w-7 h-7 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center">
                #{index + 1}
              </div>
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
                {item.avatarUrl && !failedAvatarIds[item.userId] ? (
                  <img
                    src={item.avatarUrl}
                    alt={item.displayName}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={() => {
                      markAvatarFailed(item.userId);
                    }}
                  />
                ) : (
                  <AppIcon className="material-symbols-outlined text-primary text-lg">
                    person
                  </AppIcon>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-on-surface truncate">
                  {item.displayName}
                </p>
                <p className="text-xs text-on-surface-variant">
                  {item.kudosSent} kudos sent
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-primary">
                  {item.pointsGiven}
                </p>
                <p className="text-[10px] uppercase tracking-wide text-on-surface-variant">
                  points
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
