import { Eyebrow, Ph } from "./ui";
import { ACCESS } from "@/lib/salon-content";

// 07 — Access。住所 / 営業情報 + 外観写真、下段に Google Map iframe (強調機能 #4)。
export function SalonAccess() {
  return (
    <section className="section section--card" id="access" data-screen-label="07 Access">
      <div className="wrap">
        <div className="rv">
          <Eyebrow num={ACCESS.num}>Access</Eyebrow>
          <h2 className="s-head">
            武蔵小杉の住宅街、<span className="alt">角をひとつ。</span>
          </h2>
        </div>
        <div className="access">
          <div className="access__photo rv">
            <Ph label={ACCESS.photoPh} src={undefined} />
          </div>
          <div className="access__info rv">
            <p className="access__addr">
              {ACCESS.postal}
              {ACCESS.address.split("\n").map((line, i) => (
                <span key={i}>
                  <br />
                  {line}
                </span>
              ))}
            </p>
            <div className="access__map">
              <a href={ACCESS.mapLink} target="_blank" rel="noopener noreferrer" className="tlink">
                Google Map で開く<span className="ar"></span>
              </a>
            </div>
            <dl>
              <dt>Hours</dt>
              <dd>
                {ACCESS.hours}
                <br />
                <small>{ACCESS.hoursNote}</small>
              </dd>
              <dt>Closed</dt>
              <dd>
                {ACCESS.closed}
                <br />
                <small>{ACCESS.closedNote}</small>
              </dd>
              <dt>Access</dt>
              <dd>
                {ACCESS.station}
                <br />
                <small>{ACCESS.stationNote}</small>
              </dd>
              <dt>Tel</dt>
              <dd className="en">{ACCESS.tel}</dd>
            </dl>
          </div>
        </div>

        {/* 下段: Google Map iframe (全幅、 16:9) */}
        <div className="access__embed rv">
          <div className="map-frame">
            <iframe
              src={ACCESS.mapEmbedUrl}
              title="& moi 周辺マップ (武蔵小杉)"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
