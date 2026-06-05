import Stripe from "stripe";

// STRIPE_SECRET_KEY がある時だけ Stripe クライアントを生成する。
// 未設定時は null を返し、API ルート側で 503「準備中」を返す。
let cached: Stripe | null = null;

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!cached) cached = new Stripe(key);
  return cached;
}

export const hasStripe = Boolean(process.env.STRIPE_SECRET_KEY);

// 初回相談は無料、2 回目以降の 30 分スポット相談（設計書 6-4）
export const SPOT_CONSULT = {
  name: "スポット相談（30 分）",
  description: "2 回目以降のオンライン個別相談 30 分。初回 30 分は無料です。",
  amount: 5000, // JPY
  currency: "jpy",
} as const;
