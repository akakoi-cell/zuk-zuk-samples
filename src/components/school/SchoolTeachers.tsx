import { TEACHERS, TEACHERS_HEAD } from "@/lib/school-content";
import { SecHead, Wave } from "./ui";

// Figma node 9:782 — 青地・荷札カード3枚 (穴 + 色クリップ / 縦書き Teacher Profile)。
export function SchoolTeachers() {
  return (
    <section className="sec teachers" id="teachers">
      <div className="wrap">
        <SecHead title={TEACHERS_HEAD.title} sub={TEACHERS_HEAD.sub} />
        <div className="tcards">
          {TEACHERS.map((t) => (
            <article className={`tcard tcard--${t.color} rv`} key={t.en}>
              <span className="tcard__clip" aria-hidden />
              <span className="tcard__hole" aria-hidden />
              <span className="tcard__profile" aria-hidden>Teacher Profile</span>
              <div className="tcard__name">
                <span className="tcard__en">{t.en}</span>
                <span className="tcard__ja">（{t.ja}）</span>
              </div>
              <div className="tcard__photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.image} alt={`${t.en} 先生`} loading="lazy" />
              </div>
              <div className="tcard__meta">
                <span className="tcard__tag">{t.tag}</span>
                <span className="tcard__role">{t.role}</span>
              </div>
              <p className="tcard__desc">{t.desc}</p>
            </article>
          ))}
        </div>
      </div>
      {/* teachers → courses (淡緑) */}
      <Wave fill="var(--green-pl)" />
    </section>
  );
}
