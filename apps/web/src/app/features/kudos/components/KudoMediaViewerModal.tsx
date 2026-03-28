import type { KudoMedia } from '@org/shared';

type ViewerState = {
  medias: KudoMedia[];
  index: number;
};

type KudoMediaViewerModalProps = {
  viewer: ViewerState | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function KudoMediaViewerModal({
  viewer,
  onClose,
  onPrev,
  onNext,
}: KudoMediaViewerModalProps) {
  if (!viewer) return null;

  const currentMedia = viewer.medias[viewer.index];
  if (!currentMedia) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <button
        type="button"
        className="absolute right-4 top-4 h-10 w-10 cursor-pointer rounded-full bg-black/50 text-xl text-white"
        onClick={onClose}
      >
        x
      </button>
      <div className="max-h-[90vh] max-w-[90vw]">
        {currentMedia.mediaType === 'video' ? (
          <video
            src={currentMedia.mediaUrl ?? undefined}
            controls
            className="max-h-[80vh] max-w-[90vw] rounded-xl"
          />
        ) : (
          <img
            src={currentMedia.mediaUrl ?? undefined}
            alt="Media detail"
            className="max-h-[80vh] max-w-[90vw] rounded-xl object-contain"
          />
        )}

        {viewer.medias.length > 1 ? (
          <div className="mt-3 flex items-center justify-center gap-2">
            <button
              type="button"
              className="cursor-pointer rounded-full bg-white/15 px-3 py-1 text-xs text-white"
              onClick={onPrev}
            >
              Prev
            </button>
            <span className="text-xs text-white/90">
              {viewer.index + 1} / {viewer.medias.length}
            </span>
            <button
              type="button"
              className="cursor-pointer rounded-full bg-white/15 px-3 py-1 text-xs text-white"
              onClick={onNext}
            >
              Next
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
