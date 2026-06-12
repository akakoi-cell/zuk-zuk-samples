import { HERO } from "@/lib/school-content";

// Figma node 4:194 — 楕円マスク写真 + 手書きステッカー 3 段。
// "Nice Try! が" / "私たちの あいことば" / "北浦和こども英会話教室 ハローツリー"
export function SchoolHero() {
  return (
    <section className="hero" id="top">
      <div className="hero__inner wrap">
        <div className="hero__photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/school/hero.jpg"
            alt="先生と子どもがハイタッチする Hello Tree のレッスン風景"
            fetchPriority="high"
          />
        </div>
        <div className="hero__stickers">
          <span className="hero__sticker hero__sticker--1 rv">
            <span className="h-nice">{HERO.line1a}</span>
            <span className="h-ga">{HERO.line1b}</span>
          </span>
          <span className="hero__sticker hero__sticker--2 rv">
            <span className="h-watashi">{HERO.line2a}</span>
            <span className="h-aikoto">{HERO.line2b}</span>
          </span>
          <span className="hero__sticker hero__sticker--3 rv">
            <span className="h-sub">{HERO.sub}</span>
          </span>
        </div>
      </div>
      {/* hero → about への緑の丘 + 木 (Figma node 5:191) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hero__hill" src="/images/school/hero-hill.svg" alt="" aria-hidden />
    </section>
  );
}
