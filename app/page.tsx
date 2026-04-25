"use client";

import { useLang } from "@/lib/LangContext";
import HeroSection from "@/components/sections/HeroSection";

export default function Home() {
  const { lang } = useLang();
  return <HeroSection lang={lang} />;
}