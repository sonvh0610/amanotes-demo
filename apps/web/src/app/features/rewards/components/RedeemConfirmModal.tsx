import type { RewardItem } from '../api';

type RedeemConfirmModalProps = {
  reward: RewardItem | null;
  loading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function RedeemConfirmModal({
  reward,
  loading,
  onCancel,
  onConfirm,
}: RedeemConfirmModalProps) {
  if (!reward) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl bg-surface-container-lowest p-6 shadow-xl">
        <h2 className="text-xl font-bold text-on-surface">Confirm Redemption</h2>
        <p className="mt-2 text-sm text-on-surface-variant">
          Redeem <span className="font-semibold text-on-surface">{reward.name}</span> for{' '}
          <span className="font-semibold text-on-surface">{reward.costPoints}</span> points?
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            className="cursor-pointer rounded-md border border-surface-container px-3 py-2 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container"
            disabled={loading}
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className="cursor-pointer rounded-md bg-primary px-3 py-2 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-dim disabled:cursor-not-allowed disabled:opacity-50"
            disabled={loading}
            onClick={onConfirm}
            type="button"
          >
            {loading ? 'Redeeming...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}
