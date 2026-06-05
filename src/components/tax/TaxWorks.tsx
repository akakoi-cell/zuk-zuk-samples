import { Section, SectionHead, Icon, Ph } from "./ui";
import { WORKS } from "@/lib/tax-content";

type WorkItem = {
  tag: string;
  title: string;
  before: string;
  after: string;
  metric: string;
  unit: string;
  who: string;
};

// Phase F で Sanity から fetch した配列を渡せるよう props で受け取れる形に。
// 未指定時はハードコードデータ (WORKS) をフォールバック描画する。
export function TaxWorks({ items = WORKS }: { items?: WorkItem[] }) {
  return (
    <Section id="works" className="py-20 md:py-28">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <SectionHead
          variant="grid"
          num="05"
          en="Works"
          title="解決事例"
          lead="実際に不動産オーナーの方の課題をどう解決したか。守秘のため一部を加工しています。"
        />
        <a
          href="#"
          className="hidden md:inline-flex items-center gap-2 font-dm text-[13px] tracking-wide text-navy hover:text-gold-dark transition-colors shrink-0"
        >
          すべての事例を見る <Icon name="arrowUR" className="w-4 h-4" />
        </a>
      </div>
      <div className="grid md:grid-cols-3 gap-6 md:gap-7 mt-12">
        {items.map((w, i) => (
          <a
            href="#"
            key={i}
            className="surf overflow-hidden group block bg-paper border border-line hover:border-navy/40 transition-colors reveal"
          >
            <Ph label={`CASE ${String(i + 1).padStart(2, "0")}`} ratio="16/10" tone="navy" className="border-0 border-b" />
            <div className="p-6 md:p-7">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-wide2 uppercase text-navy bg-gold-tint px-2.5 py-1">
                  {w.tag}
                </span>
                <span className="font-mono text-[11px] text-ink-400">{w.who}</span>
              </div>
              <h3 className="font-mincho text-[18px] md:text-[19px] text-navy leading-snug mt-4 min-h-[3.4em] group-hover:text-gold-dark transition-colors">
                {w.title}
              </h3>
              <div className="mt-5 pt-5 border-t border-line flex items-end justify-between">
                <div className="flex flex-col gap-1 text-[11px] text-ink-400 jp-tight">
                  <span>{w.before}</span>
                  <span className="flex items-center gap-1 text-navy/70">
                    <Icon name="arrow" className="w-3.5 h-3.5 text-gold-dark" />
                    {w.after}
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-mincho font-semibold tnum text-navy text-[26px] leading-none">{w.metric}</div>
                  <div className="text-[10px] text-gold-dark tracking-wide mt-1">{w.unit}</div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
