import { AppIcon } from '../components/ui/AppIcon';

export default function MyWallet() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6 sm:px-6 lg:px-8 md:py-8">
        <section className="mb-12">
          <h1 className="text-editorial text-4xl md:text-5xl font-extrabold text-on-surface mb-2">
            My Wallet
          </h1>
          <p className="text-on-surface-variant font-body">
            Manage your recognition points and track your giving impact.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-7 bg-surface-container-lowest p-8 rounded-xl shadow-[0_12px_40px_-15px_rgba(55,39,77,0.06)] border border-outline-variant/15 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-12 -top-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="p-3 bg-primary-container rounded-lg">
                  <AppIcon
                    className="material-symbols-outlined text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    stars
                  </AppIcon>
                </div>
                <span className="font-label font-bold text-on-surface-variant uppercase tracking-widest text-xs">
                  Available to Redeem
                </span>
              </div>
              <h2 className="text-editorial text-7xl font-black text-primary mb-4">
                4,850{' '}
                <span className="text-2xl font-medium text-on-surface-variant italic">
                  pts
                </span>
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-3 rounded-full font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
                Redeem Rewards
              </button>
              <button className="bg-secondary-container text-on-secondary-container px-8 py-3 rounded-full font-bold hover:bg-secondary-fixed-dim transition-all">
                Earn More
              </button>
            </div>
          </div>

          <div className="md:col-span-5 bg-tertiary-container/30 p-8 rounded-xl border border-tertiary/10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-20">
              <AppIcon className="material-symbols-outlined text-9xl">
                volunteer_activism
              </AppIcon>
            </div>
            <div>
              <span className="font-label font-bold text-tertiary-dim uppercase tracking-widest text-xs mb-6 block">
                Giving Budget
              </span>
              <h3 className="text-editorial text-5xl font-black text-tertiary-dim mb-2">
                200 <span className="text-xl font-medium">pts</span>
              </h3>
              <p className="text-sm text-tertiary max-w-[200px] leading-relaxed">
                Expires in 12 days. Use it to appreciate your teammates!
              </p>
            </div>
            <div className="mt-8">
              <div className="w-full bg-surface-container-low h-3 rounded-full overflow-hidden mb-2">
                <div className="bg-tertiary h-full w-[40%] rounded-full"></div>
              </div>
              <div className="flex justify-between text-xs font-bold text-tertiary-dim">
                <span>Used: 800 pts</span>
                <span>Total: 1000 pts</span>
              </div>
            </div>
          </div>
        </div>

        <section className="bg-surface-container-low p-1 rounded-xl shadow-inner">
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden">
            <div className="px-8 py-6 border-b border-outline-variant/10 flex justify-between items-center bg-white">
              <h3 className="text-editorial text-xl font-bold">
                Transaction History
              </h3>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-lg text-sm font-medium hover:bg-surface-container-high transition-colors">
                  <AppIcon className="material-symbols-outlined text-lg">
                    filter_list
                  </AppIcon>
                  Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-lg text-sm font-medium hover:bg-surface-container-high transition-colors">
                  <AppIcon className="material-symbols-outlined text-lg">
                    download
                  </AppIcon>
                  Export
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface/50">
                    <th className="px-8 py-4 font-label text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                      Date
                    </th>
                    <th className="px-8 py-4 font-label text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                      Action
                    </th>
                    <th className="px-8 py-4 font-label text-xs font-bold text-on-surface-variant uppercase tracking-widest text-right">
                      Points
                    </th>
                    <th className="px-8 py-4 font-label text-xs font-bold text-on-surface-variant uppercase tracking-widest text-center">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/5">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-6">
                      <span className="text-sm font-medium">Oct 24, 2023</span>
                      <p className="text-xs text-on-surface-variant">
                        14:32 PM
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <AppIcon
                            className="material-symbols-outlined text-primary"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            celebration
                          </AppIcon>
                        </div>
                        <div>
                          <span className="text-sm font-bold">
                            Kudo Received
                          </span>
                          <p className="text-xs text-on-surface-variant">
                            From Sarah Jenkins for "Great Teamwork"
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right font-editorial font-bold text-tertiary">
                      +150 pts
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="px-3 py-1 bg-tertiary-container/40 text-on-tertiary-container text-xs font-bold rounded-full">
                        Completed
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-6">
                      <span className="text-sm font-medium">Oct 22, 2023</span>
                      <p className="text-xs text-on-surface-variant">
                        09:15 AM
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary-container/30 flex items-center justify-center">
                          <AppIcon
                            className="material-symbols-outlined text-secondary"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            redeem
                          </AppIcon>
                        </div>
                        <div>
                          <span className="text-sm font-bold">
                            Reward Redeemed
                          </span>
                          <p className="text-xs text-on-surface-variant">
                            \$50 Amazon Gift Card
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right font-editorial font-bold text-error">
                      -500 pts
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="px-3 py-1 bg-tertiary-container/40 text-on-tertiary-container text-xs font-bold rounded-full">
                        Completed
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-6">
                      <span className="text-sm font-medium">Oct 20, 2023</span>
                      <p className="text-xs text-on-surface-variant">
                        16:45 PM
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-on-surface-variant/10 flex items-center justify-center">
                          <AppIcon className="material-symbols-outlined text-on-surface-variant">
                            outbox
                          </AppIcon>
                        </div>
                        <div>
                          <span className="text-sm font-bold">Kudo Sent</span>
                          <p className="text-xs text-on-surface-variant">
                            To David Miller for "Project Excellence"
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right font-editorial font-bold text-on-surface-variant">
                      -50 pts
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="px-3 py-1 bg-tertiary-container/40 text-on-tertiary-container text-xs font-bold rounded-full">
                        Completed
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-6">
                      <span className="text-sm font-medium">Oct 18, 2023</span>
                      <p className="text-xs text-on-surface-variant">
                        11:20 AM
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <AppIcon
                            className="material-symbols-outlined text-primary"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            stars
                          </AppIcon>
                        </div>
                        <div>
                          <span className="text-sm font-bold">
                            Quarterly Bonus
                          </span>
                          <p className="text-xs text-on-surface-variant">
                            Top Performer Recognition
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right font-editorial font-bold text-tertiary">
                      +1,000 pts
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="px-3 py-1 bg-tertiary-container/40 text-on-tertiary-container text-xs font-bold rounded-full">
                        Completed
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-8 py-6 flex justify-between items-center border-t border-outline-variant/5">
              <span className="text-sm text-on-surface-variant">
                Showing 1-4 of 42 transactions
              </span>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full border border-outline-variant/20 flex items-center justify-center hover:bg-surface transition-colors">
                  <AppIcon className="material-symbols-outlined text-sm">
                    chevron_left
                  </AppIcon>
                </button>
                <button className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">
                  1
                </button>
                <button className="w-10 h-10 rounded-full border border-outline-variant/20 flex items-center justify-center hover:bg-surface transition-colors">
                  2
                </button>
                <button className="w-10 h-10 rounded-full border border-outline-variant/20 flex items-center justify-center hover:bg-surface transition-colors">
                  3
                </button>
                <button className="w-10 h-10 rounded-full border border-outline-variant/20 flex items-center justify-center hover:bg-surface transition-colors">
                  <AppIcon className="material-symbols-outlined text-sm">
                    chevron_right
                  </AppIcon>
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-12 flex justify-center items-center gap-3 py-6 opacity-60">
          <AppIcon className="material-symbols-outlined text-primary">
            verified_user
          </AppIcon>
          <span className="text-xs font-label font-bold uppercase tracking-widest">
            Secure Point Management System
          </span>
        </footer>
      </div>
  );
}
