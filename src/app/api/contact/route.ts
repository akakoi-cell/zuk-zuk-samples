import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Contact フォーム送信成功時に、クライアントから fire-and-forget で呼ばれる。
// Web3Forms とは別経路で Slack に内部通知する (Web3Forms はサーバ POST を 403 にするため、
// メール送信はクライアント直 POST、Slack 通知はこのサーバルートで担当)。
export async function POST(req: Request) {
  const webhook = process.env.SLACK_WEBHOOK_URL;

  let body: { kind?: string; name?: string; email?: string; message?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid body" }, { status: 400 });
  }

  // Slack 未設定なら静かに ok (フォーム送信自体は Web3Forms 側で完了している)
  if (!webhook) {
    return NextResponse.json({ ok: true, slack: false });
  }

  const { kind, name, email, message } = body;
  const text = [
    "📩 *みらい税理士事務所サイト* に新規お問い合わせ",
    `• 種別: ${kind ?? "-"}`,
    `• お名前: ${name ?? "-"}`,
    `• メール: ${email ?? "-"}`,
    `• 内容: ${(message ?? "-").toString().slice(0, 500)}`,
  ].join("\n");

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    return NextResponse.json({ ok: res.ok, slack: res.ok });
  } catch {
    // 通知失敗はフォーム送信成功を覆さない
    return NextResponse.json({ ok: true, slack: false });
  }
}
