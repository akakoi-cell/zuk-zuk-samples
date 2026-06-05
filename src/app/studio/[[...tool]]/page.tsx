import { Studio } from "./Studio";

// Server Component のまま metadata/viewport を export し、
// Studio 本体 (client) は別ファイルに分離する (Next.js 16 では
// "use client" ファイルから metadata を export できないため)。
export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <Studio />;
}
