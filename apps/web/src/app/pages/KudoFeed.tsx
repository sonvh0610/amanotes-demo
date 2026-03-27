import { AppIcon } from '../components/ui/AppIcon';

export default function KudoFeed() {
  return (
    <div className="min-h-[calc(100vh-5rem)] px-4 py-6 sm:px-6 lg:px-8 md:py-8">
      <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-on-surface mb-2">
                Live Kudos Feed
              </h1>
              <p className="text-on-surface-variant max-w-lg">
                Celebrate the daily wins and outstanding contributions from
                across the organization.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-semibold text-sm shadow-md transition-all">
                All
              </button>
              <button className="px-6 py-2.5 rounded-full bg-surface-container-high text-on-surface-variant font-medium text-sm hover:bg-surface-container-highest transition-all">
                My Team
              </button>
              <button className="px-6 py-2.5 rounded-full bg-surface-container-high text-on-surface-variant font-medium text-sm hover:bg-surface-container-highest transition-all">
                Core Values
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest transition-all">
                <AppIcon
                  className="material-symbols-outlined text-sm"
                  data-icon="tune"
                >
                  tune
                </AppIcon>
              </button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <article className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_12px_40px_-15px_rgba(55,39,77,0.06)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 signature-gradient opacity-5 rounded-bl-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="flex flex-col md:flex-row gap-6 relative">
                <div className="absolute -top-4 -right-4 bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg font-black text-xl shadow-sm rotate-3">
                  +50
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="relative">
                    <img
                      alt="Sender Profile"
                      className="w-16 h-16 rounded-full object-cover border-4 border-surface"
                      data-alt="Close-up portrait of a woman with a bright, energetic expression, warm outdoor lighting, blurred greenery background"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2rYBXzwih-tsGc1V_ad_XwHE0mrdCmKe-q4HQMsgzv-TGbrN6kyEdEE3R57ARZ0Z3cOc-SOdNLKQoJlSItvBcVILpre2pIFW6xbphWGLtkMcOjAsCPz7ZYueSZWqwS-PBCe1nvyznkO6yhKCBc8f_ct_jn6lm0Y6RI1zOSEHrNq4Q2DV9BKK_Q3n2FDtonPm47hMirkGFq1Sg45Ufm0KbG1XERshvNqKCc1I2CKTDjZNHVfC419dJ1zJhvTmIMoDn6GdF6FMY6kKs"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-tertiary-container text-on-tertiary-container w-6 h-6 rounded-full flex items-center justify-center border-2 border-surface">
                      <AppIcon
                        className="material-symbols-outlined text-xs"
                        data-icon="bolt"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        bolt
                      </AppIcon>
                    </div>
                  </div>
                  <AppIcon
                    className="material-symbols-outlined text-outline-variant"
                    data-icon="arrow_forward"
                  >
                    arrow_forward
                  </AppIcon>
                  <img
                    alt="Receiver Profile"
                    className="w-16 h-16 rounded-full object-cover border-4 border-surface"
                    data-alt="Portrait of a creative professional man wearing glasses, soft studio lighting, minimalist gray background"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFYEdYYdlvgfbqO4OUPYaESCuAgQ57FBjdOkYwoUEze-VemDUZ3mKQH9UKGic0SKVbwM07xpOD2-cjSQpmCkvUnQeT8HUx7Jy_R4hWcoFm8NZG8FpRl3FEh7O9M3Ia-dcWPOAV5zPfrjGm0_n35rB-vzrx43DECJLcHcUoXHX6IR67N-ejTezluQ2jyu9w4pabXk_FKqx7tUway8S8kD7whXZz_p2fXLeBKquSmOIsncPcjp8MPLJVqy-cCCethh_VIjCd7PSYmQkE"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="font-bold text-on-surface">
                      Sarah Jenkins
                    </span>
                    <span className="text-on-surface-variant text-sm">
                      recognized
                    </span>
                    <span className="font-bold text-on-surface">
                      David Chen
                    </span>
                    <span className="text-on-surface-variant text-xs ml-auto">
                      2 mins ago
                    </span>
                  </div>
                  <p className="text-on-surface text-lg leading-relaxed mb-4 font-medium">
                    David absolutely crushed the Q3 roadmap presentation! His
                    "Ownership" of the technical debt section was exactly what
                    the stakeholders needed to hear. 🚀
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-4 py-1.5 rounded-md bg-primary-container/30 text-primary-dim font-bold text-xs uppercase tracking-wider">
                      Ownership
                    </span>
                    <span className="px-4 py-1.5 rounded-md bg-tertiary-container/30 text-tertiary-dim font-bold text-xs uppercase tracking-wider">
                      Leadership
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-surface-container pt-4">
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container hover:bg-primary-container/40 transition-all active:scale-90">
                        <span>🚀</span>{' '}
                        <span className="text-xs font-bold text-on-surface-variant">
                          12
                        </span>
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container hover:bg-error-container/40 transition-all active:scale-90">
                        <span>❤️</span>{' '}
                        <span className="text-xs font-bold text-on-surface-variant">
                          8
                        </span>
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container hover:bg-secondary-container/40 transition-all active:scale-90">
                        <span>👏</span>{' '}
                        <span className="text-xs font-bold text-on-surface-variant">
                          5
                        </span>
                      </button>
                    </div>
                    <button className="flex items-center gap-2 text-primary font-bold text-sm hover:underline">
                      <AppIcon
                        className="material-symbols-outlined text-sm"
                        data-icon="chat_bubble"
                      >
                        chat_bubble
                      </AppIcon>
                      3 Comments
                    </button>
                  </div>
                </div>
              </div>
            </article>

            <article className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_12px_40px_-15px_rgba(55,39,77,0.06)] relative overflow-hidden group">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="absolute -top-4 -right-4 bg-tertiary-container text-on-tertiary-container px-4 py-2 rounded-lg font-black text-xl shadow-sm -rotate-2">
                  +25
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <img
                    alt="Sender"
                    className="w-16 h-16 rounded-full object-cover border-4 border-surface"
                    data-alt="Portrait of a smiling man with a short beard, dressed in business casual, warm golden hour lighting"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwMl7S2EORZeB6qN2a9nQPoeYM5brNdz-mivP6iIEi3lAsD3TUZr0kW5-iSo2m1aQyTBR7j6SwCBS4Tg7c6MXbwnp7KWEGEkyJvl6-73QCX_a9gkgEj6PxETnn-mUYHD9BaCEVK18V1rOT5y2C16yLg9-2BoWw-0buqTkR3dXvWHRUkXvgddjIjd9otJAfPeXAaGo37QMt6-xx6DFeI5p_cBvbp_r8H3n3MOlwBr9ocJ_mBeiTrzqmaoJi_Ky7sQTdZ0PSvs5WzKtO"
                  />
                  <AppIcon
                    className="material-symbols-outlined text-outline-variant"
                    data-icon="arrow_forward"
                  >
                    arrow_forward
                  </AppIcon>
                  <img
                    alt="Receiver"
                    className="w-16 h-16 rounded-full object-cover border-4 border-surface"
                    data-alt="Close-up of a young woman with curly hair and glasses, bright workspace background with natural light"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLLfdgFIk4CPudXxVHchqLoJ1aTCC88M_-20AO34Fxwzp4l-QHaYObN302kJC8jS9eHEljklnoFaqzLEfCrdGyYbL2hqTVDQrPfhU0_-F4kX0m6LVvnkT2njw1Bzg1KBVYkSt9jQWfEVaLpApJfbIfGB7aANf76gt1sx96weuAeOeWTkVkhnMyIKQEJLlwQOS0BuVvCSkDVZ4TNFME548gndhCqm_XY3JiddYyUJs-bTKV516mD7kaveSlkHIBRisiqTZFtUKXJWaZ"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="font-bold text-on-surface">
                      Marcus Thorne
                    </span>
                    <span className="text-on-surface-variant text-sm">
                      recognized
                    </span>
                    <span className="font-bold text-on-surface">
                      Elena Rodriguez
                    </span>
                    <span className="text-on-surface-variant text-xs ml-auto">
                      1 hour ago
                    </span>
                  </div>
                  <p className="text-on-surface text-lg leading-relaxed mb-4 font-medium">
                    Elena went above and beyond to help me debug that production
                    issue late on Friday. Pure "Teamwork" in action! 🛡️
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-4 py-1.5 rounded-md bg-secondary-container/30 text-secondary-dim font-bold text-xs uppercase tracking-wider">
                      Teamwork
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-surface-container pt-4">
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container hover:bg-primary-container/40 transition-all">
                        <span>🙌</span>{' '}
                        <span className="text-xs font-bold text-on-surface-variant">
                          24
                        </span>
                      </button>
                    </div>
                    <button className="flex items-center gap-2 text-primary font-bold text-sm hover:underline">
                      <AppIcon
                        className="material-symbols-outlined text-sm"
                        data-icon="add_comment"
                      >
                        add_comment
                      </AppIcon>
                      Add Comment
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-primary text-on-primary rounded-xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full -mb-24 -mr-24 blur-3xl"></div>
              <h3 className="text-xl font-bold font-headline mb-6 relative">
                Weekly Momentum
              </h3>
              <div className="space-y-6 relative">
                <div className="flex justify-between items-center">
                  <span className="opacity-80">Kudos Sent</span>
                  <span className="text-2xl font-black">1,284</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary-container w-[75%] rounded-full"></div>
                </div>
                <p className="text-sm opacity-90">
                  15% more appreciation than last week! Keep it up team! 🎊
                </p>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-8">
              <h3 className="text-lg font-bold font-headline text-on-surface mb-6">
                Trending Values
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-lg group hover:bg-primary/5 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-primary-container/20 flex items-center justify-center text-primary">
                      <AppIcon
                        className="material-symbols-outlined"
                        data-icon="groups"
                      >
                        groups
                      </AppIcon>
                    </div>
                    <span className="font-bold text-sm">Teamwork</span>
                  </div>
                  <span className="text-xs font-bold text-on-surface-variant">
                    412 posts
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-lg group hover:bg-secondary/5 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-secondary-container/20 flex items-center justify-center text-secondary">
                      <AppIcon
                        className="material-symbols-outlined"
                        data-icon="lightbulb"
                      >
                        lightbulb
                      </AppIcon>
                    </div>
                    <span className="font-bold text-sm">Innovation</span>
                  </div>
                  <span className="text-xs font-bold text-on-surface-variant">
                    288 posts
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-lg group hover:bg-tertiary/5 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-tertiary-container/20 flex items-center justify-center text-tertiary">
                      <AppIcon
                        className="material-symbols-outlined"
                        data-icon="verified_user"
                      >
                        verified_user
                      </AppIcon>
                    </div>
                    <span className="font-bold text-sm">Ownership</span>
                  </div>
                  <span className="text-xs font-bold text-on-surface-variant">
                    194 posts
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-8">
              <h3 className="text-lg font-bold font-headline text-on-surface mb-6">
                Top Recognized
              </h3>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      alt="Leaderboard User"
                      className="w-12 h-12 rounded-full object-cover"
                      data-alt="Candid portrait of a professional woman in a creative studio, soft natural light from a window"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTlPXvqcSOA1_fFei4922o14bhX7Mq6cOkstcww-n-Qf7qtztItco9_Qr9yWMml2m7h-KblKnkszzlrX0DPafO_NbgabSZShrtAtU1vSqqTvrK3R6NSbPuiNV2B8eWYfYdZXDM_MrWeY0KFI5BlVUDwNnKGn38GJAcw-vyvMRX91dzdjU_PIugbuuQyAUN0eQBxOpVUspxiqrT8YrqvFU4BrXXGsGFFlCDaLS5dmg0br5bx5rhtwjsIXkOjHCdRdVhY4U0eZjEOZm6"
                    />
                    <div className="absolute -top-2 -left-2 bg-yellow-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-surface">
                      1
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Sophie Alpert</p>
                    <p className="text-xs text-on-surface-variant">
                      420 Points • 12 Kudos
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      alt="Leaderboard User"
                      className="w-12 h-12 rounded-full object-cover"
                      data-alt="Close-up of a smiling young man in a modern office, bright and airy lighting"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkc0QDSG7l7poJkalCvUYvTHg6Ul-H1s1t2wXtExSDVUOtOqCMlIExH-KUch7k-4MH76t6PS2DFGCcmetlbdx52Mbg9_thDO19m8LMWzwyXUv0bL6OOAq8EdqseMPmnI5hV1FGPTXBOL7bxaurUFg4TnkCe6Wc4ubdh39RhIOj2uRtkZg6uht4fAnATKnH4BcrS-D6tggWH1-Oh-3tI9kARcifmod1ZbEzKN1bd4shWjsewXJ8UKLTjAEkkfCu6XIsdg1uwqpxQBvi"
                    />
                    <div className="absolute -top-2 -left-2 bg-slate-300 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-surface">
                      2
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-sm">James Wilson</p>
                    <p className="text-xs text-on-surface-variant">
                      385 Points • 9 Kudos
                    </p>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 py-3 rounded-full border border-outline-variant/30 text-primary font-bold text-sm hover:bg-white transition-colors">
                View Full Leaderboard
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}
