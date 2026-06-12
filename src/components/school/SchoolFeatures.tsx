import { FEATURES, FEATURES_HEAD } from "@/lib/school-content";
import { SecHead, Wave } from "./ui";

// Figma node 7:413 — 淡緑地・白カード3枚 (ピン留め風 / 微回転)。
export function SchoolFeatures() {
  return (
    <section className="sec features" id="features">
      <div className="wrap">
        <SecHead title={FEATURES_HEAD.title} sub={FEATURES_HEAD.sub} />
        <div className="fcards">
          {FEATURES.map((f) => (
            <article className="fcard rv" key={f.no}>
              <span className="fcard__pin" aria-hidden />
              <span className="fcard__label">FEATURE</span>
              <h3 className="fcard__title">{f.title}</h3>
              <div className="fcard__photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/school/hero.jpg" alt="" loading="lazy" aria-hidden />
              </div>
              <p className="fcard__desc">{f.desc}</p>
              <span className="fcard__no">{f.no}</span>
            </article>
          ))}
        </div>
      </div>
      {/* features → teachers (青) */}
      <Wave fill="var(--blue)" />
    </section>
  );
}
