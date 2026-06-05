import type { Metadata } from "next";
import {
  Shippori_Mincho_B1,
  Zen_Kaku_Gothic_New,
  DM_Sans,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import { TAX_SITE } from "@/lib/tax-content";

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

export const metadata: Metadata = {
  metadataBase: new URL(TAX_SITE.url),
  title: {
    default: `${TAX_SITE.name}｜不動産オーナー専門の税理士`,
    template: `%s｜${TAX_SITE.name}`,
  },
  description: TAX_SITE.description,
  applicationName: TAX_SITE.name,
  keywords: [
    "不動産 税理士",
    "不動産オーナー 税理士",
    "賃貸経営 確定申告",
    "資産管理会社 法人化",
    "相続税対策",
    "港区 税理士",
    "クラウド会計 freee マネーフォワード",
  ],
  authors: [{ name: TAX_SITE.name }],
  creator: TAX_SITE.name,
  publisher: TAX_SITE.name,
  category: "Business",
  alternates: { canonical: "/tax" },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: TAX_SITE.url,
    siteName: TAX_SITE.name,
    title: `${TAX_SITE.name}｜不動産オーナー専門の税理士`,
    description: TAX_SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${TAX_SITE.name}｜不動産オーナー専門の税理士`,
    description: TAX_SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// 構造化データ: AccountingService (設計書 セクション 10)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  "@id": `${TAX_SITE.url}/#service`,
  name: TAX_SITE.name,
  url: `${TAX_SITE.url}/`,
  image: `${TAX_SITE.url}/opengraph-image`,
  description: TAX_SITE.description,
  areaServed: { "@type": "Country", name: "Japan" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "東京都港区",
    addressCountry: "JP",
  },
  priceRange: "¥¥",
  telephone: "+81-3-1234-5678",
  email: TAX_SITE.email,
  knowsAbout: ["不動産税務", "法人化サポート", "相続税対策", "賃貸経営", "確定申告"],
};

export default function TaxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${fontVars} tax-root font-dm`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  );
}
