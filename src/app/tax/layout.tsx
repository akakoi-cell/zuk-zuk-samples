import {
  Shippori_Mincho_B1,
  Zen_Kaku_Gothic_New,
  DM_Sans,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";

// 5 書体を next/font でセルフホスト。globals.css の @theme inline が
// 各 CSS 変数 (--font-shippori 等) を Tailwind の font ユーティリティに橋渡しする。
const shippori = Shippori_Mincho_B1({
  variable: "--font-shippori",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});
const zenKaku = Zen_Kaku_Gothic_New({
  variable: "--font-zenkaku",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});
const dmSans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
  display: "swap",
});
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const fontVars = [
  shippori.variable,
  zenKaku.variable,
  dmSans.variable,
  instrument.variable,
  jetbrains.variable,
].join(" ");

export default function TaxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${fontVars} tax-root font-dm`}>{children}</div>
  );
}
