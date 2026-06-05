import { Section, SectionHead, Icon } from "./ui";
import { COLUMNS } from "@/lib/tax-content";

type ColumnItem = { date: string; cat: string; title: string };

// Phase F で Sanity 連動。未指定時はハードコードデータをフォールバック描画。
export function TaxColumn({ items = COLUMNS }: { items?: ColumnItem[] }) {
  return (
    <Section id="column" tone="ivory" className="py-20 md:py-28">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <SectionHead
          variant="grid"
          num="06"
          en="Column"
          title="お役立ちコラム"
          lead="賃貸経営と税金について、知っておきたいことを平易にお届けします。"
        />
        <a
          href="#"
          className="hidden md:inline-flex items-center gap-2 font-dm text-[13px] tracking-wide text-navy hover:text-gold-dark transition-colors shrink-0"
        >
          コラム一覧へ <Icon name="arrowUR" className="w-4 h-4" />
        </a>
      </div>
      <div className="mt-12 border-t border-navy/20">
        {items.map((c, i) => (
          <a
            href="#"
            key={i}
            className="group grid grid-cols-12 gap-4 md:gap-8 items-center py-7 border-b border-line reveal"
          >
            <div className="col-span-12 md:col-span-2 flex items-center gap-4">
              <span className="font-mono text-[12px] text-ink-400 tnum">{c.date}</span>
            </div>
            <div className="col-span-12 md:col-span-2">
              <span className="font-mono text-[10px] tracking-wide2 uppercase text-gold-dark border border-gold/40 px-2.5 py-1">
                {c.cat}
              </span>
            </div>
            <div className="col-span-11 md:col-span-7">
              <h3 className="font-mincho text-[17px] md:text-[20px] text-navy leading-snug group-hover:text-gold-dark transition-colors">
                {c.title}
              </h3>
            </div>
            <div className="col-span-1 flex justify-end text-navy/40 group-hover:text-gold-dark group-hover:translate-x-1 transition-all">
              <Icon name="arrow" className="w-5 h-5" />
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
