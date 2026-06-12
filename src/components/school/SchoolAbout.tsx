import { ABOUT } from "@/lib/school-content";

// Figma node 5:60 / 4:125 — ベタ緑地・白文字。透かし "About us" +
// 本文 + 右下のお家イラスト + 鳥 + ＼NiceTry!／ 手書きバッジ。
export function SchoolAbout() {
  return (
    <section className="about" id="about">
      <div className="about__inner">
        <p className="about__watermark rv" aria-hidden>{ABOUT.watermark}</p>
        <h2 className="about__heading rv">{ABOUT.heading}</h2>
        <div className="about__body rv">
          {ABOUT.body.map((para, i) => (
            <p key={i}>
              {para.split("\n").map((line, j) => (
                <span key={j}>
                  {line}
                  {j < para.split("\n").length - 1 && <br aria-hidden />}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>

      <div className="about__scene wrap">
        <span className="about__badge rv">
          <span className="slash">＼</span>NiceTry!<span className="slash">／</span>
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="about__bird" src="/images/school/bird.svg" alt="" aria-hidden />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="about__house" src="/images/school/house.svg" alt="Hello Tree の教室イラスト" />
      </div>

      {/* about → features への淡い丘 */}
      <svg className="about__hill" viewBox="0 0 1512 90" preserveAspectRatio="none" aria-hidden>
        <path
          d="M0,90 L0,40 C260,8 520,2 760,18 C1010,34 1260,52 1512,30 L1512,90 Z"
          fill="var(--green-pl)"
        />
      </svg>
    </section>
  );
}
