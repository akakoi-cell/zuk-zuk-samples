import { LINE_BANNER, AI_STUDIO_URL } from "@/lib/salon-content";

// 08-2 — LINE 公式連携バナー (強調機能 #2)。
// サンプル誘導モード: 「友だち追加」は disabled、QR は placeholder。
export function SalonLineBanner() {
  return (
    <section className="line-banner" aria-label="LINE 公式アカウント">
      <div className="wrap">
        <div className="line-banner__grid rv">
          <div>
            <p className="line-banner__head">
              <span className="lico" aria-hidden>
                LINE
              </span>
              {LINE_BANNER.title}
            </p>
            <p className="line-banner__body">{LINE_BANNER.body}</p>
            <button type="button" className="line-banner__btn" disabled aria-disabled="true">
              友だち追加
            </button>
            <p className="line-banner__note">
              ※ サンプル表示のため LINE 登録はできません。実際のご相談は{" "}
              <a
                href={`${AI_STUDIO_URL}#contact`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#fff", textDecoration: "underline", textUnderlineOffset: "2px" }}
              >
                zuk-zuk AI STUDIO
              </a>{" "}
              へ。
            </p>
          </div>
          <div className="line-banner__qr">
            <div className="line-banner__qrbox">
              QR Code
              <br />
              (sample)
            </div>
            <span className="line-banner__qrlabel">Add Friend</span>
          </div>
        </div>
      </div>
    </section>
  );
}
