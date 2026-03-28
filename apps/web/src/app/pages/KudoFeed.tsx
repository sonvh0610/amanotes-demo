import { useEffect, useRef } from 'react';
import { KudoCommentComposer } from '../features/kudos/components/KudoCommentComposer';
import { KudoMediaGrid } from '../features/kudos/components/KudoMediaGrid';
import { KudoMediaViewerModal } from '../features/kudos/components/KudoMediaViewerModal';
import { ReactionToggleGroup } from '../features/kudos/components/ReactionToggleGroup';
import { useKudoFeed } from '../features/kudos/hooks/useKudoFeed';

export default function KudoFeed() {
  const {
    items,
    cursor,
    loading,
    error,
    setError,
    commentDraft,
    setCommentDraft,
    commentFiles,
    setCommentFiles,
    sendingComment,
    viewer,
    loadFeed,
    submitComment,
    onToggleReaction,
    openViewer,
    closeViewer,
    viewPrev,
    viewNext,
  } = useKudoFeed();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || !cursor || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting && cursor) {
          void loadFeed(cursor);
        }
      },
      { rootMargin: '220px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [cursor, loading, loadFeed]);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-surface-container-low px-4 py-6 sm:px-6 md:py-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl">
              Kudos Feed
            </h1>
            <p className="mt-2 text-on-surface-variant">
              Live recognition stream with reactions and media comments.
            </p>
          </div>
          <button
            className="cursor-pointer rounded-full border border-secondary-fixed/40 bg-secondary px-4 py-2 text-sm font-semibold text-on-secondary transition-colors hover:bg-secondary-fixed"
            onClick={() => void loadFeed(null)}
            type="button"
          >
            Refresh
          </button>
        </header>

        {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}

        <div className="space-y-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl bg-surface-container-lowest p-5 shadow-[0_12px_40px_rgba(55,39,77,0.06)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm text-on-surface-variant">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                  <h2 className="mt-1 text-lg font-bold text-on-surface">
                    {item.senderName} sent{' '}
                    <span className="text-primary">{item.points}</span> points
                  </h2>
                  <p className="mt-2 text-on-surface">{item.description}</p>
                </div>
                <span className="shrink-0 rounded-full bg-primary-container px-3 py-1 text-xs font-bold text-on-primary-container">
                  +{item.points}
                </span>
              </div>

              {item.medias.length > 0 ? (
                <div className="mt-4">
                  <KudoMediaGrid
                    medias={item.medias}
                    onOpen={openViewer}
                    alt="Kudo media"
                  />
                </div>
              ) : null}

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <ReactionToggleGroup
                  reactions={item.engagement.reactions}
                  userReactions={item.engagement.userReactions}
                  onToggle={(emoji) => void onToggleReaction(item.id, emoji)}
                />
                <span className="text-xs text-on-surface-variant">
                  {item.engagement.commentsCount} comments
                </span>
              </div>

              {item.engagement.recentComments.length > 0 ? (
                <div className="mt-10 space-y-2">
                  {item.engagement.recentComments.map((comment) => (
                    <div
                      key={comment.id}
                      className="rounded-xl bg-surface-container-low px-3 py-2"
                    >
                      <p className="text-xs text-on-surface-variant">
                        {comment.userName}
                      </p>
                      {comment.text ? (
                        <p className="text-sm text-on-surface">{comment.text}</p>
                      ) : (
                        <p className="text-sm italic text-on-surface-variant">
                          Media comment
                        </p>
                      )}

                      {comment.medias.length > 0 ? (
                        <div className="mt-2">
                          <KudoMediaGrid
                            medias={comment.medias}
                            onOpen={openViewer}
                            alt="Comment media"
                            className="grid grid-cols-4 gap-2 md:grid-cols-6 lg:grid-cols-8"
                            cellClassName="relative aspect-square overflow-hidden rounded-lg border border-surface-container bg-surface-container-low cursor-pointer"
                            videoLabelClassName="rounded-full bg-black/60 px-2 py-1 text-[10px] font-bold text-white"
                          />
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}

              <KudoCommentComposer
                value={commentDraft[item.id] ?? ''}
                files={commentFiles[item.id] ?? []}
                loading={Boolean(sendingComment[item.id])}
                onChange={(value) =>
                  setCommentDraft((prev) => ({
                    ...prev,
                    [item.id]: value,
                  }))
                }
                onFilesChange={(files) =>
                  setCommentFiles((prev) => ({
                    ...prev,
                    [item.id]: files,
                  }))
                }
                onSubmit={() => void submitComment(item.id)}
                onError={(message) => {
                  if (message) setError(message);
                }}
              />
            </article>
          ))}
        </div>

        {cursor ? <div className="mt-6 h-10" ref={loadMoreRef} /> : null}
        {loading && items.length > 0 ? (
          <p className="mt-2 text-sm text-on-surface-variant">Loading more feed items...</p>
        ) : null}
      </div>

      <KudoMediaViewerModal
        viewer={viewer}
        onClose={closeViewer}
        onPrev={viewPrev}
        onNext={viewNext}
      />
    </div>
  );
}
