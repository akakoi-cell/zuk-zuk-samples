"use client";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/school-content";

// Figma node 2:12 — ロゴ(左) + ナビ(中) + コーラル pill CTA(右)。
// スクロールで背景に影、 920px 以下はハンバーガー → ドロワー。
export function SchoolHeader() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className={`hdr${solid ? " hdr--solid" : ""}`}>
        <a href="#top" aria-label="Hello Tree ホーム">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hdr__logo" src="/images/school/logo.svg" alt="Hello Tree English School" />
        </a>
        <nav className="nav" aria-label="グローバルナビ">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <a className="nav-cta" href="#trial">無料体験レッスン</a>
        <button
          className="burger"
          aria-label="メニューを開く"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </header>

      <div className={`msheet${open ? " open" : ""}`} role="dialog" aria-modal="true">
        {NAV.map((n) => (
          <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>
        ))}
        <a href="#trial" onClick={() => setOpen(false)}>無料体験レッスン</a>
      </div>
    </>
  );
}
