"use client";

import { useEffect } from "react";

/**
 * スクロール出現アニメ (Claude Design の IntersectionObserver を踏襲)。
 * フェイルオープン設計: 既定では .rv は可視。画面下の要素にだけ .pending を
 * 付けて隠し、交差で .in を付与して表示する。JS が走らなければ全要素が可視のまま。
 * ページに 1 つだけマウントして DOM 全体の .rv を監視する。
 */
export function SalonReveal() {
  useEffect(() => {
    const vh = window.innerHeight || 800;
    document.querySelectorAll<HTMLElement>(".salon-root .rv").forEach((el) => {
      if (!el.classList.contains("in") && el.getBoundingClientRect().top > vh * 0.9) {
        el.classList.add("pending");
      }
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove("pending");
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".salon-root .rv.pending").forEach((el) => io.observe(el));

    // フェイルセーフ: 2.5s 後に残った pending を強制表示
    const failsafe = window.setTimeout(() => {
      document.querySelectorAll(".salon-root .rv.pending").forEach((el) => {
        el.classList.remove("pending");
        el.classList.add("in");
      });
    }, 2500);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return null;
}
