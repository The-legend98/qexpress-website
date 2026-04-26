"use client";

import { useLang } from "@/lib/LangContext";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import FleetSection from "@/components/sections/FleetSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import ContactCTASection from "@/components/sections/ContactCTASection";

export default function Home() {
  const { lang } = useLang();
  return (
    <>
      <HeroSection lang={lang} />
      <ServicesSection lang={lang} />
      <FleetSection lang={lang} />
      <WhyUsSection lang={lang} />
      <ContactCTASection lang={lang} />
    </>
  );
}