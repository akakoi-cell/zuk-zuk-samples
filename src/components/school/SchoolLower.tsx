import {
  PRICING,
  ACCESS,
  FAQ,
  AISTUDIO_URL,
  NAV,
} from "@/lib/school-content";
import { SecHead } from "./ui";

// =============================================================
// 以降のセクションは Figma に図面が無いため、コード側で設計。
// Figma の手書きトーン・パレットに揃え、サンプル誘導モードを維持する。
// =============================================================

// ---- Pricing「料金プラン」(サブスク強調) ----
export function SchoolPricing() {
  return (
    <section className="sec pricing sec--cream" id="pricing">
      <div className="wrap">
        <SecHead title={PRICING.title} sub={PRICING.sub} />
        <div className="plans">
          {PRICING.plans.map((p) => (
            <article className={`plan rv${p.popular ? " plan--popular" : ""}`} key={p.name}>
              {p.popular && <span className="plan__ribbon">人気</span>}
              <p className="plan__name">{p.name}</p>
              <p className="plan__price">
                {p.price}
                <span className="unit">{p.unit}</span>
              </p>
              <p className="plan__desc">{p.desc}</p>
              <ul className="plan__features">
                {p.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <div className="pricing__meta rv">
          <div>入会金<b>{PRICING.joinFee}</b></div>
          <div>教材費<b>{PRICING.material}</b></div>
        </div>
        <ul className="pricing__notes rv">
          {PRICING.notes.map((n) => <li key={n}>※ {n}</li>)}
        </ul>
      </div>
    </section>
  );
}

// ---- Trial「無料体験レッスン」(cal.com 風・disabled デモ) ----
const TRIAL_DATES = ["月", "火", "水", "木", "金", "土", "日"];
export function SchoolTrial() {
  return (
    <section className="sec trial" id="trial">
      <div className="wrap trial__wrap">
        <SecHead
          title="まずは、無料体験から。"
          sub="英語がはじめてでも大丈夫。教室の雰囲気を見に来てください。体験は無料、しつこい勧誘はありません。"
        />
        <div className="trial__box rv">
          <div className="trial__row">
            <label>ご希望コース</label>
            <select disabled defaultValue="">
              <option value="">コースを選択してください</option>
            </select>
          </div>
          <div className="trial__row">
            <label>ご希望日（◯ = 空きあり）</label>
            <div className="trial__dates">
              {TRIAL_DATES.map((d, i) => (
                <button className="trial__date" type="button" disabled key={d}>
                  <span>{d}</span>
                  <span className={`mk${i === 6 || i === 0 ? " mk--x" : ""}`}>
                    {i === 6 || i === 0 ? "×" : "◯"}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="trial__row">
            <label>ご希望の時間帯</label>
            <div className="trial__slots">
              {["14:00", "15:30", "17:00"].map((s) => (
                <button className="trial__slot" type="button" disabled key={s}>{s}</button>
              ))}
            </div>
          </div>
          <button className="trial__submit" type="button" disabled>
            サンプル表示のため予約できません
          </button>
        </div>
        <a className="trial__cta" href={AISTUDIO_URL} target="_blank" rel="noopener noreferrer">
          zuk-zuk AI STUDIO で体験予約システムを相談する →
        </a>
      </div>
    </section>
  );
}

// ---- Access「教室について」----
export function SchoolAccess() {
  return (
    <section className="sec access sec--green-pl" id="access">
      <div className="wrap">
        <SecHead title={ACCESS.title} />
        <div className="access__grid rv">
          <dl>
            <dt>住所</dt><dd>{ACCESS.address}</dd>
            <dt>最寄駅</dt><dd>{ACCESS.station}</dd>
            <dt>開講時間</dt><dd>{ACCESS.hours}</dd>
            <dt>定休日</dt><dd>{ACCESS.closed}</dd>
            <dt>TEL</dt><dd>{ACCESS.tel}</dd>
            <dt>その他</dt><dd>{ACCESS.parking}</dd>
          </dl>
          <div className="access__map">
            <div className="frame">
              <iframe
                src={ACCESS.mapEmbedUrl}
                title="Hello Tree 教室の地図（北浦和駅周辺）"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- FAQ ----
export function SchoolFaq() {
  return (
    <section className="sec faq sec--cream" id="faq">
      <div className="wrap">
        <SecHead title="よくあるご質問" />
        <div className="faq__list rv">
          {FAQ.map((f, i) => (
            <details key={i} open={i === 0}>
              <summary>
                <span className="q">Q.</span>
                {f.q}
                <span className="sign" aria-hidden>＋</span>
              </summary>
              <div className="a">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- LINE バナー (サンプル誘導モード・disabled) ----
export function SchoolLineBanner() {
  return (
    <section className="line-banner" id="line">
      <div className="wrap line-banner__grid">
        <div>
          <p className="line-banner__head">
            <span className="lico">LINE</span>
            LINE で体験のお申し込み・ご質問を
          </p>
          <p className="line-banner__body">
            体験レッスンのご予約や、ちょっとした疑問も LINE で気軽に。
            お子さまの空き時間にあわせて、いつでもメッセージをお送りください。
          </p>
          <button className="line-banner__btn" type="button" disabled>
            サンプル表示のため登録できません
          </button>
          <p className="line-banner__note">※ 実装では LINE 公式アカウント連携で友だち追加 → 予約・連絡まで自動化します。</p>
        </div>
        <div className="line-banner__qr">
          <div className="line-banner__qrbox">QR コード<br />（サンプル）</div>
          <span className="line-banner__qrlabel">友だち追加</span>
        </div>
      </div>
    </section>
  );
}

// ---- Contact (サンプル誘導型) ----
export function SchoolContact() {
  return (
    <section className="sec contact sec--cream" id="contact">
      <div className="wrap">
        <SecHead title="お問い合わせ" />
        <div className="sample-note rv">
          <p className="sample-note__t">📌 このサイトは zuk-zuk AI STUDIO のサンプルです</p>
          <p className="sample-note__b">
            Hello Tree は実在しないデモ教室です。フォーム・予約・LINE はすべて無効化されています。
            このようなサイトを作りたい方は <a href={AISTUDIO_URL} target="_blank" rel="noopener noreferrer">zuk-zuk AI STUDIO</a> へどうぞ。
          </p>
        </div>
        <div className="contact__cta rv">
          <h3>“まちがえても、だいじょうぶ”なサイトを、いっしょに。</h3>
          <p>会員マイページ・サブスク決済・体験予約まで。お子さま向け教室の Web を、まるごとお手伝いします。</p>
          <a href={AISTUDIO_URL} target="_blank" rel="noopener noreferrer">zuk-zuk AI STUDIO で相談する →</a>
        </div>
      </div>
    </section>
  );
}

// ---- Footer ----
export function SchoolFooter() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__top">
          <div className="foot__brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/school/logo.svg" alt="Hello Tree English School" />
            <p>北浦和こども英会話教室 ハローツリー。Nice Try! が、私たちのあいことば。</p>
          </div>
          <div className="foot__cols">
            <div className="foot__col">
              <h4>Menu</h4>
              {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
            </div>
            <div className="foot__col">
              <h4>About</h4>
              <a href="#pricing">料金プラン</a>
              <a href="#trial">無料体験</a>
              <a href="#faq">よくある質問</a>
              <a href="#contact">お問い合わせ</a>
            </div>
          </div>
        </div>
        <div className="foot__bottom">
          <span>© Hello Tree（サンプル）</span>
          <span>Sample by zuk-zuk AI STUDIO</span>
        </div>
      </div>
    </footer>
  );
}
