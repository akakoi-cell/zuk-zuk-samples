import { Icon, Btn } from "./ui";
import { TAX_SITE, TAX_FOOTER_COLS } from "@/lib/tax-content";

export function TaxFooter() {
  return (
    <footer className="bg-navy-950 text-white">
      {/* CTA strip */}
      <div className="border-b border-white/10">
        <div className="max-w-content mx-auto px-6 md:px-10 py-12 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <div className="font-mincho text-[24px] md:text-[32px] leading-snug">
              賃貸経営の数字に、<span className="text-gold-light">戦略</span>を。
            </div>
            <p className="jp text-navy-100/65 text-[13.5px] mt-3 max-w-[48ch]">
              不動産オーナー専門の税理士が、初回 30 分・無料でご相談を承ります。
            </p>
          </div>
          <Btn href="#contact" variant="gold" size="lg" icon="arrow" className="shrink-0">
            30分無料相談を予約する
          </Btn>
        </div>
      </div>

      <div className="max-w-content mx-auto px-6 md:px-10 py-14 md:py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <span className="relative inline-flex items-center justify-center w-10 h-10 border border-gold shrink-0">
                <span className="absolute inset-[3px] border border-gold/40"></span>
                <span className="font-mincho font-semibold text-gold leading-none text-[18px]">{TAX_SITE.mark}</span>
              </span>
              <div className="leading-none">
                <div className="font-mincho font-semibold text-[18px] tracking-[0.06em]">{TAX_SITE.name}</div>
                <div className="font-mono text-[9px] tracking-[0.24em] text-gold-dark mt-1.5">{TAX_SITE.nameEn}</div>
              </div>
            </div>
            <p className="jp text-navy-100/60 text-[13px] mt-6 max-w-[36ch]">
              不動産オーナー専門。申告・節税から法人化まで、クラウド完結・全国対応でワンストップ。
            </p>
            <div className="mt-7 space-y-2.5 font-mono text-[12.5px] text-navy-100/70 tnum">
              <div className="flex items-start gap-2.5">
                <Icon name="pin" className="w-4 h-4 text-gold-dark mt-0.5 shrink-0" />
                {TAX_SITE.address}
              </div>
              <div className="flex items-center gap-2.5">
                <Icon name="phone" className="w-4 h-4 text-gold-dark shrink-0" />
                {TAX_SITE.tel}（{TAX_SITE.hours}）
              </div>
              <div className="flex items-center gap-2.5">
                <Icon name="mail" className="w-4 h-4 text-gold-dark shrink-0" />
                {TAX_SITE.email}
              </div>
            </div>
          </div>
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {TAX_FOOTER_COLS.map((c) => (
              <div key={c.h}>
                <div className="font-mono text-[10px] tracking-eyebrow uppercase text-gold-dark border-b border-white/10 pb-3">
                  {c.h}
                </div>
                <ul className="mt-4 space-y-3">
                  {c.items.map((it) => (
                    <li key={it}>
                      <a href="#" className="font-zen text-[13.5px] text-navy-100/75 hover:text-white transition-colors">
                        {it}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-[11px] text-navy-100/50">
            © 2026 みらい税理士事務所 ／ Mirai Tax Office. Designed by zuk-zuk.
          </div>
          <div className="flex items-center gap-6 font-mono text-[11px] text-navy-100/50">
            <a href="/tax/legal/privacy" className="hover:text-white transition-colors">
              プライバシーポリシー
            </a>
            <a href="/tax/legal/tokushoho" className="hover:text-white transition-colors">
              特定商取引法
            </a>
            <a href="#top" className="flex items-center gap-1.5 hover:text-white transition-colors">
              PAGE TOP <Icon name="chevron" className="w-3.5 h-3.5 rotate-180" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
