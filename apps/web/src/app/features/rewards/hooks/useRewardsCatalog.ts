import { useCallback, useEffect, useState } from 'react';
import type { CreateRewardBody } from '@org/shared';
import { useDropzone } from 'react-dropzone';
import { useAuth } from '../../../context/AuthContext';
import { uploadImageAndGetPublicUrl } from '../../../lib/media';
import { getUserFacingError } from '../../../lib/user-errors';
import {
  createReward,
  fetchRewards,
  type RewardItem,
  redeemReward,
  updateReward,
} from '../api';

export type RewardFormState = {
  id?: string;
  name: string;
  thumbnailUrl: string;
  costPoints: string;
  stock: string;
  active: boolean;
};

function normalizeThumbnailUrl(value?: string | null): string {
  const trimmed = value?.trim() ?? '';
  if (!trimmed || trimmed === 'null' || trimmed === 'undefined') return '';
  return trimmed;
}

export function useRewardsCatalog() {
  const { user } = useAuth();
  const [items, setItems] = useState<RewardItem[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [redeemingId, setRedeemingId] = useState<string | null>(null);
  const [pendingRedeem, setPendingRedeem] = useState<RewardItem | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(
    null
  );
  const [thumbnailPreviewObjectUrl, setThumbnailPreviewObjectUrl] = useState<
    string | null
  >(null);
  const [thumbnailPreviewBroken, setThumbnailPreviewBroken] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [rewardForm, setRewardForm] = useState<RewardFormState>({
    name: '',
    thumbnailUrl: '',
    costPoints: '100',
    stock: '10',
    active: true,
  });

  useEffect(() => {
    return () => {
      if (thumbnailPreviewObjectUrl) {
        URL.revokeObjectURL(thumbnailPreviewObjectUrl);
      }
    };
  }, [thumbnailPreviewObjectUrl]);

  useEffect(() => {
    if (!successMessage) return;
    const timer = window.setTimeout(() => setSuccessMessage(null), 3500);
    return () => window.clearTimeout(timer);
  }, [successMessage]);

  const loadRewards = useCallback(async (nextCursor?: string | null) => {
    const append = Boolean(nextCursor);
    if (append) {
      setLoadingMore(true);
    }
    try {
      const result = await fetchRewards(nextCursor);
      setItems((prev) => (append ? [...prev, ...result.items] : result.items));
      setCursor(result.nextCursor);
      setHasMore(Boolean(result.nextCursor));
      setError(null);
    } catch (requestError) {
      setError(
        getUserFacingError(requestError, {
          context: 'rewards-load',
          fallback: 'Unable to load rewards right now. Please try again.',
        })
      );
    } finally {
      if (append) {
        setLoadingMore(false);
      }
    }
  }, []);

  useEffect(() => {
    void loadRewards(null);
  }, [loadRewards]);

  const loadMoreRewards = useCallback(async () => {
    if (!cursor || loadingMore) return;
    await loadRewards(cursor);
  }, [cursor, loadRewards, loadingMore]);

  const requestRedeem = (item: RewardItem) => {
    setError(null);
    setPendingRedeem(item);
  };

  const cancelRedeem = () => {
    if (redeemingId) return;
    setPendingRedeem(null);
  };

  const confirmRedeem = async () => {
    if (!pendingRedeem) return;

    try {
      setRedeemingId(pendingRedeem.id);
      setError(null);
      await redeemReward(pendingRedeem.id);
      await loadRewards(null);
      setSuccessMessage(`Redeemed "${pendingRedeem.name}" successfully.`);
      setPendingRedeem(null);
    } catch (requestError) {
      setError(
        getUserFacingError(requestError, {
          context: 'reward-redeem',
          fallback: 'Unable to redeem this reward right now. Please try again.',
        })
      );
    } finally {
      setRedeemingId(null);
    }
  };

  const openCreateModal = () => {
    setError(null);
    setFormError(null);
    setModalMode('create');
    setThumbnailPreviewUrl(null);
    setThumbnailPreviewBroken(false);
    if (thumbnailPreviewObjectUrl) {
      URL.revokeObjectURL(thumbnailPreviewObjectUrl);
      setThumbnailPreviewObjectUrl(null);
    }
    setRewardForm({
      name: '',
      thumbnailUrl: '',
      costPoints: '100',
      stock: '10',
      active: true,
    });
  };

  const openEditModal = (item: RewardItem) => {
    const normalizedThumbnailUrl = normalizeThumbnailUrl(item.thumbnailUrl);
    setError(null);
    setFormError(null);
    setModalMode('edit');
    setThumbnailPreviewUrl(normalizedThumbnailUrl || null);
    setThumbnailPreviewBroken(false);
    if (thumbnailPreviewObjectUrl) {
      URL.revokeObjectURL(thumbnailPreviewObjectUrl);
      setThumbnailPreviewObjectUrl(null);
    }
    setRewardForm({
      id: item.id,
      name: item.name,
      thumbnailUrl: normalizedThumbnailUrl,
      costPoints: String(item.costPoints),
      stock: String(item.stock),
      active: item.active,
    });
  };

  const closeModal = () => {
    if (uploadingThumbnail) return;
    if (thumbnailPreviewObjectUrl) {
      URL.revokeObjectURL(thumbnailPreviewObjectUrl);
      setThumbnailPreviewObjectUrl(null);
    }
    setThumbnailPreviewUrl(null);
    setThumbnailPreviewBroken(false);
    setModalMode(null);
    setFormError(null);
  };

  const onDropThumbnail = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      try {
        setFormError(null);
        setThumbnailPreviewBroken(false);
        if (thumbnailPreviewObjectUrl) {
          URL.revokeObjectURL(thumbnailPreviewObjectUrl);
        }
        const objectUrl = URL.createObjectURL(file);
        setThumbnailPreviewObjectUrl(objectUrl);
        setThumbnailPreviewUrl(objectUrl);
        setUploadingThumbnail(true);
        const publicUrl = await uploadImageAndGetPublicUrl(file);
        setRewardForm((prev) => ({
          ...prev,
          thumbnailUrl: publicUrl,
        }));
      } catch (requestError) {
        setFormError(
          getUserFacingError(requestError, {
            fallback: 'Unable to upload thumbnail right now. Please try again.',
          })
        );
      } finally {
        setUploadingThumbnail(false);
      }
    },
    [thumbnailPreviewObjectUrl]
  );

  const dropzone = useDropzone({
    onDrop: (files) => {
      void onDropThumbnail(files);
    },
    multiple: false,
    maxFiles: 1,
    noClick: true,
    accept: {
      'image/*': [],
    },
  });

  const submitRewardForm = async () => {
    const parsedPoints = Number(rewardForm.costPoints);
    const parsedStock = Number(rewardForm.stock);
    const trimmedName = rewardForm.name.trim();
    const trimmedThumbnailUrl = rewardForm.thumbnailUrl.trim();

    if (!trimmedName) {
      setFormError('Reward title is required.');
      return;
    }
    if (!Number.isInteger(parsedPoints) || parsedPoints <= 0) {
      setFormError('Point must be a positive whole number.');
      return;
    }
    if (!Number.isInteger(parsedStock) || parsedStock < 0) {
      setFormError('Stock must be 0 or greater.');
      return;
    }
    if (uploadingThumbnail) {
      setFormError('Thumbnail is still uploading. Please wait.');
      return;
    }

    const payload: CreateRewardBody = {
      name: trimmedName,
      thumbnailUrl: trimmedThumbnailUrl || null,
      costPoints: parsedPoints,
      stock: parsedStock,
      active: rewardForm.active,
    };

    try {
      setSubmitting(true);
      setError(null);
      if (modalMode === 'edit' && rewardForm.id) {
        await updateReward(rewardForm.id, payload);
      } else {
        await createReward(payload);
      }
      await loadRewards(null);
      setSuccessMessage(
        modalMode === 'edit'
          ? `Updated "${trimmedName}" successfully.`
          : `Added "${trimmedName}" successfully.`
      );
      closeModal();
    } catch (requestError) {
      setFormError(
        getUserFacingError(requestError, {
          fallback:
            modalMode === 'edit'
              ? 'Unable to update this reward right now. Please try again.'
              : 'Unable to add this reward right now. Please try again.',
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

  const canManageRewards = user?.role === 'admin';

  return {
    state: {
      canManageRewards,
      items,
      hasMore,
      loadingMore,
      error,
      successMessage,
      redeemingId,
      pendingRedeem,
      modalMode,
      submitting,
      uploadingThumbnail,
      thumbnailPreviewUrl,
      thumbnailPreviewBroken,
      formError,
      rewardForm,
    },
    dropzone,
    actions: {
      loadRewards,
      loadMoreRewards,
      requestRedeem,
      cancelRedeem,
      confirmRedeem,
      openCreateModal,
      openEditModal,
      closeModal,
      submitRewardForm,
      setRewardForm,
      setThumbnailPreviewBroken,
    },
  };
}
