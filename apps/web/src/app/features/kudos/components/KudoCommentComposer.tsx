import { KudosMediaDropzone } from '../../../components/media/KudosMediaDropzone';

type KudoCommentComposerProps = {
  value: string;
  files: File[];
  loading: boolean;
  onChange: (value: string) => void;
  onFilesChange: (files: File[]) => void;
  onSubmit: () => void;
  onError?: (message: string | null) => void;
};

export function KudoCommentComposer({
  value,
  files,
  loading,
  onChange,
  onFilesChange,
  onSubmit,
  onError,
}: KudoCommentComposerProps) {
  return (
    <div className="mt-10 space-y-2">
      <textarea
        className="w-full rounded-xl border border-surface-container bg-white px-3 py-2 text-sm"
        rows={3}
        placeholder="Add a comment"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <KudosMediaDropzone
        files={files}
        onFilesChange={onFilesChange}
        maxFiles={5}
        onError={onError}
      />
      <button
        className="cursor-pointer rounded-full bg-primary px-4 py-2 text-xs font-bold text-on-primary disabled:opacity-60"
        type="button"
        disabled={loading}
        onClick={onSubmit}
      >
        {loading ? 'Posting...' : 'Post Comment'}
      </button>
    </div>
  );
}
