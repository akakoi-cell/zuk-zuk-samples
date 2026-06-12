import { SchoolHeader } from "@/components/school/SchoolHeader";
import { SchoolHero } from "@/components/school/SchoolHero";
import { SchoolAbout } from "@/components/school/SchoolAbout";
import { SchoolFeatures } from "@/components/school/SchoolFeatures";
import { SchoolTeachers } from "@/components/school/SchoolTeachers";
import { SchoolCourses } from "@/components/school/SchoolCourses";
import {
  SchoolPricing,
  SchoolTrial,
  SchoolAccess,
  SchoolFaq,
  SchoolLineBanner,
  SchoolContact,
  SchoolFooter,
} from "@/components/school/SchoolLower";
import { SchoolReveal } from "@/components/school/SchoolReveal";

export default function SchoolPage() {
  return (
    <>
      <SchoolHeader />
      <main>
        {/* ↓ Figma 忠実再現セクション (node 8-627) */}
        <SchoolHero />
        <SchoolAbout />
        <SchoolFeatures />
        <SchoolTeachers />
        <SchoolCourses />
        {/* ↓ Figma に図面なし → コード設計 (on-brand) */}
        <SchoolPricing />
        <SchoolTrial />
        <SchoolAccess />
        <SchoolFaq />
        <SchoolContact />
        <SchoolLineBanner />
      </main>
      <SchoolFooter />
      <SchoolReveal />
    </>
  );
}
