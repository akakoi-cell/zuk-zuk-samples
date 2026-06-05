"use client";

import { useEffect } from "react";

/**
 * スクロール出現アニメ。フェイルオープン設計:
 * 既定では .reveal 要素は可視。ここで画面下のものに .pending を付けて隠し、
 * 交差したら .in を付けて表示する。JS が走らなければ全要素が可視のまま。
 *
 * ページに 1 つだけマウントして DOM 全体の .reveal を監視する。
 */
export function TaxReveal() {
  useEffect(() => {
    const vh = window.innerHeight || 800;
    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
      if (!el.classList.contains("in") && el.getBoundingClientRect().top > vh * 0.92) {
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
      { threshold: 0.06, rootMargin: "0px 0px -4% 0px" }
    );
    document.querySelectorAll(".reveal.pending").forEach((el) => io.observe(el));

    // フェイルセーフ: 2.5s 後に残った pending を強制表示
    const failsafe = window.setTimeout(() => {
      document.querySelectorAll(".reveal.pending").forEach((el) => {
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
