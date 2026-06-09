import { Eyebrow, Ph } from "./ui";
import { STYLISTS } from "@/lib/salon-content";

// 03 — Stylists。3 名横並び (mobile は写真 + テキストの 2 カラム)。
export function SalonStylists() {
  return (
    <section className="section section--card" id="stylists" data-screen-label="03 Stylists">
      <div className="wrap">
        <div className="rv">
          <Eyebrow num="02">Stylist</Eyebrow>
          <h2 className="s-head">
            髪を整える人であり、<span className="alt">その日の聞き役</span>でもある。
          </h2>
        </div>
        <div className="stylists">
          {STYLISTS.map((s) => (
            <article className="stylist rv" key={s.enName}>
              <Ph label="ポートレート ／ 縦 3:4" src={undefined} />
              <div className="stylist__body">
                <p className="stylist__role">{s.role}</p>
                <p className="stylist__en serif">{s.enName}</p>
                <p className="stylist__jp">{s.jaName}</p>
                <p className="stylist__bio">{s.profile}</p>
                <div className="stylist__tags">
                  {s.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
