import { Section, SectionHead } from "./ui";
import { VOICES } from "@/lib/tax-content";

export function TaxVoice() {
  return (
    <Section id="voice" className="py-20 md:py-28">
      <SectionHead
        variant="edit"
        num="07"
        en="Voice"
        title="お客様の声"
        lead="顧問先の不動産オーナーの皆さまからいただいた言葉です。"
      />
      <div className="grid md:grid-cols-2 gap-6 md:gap-7 mt-14">
        {VOICES.map((v, i) => (
          <figure key={i} className="surf bg-ivory border border-line p-8 md:p-10 reveal relative">
            <span className="font-mincho text-gold/40 text-[64px] leading-none absolute top-5 right-7 select-none">
              &rdquo;
            </span>
            <blockquote className="font-mincho text-[18px] md:text-[21px] text-navy leading-[1.85] relative">
              {v.quote}
            </blockquote>
            <figcaption className="mt-7 pt-6 border-t border-line flex items-center gap-4">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-navy text-gold-light font-mincho text-sm shrink-0">
                声
              </span>
              <div>
                <div className="font-zen text-[14px] text-navy font-medium">{v.who}</div>
                <div className="font-mono text-[11px] text-ink-400 mt-0.5">{v.attr}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
