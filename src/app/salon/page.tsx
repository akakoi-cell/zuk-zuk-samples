import { SalonHeader } from "@/components/salon/SalonHeader";
import { SalonHero } from "@/components/salon/SalonHero";
import { SalonAbout } from "@/components/salon/SalonAbout";
import { SalonStylists } from "@/components/salon/SalonStylists";
import { SalonMenu } from "@/components/salon/SalonMenu";
import { SalonGallery } from "@/components/salon/SalonGallery";
import { SalonVoice } from "@/components/salon/SalonVoice";
import { SalonAccess } from "@/components/salon/SalonAccess";
import { SalonFaq } from "@/components/salon/SalonFaq";
import { SalonLineBanner } from "@/components/salon/SalonLineBanner";
import { SalonContact } from "@/components/salon/SalonContact";
import { SalonFooter } from "@/components/salon/SalonFooter";
import { SalonReveal } from "@/components/salon/SalonReveal";
import { getSalonWorks } from "@/sanity/queries";

export default async function SalonPage() {
  // Sanity 未設定時は queries 側が GALLERY_FALLBACK にフォールバックする
  const gallery = await getSalonWorks();
  return (
    <>
      <SalonHeader />
      <main>
        <SalonHero />
        <SalonAbout />
        <SalonStylists />
        <SalonMenu />
        <SalonGallery items={gallery} />
        <SalonVoice />
        <SalonAccess />
        <SalonFaq />
        <SalonContact />
        <SalonLineBanner />
      </main>
      <SalonFooter />
      <SalonReveal />
    </>
  );
}
