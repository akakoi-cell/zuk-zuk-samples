import { ImageResponse } from "next/og";

export const alt = "みらい税理士事務所｜不動産オーナー専門の税理士";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// === OG 画像の正方形セーフエリア方針 ===
// 1200x630 のうち、 中央 630x630 (正方形セーフエリア) に主要コンテンツを集約。
// 理由: LINE / Slack / Discord 等の SNS では OG 画像が 1:1 正方形でクロップされるため、
// 横長配置だと左右が切れる。 中央正方形に収めれば全プラットフォームで欠けずに見える。
//
// @vercel/og の標準フォントは CJK を含まないため、 OG 画像は欧文中心のエディトリアル構成。
export default function Image() {
  const navy = "#1A2B4A";
  const gold = "#C9A961";
  const goldLight = "#D9C390";
  const SAFE = 630; // 中央正方形セーフエリア

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: navy,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          fontFamily: "serif",
        }}
      >
        {/* gold hairline frame (全幅、 装飾) */}
        <div
          style={{
            position: "absolute",
            inset: 28,
            border: `1px solid ${gold}`,
            opacity: 0.4,
          }}
        />

        {/* 左右の装飾線 (横長表示時の余白を埋める) */}
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 80,
            bottom: 80,
            width: 1,
            background: gold,
            opacity: 0.2,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 80,
            top: 80,
            bottom: 80,
            width: 1,
            background: gold,
            opacity: 0.2,
          }}
        />

        {/* 中央 630x630 正方形セーフエリア */}
        <div
          style={{
            width: SAFE,
            height: SAFE,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 60,
            position: "relative",
          }}
        >
          {/* top: eyebrow + seal */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div
              style={{
                fontSize: 18,
                letterSpacing: 6,
                color: goldLight,
                textTransform: "uppercase",
                display: "flex",
              }}
            >
              Real Estate × Tax
            </div>
            <div
              style={{
                width: 64,
                height: 64,
                border: `2px solid ${gold}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: gold,
                fontSize: 26,
                letterSpacing: 2,
              }}
            >
              MT
            </div>
          </div>

          {/* center: title */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 68,
                color: "#fff",
                fontWeight: 600,
                lineHeight: 1.05,
                display: "flex",
              }}
            >
              MIRAI TAX
            </div>
            <div
              style={{
                fontSize: 68,
                color: "#fff",
                fontWeight: 600,
                lineHeight: 1.05,
                display: "flex",
              }}
            >
              OFFICE
            </div>
            <div
              style={{
                fontSize: 22,
                color: goldLight,
                marginTop: 20,
                display: "flex",
                lineHeight: 1.4,
              }}
            >
              Maximise the take-home of
            </div>
            <div
              style={{
                fontSize: 22,
                color: goldLight,
                display: "flex",
                lineHeight: 1.4,
              }}
            >
              your property income.
            </div>
          </div>

          {/* bottom: stats */}
          <div style={{ display: "flex", gap: 36, color: "#fff" }}>
            {[
              ["80", "Clients"],
              ["75%", "Owners"],
              ["30+", "Incorp."],
            ].map(([v, l]) => (
              <div key={l} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 40, fontWeight: 600, display: "flex" }}>{v}</div>
                <div
                  style={{
                    fontSize: 16,
                    color: goldLight,
                    letterSpacing: 3,
                    marginTop: 4,
                    display: "flex",
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
