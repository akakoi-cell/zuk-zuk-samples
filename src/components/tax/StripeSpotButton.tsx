"use client";

import { useState } from "react";
import { Icon } from "./ui";

// スポット相談 (¥5,000) の単発決済ボタン。Checkout Session を作って Stripe へ遷移。
// Stripe 未設定時は API が 503 を返すので「準備中」を表示する。
export function StripeSpotButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout/single", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setError(data.error || "決済を開始できませんでした。");
    } catch {
      setError("ネットワークエラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="inline-flex items-center gap-2 font-dm text-[13px] tracking-wide text-gold-dark border border-gold/50 px-5 py-2.5 hover:bg-gold-tint transition-colors disabled:opacity-60"
      >
        {loading ? "決済画面へ移動中…" : "2 回目以降の 30 分相談（¥5,000）を予約・決済する"}
        <Icon name="arrowUR" className="w-4 h-4" />
      </button>
      <p className="text-[11px] text-ink-400 mt-2">初回 30 分相談は無料です。決済は Stripe（クレジットカード）。</p>
      {error && <p className="text-[12px] text-red-500 mt-2">{error}</p>}
    </div>
  );
}
