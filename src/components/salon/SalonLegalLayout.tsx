import type { ReactNode } from "react";
import { Brand } from "./ui";
import { SalonFooter } from "./SalonFooter";

// 法務ページ共通レイアウト。スリムなヘッダー (ロゴ→/salon) + 本文 + 共通フッター。
// /salon/legal/* は salon/layout.tsx 配下なので既に .salon-root スコープ内。
export function SalonLegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <header className="hdr hdr--solid" style={{ position: "sticky" }}>
        <Brand href="/salon" />
        <a href="/salon" className="tlink" style={{ fontSize: 11 }}>
          <span className="ar" style={{ transform: "rotate(180deg)" }}></span>トップへ戻る
        </a>
      </header>

      <main>
        <div className="wrap" style={{ maxWidth: 820, paddingTop: "clamp(120px,16vw,180px)", paddingBottom: "clamp(64px,9vw,120px)" }}>
          <div className="eyebrow">
            <span className="num">§</span>Legal
          </div>
          <h1 className="s-head" style={{ fontSize: "clamp(26px,3.4vw,38px)", marginTop: 14 }}>
            {title}
          </h1>
          {/* サンプル注記 */}
          <p
            style={{
              marginTop: 24,
              fontSize: 13,
              lineHeight: 1.9,
              color: "rgba(42,37,32,.6)",
              borderLeft: "2px solid var(--sub)",
              paddingLeft: 14,
            }}
          >
            ※ このサイトは zuk-zuk AI STUDIO のサンプルです。「&amp; moi」は架空のデモサロンであり、本ページの内容は表示見本です。
          </p>
          <div className="salon-legal" style={{ marginTop: 40 }}>
            {children}
          </div>
          <p
            style={{
              marginTop: 56,
              paddingTop: 24,
              borderTop: "1px solid var(--line)",
              fontFamily: "var(--mono)",
              fontSize: 12,
              color: "var(--muted)",
            }}
          >
            最終改訂日: {updated}
          </p>
        </div>
      </main>

      <SalonFooter />
    </>
  );
}
