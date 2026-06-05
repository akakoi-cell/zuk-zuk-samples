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

export default function TaxPage() {
  return (
    <>
      <TaxHeader />
      <main>
        <TaxHero />
        <TaxConcerns />
        <TaxWhyUs />
        <TaxService />
        <TaxWorks />
        <TaxColumn />
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
