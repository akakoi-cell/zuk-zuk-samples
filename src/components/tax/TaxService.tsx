"use client";

import { useState } from "react";
import { Section, SectionHead, Icon, Btn } from "./ui";
import { SERVICES } from "@/lib/tax-content";

export function TaxService() {
  const [tab, setTab] = useState(0);
  const s = SERVICES[tab];
  return (
    <Section id="service" tone="ivory" className="py-20 md:py-28">
      <SectionHead
        variant="edit"
        num="04"
        en="Service"
        title="3 つの関わり方"
        lead="ご状況に合わせて、顧問・法人化・スポットの 3 つからお選びいただけます。"
      />
      {/* tabs */}
      <div className="surf overflow-hidden mt-12 flex flex-wrap justify-center gap-0 border border-line bg-paper reveal max-w-[680px] mx-auto">
        {SERVICES.map((sv, i) => (
          <button
            key={sv.key}
            onClick={() => setTab(i)}
            className={`flex-1 min-w-[33%] px-4 py-4 text-center border-b-2 transition-colors ${
              tab === i ? "border-gold bg-navy text-white" : "border-transparent text-navy/70 hover:bg-navy/[0.04]"
            }`}
          >
            <div className="font-mincho text-[15px] md:text-[17px]">{sv.tab}</div>
            <div
              className={`font-mono text-[9px] tracking-eyebrow uppercase mt-1 ${
                tab === i ? "text-gold-light" : "text-ink-400"
              }`}
            >
              {sv.en}
            </div>
          </button>
        ))}
      </div>
      {/* panel */}
      <div className="surf overflow-hidden mt-px border border-line border-t-0 bg-paper p-8 md:p-12 reveal">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="font-mono text-[10px] tracking-eyebrow uppercase text-gold-dark">{s.en}</div>
            <h3 className="font-mincho text-[26px] md:text-[30px] text-navy mt-3">{s.tab}</h3>
            <p className="jp text-[14.5px] text-ink-600 mt-5">{s.lead}</p>
            <div className="mt-8 border-t border-line pt-6">
              <div className="font-mono text-[10px] tracking-eyebrow uppercase text-ink-400">料金の目安</div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-mincho font-semibold text-navy text-[30px] tnum">{s.price}</span>
              </div>
              <div className="text-[12px] text-ink-400 mt-1">{s.note}</div>
            </div>
            <div className="mt-7">
              <Btn href="#contact" icon="arrow">
                この内容で相談する
              </Btn>
            </div>
          </div>
          <div className="md:col-span-7 md:border-l border-line md:pl-10">
            <div className="font-mono text-[10px] tracking-eyebrow uppercase text-ink-400 mb-5">含まれるもの</div>
            <ul className="flex flex-col">
              {s.items.map((it, i) => (
                <li key={i} className="flex items-start gap-4 py-3.5 border-b border-line/70">
                  <Icon name="check" className="w-5 h-5 text-gold-dark shrink-0 mt-0.5" />
                  <span className="jp-tight text-[14.5px] text-navy/90">{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
