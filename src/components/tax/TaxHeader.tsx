"use client";

import { useEffect, useState } from "react";
import { Icon, Btn } from "./ui";
import { TAX_SITE, TAX_NAV } from "@/lib/tax-content";

function Logo({ dark = false }: { dark?: boolean }) {
  const ink = dark ? "#FFFFFF" : "#1A2B4A";
  return (
    <a href="#top" className="flex items-center gap-3 group">
      {/* hanko 風マーク: ゴールドの角印に「未」 */}
      <span className="relative inline-flex items-center justify-center w-9 h-9 border border-gold shrink-0">
        <span className="absolute inset-[3px] border border-gold/40"></span>
        <span className="font-mincho font-semibold text-gold leading-none text-[17px]">{TAX_SITE.mark}</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-mincho font-semibold text-[17px] tracking-[0.06em]" style={{ color: ink }}>
          {TAX_SITE.name}
        </span>
        <span className="font-mono text-[9px] tracking-[0.24em] text-gold-dark mt-1">{TAX_SITE.nameEn}</span>
      </span>
    </a>
  );
}

export function TaxHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 12);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-paper/95 border-b transition-colors duration-300 ${
        scrolled ? "border-line" : "border-transparent"
      }`}
    >
      <div className="max-w-content mx-auto px-6 md:px-10">
        <div className="h-[72px] flex items-center justify-between gap-6">
          <Logo />
          <nav className="hidden lg:flex items-center gap-8">
            {TAX_NAV.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="group flex flex-col items-center">
                <span className="font-dm text-[13px] tracking-wide text-navy/85 group-hover:text-navy transition-colors">
                  {l.label}
                </span>
                <span className="font-zen text-[9px] text-ink-400 mt-0.5 tracking-[0.1em]">{l.ja}</span>
              </a>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-4">
            <a href={TAX_SITE.telHref} className="flex items-center gap-2 text-navy/80 hover:text-navy transition-colors">
              <Icon name="phone" className="w-4 h-4 text-gold-dark" />
              <span className="font-mono text-[13px] tnum">{TAX_SITE.tel}</span>
            </a>
            <Btn href="#contact" size="sm" icon="arrow">
              30分無料相談
            </Btn>
          </div>
          {/* mobile toggle */}
          <button className="lg:hidden text-navy p-2 -mr-2" onClick={() => setOpen(!open)} aria-label="メニュー">
            <Icon name={open ? "plus" : "arrow"} className={`w-6 h-6 ${open ? "rotate-45" : "rotate-90"}`} />
          </button>
        </div>
      </div>
      {/* mobile sheet */}
      {open && (
        <div className="lg:hidden border-t border-line bg-paper">
          <div className="px-6 py-6 flex flex-col gap-1">
            {TAX_NAV.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between py-3 border-b border-line/60"
              >
                <span className="font-mincho text-[17px] text-navy">{l.label}</span>
                <span className="font-zen text-xs text-ink-400">{l.ja}</span>
              </a>
            ))}
            <div className="flex items-center gap-2 mt-5 text-navy">
              <Icon name="phone" className="w-4 h-4 text-gold-dark" />
              <span className="font-mono text-sm tnum">{TAX_SITE.tel}</span>
            </div>
            <a href="#contact" onClick={() => setOpen(false)} className="mt-4">
              <Btn href="#contact" className="w-full" icon="arrow">
                30分無料相談を予約
              </Btn>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
