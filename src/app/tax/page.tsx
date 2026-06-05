import { TaxHeader } from "@/components/tax/TaxHeader";
import { TaxHero } from "@/components/tax/TaxHero";
import { TaxConcerns } from "@/components/tax/TaxConcerns";
import { TaxWhyUs } from "@/components/tax/TaxWhyUs";
import { TaxService } from "@/components/tax/TaxService";
import { TaxWorks } from "@/components/tax/TaxWorks";
import { TaxColumn } from "@/components/tax/TaxColumn";
import { TaxVoice } from "@/components/tax/TaxVoice";
import { TaxAbout } from "@/components/tax/TaxAbout";
import { TaxFaq } from "@/components/tax/TaxFaq";
import { TaxContact } from "@/components/tax/TaxContact";
import { TaxFooter } from "@/components/tax/TaxFooter";
import { TaxReveal } from "@/components/tax/TaxReveal";
import { getTaxWorks, getTaxColumns } from "@/sanity/queries";

export default async function TaxPage() {
  // Sanity 未設定時は queries 側がハードコードデータにフォールバックする
  const [works, columns] = await Promise.all([getTaxWorks(), getTaxColumns()]);
  return (
    <>
      <TaxHeader />
      <main>
        <TaxHero />
        <TaxConcerns />
        <TaxWhyUs />
        <TaxService />
        <TaxWorks items={works} />
        <TaxColumn items={columns} />
        <TaxVoice />
        <TaxAbout />
        <TaxFaq />
        <TaxContact />
      </main>
      <TaxFooter />
      <TaxReveal />
    </>
  );
}
