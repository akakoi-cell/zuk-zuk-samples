import { Eyebrow } from "./ui";
import { VOICES } from "@/lib/salon-content";

// 06 — Voice。お客様の声を生成りカードのマソンリーで。引用符 + 星評価。
function Stars({ rating }: { rating: number }) {
  return (
    <span className="stars" aria-label={`5段階中 ${rating}`}>
      {"★".repeat(rating)}
      {"☆".repeat(Math.max(0, 5 - rating))}
    </span>
  );
}

export function SalonVoice() {
  return (
    <section className="section" id="voice" data-screen-label="06 Voice">
      <div className="wrap">
        <div className="rv">
          <Eyebrow num="05">Voice</Eyebrow>
          <h2 className="s-head">
            通ってくださる方の、<span className="alt">小さな声。</span>
          </h2>
        </div>
        <div className="voices rv">
          {VOICES.map((v) => (
            <article className="voice" key={v.initial}>
              <div className="mark serif">&ldquo;</div>
              <p>{v.quote}</p>
              <div className="who">
                <b>{v.initial} さん</b>
                <span>
                  {v.age} ・ {v.occupation}
                </span>
                <Stars rating={v.rating} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
