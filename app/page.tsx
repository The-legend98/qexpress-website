"use client";

import { useLang } from "@/lib/LangContext";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import FleetSection from "@/components/sections/FleetSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import ContactCTASection from "@/components/sections/ContactCTASection";
import SectionDivider from "@/components/ui/SectionDivider";
import TrackingSection from "@/components/sections/TrackingSection";
import ShippingCalculator from "@/components/sections/ShippingCalculator";



export default function Home() {
  const { lang } = useLang();
  return (
    <>
      <HeroSection />
      <TrackingSection />
      <ShippingCalculator />
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