import { ImageResponse } from "next/og";

export const alt = "& moi ── 武蔵小杉の隠れ家サロン";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// === OG 画像の正方形セーフエリア方針 ===
// 1200x630 のうち中央 630x630 (正方形セーフエリア) に主要コンテンツを集約。
// LINE / Slack / Discord 等は OG 画像を 1:1 でクロップするため、横長配置だと
// 左右が切れる。中央正方形に収めれば全プラットフォームで欠けずに見える。
// @vercel/og 標準フォントは CJK 非対応のため欧文中心のエディトリアル構成。
export default function Image() {
  const bg = "#FAFAF8"; // Main BG
  const accent = "#5A4E3F"; // 焦茶
  const sub = "#7D8A6E"; // くすんだ緑
  const text = "#2A2520";
  const line = "rgba(42,37,32,0.18)";
  const SAFE = 630;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: bg,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          fontFamily: "serif",
        }}
      >
        {/* 細い枠 (全幅、装飾) */}
        <div style={{ position: "absolute", inset: 26, border: `1px solid ${line}` }} />
        {/* 左右の装飾縦線 (横長余白を埋める) */}
        <div style={{ position: "absolute", left: 88, top: 88, bottom: 88, width: 1, background: line }} />
        <div style={{ position: "absolute", right: 88, top: 88, bottom: 88, width: 1, background: line }} />

        {/* 中央 630x630 正方形セーフエリア */}
        <div
          style={{
            width: SAFE,
            height: SAFE,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 64,
            position: "relative",
            textAlign: "center",
          }}
        >
          {/* top: location eyebrow */}
          <div
            style={{
              fontSize: 19,
              letterSpacing: 8,
              color: sub,
              textTransform: "uppercase",
              fontFamily: "sans-serif",
              display: "flex",
            }}
          >
            Hair Salon ・ Musashi-Kosugi
          </div>

          {/* center: & moi ロゴ */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "baseline", color: text }}>
              <span style={{ fontSize: 150, fontStyle: "italic", color: accent, lineHeight: 1 }}>&amp;</span>
              <span style={{ fontSize: 132, fontWeight: 500, marginLeft: 8, lineHeight: 1, fontFamily: "sans-serif" }}>
                moi
              </span>
            </div>
            <div
              style={{
                fontSize: 22,
                color: accent,
                marginTop: 26,
                letterSpacing: 3,
                fontStyle: "italic",
                display: "flex",
              }}
            >
              and moi ── time for me, and my hair.
            </div>
          </div>

          {/* bottom: facts */}
          <div
            style={{
              display: "flex",
              gap: 28,
              alignItems: "center",
              fontFamily: "sans-serif",
              fontSize: 17,
              letterSpacing: 2,
              color: text,
            }}
          >
            <span style={{ display: "flex" }}>Cut from ¥6,000</span>
            <span style={{ display: "flex", color: sub }}>/</span>
            <span style={{ display: "flex" }}>Open since 2018</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
