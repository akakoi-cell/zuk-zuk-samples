import { createClient } from "next-sanity";

// Project ID が env にある時だけ Sanity が「有効」。
// 無い間は hasSanity=false として、各 fetch ヘルパーがハードコードデータに
// フォールバックする (夜間自走時は env 未設定が前提)。
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";

export const hasSanity = Boolean(projectId);

// projectId 未設定でも createClient が throw しないよう placeholder を渡す。
// hasSanity=false の間は実際の fetch を行わないので接続には使われない。
export const sanityClient = createClient({
  projectId: projectId ?? "placeholder",
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
});
