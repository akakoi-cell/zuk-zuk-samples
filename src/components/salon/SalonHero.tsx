import { SITE_SALON, HERO_COPY } from "@/lib/salon-content";

// 01 — Hero。lamune-kyoto.com 風 2 カラム構成。
// 左: 白背景にロゴ + コピー。右: hero.jpg を画面右半分に配置 (背景いっぱいにしない)。
export function SalonHero() {
  return (
    <section className="hero" id="hero" data-screen-label="01 Hero">
      <div className="hero__inner">
        <div className="hero__left">
          <div className="hero__loc">{SITE_SALON.location}</div>
          <h1 className="hero__logo">
            <span className="amp">&amp;</span>moi
          </h1>
          <p className="hero__copy">{HERO_COPY}</p>
        </div>
        <div className="hero__right">
          <div className="ph" data-ph="店内全景 ・ ヴィンテージの椅子と窓辺">
            {/* 配置済みの hero.jpg を縦長カラムに表示 (object-cover で中央クロップ) */}
            <img src="/images/salon/hero.jpg" alt={`${SITE_SALON.name} 店内`} />
          </div>
        </div>
      </div>
      <div className="hero__scroll">
        Scroll<span className="bar"></span>
      </div>
    </section>
  );
}
