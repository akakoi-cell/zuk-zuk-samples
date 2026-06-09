import { SITE_SALON, HERO_COPY } from "@/lib/salon-content";

// 01 — Hero。背景に hero.jpg (配置済み) + スクリム、中央下に大ロゴ + コピー。
export function SalonHero() {
  return (
    <section className="hero" id="hero" data-screen-label="01 Hero">
      <div className="hero__bg">
        <div className="ph ph--dark" data-ph="店内全景 ・ ヴィンテージの椅子と窓辺">
          {/* 配置済みの hero.jpg。未配置でも ph--dark のダーク面で破綻しない */}
          <img src="/images/salon/hero.jpg" alt={`${SITE_SALON.name} 店内`} />
        </div>
      </div>
      <div className="hero__scrim"></div>
      <div className="hero__inner wrap">
        <div className="hero__loc">{SITE_SALON.location}</div>
        <h1 className="hero__logo">
          <span className="amp">&amp;</span>moi
        </h1>
        <p className="hero__copy">
          {HERO_COPY}
          <span className="pact">「&amp; moi」── と私の、ささやかな約束です。</span>
        </p>
      </div>
      <div className="hero__scroll">
        Scroll<span className="bar"></span>
      </div>
    </section>
  );
}
