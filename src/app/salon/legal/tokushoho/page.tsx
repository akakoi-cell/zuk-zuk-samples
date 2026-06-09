import type { Metadata } from "next";
import { SalonLegalLayout } from "@/components/salon/SalonLegalLayout";
import { SITE_SALON } from "@/lib/salon-content";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  description: `${SITE_SALON.name}の特定商取引法に基づく表記です。（サンプル表示）`,
  alternates: { canonical: "/salon/legal/tokushoho" },
  robots: { index: true, follow: true },
};

export default function TokushohoPage() {
  return (
    <SalonLegalLayout title="特定商取引法に基づく表記" updated="2026 年 6 月 10 日">
      <p>
        本表記は、特定商取引法に基づき、{SITE_SALON.name}がオンラインで提供する有料サービス（事前決済による予約等）について記載するものです。
      </p>

      <dl>
        <dt>販売事業者</dt>
        <dd>{SITE_SALON.name}（アンドモイ）</dd>

        <dt>運営責任者</dt>
        <dd>葵（オーナースタイリスト）</dd>

        <dt>所在地</dt>
        <dd>〒211-0063 神奈川県川崎市中原区小杉町 0-00-0 コーポ小杉 1F</dd>

        <dt>電話番号</dt>
        <dd>
          044-000-0000（受付時間 10:00–19:00）
          <br />
          ※ お問い合わせは予約フォーム・LINE を優先でお願いいたします。
        </dd>

        <dt>販売価格</dt>
        <dd>
          各メニューページに税込価格を表示します。
          <br />
          カット ¥6,000〜／カラー ¥7,500〜／ヘッドスパ ¥3,000〜
        </dd>

        <dt>商品代金以外の必要料金</dt>
        <dd>ロング料金（鎖骨より下）+¥1,100。銀行振込の場合の振込手数料はお客様のご負担となります。</dd>

        <dt>支払方法</dt>
        <dd>店頭でのクレジットカード決済・QR コード決済・交通系電子マネー・現金、またはオンライン事前決済（Stripe）</dd>

        <dt>サービスの提供時期</dt>
        <dd>ご予約日時に来店いただき、施術を提供します。</dd>

        <dt>キャンセル・返金</dt>
        <dd>
          役務の性質上、施術後の返金はいたしかねます。オンライン事前決済の場合、前日までのご連絡で全額返金いたします。
          詳細は<a href="/salon/legal/terms">利用規約</a>第 2 条に定めるとおりです。
        </dd>
      </dl>

      <p>※ 本表記はサンプル表示です。「{SITE_SALON.name}」は架空のデモサロンです。</p>
    </SalonLegalLayout>
  );
}
