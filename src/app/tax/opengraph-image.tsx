import { ImageResponse } from "next/og";

export const alt = "みらい税理士事務所｜不動産オーナー専門の税理士";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// @vercel/og の標準フォントは CJK を含まないため、OG 画像は欧文中心の
// エディトリアル構成にする (navy 地 + gold アクセント)。
export default function Image() {
  const navy = "#1A2B4A";
  const gold = "#C9A961";
  const goldLight = "#D9C390";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: navy,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* gold hairline frame */}
        <div
          style={{
            position: "absolute",
            inset: 28,
            border: `1px solid ${gold}`,
            opacity: 0.4,
          }}
        />
        {/* top: eyebrow + seal */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 8,
              color: goldLight,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            Real Estate × Tax Strategy
          </div>
          <div
            style={{
              width: 72,
              height: 72,
              border: `2px solid ${gold}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: gold,
              fontSize: 30,
              letterSpacing: 2,
            }}
          >
            MT
          </div>
        </div>

        {/* center: title */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, color: "#fff", fontWeight: 600, lineHeight: 1.1, display: "flex" }}>
            MIRAI TAX OFFICE
          </div>
          <div style={{ fontSize: 34, color: goldLight, marginTop: 24, display: "flex" }}>
            Maximise the take-home of your property income.
          </div>
        </div>

        {/* bottom: stats */}
        <div style={{ display: "flex", gap: 56, color: "#fff" }}>
          {[
            ["80", "Clients"],
            ["75%", "Property owners"],
            ["30+", "Incorporations"],
          ].map(([v, l]) => (
            <div key={l} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 48, fontWeight: 600, display: "flex" }}>{v}</div>
              <div style={{ fontSize: 20, color: goldLight, letterSpacing: 4, marginTop: 6, display: "flex" }}>
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
