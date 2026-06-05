import { Section, SectionHead } from "./ui";
import { TaxFaqAccordion } from "./TaxFaqAccordion";
import { TAX_FAQS } from "@/lib/tax-content";

export function TaxFaq() {
  return (
    <Section id="faq" className="py-20 md:py-28">
      <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
        <div className="md:col-span-4 reveal">
          <SectionHead
            variant="grid"
            num="09"
            en="FAQ"
            title={
              <>
                よくある
                <br />
                ご質問
              </>
            }
            lead="ここにない疑問も、相談時にお気軽にどうぞ。"
          />
        </div>
        <div className="md:col-span-8 reveal">
          <TaxFaqAccordion items={TAX_FAQS} />
        </div>
      </div>
    </Section>
  );
}
