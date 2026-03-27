import { AppIcon } from '../components/ui/AppIcon';

export default function RewardsCatalog() {
  return (
    <div className="min-h-[calc(100vh-5rem)] px-4 py-6 sm:px-6 lg:px-8 md:py-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold font-headline text-on-surface tracking-tight mb-2">
                Rewards Catalog
              </h1>
              <p className="text-on-surface-variant text-lg">
                Exchange your hard-earned Kudos for premium perks.
              </p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl flex items-center gap-4 shadow-[0_12px_40px_-15px_rgba(55,39,77,0.06)] border border-outline-variant/10">
              <div className="bg-primary-container/20 p-3 rounded-full">
                <AppIcon
                  className="material-symbols-outlined text-primary scale-125"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  stars
                </AppIcon>
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  Your Balance
                </p>
                <p className="text-3xl font-black text-primary tracking-tighter">
                  2,450{' '}
                  <span className="text-sm font-bold opacity-60">pts</span>
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-wrap items-center gap-3">
            <button className="px-8 py-3 rounded-full bg-primary text-on-primary font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
              All
            </button>
            <button className="px-8 py-3 rounded-full bg-surface-container-low text-on-surface-variant font-semibold hover:bg-surface-container-high transition-colors">
              Merchandise
            </button>
            <button className="px-8 py-3 rounded-full bg-surface-container-low text-on-surface-variant font-semibold hover:bg-surface-container-high transition-colors">
              Time Off
            </button>
            <button className="px-8 py-3 rounded-full bg-surface-container-low text-on-surface-variant font-semibold hover:bg-surface-container-high transition-colors">
              Gift Cards
            </button>
            <div className="ml-auto hidden md:flex items-center gap-2 bg-surface-container-high px-4 py-2 rounded-full border border-outline-variant/10">
              <AppIcon className="material-symbols-outlined text-on-surface-variant text-sm">
                search
              </AppIcon>
              <input
                className="bg-transparent border-none focus:ring-0 text-sm w-48 font-medium"
                placeholder="Find a reward..."
                type="text"
              />
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <div className="md:col-span-2 group relative overflow-hidden bg-surface-container-lowest rounded-xl p-8 flex flex-col md:flex-row gap-8 shadow-[0_12px_40px_-15px_rgba(55,39,77,0.06)] border border-outline-variant/5">
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-br-full -z-0"></div>
              <div className="relative z-10 w-full md:w-1/2 aspect-square md:aspect-auto h-64 md:h-auto rounded-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  data-alt="premium minimalist charcoal grey company hoodie featuring a subtle embroidered logo on heavy cotton fabric displayed on a clean studio background"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCc8ntoDufvBgB4HMpq8i0UjW4MkW0Xf19bRaa2OLpCiQwkwiaOxCM4f6pbRKTw4iUm8TjHXF0hRoCn4YYZxL8iedXCBBRQWOSQzPyhG3T2vhhfRQ9X9EN0u-uJrc55VQHc6ZuZ9jLZKoLD5inOEHXREq0GHetAcuKTZkDSCLAfDFTKCHFUhb0gIOjewoUx27yekENi25nfZmSKwxznR3KdRjbxNzO7eqzhG8O6vtrhG8VOGyHoiLsOs6Njjh-ArFhwMnV9kBCFSRbi"
                />
                <div className="absolute top-4 left-4 bg-tertiary-container text-on-tertiary-container px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                  <AppIcon
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </AppIcon>
                  In Stock
                </div>
              </div>
              <div className="relative z-10 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
                      Best Seller
                    </span>
                    <div className="text-right">
                      <span className="text-3xl font-black text-on-surface">
                        500
                      </span>
                      <span className="text-sm font-bold text-on-surface-variant">
                        pts
                      </span>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold font-headline mb-3">
                    Company Hoodie
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed mb-6">
                    Ultra-soft, heavyweight organic cotton. The ultimate badge
                    of honor for our team members. Sustainably produced and
                    premium fitted.
                  </p>
                </div>
                <button className="w-full md:w-max px-12 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-black rounded-full shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                  Redeem Now
                </button>
              </div>
            </div>

            <div className="group bg-surface-container-lowest rounded-xl p-6 flex flex-col shadow-[0_12px_40px_-15px_rgba(55,39,77,0.06)] border border-outline-variant/5 transition-all hover:shadow-2xl hover:shadow-primary/5">
              <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                <img
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  data-alt="close-up of a beautifully crafted latte with intricate foam art sitting on a rustic wooden cafe table in soft morning light"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqkyoyaNCHA7qyd824-dLuaD2dj5VyWPd18t-zpVKU_q9tWsn1f3L93oik5JfBgIcIoTPd1uExLVjK--n7fgCMTHN3JIW0yJP_DSDXYy_5ke-i-_thY5u4YW9JWAE2hSmwPU2k12LTcKuy4eOu4A_8ffNYOQ0U7T3rS1d2t3CovTYFlOQVz0bmsXi24w0ECYynomrGAMX2zW1hNzgVK2NccbNVPN6gjMj4SNo3aSiU_UsRn0EASl19n6GNqS4fnToVEy3rMKZXwYol"
                />
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-on-surface shadow-sm">
                  150 pts
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold font-headline mb-2">
                  Coffee Voucher
                </h3>
                <p className="text-on-surface-variant text-sm mb-6">
                  A \$15 credit for any local artisan coffee shop. Fuel your
                  next breakthrough.
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xs font-bold text-on-surface-variant/60 flex items-center gap-1">
                    <AppIcon className="material-symbols-outlined text-sm">
                      inventory_2
                    </AppIcon>
                    42 remaining
                  </span>
                  <button className="bg-secondary-container text-on-secondary-container px-6 py-2 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all">
                    Redeem
                  </button>
                </div>
              </div>
            </div>

            <div className="group bg-surface-container-lowest rounded-xl p-6 flex flex-col shadow-[0_12px_40px_-15px_rgba(55,39,77,0.06)] border border-outline-variant/5 transition-all hover:shadow-2xl hover:shadow-primary/5">
              <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                <img
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  data-alt="vibrant tropical beach scene at sunset with swaying palm trees and calm turquoise waters for a sense of ultimate relaxation"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC54i50qB5P0zi-dmpdmKGR0ZGyrVuISKquVyd-Y7V4YIklBiBqQDuzXX10y4S0CPslQy33_zfssclAwr8dBKjHk3iJFVttJGFVR9T0UmopjUH3P7BbcvHx22NAa7wIusxQpmSdKW2-eEQ-ucmyyhoMuQAHWmEjuY36q7OOgjjzCxIaRjGd_hVgyoHzHf-TbcsbVhM-uQ9_Gi1GWs1BRhMwZzE07yrjEKof5qPQB88n7rm0h7QLwb2k0-tFJYRMYLEnmZcCb8F9dhH_"
                />
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-on-surface shadow-sm">
                  1000 pts
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold font-headline mb-2">
                  Friday Afternoon Off
                </h3>
                <p className="text-on-surface-variant text-sm mb-6">
                  Clock out at noon this Friday. Reclaim your weekend early,
                  you've earned it!
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xs font-bold text-on-surface-variant/60 flex items-center gap-1">
                    <AppIcon className="material-symbols-outlined text-sm">
                      schedule
                    </AppIcon>
                    Unlimited
                  </span>
                  <button className="bg-secondary-container text-on-secondary-container px-6 py-2 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all">
                    Redeem
                  </button>
                </div>
              </div>
            </div>

            <div className="group bg-surface-container-lowest rounded-xl p-6 flex flex-col shadow-[0_12px_40px_-15px_rgba(55,39,77,0.06)] border border-outline-variant/5 transition-all hover:shadow-2xl hover:shadow-primary/5">
              <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                <img
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  data-alt="modern minimalist matte black noise-cancelling headphones on a clean marble surface with soft side lighting"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3_8y-NMXagkO0QE6yBjLg7D-_1Itjt9Gjku82_FMmQWVkkT2qVnIIh2gRkpkjsyXcdR38smhTX1iJfMhev3EtYYi88bWORuKz3-G7mszBP4dq_z7MQr8OMT1RRzb7fWO7y2WiHTMIdN5lFkZtWs97wgFZaa1_exegg85-DsOp2As0K7iM3qqKy-s5OvVIPGoQTAh8XiJi8nPiTFWlLi_3PCV6k9o9u8foRELKlTo1trb_oAwTABV7ADrAB5MfAjuHakTt3naE_c5Q"
                />
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-on-surface shadow-sm">
                  2500 pts
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold font-headline mb-2">
                  Noise-Cancelling Headphones
                </h3>
                <p className="text-on-surface-variant text-sm mb-6">
                  Premium sound quality for your focused deep-work sessions.
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xs font-bold text-error flex items-center gap-1">
                    <AppIcon
                      className="material-symbols-outlined text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      error
                    </AppIcon>
                    Only 2 left!
                  </span>
                  <button className="bg-secondary-container text-on-secondary-container px-6 py-2 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all">
                    Redeem
                  </button>
                </div>
              </div>
            </div>

            <div className="group bg-surface-container-lowest rounded-xl p-6 flex flex-col shadow-[0_12px_40px_-15px_rgba(55,39,77,0.06)] border border-outline-variant/5 transition-all hover:shadow-2xl hover:shadow-primary/5">
              <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                <img
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  data-alt="collection of colorful high-quality stickers and embroidered patches with motivational and tech themes on a light grey background"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQy0cYQe1XV3EpEos4kBdrk56foouFCq2ttL8d0GlPh70oSI0nUOJbYHoxfVGWywO-B_VDxp0dKYwC8Nd5roh2faGrA681a2nxdt0G3apXb2oIdFwg7RGCLG9VZlHO72tx-vBSUZk54LZ9W7CLPHy9xvhFKixqI-k_YLH-lbfrzMtthLuk8Ummhyk9oJ21YO8kDejsxzXEAQyGRTOz-GkZkwwNIscH4MqsdY3vJzusMkAJiGOSq9DNJw0Rd27zgwK67FOSDwI85V43"
                />
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-on-surface shadow-sm">
                  50 pts
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold font-headline mb-2">
                  Swag Sticker Pack
                </h3>
                <p className="text-on-surface-variant text-sm mb-6">
                  Custom vinyl stickers for your laptop and workspace. Show your
                  "Good Job" pride.
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xs font-bold text-on-surface-variant/60 flex items-center gap-1">
                    <AppIcon className="material-symbols-outlined text-sm">
                      inventory_2
                    </AppIcon>
                    120+ in stock
                  </span>
                  <button className="bg-secondary-container text-on-secondary-container px-6 py-2 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all">
                    Redeem
                  </button>
                </div>
              </div>
            </div>

            <div className="group bg-surface-container-lowest rounded-xl p-6 flex flex-col shadow-[0_12px_40px_-15px_rgba(55,39,77,0.06)] border border-outline-variant/5 transition-all hover:shadow-2xl hover:shadow-primary/5">
              <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                <img
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  data-alt="professional portrait of a diverse team collaborating and smiling around a laptop in a bright modern co-working space"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-Sv_kFPHVv58APoRlI4CPIFVEutXUEpf7XiaiO0Icyya5WxEoC6t5Z2i_5IA3vN8GGvR7_lVkBDg0WuTAc5f0ICYWSVZ8ai-9Z5uLVDeFRY7cZz4lKWyvj3i4WpToOQafR-3RPkFxUmlrd-1cv2qNOKqCsz87Hc13aAVVEHGFOeO7K122SDgt5nm1m6t4koo8IDtsON3YEm-PcNKoEo_S2qOYxTPWhkgFWfJHp9aYPx55MIyJQCcWjvxlNjveMYOoNtmtYfJSE_tF"
                />
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-on-surface shadow-sm">
                  300 pts
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold font-headline mb-2">
                  Lunch with the CEO
                </h3>
                <p className="text-on-surface-variant text-sm mb-6">
                  A casual 1-on-1 lunch to discuss your ideas and the company's
                  future.
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xs font-bold text-on-surface-variant/60 flex items-center gap-1">
                    <AppIcon className="material-symbols-outlined text-sm">
                      event
                    </AppIcon>
                    1 per quarter
                  </span>
                  <button className="bg-secondary-container text-on-secondary-container px-6 py-2 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all">
                    Redeem
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
  );
}
