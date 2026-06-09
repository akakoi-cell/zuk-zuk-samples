import { Eyebrow } from "./ui";
import { MENU, MENU_NOTE } from "@/lib/salon-content";

// 04 — Menu。4 カテゴリ × 価格行 (価格は等幅数字 + ¥ / 〜 の装飾)。
export function SalonMenu() {
  return (
    <section className="section" id="menu" data-screen-label="04 Menu">
      <div className="wrap">
        <div className="rv">
          <Eyebrow num="03">Menu</Eyebrow>
          <h2 className="s-head">
            通いやすい価格で、<span className="alt">ていねいに。</span>
          </h2>
        </div>
        <div className="menu">
          {MENU.map((cat) => (
            <div className="mcat rv" key={cat.en}>
              <div className="mcat__head">
                <h3 className="en">{cat.en}</h3>
                <span className="jp">{cat.ja}</span>
              </div>
              {cat.items.map((it) => (
                <div className="mrow" key={it.name}>
                  <span className="mrow__name">
                    {it.name}
                    {it.note && <small>{it.note}</small>}
                  </span>
                  <span className="mrow__dot"></span>
                  <span className="mrow__price">
                    <span className="yen">¥</span>
                    {it.price}
                    {it.tilde && <span className="tilde">〜</span>}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <p className="menu__note rv">{MENU_NOTE}</p>
      </div>
    </section>
  );
}
