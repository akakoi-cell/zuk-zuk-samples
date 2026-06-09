"use client";

import { useEffect, useState } from "react";
import { Brand } from "./ui";
import { SALON_NAV } from "@/lib/salon-content";

// Claude Design の header スクリプトを React 化:
// Hero 上では透過 (hdr--hero、白文字)、スクロールで solid (背景ぼかし) に切替。
export function SalonHeader() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const onScroll = () => {
      const threshold = hero ? hero.offsetHeight - 90 : 600;
      setSolid(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`hdr ${solid ? "hdr--solid" : "hdr--hero"}`} id="hdr">
        <Brand />
        <nav className="nav">
          {SALON_NAV.map((l) => (
            <a key={l.id} href={`#${l.id}`}>
              {l.label}
            </a>
          ))}
        </nav>
        {/* ご予約 (サンプルのため disabled、 Contact へ誘導) */}
        <a href="#contact" className="nav-cta" role="button">
          Reservation
        </a>
        <button
          className="burger"
          aria-label="メニュー"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      <div className={`msheet${open ? " open" : ""}`} id="msheet">
        {SALON_NAV.map((l) => (
          <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)}>
            <span className="mnum">{l.num}</span>
            {l.label}
          </a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)}>
          <span className="mnum">08</span>
          Reservation
        </a>
      </div>
    </>
  );
}
