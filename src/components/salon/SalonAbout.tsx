import { Eyebrow, Ph } from "./ui";
import { ABOUT } from "@/lib/salon-content";

// 02 — About。見出し (「もう一つの居場所」だけ強調) + インテリア 4 枚正方形グリッド。
export function SalonAbout() {
  return (
    <section className="section" id="about" data-screen-label="02 About">
      <div className="wrap">
        <div className="about__top rv">
          <div className="about__words">
            <Eyebrow num={ABOUT.num}>{ABOUT.en}</Eyebrow>
            <p className="big">
              {ABOUT.headBefore}
              <br />
              <em>{ABOUT.headEm}</em>
              {ABOUT.headAfter}
            </p>
          </div>
        </div>

        <div className="about__grid rv">
          {ABOUT.images.map((img, i) => (
            <div className="cell" key={i}>
              <Ph label={img.ph} src={undefined} />
            </div>
          ))}
        </div>
        <div className="about__caption rv">
          <span>{ABOUT.captionLeft}</span>
          <span>{ABOUT.captionRight}</span>
        </div>
      </div>
    </section>
  );
}
