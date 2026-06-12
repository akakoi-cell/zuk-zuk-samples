// Hello Tree 共有プリミティブ (フックなし → Server Component)。
import type { ReactNode } from "react";

// セクション見出し (タイトル + サブコピー)
export function SecHead({ title, sub }: { title: ReactNode; sub?: string }) {
  return (
    <div className="sec-head rv">
      <h2>{title}</h2>
      {sub && <p className="sub">{sub}</p>}
    </div>
  );
}

// セクション下端の波 (次セクションの色で塗って繋ぐ)。
// 親 .sec は position:relative なので、 絶対配置で最下端にぴったり貼る
// (in-flow にすると下に padding 分の地色が残ってしまう)。
export function Wave({ fill, height = 70 }: { fill: string; height?: number }) {
  return (
    <svg className="sec-wave" viewBox={`0 0 1512 ${height}`} preserveAspectRatio="none" aria-hidden>
      <path
        d={`M0,${height} L0,${Math.round(height * 0.5)} C260,${Math.round(height * 0.08)} 540,${Math.round(height * 0.05)} 760,${Math.round(height * 0.28)} C1010,${Math.round(height * 0.55)} 1280,${Math.round(height * 0.7)} 1512,${Math.round(height * 0.34)} L1512,${height} Z`}
        fill={fill}
      />
    </svg>
  );
}
