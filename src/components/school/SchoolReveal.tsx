"use client";
import { useEffect } from "react";

// スクロール出現アニメ — フェイルオープン。
// 既定で可視、JS が .pending を付けたものだけ隠して交差で .in を付与する。
export function SchoolReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".school-root .rv"));
    if (!els.length || !("IntersectionObserver" in window)) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    els.forEach((el) => el.classList.add("pending"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            e.target.classList.remove("pending");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
