import { sanityClient, hasSanity } from "./client";
import { WORKS, COLUMNS } from "@/lib/tax-content";

// TaxWorks が期待する形
export type TaxWorkView = {
  tag: string;
  title: string;
  before: string;
  after: string;
  metric: string;
  unit: string;
  who: string;
};

// TaxColumn が期待する形
export type TaxColumnView = { date: string; cat: string; title: string };

const WORKS_QUERY = `*[_type == "taxWork"] | order(order asc, _createdAt desc)[0...6]{
  "tag": tag, title, before, after, metric, unit, who
}`;

const COLUMNS_QUERY = `*[_type == "taxColumn"] | order(publishedAt desc)[0...3]{
  "date": publishedAt, "cat": category, title
}`;

// publishedAt(ISO) → "2026.05.28" 表記へ
function toDotDate(iso: string): string {
  if (!iso) return "";
  const d = iso.slice(0, 10); // YYYY-MM-DD
  return d.replace(/-/g, ".");
}

/** 解決事例。Sanity 未設定 or 0 件ならハードコードデータを返す。 */
export async function getTaxWorks(): Promise<TaxWorkView[]> {
  if (!hasSanity) return WORKS;
  try {
    const rows = await sanityClient.fetch<TaxWorkView[]>(
      WORKS_QUERY,
      {},
      { next: { revalidate: 60, tags: ["taxWork"] } }
    );
    return rows && rows.length > 0 ? rows : WORKS;
  } catch {
    return WORKS;
  }
}

/** お役立ちコラム最新 3 件。Sanity 未設定 or 0 件ならハードコードデータを返す。 */
export async function getTaxColumns(): Promise<TaxColumnView[]> {
  if (!hasSanity) return COLUMNS;
  try {
    const rows = await sanityClient.fetch<{ date: string; cat: string; title: string }[]>(
      COLUMNS_QUERY,
      {},
      { next: { revalidate: 60, tags: ["taxColumn"] } }
    );
    if (!rows || rows.length === 0) return COLUMNS;
    return rows.map((r) => ({ ...r, date: toDotDate(r.date) }));
  } catch {
    return COLUMNS;
  }
}
