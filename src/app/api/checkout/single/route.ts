import { NextResponse } from "next/server";
import { getStripe, SPOT_CONSULT } from "@/lib/stripe";

export const runtime = "nodejs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://samples.zuk-zuk.com";

// 単発決済 (Checkout Session) を作成して URL を返す。
// 設計書 6-4「2 回目以降のスポット相談 ¥5,000」の Stripe ショーケース。
export async function POST() {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "決済は準備中です（Stripe 未設定）。" },
      { status: 503 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: SPOT_CONSULT.currency,
            unit_amount: SPOT_CONSULT.amount,
            product_data: {
              name: SPOT_CONSULT.name,
              description: SPOT_CONSULT.description,
            },
          },
        },
      ],
      success_url: `${SITE_URL}/tax/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/tax#service`,
      locale: "ja",
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "決済セッションの作成に失敗しました。";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
