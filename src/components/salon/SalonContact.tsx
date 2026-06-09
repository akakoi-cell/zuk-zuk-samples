import { Eyebrow } from "./ui";
import { CONTACT, AI_STUDIO_URL, SITE_SALON } from "@/lib/salon-content";

// 09 — Contact (サンプル誘導モード)。
// フォームは全 disabled、サンプル警告バナー + AI STUDIO 誘導 CTA。
// setup-sample-demo-mode Skill に準拠。送信不可なので Server Component で十分。
export function SalonContact() {
  return (
    <section className="section section--card" id="contact" data-screen-label="09 Contact">
      <div className="wrap">
        <div className="rv">
          <Eyebrow num={CONTACT.num}>Reservation</Eyebrow>
          <h2 className="s-head">
            あなたのための時間を、<span className="alt">予約する。</span>
          </h2>
        </div>

        {/* サンプル警告バナー */}
        <div className="sample-note rv">
          <p className="sample-note__t">
            <span aria-hidden>📌</span>
            <span>
              このサイトは <strong>zuk-zuk AI STUDIO</strong> のサンプルです
            </span>
          </p>
          <p className="sample-note__b">
            「{SITE_SALON.name}」は架空のデモサロンです。フォームからの送信はできません。サイト制作のご相談は、
            <a href={AI_STUDIO_URL} target="_blank" rel="noopener noreferrer">
              zuk-zuk AI STUDIO
            </a>
            までお願いいたします。
          </p>
        </div>

        <div className="contact">
          {/* フォーム UI (見た目のみ、 送信不可) */}
          <form className="form rv" aria-disabled="true">
            <div className="field">
              <label>
                お名前 <span className="req">*</span>
              </label>
              <input type="text" placeholder="山田 花子" disabled />
            </div>
            <div className="two">
              <div className="field">
                <label>
                  電話番号 <span className="req">*</span>
                </label>
                <input type="tel" placeholder="090-0000-0000" disabled />
              </div>
              <div className="field">
                <label>メール</label>
                <input type="email" placeholder="you@example.com" disabled />
              </div>
            </div>
            <div className="two">
              <div className="field">
                <label>ご希望日</label>
                <input type="date" disabled />
              </div>
              <div className="field">
                <label>ご希望メニュー</label>
                <select disabled defaultValue="">
                  <option value="" disabled>
                    選択してください
                  </option>
                  {CONTACT.menuOptions.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="field">
              <label>ご要望・ご相談</label>
              <textarea
                rows={3}
                placeholder="はじめてです。肩につくくらいの長さに整えたいです。"
                disabled
              ></textarea>
            </div>
            <button type="button" className="btn" disabled aria-disabled="true">
              サンプル表示のため送信できません
            </button>
          </form>

          {/* AI STUDIO 誘導 CTA */}
          <aside className="aistudio rv">
            <span className="badge">&amp; moi ── AI Studio</span>
            <h3>
              言葉にしづらい「なりたい」を、
              <br />
              <em>写真で</em>見つける。
            </h3>
            <p>
              お手持ちの写真をアップロードするだけ。AI があなたの雰囲気に似合うスタイルを提案し、来店前にイメージを共有できます。
            </p>
            <div className="aistudio__list">
              <div>
                <span className="n">01</span>顔まわりの写真を 1 枚アップロード
              </div>
              <div>
                <span className="n">02</span>なりたい雰囲気のキーワードを選ぶ
              </div>
              <div>
                <span className="n">03</span>提案スタイルをそのまま予約に添付
              </div>
            </div>
            <a
              href={`${AI_STUDIO_URL}#contact`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn2"
            >
              zuk-zuk AI STUDIO で相談する<span aria-hidden="true">→</span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
