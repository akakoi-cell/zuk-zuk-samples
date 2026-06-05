import type { Metadata } from "next";
import { TaxLegalLayout } from "@/components/tax/TaxLegalLayout";
import { TAX_SITE } from "@/lib/tax-content";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  description: `${TAX_SITE.name}の特定商取引法に基づく表記です。`,
  alternates: { canonical: "/tax/legal/tokushoho" },
  robots: { index: true, follow: true },
};

export default function TokushohoPage() {
  return (
    <TaxLegalLayout title="特定商取引法に基づく表記" updated="2026 年 6 月 5 日">
      <p>
        本表記は、特定商取引法に基づき、{TAX_SITE.name}がオンラインで提供する有料サービス（スポット相談・法人化サポート等）について
        記載するものです。
      </p>

      <dl>
        <dt>販売事業者</dt>
        <dd>{TAX_SITE.name}</dd>

        <dt>運営責任者</dt>
        <dd>未来 太郎（代表税理士）</dd>

        <dt>所在地</dt>
        <dd>{TAX_SITE.address}</dd>

        <dt>電話番号</dt>
        <dd>
          {TAX_SITE.tel}（受付時間 {TAX_SITE.hours}）
          <br />
          ※ お問い合わせは原則メールにて承ります。
        </dd>

        <dt>メールアドレス</dt>
        <dd>{TAX_SITE.email}</dd>

        <dt>販売価格</dt>
        <dd>
          各サービスページに税込価格を表示します。
          <br />
          スポット相談：初回 30 分無料、2 回目以降 5,000 円／30 分（税込）
          <br />
          顧問契約：月額 33,000 円（税込）〜　法人化サポート：220,000 円（税込）〜
        </dd>

        <dt>商品代金以外の必要料金</dt>
        <dd>銀行振込の場合の振込手数料はお客様のご負担となります。</dd>

        <dt>支払方法</dt>
        <dd>クレジットカード決済（Stripe）または銀行振込</dd>

        <dt>支払時期</dt>
        <dd>
          スポット相談：お申込み時にクレジットカード決済
          <br />
          顧問契約：毎月当事務所が指定する日に当月分をお支払い
        </dd>

        <dt>サービスの提供時期</dt>
        <dd>
          オンライン面談は、お申込み後にお客様とご相談のうえ日程を確定し、最短で翌営業日に提供します。
          顧問契約は契約成立日より開始します。
        </dd>

        <dt>キャンセル・返金</dt>
        <dd>
          役務の性質上、提供開始後の返金はいたしかねます。スポット相談は面談実施前であれば、前営業日までのご連絡で全額返金いたします。
        </dd>

        <dt>最低利用期間・中途解約</dt>
        <dd>
          顧問契約の最低契約期間は 12 ヶ月です。中途解約の場合の条件は
          <a href="/tax/legal/terms">利用規約</a>
          第 8 条に定めるとおりです。
        </dd>
      </dl>

      <p>
        本表記に関するお問い合わせは、上記メールアドレスまでご連絡ください。
      </p>
    </TaxLegalLayout>
  );
}
