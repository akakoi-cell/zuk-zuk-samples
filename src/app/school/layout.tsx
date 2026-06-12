import type { Metadata } from "next";
import { Yusei_Magic, Zen_Maru_Gothic } from "next/font/google";
import { SITE_SCHOOL } from "@/lib/school-content";
import "./styles.css";

// Hello Tree の 2 書体を next/font でセルフホスト。
// Figma は手書きフォント「SicHandic」を全面採用。Web では近い質感の
// Yusei Magic (マーカー手書き・和欧対応) を主役に、Zen Maru Gothic (丸ゴ) を
// 補助 (長文・フォールバック) に充てる。globals.css の @theme inline が
// --font-yusei / --font-zen-maru を --font-hand / --font-round に橋渡しする。
const yusei = Yusei_Magic({
  variable: "--font-yusei",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});
const zenMaru = Zen_Maru_Gothic({
  variable: "--font-zen-maru",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const fontVars = [yusei.variable, zenMaru.variable].join(" ");

const title = `${SITE_SCHOOL.name}（ハローツリー）｜${SITE_SCHOOL.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_SCHOOL.url),
  title: {
    default: title,
    template: `%s｜${SITE_SCHOOL.name}`,
  },
  description: SITE_SCHOOL.description,
  applicationName: SITE_SCHOOL.name,
  keywords: [
    "こども英会話 北浦和",
    "子供英語 さいたま市",
    "英会話教室 浦和区",
    "ネイティブ こども英会話",
    "幼児 英語 さいたま",
    "親子 英語レッスン",
  ],
  authors: [{ name: SITE_SCHOOL.name }],
  creator: SITE_SCHOOL.name,
  publisher: SITE_SCHOOL.name,
  category: "Education",
  alternates: { canonical: "/school" },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: SITE_SCHOOL.url,
    siteName: SITE_SCHOOL.name,
    title,
    description: SITE_SCHOOL.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE_SCHOOL.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// 構造化データ: EducationalOrganization (子供英会話教室)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE_SCHOOL.url}/#school`,
  name: SITE_SCHOOL.name,
  alternateName: SITE_SCHOOL.reading,
  url: `${SITE_SCHOOL.url}/`,
  image: `${SITE_SCHOOL.url}/opengraph-image`,
  description: SITE_SCHOOL.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: "北浦和 X-X-X 1F",
    addressLocality: "浦和区",
    addressRegion: "埼玉県さいたま市",
    postalCode: "330-0074",
    addressCountry: "JP",
  },
  telephone: "+81-48-123-4567",
  areaServed: { "@type": "City", name: "さいたま市" },
  knowsAbout: ["こども英会話", "フォニックス", "英検対策", "親子英語"],
} as const;

export default function SchoolLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${fontVars} school-root`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  );
}
