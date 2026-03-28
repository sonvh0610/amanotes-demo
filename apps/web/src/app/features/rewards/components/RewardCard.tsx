import { useState } from 'react';
import type { RewardItem } from '../api';

type RewardCardProps = {
  item: RewardItem;
  canManageRewards: boolean;
  redeeming: boolean;
  onRedeem: (item: RewardItem) => void;
  onEdit: (item: RewardItem) => void;
};

export function RewardCard({
  item,
  canManageRewards,
  redeeming,
  onRedeem,
  onEdit,
}: RewardCardProps) {
  const [imageBroken, setImageBroken] = useState(false);
  const showFallback = !item.thumbnailUrl || imageBroken;

  return (
    <article className="relative overflow-hidden rounded-2xl border border-surface-container bg-surface-container-lowest shadow-[0_12px_40px_rgba(55,39,77,0.06)]">
      {canManageRewards ? (
        <button
          className="absolute right-3 top-3 z-10 cursor-pointer rounded-full border border-secondary-fixed/50 bg-background/90 px-3 py-1 text-xs font-semibold text-on-surface transition-colors hover:bg-secondary-container hover:text-on-secondary-container"
          onClick={() => onEdit(item)}
          type="button"
        >
          Edit
        </button>
      ) : null}

      {showFallback ? (
        <div className="flex h-44 w-full items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 text-5xl font-extrabold text-primary">
          {item.name.slice(0, 1).toUpperCase()}
        </div>
      ) : (
        <img
          alt={item.name}
          className="h-44 w-full object-cover"
          onError={() => setImageBroken(true)}
          src={item.thumbnailUrl ?? undefined}
        />
      )}

      <div className="space-y-2 p-4">
        <h2 className="text-base font-semibold text-on-surface">{item.name}</h2>
        <p className="text-sm text-on-surface-variant">Points spend: {item.costPoints}</p>
        <p className="text-sm text-on-surface-variant">Remain stock: {item.stock}</p>
        <button
          className="mt-2 w-full cursor-pointer rounded-md bg-primary px-3 py-2 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-dim disabled:cursor-not-allowed disabled:opacity-50"
          disabled={item.stock <= 0 || redeeming}
          onClick={() => onRedeem(item)}
          type="button"
        >
          {redeeming ? 'Redeeming...' : 'Redeem'}
        </button>
      </div>
    </article>
  );
}
