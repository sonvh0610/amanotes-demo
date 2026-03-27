import { AppIcon } from '../components/ui/AppIcon';

export default function Notifications() {
  return (
    <div className="min-h-[calc(100vh-5rem)] px-4 py-6 sm:px-6 lg:px-8 md:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">
                Notifications
              </h1>
              <p className="text-on-surface-variant font-medium">
                Stay updated with your community's appreciation.
              </p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
              <AppIcon
                className="material-symbols-outlined text-xl"
                data-icon="done_all"
              >
                done_all
              </AppIcon>
              <span>Mark all as read</span>
            </button>
          </div>

          <div className="space-y-12">
            <section>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-primary/60">
                  Today
                </h2>
                <div className="h-[1px] flex-grow bg-outline-variant/30"></div>
              </div>
              <div className="space-y-4">
                <div className="group relative flex items-start gap-5 p-6 bg-surface-container-lowest rounded-xl shadow-[0_12px_40px_rgba(55,39,77,0.04)] hover:shadow-[0_12px_40px_rgba(55,39,77,0.08)] transition-all">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-primary rounded-r-full"></div>
                  <div className="relative">
                    <img
                      className="w-14 h-14 rounded-full object-cover border-2 border-surface-container"
                      data-alt="professional woman with red hair smiling in a bright office background"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCurH33VmT20BlyuX4OjVxeQQoV23xqxyYrWz9jLN3Q3bxi-2l5AToY7MtCKlPAy1UVURUPnE3U5nTMV1dzB6n47r6I2rjcqXxVdtoutPxDpaxa9UTVAUP0AGSBRn996iPKBlCzGWdCoX3RRGv_TcjTOPwnszckJUOlvWHIyTszgS8aWFPkZbDSFI6cmAZPzMdx9aJfJeWUm04Q0gPoDfDuY9n7OQrKwkdG4j21UEnBkQ3VPoEittBDnn_BeDaiRYp4YW1MOzj0KUV-"
                    />
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center shadow-md">
                      <AppIcon
                        className="material-symbols-outlined text-sm"
                        data-icon="alternate_email"
                      >
                        alternate_email
                      </AppIcon>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-on-surface font-semibold text-lg leading-tight">
                        <span className="text-primary hover:underline cursor-pointer">
                          Sarah Miller
                        </span>{' '}
                        tagged you in a new recognition.
                      </p>
                      <span className="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded-lg">
                        NEW
                      </span>
                    </div>
                    <p className="text-on-surface-variant mb-3 italic">
                      "Special thanks to the design team for the amazing work on
                      the launch!"
                    </p>
                    <span className="text-sm font-medium text-on-surface-variant/60 flex items-center gap-1">
                      <AppIcon
                        className="material-symbols-outlined text-xs"
                        data-icon="schedule"
                      >
                        schedule
                      </AppIcon>{' '}
                      2m ago
                    </span>
                  </div>
                </div>

                <div className="group relative flex items-start gap-5 p-6 bg-surface-container-lowest rounded-xl shadow-[0_12px_40px_rgba(55,39,77,0.04)] hover:shadow-[0_12px_40px_rgba(55,39,77,0.08)] transition-all">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-primary rounded-r-full"></div>
                  <div className="relative">
                    <img
                      className="w-14 h-14 rounded-full object-cover border-2 border-surface-container"
                      data-alt="portrait of a man with spectacles in a professional creative environment"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnB7CZFmHy6kEBxrrPwcqPn2tandmowHZYNLvIl85zcxAL1JalEmORbZBi12fXtNR-D0FqTdbXDX0Z1cmV0aRRmYlgPGnDhpeQeyGfUeCVZVjRLzSayq7Y7g5VTfznRLMe3KlyAieUIHtGFYxAXnuSZiGRZhcgaLOqtzf3Qkr1YyJCiBI-l26NZPtXxuzadEDrMRYIqmmCr1bXqPArRYmV8GZpb6jUuSoeNsikXcRHYciEKnGpfjJcsneavZw4JbFkvBdJr1WLEuAx"
                    />
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-tertiary-container text-on-tertiary-container rounded-full flex items-center justify-center shadow-md">
                      <AppIcon
                        className="material-symbols-outlined text-sm"
                        data-icon="favorite"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        favorite
                      </AppIcon>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-on-surface font-semibold text-lg leading-tight">
                        <span className="text-primary hover:underline cursor-pointer">
                          David Chen
                        </span>{' '}
                        and 5 others reacted to your post.
                      </p>
                      <span className="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded-lg">
                        NEW
                      </span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <AppIcon
                        className="material-symbols-outlined text-error text-xl"
                        data-icon="favorite"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        favorite
                      </AppIcon>
                      <AppIcon
                        className="material-symbols-outlined text-primary text-xl"
                        data-icon="rocket_launch"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        rocket_launch
                      </AppIcon>
                      <AppIcon
                        className="material-symbols-outlined text-tertiary text-xl"
                        data-icon="celebration"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        celebration
                      </AppIcon>
                    </div>
                    <span className="text-sm font-medium text-on-surface-variant/60 flex items-center gap-1 mt-3">
                      <AppIcon
                        className="material-symbols-outlined text-xs"
                        data-icon="schedule"
                      >
                        schedule
                      </AppIcon>{' '}
                      1h ago
                    </span>
                  </div>
                </div>

                <div className="group flex items-start gap-5 p-6 bg-surface-container-low rounded-xl border border-transparent hover:border-outline-variant/20 transition-all">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container shadow-inner">
                      <AppIcon
                        className="material-symbols-outlined text-3xl"
                        data-icon="check_circle"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </AppIcon>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-on-surface font-bold text-lg leading-tight mb-1">
                      Reward redeemed successfully!
                    </h3>
                    <p className="text-on-surface-variant">
                      Your request for{' '}
                      <span className="font-bold text-tertiary">
                        Amazon Gift Card (\$50)
                      </span>{' '}
                      has been approved and sent to your email.
                    </p>
                    <span className="text-sm font-medium text-on-surface-variant/60 flex items-center gap-1 mt-3">
                      <AppIcon
                        className="material-symbols-outlined text-xs"
                        data-icon="schedule"
                      >
                        schedule
                      </AppIcon>{' '}
                      4h ago
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-on-surface-variant/40">
                  Yesterday
                </h2>
                <div className="h-[1px] flex-grow bg-outline-variant/30"></div>
              </div>
              <div className="space-y-4">
                <div className="group flex items-start gap-5 p-6 bg-surface-container-low rounded-xl border border-transparent hover:border-outline-variant/20 transition-all">
                  <div className="relative">
                    <img
                      className="w-14 h-14 rounded-full object-cover border-2 border-surface-container"
                      data-alt="close up of a confident business woman smiling in a sleek professional office"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB5xOQMlqaDqH57wAPOYRqijx7EyQ8-VP0FGJss6PacSaEkYA3OOBkEtuBdzObeg47L6PfqrV-sUIFQZW_G7wwibybNtYXX2pX3IcC-dY9nHFJl2DF56bOHysT6LIdtNgwfWQnjuDNJ8glBrCx55csmmRXq99KzlzR80P1t5hBmG2wIV1h4OZsPFaeAnRKYtJF8qn31eyvIlDZ4hH7zVOeNc53kxbTV23a-M_anoaQFhyzkHEbfEMyZlVPwD009DUmINlvLIMofO7W"
                    />
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center shadow-md">
                      <AppIcon
                        className="material-symbols-outlined text-sm"
                        data-icon="comment"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        comment
                      </AppIcon>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <p className="text-on-surface font-semibold text-lg leading-tight mb-1">
                      <span className="text-primary hover:underline cursor-pointer">
                        Elena Rodriguez
                      </span>{' '}
                      commented on your recognition of{' '}
                      <span className="font-bold">Team Alpha</span>.
                    </p>
                    <p className="text-on-surface-variant text-sm border-l-4 border-outline-variant/30 pl-3 py-1 bg-surface/50 rounded-r-lg">
                      "Absolutely deserved! The project wouldn't have crossed
                      the line without their dedication."
                    </p>
                    <span className="text-sm font-medium text-on-surface-variant/60 flex items-center gap-1 mt-3">
                      <AppIcon
                        className="material-symbols-outlined text-xs"
                        data-icon="schedule"
                      >
                        schedule
                      </AppIcon>{' '}
                      Yesterday, 2:45 PM
                    </span>
                  </div>
                </div>

                <div className="group flex items-start gap-5 p-6 bg-surface-container-low rounded-xl border border-transparent hover:border-outline-variant/20 transition-all">
                  <div className="relative">
                    <img
                      className="w-14 h-14 rounded-full object-cover border-2 border-surface-container"
                      data-alt="executive man in a suit standing in front of high rise windows during daytime"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAn9Bvp574soZZEyqgWn4XdJhtDr1FvE5qHVv5IXpVDnB4BWRzMLIC58uhhQlbCLvidq6_FCBRZXB2nR_h581qmV4mwmphw1F7jXtBEencknbo91Y7ziKXPloJJajuETu1XVyIAO40acg-F34b-DP2Ik2jpPnAf6NGjH9E8MhueRQWNkzD1TIwnO5k35UZM7dDA_DItwYib5qdPC5UtEhKUlXhtCaYryXUp-YwDfqFxj2hLCu3R4q-3DuBNnyLHrPwiCCYNzo5jN5D-"
                    />
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center shadow-md">
                      <AppIcon
                        className="material-symbols-outlined text-sm"
                        data-icon="alternate_email"
                      >
                        alternate_email
                      </AppIcon>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <p className="text-on-surface font-semibold text-lg leading-tight mb-1">
                      <span className="text-primary hover:underline cursor-pointer">
                        Marcus Thorne
                      </span>{' '}
                      tagged you in a discussion.
                    </p>
                    <p className="text-on-surface-variant text-sm">
                      Reviewing the Q3 milestones—let's keep this momentum!
                    </p>
                    <span className="text-sm font-medium text-on-surface-variant/60 flex items-center gap-1 mt-3">
                      <AppIcon
                        className="material-symbols-outlined text-xs"
                        data-icon="schedule"
                      >
                        schedule
                      </AppIcon>{' '}
                      Yesterday, 10:12 AM
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <div className="text-center py-12">
              <button className="px-8 py-3 bg-surface-container-highest text-on-surface-variant font-bold rounded-full hover:bg-surface-container-high transition-colors active:scale-95 duration-200">
                View older notifications
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}
