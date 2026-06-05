import type { ReactNode } from "react";
import { Icon } from "./ui";
import { TaxFooter } from "./TaxFooter";
import { TAX_SITE } from "@/lib/tax-content";

// 法務ページ共通レイアウト。スリムなヘッダー (ロゴ→/tax) + 本文 + 共通フッター。
export function TaxLegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 z-50 bg-paper/95 border-b border-line">
        <div className="max-w-content mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
          <a href="/tax" className="flex items-center gap-3 group">
            <span className="relative inline-flex items-center justify-center w-9 h-9 border border-gold shrink-0">
              <span className="absolute inset-[3px] border border-gold/40"></span>
              <span className="font-mincho font-semibold text-gold leading-none text-[17px]">{TAX_SITE.mark}</span>
            </span>
            <span className="font-mincho font-semibold text-[17px] tracking-[0.06em] text-navy">{TAX_SITE.name}</span>
          </a>
          <a
            href="/tax"
            className="flex items-center gap-1.5 font-dm text-[13px] text-navy/70 hover:text-navy transition-colors"
          >
            <Icon name="arrow" className="w-4 h-4 rotate-180" />
            トップへ戻る
          </a>
        </div>
      </header>

      <main className="bg-paper">
        <div className="max-w-prose mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="font-mono text-[11px] tracking-eyebrow uppercase text-gold-dark">Legal</p>
          <h1 className="font-mincho font-medium text-navy text-[30px] md:text-[40px] mt-4">{title}</h1>
          <span className="block w-10 h-px bg-gold/70 mt-7"></span>
          <div className="tax-legal mt-12">{children}</div>
          <p className="mt-16 pt-6 border-t border-line font-mono text-[12px] text-ink-400">
            最終改訂日: {updated}
          </p>
        </div>
      </main>

      <TaxFooter />
    </>
  );
}
