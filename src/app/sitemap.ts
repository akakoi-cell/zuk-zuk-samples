import type { MetadataRoute } from "next";
import { TAX_SITE } from "@/lib/tax-content";

// 現状はサンプル #67 (税理士サイト) のみ。将来サンプルが増えたら追記する。
export default function sitemap(): MetadataRoute.Sitemap {
  const tax = TAX_SITE.url; // .../tax
  return [
    { url: tax, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${tax}/legal/terms`, lastModified: new Date(), priority: 0.3 },
    { url: `${tax}/legal/privacy`, lastModified: new Date(), priority: 0.3 },
    { url: `${tax}/legal/tokushoho`, lastModified: new Date(), priority: 0.3 },
  ];
}
