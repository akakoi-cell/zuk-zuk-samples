import { SITE_SALON, FOOTER_COLS, FOOTER_LEGAL, ACCESS } from "@/lib/salon-content";

// Footer。ブランド + ナビ + 店舗情報 + 法務リンク。
export function SalonFooter() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__top">
          <div>
            <div className="foot__brand">
              <span className="amp">&amp;</span>moi
            </div>
            <p>{SITE_SALON.tagline}</p>
          </div>
          <div className="foot__cols">
            {FOOTER_COLS.map((col) => (
              <div className="foot__col" key={col.h}>
                <h4>{col.h}</h4>
                {col.links.map((l) => (
                  <a key={l.label} href={l.href}>
                    {l.label}
                  </a>
                ))}
              </div>
            ))}
            <div className="foot__col">
              <h4>Salon</h4>
              <p>
                神奈川県川崎市中原区
                <br />
                小杉町 0-00-0 1F
              </p>
              <p className="en">
                {ACCESS.hours}
                <br />
                火・第2水 定休
              </p>
            </div>
          </div>
        </div>

        <div className="foot__legal">
          {FOOTER_LEGAL.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="foot__bottom">
          <span>© 2026 &amp; moi — hair salon. Sample site.</span>
          <span>Musashi-Kosugi, Kanagawa</span>
        </div>
      </div>
    </footer>
  );
}
