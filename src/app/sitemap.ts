import type { MetadataRoute } from "next";
import { TAX_SITE } from "@/lib/tax-content";
import { SITE_SALON } from "@/lib/salon-content";

// サンプル #67 (税理士) + #68 (美容室 & moi)。将来サンプルが増えたら追記する。
export default function sitemap(): MetadataRoute.Sitemap {
  const tax = TAX_SITE.url; // .../tax
  const salon = SITE_SALON.url; // .../salon
  const now = new Date();
  return [
    // 税理士サンプル
    { url: tax, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${tax}/legal/terms`, lastModified: now, priority: 0.3 },
    { url: `${tax}/legal/privacy`, lastModified: now, priority: 0.3 },
    { url: `${tax}/legal/tokushoho`, lastModified: now, priority: 0.3 },
    // 美容室サンプル
    { url: salon, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${salon}/legal/privacy`, lastModified: now, priority: 0.3 },
    { url: `${salon}/legal/terms`, lastModified: now, priority: 0.3 },
    { url: `${salon}/legal/tokushoho`, lastModified: now, priority: 0.3 },
  ];
}
