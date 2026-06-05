import { Section, SectionHead, Icon } from "./ui";
import { PILLARS } from "@/lib/tax-content";

export function TaxWhyUs() {
  return (
    <Section id="why" className="py-20 md:py-28">
      <SectionHead
        variant="edit"
        num="03"
        en="Why choose us"
        title={
          <>
            選ばれる、<span className="text-gold-dark">3</span> つの理由
          </>
        }
        lead="数ある税理士事務所の中で、不動産オーナーの方に私たちが選ばれている理由です。"
      />
      <div className="mt-14 border-t border-navy/20">
        {PILLARS.map((p) => (
          <div
            key={p.n}
            className="grid md:grid-cols-12 gap-6 md:gap-8 py-9 md:py-11 border-b border-line items-start reveal"
          >
            <div className="md:col-span-1 flex md:block items-center gap-4">
              <span className="font-mincho font-semibold text-gold-dark text-[34px] leading-none tnum">{p.n}</span>
            </div>
            <div className="md:col-span-1 hidden md:block">
              <span className="inline-flex items-center justify-center w-12 h-12 border border-navy/20 text-navy">
                <Icon name={p.icon} className="w-6 h-6" />
              </span>
            </div>
            <div className="md:col-span-6">
              <div className="font-mono text-[10px] tracking-eyebrow uppercase text-gold-dark mb-2">{p.en}</div>
              <h3 className="font-mincho text-[22px] md:text-[26px] text-navy leading-snug">{p.t}</h3>
              <p className="jp text-[14.5px] text-ink-600 mt-4 max-w-[54ch]">{p.b}</p>
            </div>
            <div className="md:col-span-4 md:text-right md:border-l border-line md:pl-8 self-center">
              <div className="font-mincho font-semibold tnum text-navy text-[28px] md:text-[34px] leading-none">
                {p.stat}
              </div>
              <div className="text-[11px] tracking-[0.12em] text-ink-400 mt-2">KEY FIGURE</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
