"use client";

import { Icon } from "./ui";

// === サンプル誘導モード ===
// このサイトはサンプルのため、 Stripe Checkout は無効化。
// 実際の相談予約は zuk-zuk AI STUDIO へ誘導する。
const AI_STUDIO_URL = "https://ai-studio.zuk-zuk.com";

export function StripeSpotButton() {
  return (
    <div className="mt-4">
      <button
        type="button"
        disabled
        aria-disabled
        className="inline-flex items-center gap-2 font-dm text-[13px] tracking-wide text-gold-dark border border-gold/30 px-5 py-2.5 opacity-60 cursor-not-allowed"
      >
        2 回目以降の 30 分相談（¥5,000）を予約・決済する
        <Icon name="arrowUR" className="w-4 h-4" />
      </button>
      <p className="text-[11px] text-ink-400 mt-2">
        ※ <strong>サンプル表示のため決済機能は無効</strong>です。 実際のご相談は
        <a
          href={`${AI_STUDIO_URL}#contact`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold underline underline-offset-2 hover:text-gold-dark mx-1"
        >
          zuk-zuk AI STUDIO
        </a>
        までどうぞ。
      </p>
    </div>
  );
}
