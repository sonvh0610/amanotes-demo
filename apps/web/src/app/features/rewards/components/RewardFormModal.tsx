import type { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';
import type { RewardFormState } from '../hooks/useRewardsCatalog';

type RewardFormModalProps = {
  mode: 'create' | 'edit' | null;
  isOpen: boolean;
  form: RewardFormState;
  formError: string | null;
  submitting: boolean;
  uploadingThumbnail: boolean;
  thumbnailPreviewUrl: string | null;
  thumbnailPreviewBroken: boolean;
  isThumbnailDragActive: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onSetForm: (updater: (prev: RewardFormState) => RewardFormState) => void;
  onThumbnailBroken: (broken: boolean) => void;
  getThumbnailDropRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getThumbnailDropInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  openThumbnailPicker: () => void;
};

export function RewardFormModal({
  mode,
  isOpen,
  form,
  formError,
  submitting,
  uploadingThumbnail,
  thumbnailPreviewUrl,
  thumbnailPreviewBroken,
  isThumbnailDragActive,
  onClose,
  onSubmit,
  onSetForm,
  onThumbnailBroken,
  getThumbnailDropRootProps,
  getThumbnailDropInputProps,
  openThumbnailPicker,
}: RewardFormModalProps) {
  if (!isOpen || !mode) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-surface-container-lowest p-6 shadow-xl">
        <div className="mb-4 flex items-start justify-between gap-3">
          <h2 className="text-xl font-bold text-on-surface">
            {mode === 'edit' ? 'Edit Reward' : 'Add New Reward'}
          </h2>
          <button
            aria-label="Close modal"
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-surface-container text-lg text-on-surface transition-colors hover:bg-surface-container"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>

        <div className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
              Reward Title
            </span>
            <input
              className="w-full rounded-md border border-surface-container bg-background px-3 py-2 text-sm text-on-surface outline-none transition-colors focus:border-primary"
              onChange={(event) =>
                onSetForm((prev) => ({
                  ...prev,
                  name: event.target.value,
                }))
              }
              placeholder="Reward title"
              type="text"
              value={form.name}
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
              Thumbnail
            </span>
            <div
              {...getThumbnailDropRootProps()}
              className={`rounded-lg border-2 border-dashed p-4 transition ${
                isThumbnailDragActive
                  ? 'border-primary bg-primary/5'
                  : 'border-surface-container bg-background'
              }`}
            >
              <input {...getThumbnailDropInputProps()} />
              <p className="text-sm text-on-surface">Drop image here for thumbnail</p>
              <p className="mt-1 text-xs text-on-surface-variant">PNG/JPG/WebP up to 1MB</p>
              <button
                className="mt-3 cursor-pointer rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-on-primary disabled:cursor-not-allowed disabled:opacity-50"
                disabled={uploadingThumbnail}
                onClick={openThumbnailPicker}
                type="button"
              >
                {uploadingThumbnail ? 'Uploading...' : 'Browse Image'}
              </button>
            </div>

            {thumbnailPreviewUrl || form.thumbnailUrl ? (
              <div className="mt-3 overflow-hidden rounded-lg border border-surface-container">
                {thumbnailPreviewBroken ? (
                  <div className="flex h-40 items-center justify-center bg-surface-container text-sm text-on-surface-variant">
                    Unable to load thumbnail preview
                  </div>
                ) : (
                  <img
                    alt="Reward thumbnail preview"
                    className="h-40 w-full object-cover"
                    onError={() => onThumbnailBroken(true)}
                    src={thumbnailPreviewUrl ?? form.thumbnailUrl}
                  />
                )}
              </div>
            ) : null}
          </label>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
                Stock
              </span>
              <input
                className="w-full rounded-md border border-surface-container bg-background px-3 py-2 text-sm text-on-surface outline-none transition-colors focus:border-primary"
                min={0}
                onChange={(event) =>
                  onSetForm((prev) => ({
                    ...prev,
                    stock: event.target.value,
                  }))
                }
                type="number"
                value={form.stock}
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
                Point
              </span>
              <input
                className="w-full rounded-md border border-surface-container bg-background px-3 py-2 text-sm text-on-surface outline-none transition-colors focus:border-primary"
                min={1}
                onChange={(event) =>
                  onSetForm((prev) => ({
                    ...prev,
                    costPoints: event.target.value,
                  }))
                }
                type="number"
                value={form.costPoints}
              />
            </label>
          </div>

          {formError ? <p className="text-sm text-red-600">{formError}</p> : null}

          <div className="flex justify-end gap-2 pt-2">
            <button
              className="cursor-pointer rounded-md border border-surface-container px-3 py-2 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className="cursor-pointer rounded-md bg-primary px-3 py-2 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-dim disabled:cursor-not-allowed disabled:opacity-50"
              disabled={submitting}
              onClick={onSubmit}
              type="button"
            >
              {submitting
                ? mode === 'edit'
                  ? 'Saving...'
                  : 'Adding...'
                : mode === 'edit'
                ? 'Save Changes'
                : 'Add Reward'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
