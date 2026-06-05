import { Section, SectionHead, Icon } from "./ui";
import { CONCERNS } from "@/lib/tax-content";

export function TaxConcerns() {
  return (
    <Section id="concerns" tone="ivory" className="py-20 md:py-28">
      <SectionHead
        variant="edit"
        num="02"
        en="Concerns"
        title={
          <>
            こんなお悩み、<br className="sm:hidden" />
            ありませんか
          </>
        }
        lead="不動産オーナーの方から、私たちがよくいただくご相談です。ひとつでも当てはまれば、お役に立てます。"
      />
      <div className="surf overflow-hidden grid md:grid-cols-3 gap-px bg-line mt-14 border border-line">
        {CONCERNS.map((c) => (
          <div key={c.n} className="bg-paper p-8 md:p-9 reveal group">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center justify-center w-12 h-12 border border-navy/15 text-navy group-hover:border-gold group-hover:text-gold-dark transition-colors">
                <Icon name={c.icon} className="w-6 h-6" />
              </span>
              <span className="font-mono text-[13px] text-ink-400 tnum">{c.n}</span>
            </div>
            <h3 className="font-mincho text-[19px] text-navy leading-snug mt-6">{c.t}</h3>
            <p className="jp text-[14px] text-ink-600 mt-3">{c.b}</p>
          </div>
        ))}
      </div>
      <p className="text-center font-mincho text-[17px] md:text-[20px] text-navy mt-14 reveal">
        そのお悩み、<span className="text-gold-dark">不動産オーナー専門</span>の私たちにお任せください。
      </p>
    </Section>
  );
}
