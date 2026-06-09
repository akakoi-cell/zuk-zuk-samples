import { Eyebrow } from "./ui";
import { SALON_FAQS } from "@/lib/salon-content";

// 08 — FAQ。Claude Design の <details> アコーディオン (CSS のみで開閉)。
export function SalonFaq() {
  return (
    <section className="section" id="faq" data-screen-label="08 FAQ">
      <div className="wrap">
        <div className="rv">
          <Eyebrow num="07">FAQ</Eyebrow>
          <h2 className="s-head">
            はじめての方へ、<span className="alt">よくあるご質問。</span>
          </h2>
        </div>
        <div className="faq rv">
          {SALON_FAQS.map((f, i) => (
            <details key={i} open={i === 0}>
              <summary>
                <span className="q serif">Q{i + 1}</span>
                {f.q}
                <span className="sign"></span>
              </summary>
              <div className="a">
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
