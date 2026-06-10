import { Eyebrow, Ph } from "./ui";
import { ABOUT } from "@/lib/salon-content";

// 02 — About。見出し (「もう一つの居場所」だけ強調) + インテリア 3 枚の非対称レイアウト。
// 左に大きな縦長 1 枚、右に横長 + 正方を縦に積み、右カラムを下げて非対称に。
export function SalonAbout() {
  const [main, sideTop, sideBottom] = ABOUT.images;
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
          <div className="cell cell--main">
            <Ph label={main.ph} src={undefined} />
          </div>
          <div className="about__side">
            <div className="cell cell--wide">
              <Ph label={sideTop.ph} src={undefined} />
            </div>
            <div className="cell cell--sq">
              <Ph label={sideBottom.ph} src={undefined} />
            </div>
          </div>
        </div>
        <div className="about__caption rv">
          <span>{ABOUT.captionLeft}</span>
          <span>{ABOUT.captionRight}</span>
        </div>
      </div>
    </section>
  );
}
