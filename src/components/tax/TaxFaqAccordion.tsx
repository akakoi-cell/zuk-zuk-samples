"use client";

import { useState } from "react";
import { Icon } from "./ui";

export type TaxFaqItemData = { q: string; a: string };

// Claude Design の FaqItem/FaqAccordion を踏襲した、navy+gold テーマの
// アコーディオン。grid-template-rows のトランジションで滑らかに開閉する。
function FaqItem({
  q,
  a,
  open,
  onToggle,
  id,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
  id: number;
}) {
  return (
    <div className="border-b border-line">
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`tax-faq-a-${id}`}
        className="w-full flex items-start gap-5 py-6 text-left group"
      >
        <span className="font-mono text-[12px] text-gold-dark mt-1.5 tnum shrink-0">Q</span>
        <span className="flex-1 font-mincho text-[17px] md:text-[19px] text-navy leading-snug">{q}</span>
        <span
          className={`shrink-0 mt-0.5 text-navy/50 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        >
          <Icon name="plus" className="w-5 h-5" />
        </span>
      </button>
      <div
        id={`tax-faq-a-${id}`}
        role="region"
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="flex gap-5 pb-7 pl-0">
            <span className="font-mono text-[12px] text-ink-400 mt-0.5 shrink-0">A</span>
            <p className="jp text-[14.5px] text-ink-600 max-w-[62ch]">{a}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TaxFaqAccordion({ items }: { items: TaxFaqItemData[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="border-t border-line">
      {items.map((it, i) => (
        <FaqItem
          key={i}
          id={i}
          q={it.q}
          a={it.a}
          open={open === i}
          onToggle={() => setOpen(open === i ? -1 : i)}
        />
      ))}
    </div>
  );
}
