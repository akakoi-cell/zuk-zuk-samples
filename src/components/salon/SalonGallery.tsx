import { Eyebrow, Ph } from "./ui";
import type { GalleryItem } from "@/lib/salon-content";

// 05 — Gallery。施術後の仕上がりを正方形密集グリッドで。
// items は Sanity (salonWork) 由来、未設定時は GALLERY_FALLBACK が渡る。
export function SalonGallery({ items }: { items: GalleryItem[] }) {
  return (
    <section className="section section--card" id="gallery" data-screen-label="05 Gallery">
      <div className="wrap">
        <div className="rv">
          <Eyebrow num="04">Gallery</Eyebrow>
          <h2 className="s-head">
            仕上がりの、<span className="alt">空気感まで。</span>
          </h2>
        </div>
        <div className="gallery rv">
          {items.map((g, i) => (
            <Ph key={i} label={g.ph} src={g.image} alt={g.ph} />
          ))}
        </div>
        <div className="gallery__cta rv">
          <a href="#contact" className="tlink">
            ご予約はこちら<span className="ar"></span>
          </a>
        </div>
      </div>
    </section>
  );
}
