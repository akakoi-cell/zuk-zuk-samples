import { Section, SectionHead, Ph } from "./ui";
import { ABOUT } from "@/lib/tax-content";

export function TaxAbout() {
  return (
    <Section id="about" tone="ivory" className="py-20 md:py-28">
      <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
        <div className="md:col-span-5 reveal">
          <Ph label="代表税理士 PORTRAIT" ratio="4/5" tone="ivory" className="w-full" />
          <div className="mt-5 flex items-end justify-between border-t border-navy/20 pt-5">
            <div>
              <div className="font-mincho text-[20px] text-navy">{ABOUT.name}</div>
              <div className="font-zen text-[12px] text-ink-600 mt-1">{ABOUT.title}</div>
            </div>
            <span className="font-mono text-[10px] tracking-eyebrow text-gold-dark">{ABOUT.est}</span>
          </div>
        </div>
        <div className="md:col-span-7 reveal">
          <SectionHead variant="grid" num="08" en="About" title="代表のごあいさつ" />
          <div className="mt-8 space-y-5">
            {ABOUT.paragraphs.map((p, i) => (
              <p key={i} className="jp text-[15px] text-ink-600">
                {p}
              </p>
            ))}
            <p className="jp text-[15px] text-navy font-medium">{ABOUT.closing}</p>
          </div>
          {/* credentials */}
          <div className="surf overflow-hidden grid grid-cols-2 sm:grid-cols-4 gap-px bg-line border border-line mt-10">
            {ABOUT.credentials.map(([k, v]) => (
              <div key={k} className="bg-ivory p-5 text-center">
                <div className="font-mincho font-semibold text-navy text-[22px] tnum leading-none">{v}</div>
                <div className="text-[10.5px] text-ink-400 mt-2 tracking-wide">{k}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
