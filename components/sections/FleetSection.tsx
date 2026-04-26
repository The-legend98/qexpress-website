"use client";

import { useLang } from "@/lib/LangContext";
import GlowCard from "@/components/ui/GlowCard";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface FleetSectionProps {
  lang: "ar" | "en";
}

const content = {
  ar: {
    badge: "أسطولنا",
    title: "مبني للسرعة",
    highlight: "والاستدامة",
    subtitle: "أسطول حديث ومتعدد الوسائط يجمع بين الرشاقة والمسؤولية البيئية — كل مركبة مجهزة بتقنية التتبع وتلتزم ببروتوكولات السلامة الصارمة.",
    vehicles: [
      { icon: "bike", title: "دراجات نارية", desc: "توصيل حضري سريع للوثائق والطرود الصغيرة", tag: "سريع", color: "green" },
      { icon: "car", title: "سيارات كهربائية", desc: "خدمة مميزة صديقة للبيئة وهادئة", tag: "صديق للبيئة", color: "green" },
      { icon: "van", title: "فانات وشاحنات", desc: "شحن البضائع الضخمة والتجارة الإلكترونية", tag: "سعة كبيرة", color: "maroon" },
      { icon: "drone", title: "طائرات مسيّرة", desc: "توسيع التغطية للمناطق النائية — قادم قريباً", tag: "قريباً", color: "gray" },
    ],
    stats: [
      { num: "4+", label: "أنواع مركبات" },
      { num: "100%", label: "تتبع GPS" },
      { num: "24/7", label: "عمليات مستمرة" },
      { num: "2025", label: "أسطول حديث" },
    ],
  },
  en: {
    badge: "Our Fleet",
    title: "Built for Speed",
    highlight: "& Sustainability",
    subtitle: "A modern, multimodal fleet combining agility with environmental responsibility — every vehicle equipped with tracking technology and rigorous safety protocols.",
    vehicles: [
      { icon: "bike", title: "Motorbikes", desc: "Fast urban delivery for documents and small parcels", tag: "Fast", color: "green" },
      { icon: "car", title: "Electric Cars", desc: "Quiet, zero-emission premium service", tag: "Eco-Friendly", color: "green" },
      { icon: "van", title: "Vans & Trucks", desc: "Bulk shipments and e-commerce secure transport", tag: "High Capacity", color: "maroon" },
      { icon: "drone", title: "Drones", desc: "Expanding reach to remote areas — coming soon", tag: "Coming Soon", color: "gray" },
    ],
    stats: [
      { num: "4+", label: "Vehicle Types" },
      { num: "100%", label: "GPS Tracked" },
      { num: "24/7", label: "Operations" },
      { num: "2025", label: "Modern Fleet" },
    ],
  },
};

const VehicleIcon = ({ type }: { type: string }) => {
  const cls = "w-8 h-8";
  if (type === "bike") return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0l-3 3m3-3l3 3M6 18a2 2 0 100-4 2 2 0 000 4zm12 0a2 2 0 100-4 2 2 0 000 4zM9 10h6" /></svg>;
  if (type === "car") return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 17H3a1 1 0 01-1-1v-4a1 1 0 01.553-.894l4-2A1 1 0 017 9h10a1 1 0 01.894.553l2 4A1 1 0 0120 14v2a1 1 0 01-1 1h-2M7 17h10M7 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
  if (type === "van") return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17H6a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v3m-4 7h-4m4 0a2 2 0 104 0 2 2 0 00-4 0zm-4 0a2 2 0 11-4 0 2 2 0 014 0zM16 9h4l2 4v2h-6V9z" /></svg>;
  return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
};

export default function FleetSection({ lang }: FleetSectionProps) {
  const { isDark } = useLang();
  const t = content[lang];
  const isAr = lang === "ar";

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className={`relative py-24 md:py-32 overflow-hidden transition-colors duration-300 section-sep ${
          isDark ? "section-dark-3" : "section-light-1"
        }`}   >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        {isDark && (
          <>
            <div className="absolute top-0 right-1/3 w-[600px] h-[400px] rounded-full bg-[#8B1A2A]/4 blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#1a5c2a]/4 blur-3xl" />
          </>
        )}
        <svg className={`absolute inset-0 w-full h-full ${isDark ? "opacity-[0.025]" : "opacity-[0.04]"}`} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="fleet-dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill={isDark ? "#ffffff" : "#000000"} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#fleet-dots)" />
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
            highlightColor="maroon"
          />
        </AnimatedSection>

        {/* Vehicle Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {t.vehicles.map((v, idx) => {
            const isGreen = v.color === "green";
            const isGray = v.color === "gray";

            return (
              <AnimatedSection key={v.title} delay={idx * 120}>
                <div
                  className={`group relative rounded-2xl p-6 border transition-all duration-300 h-full ${
                    isGray
                      ? isDark
                        ? "bg-[#0d1421]/50 border-white/3 opacity-60"
                        : "bg-white/50 border-gray-100 opacity-60"
                      : isDark
                        ? "bg-[#0d1421] border-white/6 hover:border-[rgba(26,92,42,0.4)] hover:-translate-y-2 cursor-pointer"
                        : "bg-white border-gray-100 hover:border-[rgba(26,92,42,0.3)] hover:shadow-xl hover:-translate-y-2 cursor-pointer"
                  }`}
                  style={
                    !isGray && isDark
                      ? {
                          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                        }
                      : {}
                  }
                >
                  {/* Glow on hover */}
                  {!isGray && (
                    <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      isGreen
                        ? "shadow-[0_0_30px_rgba(26,92,42,0.15)]"
                        : "shadow-[0_0_30px_rgba(139,26,42,0.15)]"
                    }`} />
                  )}

                  {/* Icon */}
                  <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 ${
                    isGray
                      ? isDark ? "bg-white/5 text-gray-600" : "bg-gray-50 text-gray-400"
                      : isGreen
                        ? isDark
                          ? "bg-[#1a5c2a]/15 text-[#4ade80] group-hover:bg-[#1a5c2a]/25 group-hover:shadow-[0_0_20px_rgba(26,92,42,0.4)]"
                          : "bg-[#1a5c2a]/10 text-[#1a5c2a] group-hover:bg-[#1a5c2a] group-hover:text-white"
                        : isDark
                          ? "bg-[#8B1A2A]/15 text-[#e05568] group-hover:bg-[#8B1A2A]/25 group-hover:shadow-[0_0_20px_rgba(139,26,42,0.4)]"
                          : "bg-[#8B1A2A]/10 text-[#8B1A2A] group-hover:bg-[#8B1A2A] group-hover:text-white"
                  }`}>
                    <VehicleIcon type={v.icon} />
                  </div>

                  {/* Tag */}
                  <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${
                    isGray
                      ? isDark ? "bg-white/5 text-gray-500" : "bg-gray-100 text-gray-400"
                      : isGreen
                        ? isDark ? "bg-[#1a5c2a]/20 text-[#4ade80]" : "bg-[#1a5c2a]/10 text-[#1a5c2a]"
                        : isDark ? "bg-[#8B1A2A]/20 text-[#e05568]" : "bg-[#8B1A2A]/10 text-[#8B1A2A]"
                  }`}>
                    {v.tag}
                  </span>

                  <h3 className={`text-base font-bold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>
                    {v.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    {v.desc}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Stats Bar */}
        <AnimatedSection delay={300}>
          <div
            className={`relative rounded-3xl overflow-hidden p-8 ${
              isDark
                ? "bg-gradient-to-r from-[#0d1421] via-[#0f1a12] to-[#0d1421] border border-white/5"
                : "bg-gradient-to-r from-[#1a5c2a] to-[#134a20]"
            }`}
            style={
              isDark
                ? { boxShadow: "0 0 60px rgba(26,92,42,0.08), inset 0 1px 0 rgba(255,255,255,0.05)" }
                : { boxShadow: "0 16px 48px rgba(26,92,42,0.3)" }
            }
          >
            {/* Decorative glow */}
            {isDark && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-[#1a5c2a]/60 to-transparent" />
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {t.stats.map((stat, i) => (
                <div key={stat.label} className={`text-center ${i < 3 ? `md:border-${isAr ? "l" : "r"} ${isDark ? "md:border-white/5" : "md:border-white/20"}` : ""}`}>
                  <div className={`text-3xl md:text-4xl font-bold mb-1 ${
                    isDark
                      ? i % 2 === 0 ? "gradient-text-green" : "gradient-text-maroon"
                      : "text-white"
                  }`}>
                    {stat.num}
                  </div>
                  <div className={`text-sm ${isDark ? "text-slate-500" : "text-white/70"}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}