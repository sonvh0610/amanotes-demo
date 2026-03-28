import { useEffect, useRef } from 'react';
import { WalletTransactionHistory } from '../features/wallet/components/WalletTransactionHistory';
import { useWalletPage } from '../features/wallet/hooks/useWalletPage';

export default function MyWallet() {
  const {
    wallet,
    transactions,
    hasMoreTransactions,
    loadingMoreTransactions,
    loadingInitialTransactions,
    loadMoreTransactions,
    error,
    spentRatio,
  } = useWalletPage();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || !hasMoreTransactions || loadingMoreTransactions) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          void loadMoreTransactions();
        }
      },
      { rootMargin: '220px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMoreTransactions, loadingMoreTransactions, loadMoreTransactions]);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-surface-container-low px-4 py-6 sm:px-6 lg:px-8 md:py-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl">
          My Wallet
        </h1>
        <p className="mt-2 text-on-surface-variant">
          Track persistent received points and your monthly giving budget.
        </p>
        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <section className="rounded-2xl bg-surface-container-lowest p-6 shadow-[0_12px_40px_rgba(55,39,77,0.06)]">
            <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Received Wallet
            </p>
            <p className="mt-3 text-5xl font-black text-primary">
              {wallet?.receivedWallet.availablePoints ?? 0}
            </p>
            <p className="mt-1 text-sm text-on-surface-variant">Points available to redeem</p>
            <p className="mt-4 text-xs text-on-surface-variant">
              Last update:{' '}
              {wallet
                ? new Date(wallet.receivedWallet.updatedAt).toLocaleString()
                : 'Not available'}
            </p>
          </section>

          <section className="rounded-2xl bg-surface-container-lowest p-6 shadow-[0_12px_40px_rgba(55,39,77,0.06)]">
            <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Giving Wallet ({wallet?.givingWallet.monthKey ?? '---- --'})
            </p>
            <p className="mt-3 text-3xl font-black text-on-surface">
              {wallet?.givingWallet.remainingPoints ?? 0}
              <span className="ml-2 text-sm font-semibold text-on-surface-variant">
                / {wallet?.givingWallet.limitPoints ?? 200} remaining
              </span>
            </p>
            <p className="mt-1 text-sm text-on-surface-variant">
              Spent {wallet?.givingWallet.spentPoints ?? 0} this month
            </p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-container">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${spentRatio}%` }}
              />
            </div>
            <p className="mt-4 text-xs text-on-surface-variant">
              Resets on the first day of each UTC month. Unused giving points expire.
            </p>
          </section>
        </div>

        <WalletTransactionHistory
          items={transactions}
          loadingInitial={loadingInitialTransactions}
          loadingMore={loadingMoreTransactions}
        />
        {hasMoreTransactions ? <div className="h-10" ref={loadMoreRef} /> : null}
      </div>
    </div>
  );
}
