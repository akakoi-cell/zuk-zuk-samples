// ui.tsx — 美容室サンプル「& moi」の共有プリミティブ。
// フックを持たないため Server Component として描画可能。
import type { ReactNode } from "react";

// ---- Brand「& moi」ロックアップ (アンパサンドはセリフ斜体) ----
export function Brand({ className = "brand", href = "#hero" }: { className?: string; href?: string }) {
  return (
    <a href={href} className={className} aria-label="& moi">
      <span className="amp">&amp;</span>moi
    </a>
  );
}

// ---- Eyebrow (番号 + EN ラベル + 罫線) ----
export function Eyebrow({ num, children }: { num?: string; children: ReactNode }) {
  return (
    <div className="eyebrow">
      {num && <span className="num">{num}</span>}
      {children}
    </div>
  );
}

// ---- Ph — 画像プレースホルダ (storia: 画像未配置でも壊れない) ----
// setup-image-workflow: 画像が配置されたら src を渡すと <img> を敷いてラベルを隠す。
// 現状 hero.jpg 以外は未配置のため、 src を省略してラベル表示にしておく。
export function Ph({
  label,
  src,
  alt = "",
  dark = false,
  className = "",
}: {
  label: string;
  src?: string;
  alt?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`ph${dark ? " ph--dark" : ""} ${className}`.trim()} data-ph={label}>
      {src && <img src={src} alt={alt} loading="lazy" />}
    </div>
  );
}
