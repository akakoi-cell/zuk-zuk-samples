import { Eyebrow, Btn, Stat, Ph } from "./ui";
import { HERO_STATS } from "@/lib/tax-content";

// 採用案 = 案A 王道エディトリアル (light paper / 縦リズム)。
// 見出しコピー preset "a": 賃貸経営の「手取り」を、最大化する。
export function TaxHero() {
  return (
    <section id="top" className="relative bg-paper overflow-hidden">
      {/* faint vertical rules */}
      <div className="absolute inset-0 max-w-content mx-auto px-6 md:px-10 pointer-events-none hidden md:block">
        <div className="h-full grid grid-cols-12 gap-6">
          {[3, 9].map((i) => (
            <div key={i} className="vrule opacity-40" style={{ gridColumnStart: i }}></div>
          ))}
        </div>
      </div>
      <div className="max-w-content mx-auto px-6 md:px-10 relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-end pt-16 md:pt-24 pb-0">
          <div className="lg:col-span-8 reveal">
            <Eyebrow num="01" className="mb-8">
              Real estate × Tax strategy
            </Eyebrow>
            <h1 className="font-mincho font-medium text-navy leading-[1.18] tracking-[0.01em] text-[40px] sm:text-[54px] lg:text-[68px]">
              賃貸経営の<span className="text-gold-dark">「手取り」</span>を、
              <br />
              最大化する。
            </h1>
            <p className="jp text-ink-600 text-[15px] md:text-[17px] mt-8 max-w-[52ch]">
              不動産オーナー専門の税理士事務所です。日々の記帳・確定申告から節税、そして法人化まで——
              賃貸経営の数字を、構想段階からワンストップで。Zoom＋クラウド会計で、全国どこからでも。
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-10">
              <Btn href="#contact" size="lg" icon="arrow">
                30分無料相談を予約する
              </Btn>
              <Btn href="#service" variant="outline" size="lg" icon="arrowUR">
                サービスを見る
              </Btn>
            </div>
          </div>
          <div className="lg:col-span-4 reveal">
            <Ph label="OFFICE / 賃貸物件" ratio="3/4" className="w-full" />
          </div>
        </div>
        {/* ledger stat band */}
        <div className="mt-14 md:mt-20 border-t border-navy/20 reveal">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {HERO_STATS.map((s, i) => (
              <div
                key={i}
                className={`py-8 sm:py-10 ${i > 0 ? "sm:border-l border-line sm:pl-10" : "sm:pr-10"} ${
                  i < 2 ? "border-b sm:border-b-0 border-line" : ""
                }`}
              >
                <Stat value={s.value} suffix={s.suffix} label={s.label} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
