import type { Metadata } from "next";
import { Icon } from "@/components/tax/ui";
import { TAX_SITE } from "@/lib/tax-content";

export const metadata: Metadata = {
  title: "ご決済ありがとうございました",
  description: "スポット相談のご決済が完了しました。",
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return (
    <main className="bg-paper min-h-[80vh] flex items-center">
      <div className="max-w-prose mx-auto px-6 md:px-10 py-24 text-center flex flex-col items-center">
        <span className="inline-flex items-center justify-center w-16 h-16 border border-gold/50 text-gold-dark mb-8">
          <Icon name="check" className="w-8 h-8" />
        </span>
        <p className="font-mono text-[11px] tracking-eyebrow uppercase text-gold-dark">Payment Completed</p>
        <h1 className="font-mincho font-medium text-navy text-[28px] md:text-[36px] mt-5">
          ご決済ありがとうございました
        </h1>
        <span className="block w-10 h-px bg-gold/70 mt-7"></span>
        <p className="jp text-ink-600 text-[15px] mt-8 max-w-[44ch]">
          スポット相談（30 分）のお申込みを受け付けました。担当税理士より、日程調整のご連絡を 2 営業日以内にメールでお送りします。
          ご不明点は {TAX_SITE.email} までお問い合わせください。
        </p>
        <a href="/tax" className="mt-10">
          <span className="btn btn-primary text-[13px] px-6 py-3.5">
            トップへ戻る
            <Icon name="arrow" className="w-4 h-4" />
          </span>
        </a>
      </div>
    </main>
  );
}
