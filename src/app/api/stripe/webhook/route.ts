import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

// Stripe Webhook。checkout.session.completed を受けて Slack に通知する。
// 署名検証のため raw body (req.text) を使う。
export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return NextResponse.json({ error: "stripe not configured" }, { status: 503 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "missing signature" }, { status: 400 });
  }

  const raw = await req.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as { amount_total?: number | null; customer_details?: { email?: string | null } | null };
    const webhook = process.env.SLACK_WEBHOOK_URL;
    if (webhook) {
      const yen = session.amount_total != null ? `¥${session.amount_total.toLocaleString("ja-JP")}` : "-";
      const text = [
        "💳 *みらい税理士事務所* スポット相談の決済が完了しました",
        `• 金額: ${yen}`,
        `• メール: ${session.customer_details?.email ?? "-"}`,
      ].join("\n");
      // 通知失敗しても Webhook は 200 を返す (Stripe の再送を避ける)
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      }).catch(() => {});
    }
  }

  return NextResponse.json({ received: true });
}
