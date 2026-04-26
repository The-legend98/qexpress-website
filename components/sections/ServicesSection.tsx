"use client";

import Link from "next/link";
import { useLang } from "@/lib/LangContext";
import GlowCard from "@/components/ui/GlowCard";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface ServicesSectionProps {
  lang: "ar" | "en";
}

const content = {
  ar: {
    badge: "ما نقدمه",
    title: "خدمات متكاملة",
    highlight: "لكل احتياجاتكم",
    subtitle: "نتخصص في ركيزتين أساسيتين مصممتين لتلبية احتياجات السوق السوري الحديث",
    services: [
      {
        color: "green" as const,
        label: "01",
        title: "التوصيل السريع",
        description: "توصيل سريع ومحدد الوقت من الباب للباب للوثائق والطرود داخل سوريا وإلى وجهات دولية.",
        features: ["تغطية كل المحافظات", "شحن دولي متكامل", "تتبع لحظي", "توصيل آمن للوثائق"],
      },
      {
        color: "maroon" as const,
        label: "02",
        title: "اللوجستيات التعاقدية",
        description: "حلول متكاملة تشمل التخزين وإدارة المخزون وتلبية الطلبات والتوزيع المخصص.",
        features: ["17,000 م² تخزين", "إدارة مخزون ذكية", "تلبية طلبات التجارة الإلكترونية", "توزيع مخصص"],
      },
    ],
    subServices: [
      { color: "green" as const, title: "دعم التجارة الإلكترونية", desc: "استلام وتحضير وتوصيل الطلبات للمتاجر الإلكترونية" },
      { color: "maroon" as const, title: "حلول مؤسسية", desc: "برامج توصيل مخصصة للشركات والمؤسسات" },
      { color: "green" as const, title: "توصيل آمن ومعتمد", desc: "معالجة خاصة للوثائق الرسمية والمواد الحساسة" },
      { color: "maroon" as const, title: "الشحن الدولي", desc: "خدمات شحن متكاملة لوجهات عالمية" },
    ],
    cta: "تعرف على كل خدماتنا",
  },
  en: {
    badge: "What We Offer",
    title: "Integrated Services",
    highlight: "For All Your Needs",
    subtitle: "We specialize in two core pillars designed to meet the critical needs of the modern Syrian market",
    services: [
      {
        color: "green" as const,
        label: "01",
        title: "Express Delivery",
        description: "Time-definite, door-to-door delivery for documents and parcels across Syria and to international destinations.",
        features: ["All Governorates Coverage", "International Shipping", "Real-time Tracking", "Secure Document Delivery"],
      },
      {
        color: "maroon" as const,
        label: "02",
        title: "Contract Logistics",
        description: "Integrated solutions including warehousing, inventory management, order fulfillment, and dedicated distribution.",
        features: ["17,000 m² Storage", "Smart Inventory Management", "E-Commerce Fulfillment", "Dedicated Distribution"],
      },
    ],
    subServices: [
      { color: "green" as const, title: "E-Commerce Support", desc: "Pickup, preparation and last-mile delivery for online retailers" },
      { color: "maroon" as const, title: "Corporate Solutions", desc: "Customized delivery programs for businesses and institutions" },
      { color: "green" as const, title: "Secured & Fast", desc: "Specialized handling for official mail and sensitive materials" },
      { color: "maroon" as const, title: "International Shipping", desc: "Integrated shipping to global destinations via our network" },
    ],
    cta: "Explore All Services",
  },
};

const ServiceIcon = ({ color }: { color: "green" | "maroon" }) => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {color === "green" ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    )}
  </svg>
);

export default function ServicesSection({ lang }: ServicesSectionProps) {
  const { isDark } = useLang();
  const t = content[lang];
  const isAr = lang === "ar";

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className={`relative py-24 md:py-32 overflow-hidden transition-colors duration-300 ${isDark ? "bg-[#080d14]" : "bg-slate-50"}`}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {isDark && (
          <>
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#1a5c2a]/5 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#8B1A2A]/5 blur-3xl" />
          </>
        )}
        {/* Grid pattern */}
        <svg className={`absolute inset-0 w-full h-full ${isDark ? "opacity-[0.03]" : "opacity-[0.04]"}`} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="services-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={isDark ? "#ffffff" : "#000000"} strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#services-grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <AnimatedSection>
          <SectionHeader
            badge={t.badge}
            title={t.title}
            highlight={t.highlight}
            subtitle={t.subtitle}
          />
        </AnimatedSection>

        {/* Main Services */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {t.services.map((service, idx) => {
            const isGreen = service.color === "green";
            return (
              <AnimatedSection key={service.title} delay={idx * 150}>
                <div
                  className={`relative rounded-3xl p-8 md:p-10 overflow-hidden group transition-all duration-300 ${
                    isGreen
                      ? "bg-gradient-to-br from-[#1a5c2a] to-[#0d3318]"
                      : "bg-gradient-to-br from-[#8B1A2A] to-[#4a0d15]"
                  }`}
                  style={{
                    boxShadow: isDark
                      ? isGreen
                        ? "0 0 40px rgba(26,92,42,0.2), inset 0 1px 0 rgba(255,255,255,0.1)"
                        : "0 0 40px rgba(139,26,42,0.2), inset 0 1px 0 rgba(255,255,255,0.1)"
                      : isGreen
                        ? "0 8px 32px rgba(26,92,42,0.25)"
                        : "0 8px 32px rgba(139,26,42,0.25)",
                  }}
                >
                  {/* Glow orb */}
                  <div className={`absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-30 transition-opacity duration-300 group-hover:opacity-50 ${isGreen ? "bg-[#4ade80]" : "bg-[#e05568]"}`} />

                  {/* Label */}
                  <div className="relative flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center text-white backdrop-blur-sm">
                      <ServiceIcon color={service.color} />
                    </div>
                    <span className="text-white/20 text-5xl font-bold">{service.label}</span>
                  </div>

                  <h3 className="relative text-2xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="relative text-white/65 text-sm leading-relaxed mb-7">{service.description}</p>

                  <div className="relative grid grid-cols-2 gap-2">
                    {service.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/50 shrink-0" />
                        <span className="text-white/75 text-xs">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Sub Services */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {t.subServices.map((sub, idx) => {
            const isGreen = sub.color === "green";
            return (
              <AnimatedSection key={sub.title} delay={idx * 100}>
                <GlowCard glowColor={sub.color} className="p-5 h-full">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${isGreen ? "bg-[#1a5c2a]/15 text-[#1a5c2a]" : "bg-[#8B1A2A]/15 text-[#8B1A2A]"} ${isDark ? (isGreen ? "text-[#4ade80]" : "text-[#e05568]") : ""}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h4 className={`font-semibold text-sm mb-2 ${isGreen ? (isDark ? "text-[#4ade80]" : "text-[#1a5c2a]") : (isDark ? "text-[#e05568]" : "text-[#8B1A2A]")}`}>
                    {sub.title}
                  </h4>
                  <p className={`text-xs leading-relaxed ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    {sub.desc}
                  </p>
                </GlowCard>
              </AnimatedSection>
            );
          })}
        </div>

        {/* CTA */}
        <AnimatedSection>
          <div className="text-center">
            <Link
              href="/services"
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
                isDark
                  ? "bg-[#1a5c2a] text-white hover:bg-[#134a20] shadow-[0_0_30px_rgba(26,92,42,0.3)]"
                  : "bg-[#1a5c2a] text-white hover:bg-[#134a20] shadow-lg shadow-[#1a5c2a]/20"
              }`}
            >
              {t.cta}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isAr ? "M19 12H5M12 5l-7 7 7 7" : "M5 12h14M12 5l7 7-7 7"} />
              </svg>
            </Link>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}