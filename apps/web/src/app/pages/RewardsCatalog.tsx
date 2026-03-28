import { useEffect, useRef } from 'react';
import { RewardCard } from '../features/rewards/components/RewardCard';
import { RedeemConfirmModal } from '../features/rewards/components/RedeemConfirmModal';
import { RewardFormModal } from '../features/rewards/components/RewardFormModal';
import { useRewardsCatalog } from '../features/rewards/hooks/useRewardsCatalog';

export default function RewardsCatalog() {
  const { state, dropzone, actions } = useRewardsCatalog();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || !state.hasMore || state.loadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          void actions.loadMoreRewards();
        }
      },
      { rootMargin: '220px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [actions.loadMoreRewards, state.hasMore, state.loadingMore]);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-surface-container-low px-4 py-6 sm:px-6 md:py-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl">
              Rewards
            </h1>
            <p className="mt-2 text-on-surface-variant">
              Redeem points for perks, gift cards, and team rewards.
            </p>
          </div>
          {state.canManageRewards ? (
            <button
              className="cursor-pointer rounded-full bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-dim"
              onClick={actions.openCreateModal}
              type="button"
            >
              Add Reward
            </button>
          ) : null}
        </header>

        {state.successMessage ? (
          <p className="mt-3 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
            {state.successMessage}
          </p>
        ) : null}
        {state.error ? <p className="mt-3 text-sm text-red-600">{state.error}</p> : null}

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {state.items.map((item) => (
            <RewardCard
              canManageRewards={state.canManageRewards}
              item={item}
              key={item.id}
              onEdit={actions.openEditModal}
              onRedeem={actions.requestRedeem}
              redeeming={state.redeemingId === item.id}
            />
          ))}
        </div>

        {state.items.length === 0 ? (
          <p className="mt-6 text-sm text-on-surface-variant">No rewards available yet.</p>
        ) : null}
        {state.hasMore ? <div className="mt-6 h-8" ref={loadMoreRef} /> : null}
        {state.loadingMore ? (
          <p className="mt-2 text-sm text-on-surface-variant">Loading more rewards...</p>
        ) : null}
      </div>

      <RewardFormModal
        form={state.rewardForm}
        formError={state.formError}
        getThumbnailDropInputProps={dropzone.getInputProps}
        getThumbnailDropRootProps={dropzone.getRootProps}
        isOpen={Boolean(state.modalMode)}
        isThumbnailDragActive={dropzone.isDragActive}
        mode={state.modalMode}
        onClose={actions.closeModal}
        onSetForm={actions.setRewardForm}
        onSubmit={() => void actions.submitRewardForm()}
        onThumbnailBroken={actions.setThumbnailPreviewBroken}
        openThumbnailPicker={dropzone.open}
        submitting={state.submitting}
        thumbnailPreviewBroken={state.thumbnailPreviewBroken}
        thumbnailPreviewUrl={state.thumbnailPreviewUrl}
        uploadingThumbnail={state.uploadingThumbnail}
      />

      <RedeemConfirmModal
        loading={Boolean(state.redeemingId)}
        onCancel={actions.cancelRedeem}
        onConfirm={() => void actions.confirmRedeem()}
        reward={state.pendingRedeem}
      />
    </div>
  );
}
