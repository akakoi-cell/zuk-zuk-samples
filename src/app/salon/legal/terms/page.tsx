import type { Metadata } from "next";
import { SalonLegalLayout } from "@/components/salon/SalonLegalLayout";
import { SITE_SALON } from "@/lib/salon-content";

export const metadata: Metadata = {
  title: "利用規約",
  description: `${SITE_SALON.name}のご予約・ご利用に関する利用規約です。（サンプル表示）`,
  alternates: { canonical: "/salon/legal/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <SalonLegalLayout title="利用規約" updated="2026 年 6 月 10 日">
      <p>
        本規約は、{SITE_SALON.name}（以下「当サロン」といいます）が提供する予約・施術サービスのご利用条件を定めるものです。
        ご予約・ご来店をもって、本規約に同意いただいたものとみなします。
      </p>

      <h2>第 1 条（予約）</h2>
      <p>
        ご予約は、予約フォーム・お電話・LINE 等により承ります。当サロンは少人数で営業しているため、ご予約優先での対応とさせていただきます。
      </p>

      <h2>第 2 条（キャンセル・変更）</h2>
      <p>
        ご予約のキャンセル・日時変更は、前日までにご連絡いただいた場合は無料で承ります。当日のキャンセルや無断キャンセルが続いた場合、
        次回以降のご予約をお断りすることがあります。
      </p>

      <h2>第 3 条（施術）</h2>
      <p>
        施術内容は、カウンセリングのうえお客様のご希望と髪質・骨格等を踏まえてご提案します。
        体調や頭皮の状態によっては、施術をお控えいただく場合があります。
      </p>

      <h2>第 4 条（料金・お支払い）</h2>
      <p>
        料金は当サイトのメニューに表示する税込価格を基準とし、髪の長さや状態により変動する場合があります。
        お支払いは現金・各種クレジットカード・QR コード決済・交通系電子マネーをご利用いただけます。
      </p>

      <h2>第 5 条（免責）</h2>
      <p>
        当サロンは、お客様の自己申告に基づかない既往症・アレルギー等に起因する損害について、責任を負いかねます。
        施術後のスタイルの再現性は、ご家庭でのケアやお客様の髪質により異なる場合があります。
      </p>

      <h2>第 6 条（規約の変更）</h2>
      <p>当サロンは、必要に応じて本規約を変更することがあります。変更後の規約は本ページに掲載した時点から効力を生じます。</p>

      <p>※ 本規約はサンプル表示です。「{SITE_SALON.name}」は架空のデモサロンです。</p>
    </SalonLegalLayout>
  );
}
