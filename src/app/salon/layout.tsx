import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  DM_Sans,
  DM_Mono,
  Zen_Kaku_Gothic_New,
} from "next/font/google";
import { SITE_SALON } from "@/lib/salon-content";
import "./salon.css";

// 美容室サンプルの 4 書体を next/font でセルフホスト。
// salon.css の .salon-root が各 CSS 変数 (--font-cormorant 等) を
// --en / --jp / --serif / --mono に橋渡しする。
const dmSans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
  display: "swap",
});
const zenKaku = Zen_Kaku_Gothic_New({
  variable: "--font-zenkaku",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});
const dmMono = DM_Mono({
  variable: "--font-dmmono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const fontVars = [
  dmSans.variable,
  zenKaku.variable,
  cormorant.variable,
  dmMono.variable,
].join(" ");

const title = `${SITE_SALON.name} ── 美容室 ${SITE_SALON.reading}｜武蔵小杉の隠れ家サロン`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_SALON.url),
  title: {
    default: title,
    template: `%s｜${SITE_SALON.name}`,
  },
  description: SITE_SALON.description,
  applicationName: SITE_SALON.name,
  keywords: [
    "美容室 武蔵小杉",
    "美容院 中原区",
    "隠れ家サロン",
    "完全予約制 美容室",
    "ヘッドスパ 武蔵小杉",
    "白髪ぼかし",
    "髪質改善トリートメント",
  ],
  authors: [{ name: SITE_SALON.name }],
  creator: SITE_SALON.name,
  publisher: SITE_SALON.name,
  category: "Beauty",
  alternates: { canonical: "/salon" },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: SITE_SALON.url,
    siteName: SITE_SALON.name,
    title,
    description: SITE_SALON.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE_SALON.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// 構造化データ: HairSalon (LocalBusiness 派生) — 設計書 Section 6 / Phase D-3
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "@id": `${SITE_SALON.url}/#salon`,
  name: SITE_SALON.name,
  url: `${SITE_SALON.url}/`,
  image: `${SITE_SALON.url}/opengraph-image`,
  description: SITE_SALON.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: "小杉町 0-00-0 コーポ小杉 1F",
    addressLocality: "中原区",
    addressRegion: "神奈川県川崎市",
    postalCode: "211-0063",
    addressCountry: "JP",
  },
  telephone: `+81-44-000-0000`,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "10:00",
      closes: "19:00",
    },
  ],
  priceRange: "¥¥",
  areaServed: { "@type": "City", name: "川崎市中原区" },
  knowsAbout: ["カット", "カラー", "髪質改善トリートメント", "ヘッドスパ", "白髪ぼかし"],
} as const;

export default function SalonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${fontVars} salon-root`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  );
}
