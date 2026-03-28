import { KudoMedia } from '../types';

type KudoMediaGridProps = {
  medias: KudoMedia[];
  onOpen: (medias: KudoMedia[], index: number) => void;
  alt: string;
  className?: string;
  cellClassName?: string;
  videoLabelClassName?: string;
};

export function KudoMediaGrid({
  medias,
  onOpen,
  alt,
  className = 'grid grid-cols-2 gap-2 md:grid-cols-4',
  cellClassName = 'relative aspect-square overflow-hidden rounded-xl border border-surface-container bg-surface-container-low cursor-pointer',
  videoLabelClassName = 'rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white',
}: KudoMediaGridProps) {
  if (medias.length === 0) return null;

  return (
    <div className={className}>
      {medias.map((media, index) => (
        <button
          key={media.mediaAssetId}
          type="button"
          className={cellClassName}
          onClick={() => onOpen(medias, index)}
        >
          {media.mediaType === 'video' ? (
            <div className="flex h-full w-full items-center justify-center">
              <span className={videoLabelClassName}>Video</span>
            </div>
          ) : (
            <img
              src={media.mediaUrl ?? undefined}
              alt={alt}
              className="h-full w-full object-cover"
            />
          )}
        </button>
      ))}
    </div>
  );
}
