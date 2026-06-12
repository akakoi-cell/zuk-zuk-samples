import { COURSES, COURSES_HEAD } from "@/lib/school-content";
import { SecHead } from "./ui";

// Figma node 8:557 — 淡緑地・4色ヘッダーカード (CLASS + 年齢pill + 子供イラスト)。
export function SchoolCourses() {
  return (
    <section className="sec courses" id="courses">
      <div className="wrap">
        <SecHead title={COURSES_HEAD.title} sub={COURSES_HEAD.sub} />
        <div className="ccards">
          {COURSES.map((c) => (
            <article className={`ccard ccard--${c.color} rv`} key={c.name + c.age}>
              <div className="ccard__head">
                <div>
                  <p className="ccard__class">{c.en}</p>
                  <p className="ccard__name">{c.name}</p>
                </div>
                <span className="ccard__age">{c.age}</span>
              </div>
              <div className="ccard__body">
                <p className="ccard__desc">{c.desc}</p>
                <div className="ccard__pills">
                  {c.tags.map((t) => (
                    <span className="ccard__pill" key={t}>{t}</span>
                  ))}
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="ccard__child" src="/images/school/child.svg" alt="" aria-hidden />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
