import { AppIcon } from '../components/ui/AppIcon';

export default function SendKudos() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 md:py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-8">
            <header>
              <h1 className="text-4xl font-headline font-extrabold text-on-background tracking-tight mb-2">
                Send a Kudo
              </h1>
              <p className="text-on-surface-variant font-body">
                Celebrate your colleagues' hard work and impact.
              </p>
            </header>
            <section className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_12px_40px_rgba(55,39,77,0.04)] space-y-10">
              <div className="space-y-4">
                <label className="block font-headline font-bold text-lg text-on-surface">
                  Who are you recognizing?
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <AppIcon
                      className="material-symbols-outlined text-primary-fixed-dim"
                      data-icon="person_search"
                    >
                      person_search
                    </AppIcon>
                  </div>
                  <input
                    className="w-full pl-12 pr-4 py-4 bg-surface-container-high border-none rounded-lg focus:ring-2 focus:ring-primary-container transition-all text-on-surface"
                    placeholder="Search by name or email..."
                    type="text"
                  />

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 bg-primary-container/20 px-3 py-1.5 rounded-full border border-primary-container/30 hover:bg-primary-container/40 transition-all">
                      <img
                        alt="Colleague"
                        className="w-6 h-6 rounded-full"
                        data-alt="portrait of a woman with curly hair smiling in a colorful studio environment"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfhSSb7BZFuNMKe-hXIjaScGhdZ_x0N05GUf_hN-GEyPZuzccoB4uv08_EqjMZgsKejmaLTWygqa7vaUke3x89zclrEbFTxJFlZMnwTt4axt4cQkzPMR9NftuJzRfoBVf6mgBiMYyKzJw_9VtfJWhXqAqDnyEpRs8-lB_balZEHx44T1ltBgPyYfxWaCGkJNXlYdMomODWbSWCPso-HOCJL6hBbIr4qn4vy679anIEnj1pf-3MZNlxflj1Aj67wxry4sf1ph6w2zPy"
                      />
                      <span className="text-xs font-semibold text-on-primary-container">
                        Sarah Chen
                      </span>
                      <AppIcon
                        className="material-symbols-outlined text-xs"
                        data-icon="close"
                      >
                        close
                      </AppIcon>
                    </button>
                    <button className="flex items-center gap-2 bg-surface-container-high px-3 py-1.5 rounded-full hover:bg-surface-container-highest transition-all">
                      <img
                        alt="Colleague"
                        className="w-6 h-6 rounded-full"
                        data-alt="headshot of a man with glasses smiling gently against a soft blue background"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEjPXhMWCbocEWn53iUfU0KfdQ69fzZnHOzTY56frPP6BcaZBvR30Cq7YbX4k07pAIrgH8erkw3hFBnvkC0RMyJpMpohpVFrLi2m6bF05DgHC4KD4B4oyVgxzf6ba6iRko2CxE0GvrqYrKOJuLi9W1h9WkMK3fb6QaVmkRRGhunbEjxEChddE_ZxHIVhbxRNcSxcl3-B0V-p7DBoc_g9CMP_YxUqLRlB1NRuMFDHdgIkdyqshclLBfKpcWhqVRZSWCJVgNpYMGIIoi"
                      />
                      <span className="text-xs font-medium text-on-surface-variant">
                        David Miller
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block font-headline font-bold text-lg text-on-surface">
                  Select a Core Value
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <button className="flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-primary-container bg-primary-container/10 text-on-primary-container font-bold transition-all shadow-sm">
                    <AppIcon
                      className="material-symbols-outlined"
                      data-icon="groups"
                    >
                      groups
                    </AppIcon>
                    <span className="text-sm">Teamwork</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-transparent bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant font-medium transition-all">
                    <AppIcon
                      className="material-symbols-outlined"
                      data-icon="verified_user"
                    >
                      verified_user
                    </AppIcon>
                    <span className="text-sm">Ownership</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-transparent bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant font-medium transition-all">
                    <AppIcon
                      className="material-symbols-outlined"
                      data-icon="lightbulb"
                    >
                      lightbulb
                    </AppIcon>
                    <span className="text-sm">Innovation</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-transparent bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant font-medium transition-all">
                    <AppIcon
                      className="material-symbols-outlined"
                      data-icon="sentiment_satisfied"
                    >
                      sentiment_satisfied
                    </AppIcon>
                    <span className="text-sm">Customer First</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-transparent bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant font-medium transition-all">
                    <AppIcon
                      className="material-symbols-outlined"
                      data-icon="trending_up"
                    >
                      trending_up
                    </AppIcon>
                    <span className="text-sm">Growth Mindset</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block font-headline font-bold text-lg text-on-surface">
                  Why do they deserve this?
                </label>
                <div className="relative">
                  <textarea
                    className="w-full p-6 bg-surface-container-high border-none rounded-xl focus:ring-2 focus:ring-primary-container transition-all text-on-surface resize-none font-body"
                    placeholder="Type your appreciation here... e.g. 'Sarah, thanks for crushing the presentation today!'"
                    rows={4}
                  ></textarea>
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button className="p-2 rounded-full hover:bg-surface-container-highest text-on-surface-variant transition-all">
                      <AppIcon
                        className="material-symbols-outlined"
                        data-icon="mood"
                      >
                        mood
                      </AppIcon>
                    </button>
                    <button className="p-2 rounded-full hover:bg-surface-container-highest text-on-surface-variant transition-all">
                      <AppIcon
                        className="material-symbols-outlined"
                        data-icon="attach_file"
                      >
                        attach_file
                      </AppIcon>
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="block font-headline font-bold text-lg text-on-surface">
                    Award Points
                  </label>
                  <span className="text-primary font-black text-2xl">
                    25 <span className="text-sm font-medium">pts</span>
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <button className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-white transition-all">
                    10
                  </button>
                  <button className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary-container font-bold">
                    25
                  </button>
                  <button className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-white transition-all">
                    50
                  </button>
                  <div className="flex-1 h-2 bg-surface-container-high rounded-full relative ml-4">
                    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-white border-4 border-primary rounded-full shadow-md"></div>
                    <div className="w-1/2 h-full bg-primary rounded-full"></div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:w-96 space-y-8">
            <section className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-xl p-6 text-white shadow-xl overflow-hidden relative">
              <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-violet-200 text-sm font-medium uppercase tracking-widest">
                    Monthly Budget
                  </span>
                  <AppIcon
                    className="material-symbols-outlined opacity-50"
                    data-icon="account_balance_wallet"
                  >
                    account_balance_wallet
                  </AppIcon>
                </div>
                <div className="space-y-1">
                  <h2 className="text-4xl font-black">
                    450 <span className="text-lg opacity-80">pts</span>
                  </h2>
                  <p className="text-xs text-violet-200">
                    You have sent 50 pts this month
                  </p>
                </div>
                <div className="pt-4">
                  <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                    <div className="w-4/5 h-full bg-secondary-fixed"></div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            </section>

            <section className="space-y-4">
              <label className="block font-headline font-bold text-lg text-on-background">
                Live Preview
              </label>
              <div className="bg-white rounded-xl shadow-2xl shadow-violet-100 overflow-hidden transform hover:scale-[1.02] transition-all border border-slate-50">
                <div className="h-32 bg-surface-container-highest relative overflow-hidden">
                  <img
                    alt="Preview Background"
                    className="w-full h-full object-cover opacity-60"
                    data-alt="vibrant abstract background with swirling purple and blue gradients and soft grain texture"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzdTKWVDbONvuSBbXslxo7go6nDE52gFCUinlLr-Bkc-EBEi6YhqjrON-NgUsVPfbYRN5-KqtVgH5njJKOwGHe215KpZWzv0trRSuYTv4Ly4g5xqaM2gP6PmUjmoIkPMmIuFQWDrVNrNmqfEaPHQd6xszGB02azOT1FENobqFMsizZfmRTiyolpCmAuwWQzeN8CEjzN0nrQXcNetk0oceYsk6bT1DrB6KnO-GqqogzmbbLUBzzIECDBjwmp7ekumSbMI3R8u6fra4b"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                    <AppIcon
                      className="material-symbols-outlined text-primary text-sm"
                      data-icon="groups"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      groups
                    </AppIcon>
                    <span className="text-[10px] font-bold text-on-surface uppercase tracking-tighter">
                      Teamwork
                    </span>
                  </div>
                </div>
                <div className="p-6 relative">
                  <div className="absolute -top-10 left-6">
                    <img
                      alt="Sarah Chen"
                      className="w-16 h-16 rounded-xl border-4 border-white shadow-lg object-cover"
                      data-alt="portrait of a woman with curly hair smiling in a colorful studio environment"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7t-4GWDRSf9RPiwlMND8VB9brdKLX-22LCYrrY0KZdh963FI3GEgWOHjXXKepfZ_lGr4yWI50zYN-5k0hqCW2R1irvdNIrsPrbof_0S_MP95oeTkxSGvk6kh35Vx7g4E75e8rZp6Wim3ho9pB2aF-iJcYx_Ym08hECIaBagW4b_1meP2YplaKkahrxHZXgSPfYCvZwsoqBfGegv6--a6IB9uKdQpaFDAJcAcyHhVjuzSuzwD-d8WZX03BNZGleUQe1ILVgyuALd0W"
                    />
                  </div>
                  <div className="pt-8 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-on-surface">
                          Sarah Chen
                        </h3>
                        <p className="text-[10px] text-on-surface-variant font-medium">
                          Design Operations
                        </p>
                      </div>
                      <div className="bg-tertiary-container px-2 py-1 rounded-md">
                        <span className="text-xs font-black text-on-tertiary-container">
                          +25
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-on-surface-variant leading-relaxed font-body italic">
                      "Sarah, thanks for crushing the presentation today! Your
                      attention to detail is unmatched."
                    </p>
                    <div className="pt-2 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <AppIcon
                          className="material-symbols-outlined text-[12px] text-primary"
                          data-icon="person"
                        >
                          person
                        </AppIcon>
                      </div>
                      <span className="text-[10px] text-on-surface-variant">
                        Sent by <span className="font-bold">Alex Rivera</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="space-y-4 pt-4">
              <button className="w-full signature-gradient text-white font-headline font-extrabold py-5 rounded-xl shadow-xl shadow-violet-200 active:scale-95 transition-all flex items-center justify-center gap-2 group">
                <AppIcon
                  className="material-symbols-outlined group-hover:rotate-12 transition-transform"
                  data-icon="send"
                >
                  send
                </AppIcon>
                Send Kudo
              </button>
              <button className="w-full py-4 rounded-xl border-2 border-slate-100 text-slate-500 font-bold hover:bg-slate-50 transition-all">
                Save as Draft
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}
