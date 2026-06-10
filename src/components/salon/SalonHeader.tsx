"use client";

import { useState } from "react";
import { Brand } from "./ui";
import { SALON_NAV } from "@/lib/salon-content";

// ヘッダーは常時 solid 固定 (生成り背景 + 濃色テキスト)。
// 分割 Hero (左=生成り / 右=写真) では透過白文字が左右どちらかで必ず読めなくなるため、
// 透過 (hdr--hero) モードは廃止。詳細は salon.css の Header セクション参照。
export function SalonHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="hdr hdr--solid" id="hdr">
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
