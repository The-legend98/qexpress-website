"use client";

import { useLang } from "@/lib/LangContext";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import FleetSection from "@/components/sections/FleetSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import ContactCTASection from "@/components/sections/ContactCTASection";
import SectionDivider from "@/components/ui/SectionDivider";


export default function Home() {
  const { lang } = useLang();
  return (
    <>
      <HeroSection />
      <SectionDivider />
      <ServicesSection lang={lang} />
      <SectionDivider />
      <FleetSection lang={lang} />
      <SectionDivider />
      <WhyUsSection lang={lang} />
      <SectionDivider />
      <ContactCTASection lang={lang} />
    </>
  );
}