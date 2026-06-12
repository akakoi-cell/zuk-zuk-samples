import { ImageResponse } from "next/og";

export const alt = "Hello Tree ── 北浦和こども英会話教室";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// === OG 画像の正方形セーフエリア方針 ===
// 1200x630 のうち中央 630x630 に主要コンテンツを集約 (LINE/Slack/Discord の 1:1
// クロップ対応)。@vercel/og 標準フォントは CJK 非対応のため欧文中心の構成にする。
export default function Image() {
  const bg = "#e8ede3"; // ミドリ_pl (Hero と同じ淡緑)
  const green = "#279f77";
  const yellow = "#f3d55e";
  const coral = "#e66e61";
  const blue = "#329ac4";
  const text = "#083136"; // アオ_dp
  const SAFE = 630;

  // 木の葉を思わせるカラードット
  const dots = [
    { c: green, s: 26, x: 0, y: 8 },
    { c: yellow, s: 20, x: 30, y: 0 },
    { c: coral, s: 16, x: 58, y: 10 },
    { c: blue, s: 14, x: 16, y: 30 },
    { c: green, s: 18, x: 44, y: 28 },
  ];

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
          fontFamily: "sans-serif",
        }}
      >
        {/* 下部の緑の丘 */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 120,
            background: green,
            borderTopLeftRadius: "60% 80%",
            borderTopRightRadius: "60% 80%",
          }}
        />

        {/* 中央 630x630 正方形セーフエリア */}
        <div
          style={{
            width: SAFE,
            height: SAFE,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 56,
            position: "relative",
            textAlign: "center",
          }}
        >
          {/* 葉ドット */}
          <div style={{ display: "flex", position: "relative", width: 88, height: 60, marginBottom: 18 }}>
            {dots.map((d, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: d.x,
                  top: d.y,
                  width: d.s,
                  height: d.s,
                  borderRadius: "50%",
                  background: d.c,
                  display: "flex",
                }}
              />
            ))}
          </div>

          {/* Nice Try! ステッカー */}
          <div
            style={{
              display: "flex",
              background: "#fff",
              padding: "10px 30px 18px",
              borderRadius: 6,
              transform: "rotate(-2.4deg)",
              boxShadow: "0 8px 24px rgba(8,49,54,0.10)",
            }}
          >
            <span style={{ fontSize: 96, fontWeight: 800, color: yellow, lineHeight: 1, display: "flex" }}>
              Nice Try!
            </span>
          </div>

          {/* Hello Tree */}
          <div style={{ display: "flex", marginTop: 36, alignItems: "baseline", color: text }}>
            <span style={{ fontSize: 78, fontWeight: 800, color: green, lineHeight: 1, display: "flex" }}>Hello</span>
            <span style={{ fontSize: 78, fontWeight: 800, marginLeft: 14, lineHeight: 1, display: "flex" }}>Tree</span>
          </div>

          {/* sub */}
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              color: blue,
              marginTop: 24,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            English School for Kids ・ Kita-Urawa
          </div>
        </div>
      </div>
    ),
    size,
  );
}
