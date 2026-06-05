// ui.tsx — みらい税理士事務所の共有プリミティブ (Claude Design ui.jsx の TSX 版)
// フックを持たないため Server Component として描画可能。
import type { ReactNode } from "react";

// ---- アイコン (1.6 stroke / square cap、紙のクラフト感に合わせる) ----
export type IconName =
  | "arrow"
  | "arrowUR"
  | "check"
  | "plus"
  | "minus"
  | "calendar"
  | "building"
  | "cloud"
  | "doc"
  | "chart"
  | "phone"
  | "mail"
  | "video"
  | "seal"
  | "chevron"
  | "scale"
  | "send"
  | "pin";

const ICON_PATHS: Record<IconName, ReactNode> = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUR: <path d="M7 17 17 7M9 7h8v8" />,
  check: <path d="M5 12 10 17 19 7" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  calendar: (
    <g>
      <path d="M4 7h16v13H4zM4 11h16M8 4v4M16 4v4" />
    </g>
  ),
  building: (
    <g>
      <path d="M4 21V6l8-3v18M12 21h8V10l-8-3M8 8v0M8 12v0M8 16v0M16 12v0M16 16v0" />
    </g>
  ),
  cloud: <path d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.5A3.5 3.5 0 0 1 18 17H7z" />,
  doc: (
    <g>
      <path d="M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6" />
    </g>
  ),
  chart: <path d="M5 19V5M5 19h14M9 15v-4M13 15V8M17 15v-6" />,
  phone: <path d="M6 3h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z" />,
  mail: (
    <g>
      <path d="M3 6h18v12H3zM3 7l9 6 9-6" />
    </g>
  ),
  video: (
    <g>
      <path d="M3 7h12v10H3zM15 10l6-3v10l-6-3" />
    </g>
  ),
  seal: (
    <g>
      <path d="M5 5h14v14H5zM9 9h6v6H9" />
    </g>
  ),
  chevron: <path d="M6 9l6 6 6-6" />,
  scale: <path d="M12 4v16M6 8h12M6 8l-2 6h4zM18 8l-2 6h4zM8 20h8" />,
  send: <path d="M21 4 3 11l6 2 2 6 4-9z" />,
  pin: <path d="M12 21s7-5.6 7-11a7 7 0 0 0-14 0c0 5.4 7 11 7 11zM12 7v0M12 10v0" />,
};

export function Icon({
  name,
  className = "w-5 h-5",
  stroke = 1.6,
}: {
  name: IconName;
  className?: string;
  stroke?: number;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

// ---- Eyebrow (ゴールドの目印 + EN ラベル) ----
export function Eyebrow({
  num,
  children,
  className = "",
  dark = false,
}: {
  num?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="block w-6 h-px bg-gold"></span>
      {num && <span className="font-mono text-[12px] tnum text-gold-dark">{num}</span>}
      <span
        className={`font-mono text-[11px] tracking-eyebrow uppercase ${
          dark ? "text-gold-light" : "text-gold-dark"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

// ---- SectionHead — variant "edit" (中央/王道) or "grid" (左/インデックス) ----
export function SectionHead({
  num,
  en,
  title,
  lead,
  variant = "edit",
  dark = false,
  className = "",
}: {
  num?: string;
  en: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  variant?: "edit" | "grid";
  dark?: boolean;
  className?: string;
}) {
  const center = variant === "edit";
  const titleColor = dark ? "text-white" : "text-navy";
  const leadColor = dark ? "text-navy-100/80" : "text-ink-600";
  return (
    <div
      className={`${
        center ? "text-center mx-auto max-w-prose flex flex-col items-center" : "max-w-prose"
      } ${className}`}
    >
      <Eyebrow num={num} dark={dark} className={center ? "justify-center" : ""}>
        {en}
      </Eyebrow>
      <h2
        className={`font-mincho font-medium leading-[1.3] ${titleColor} mt-5 text-[28px] md:text-[40px] tracking-[0.01em]`}
      >
        {title}
      </h2>
      {lead && (
        <p className={`jp text-[15px] md:text-base ${leadColor} mt-5 ${center ? "" : "max-w-[56ch]"}`}>
          {lead}
        </p>
      )}
      {center && <span className="block w-10 h-px bg-gold/70 mt-7"></span>}
    </div>
  );
}

// ---- Btn — <a> または <button>。テーマ対応の .btn 系クラスを使う ----
type BtnVariant = "primary" | "gold" | "outline" | "ghostLight";
type BtnSize = "sm" | "md" | "lg";

const BTN_SIZES: Record<BtnSize, string> = {
  md: "text-[13px] px-6 py-3.5",
  lg: "text-sm px-8 py-4",
  sm: "text-[12px] px-4 py-2.5",
};
const BTN_VARIANTS: Record<BtnVariant, string> = {
  primary: "btn-primary",
  gold: "btn-gold",
  outline: "btn-outline",
  ghostLight: "btn-ghost",
};

export function Btn({
  as = "a",
  href = "#",
  variant = "primary",
  size = "md",
  children,
  icon = "arrow",
  className = "",
  type,
}: {
  as?: "a" | "button";
  href?: string;
  variant?: BtnVariant;
  size?: BtnSize;
  children: ReactNode;
  icon?: IconName | null;
  className?: string;
  type?: "button" | "submit";
}) {
  const cls = `btn ${BTN_VARIANTS[variant]} ${BTN_SIZES[size]} ${className}`;
  const inner = (
    <>
      {children}
      {icon && <Icon name={icon} className="w-4 h-4" />}
    </>
  );
  if (as === "button") {
    return (
      <button type={type ?? "button"} className={cls}>
        {inner}
      </button>
    );
  }
  return (
    <a href={href} className={cls}>
      {inner}
    </a>
  );
}

// ---- Stat — 大きな明朝の数字 + ゴールド下線 ----
export function Stat({
  value,
  suffix,
  label,
  dark = false,
  className = "",
}: {
  value: string;
  suffix?: string;
  label: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-baseline gap-1">
        <span
          className={`font-mincho font-semibold tnum leading-none text-[44px] md:text-[56px] ${
            dark ? "text-white" : "text-navy"
          }`}
        >
          {value}
        </span>
        {suffix && (
          <span className={`font-mincho text-xl md:text-2xl ${dark ? "text-gold-light" : "text-gold-dark"}`}>
            {suffix}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-center gap-2.5">
        <span className="w-5 h-px bg-gold"></span>
        <span className={`text-[12px] tracking-[0.12em] ${dark ? "text-navy-100/75" : "text-ink-600"}`}>
          {label}
        </span>
      </div>
    </div>
  );
}

// ---- Ph — 画像プレースホルダ (ネイビー面 + ゴールド罫 + コーナーラベル) ----
export function Ph({
  label = "PHOTO",
  ratio = "4/3",
  className = "",
  tone = "navy",
}: {
  label?: string;
  ratio?: string;
  className?: string;
  tone?: "navy" | "ivory" | "gold";
}) {
  const tones = {
    navy: "bg-navy-900 text-navy-100/60 border-white/15",
    ivory: "bg-ivory text-ink-400 border-line",
    gold: "bg-gold-tint text-gold-deep border-gold/40",
  };
  return (
    <div className={`surf relative overflow-hidden ${tones[tone]} border ${className}`} style={{ aspectRatio: ratio }}>
      <div className="absolute inset-3 border border-current opacity-20"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <Icon name="building" className="w-7 h-7 opacity-50" />
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-70">{label}</span>
      </div>
    </div>
  );
}

// ---- Section — 一貫したリズムのセクション外枠 ----
export function Section({
  id,
  dark = false,
  tone,
  className = "",
  children,
}: {
  id?: string;
  dark?: boolean;
  tone?: "ivory";
  className?: string;
  children: ReactNode;
}) {
  const bg = dark ? "bg-navy-900" : tone === "ivory" ? "bg-ivory" : "bg-paper";
  return (
    <section id={id} className={`${bg} ${className}`}>
      <div className="max-w-content mx-auto px-6 md:px-10">{children}</div>
    </section>
  );
}
