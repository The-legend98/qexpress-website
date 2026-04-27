"use client";

import { useLang } from "@/lib/LangContext";
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

const fleetImages: Record<string, string> = {
  bike: "/images/fleet-bike.png",
  car: "/images/fleet-car.png",
  van: "/images/fleet-van.png",
  drone: "/images/fleet-drone.png",
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
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        {isDark && (
          <>
            <div className="absolute top-0 right-1/3 w-[600px] h-[400px] rounded-full bg-[#8B1A2A]/4 blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#1a5c2a]/4 blur-3xl" />
          </>
        )}
        <svg
          className={`absolute inset-0 w-full h-full ${isDark ? "opacity-[0.025]" : "opacity-[0.04]"}`}
          xmlns="http://www.w3.org/2000/svg"
        >
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
            const isMaroon = v.color === "maroon";
            const isGray = v.color === "gray";

            const borderColor = isGray
              ? isDark ? "border-white/3" : "border-gray-100"
              : isGreen
                ? isDark ? "border-[#1a5c2a]/20 hover:border-[#1a5c2a]/50" : "border-[#1a5c2a]/10 hover:border-[#1a5c2a]/30"
                : isDark ? "border-[#8B1A2A]/20 hover:border-[#8B1A2A]/50" : "border-[#8B1A2A]/10 hover:border-[#8B1A2A]/30";

            const bgColor = isGray
              ? isDark ? "bg-[#0d1421]/50 opacity-60" : "bg-white/50 opacity-60"
              : isDark ? "bg-[#0d1421]" : "bg-white";

            return (
              <AnimatedSection key={v.title} delay={idx * 120}>
                <div
                  className={`group relative rounded-2xl p-6 border transition-all duration-300 h-full flex flex-col items-center text-center cursor-pointer ${bgColor} ${borderColor} ${
                    !isGray ? "hover:-translate-y-2 hover:shadow-xl" : ""
                  }`}
                  style={
                    !isGray && isDark
                      ? { boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }
                      : {}
                  }
                >
                  {/* Glow on hover */}
                  {!isGray && (
                    <div
                      className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                        isGreen
                          ? "shadow-[0_0_30px_rgba(26,92,42,0.15)]"
                          : "shadow-[0_0_30px_rgba(139,26,42,0.15)]"
                      }`}
                    />
                  )}

                  {/* Image */}
                  <div
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden mb-5 mx-auto transition-all duration-300 ring-2 ${
                      isGray
                        ? "opacity-50 ring-gray-200"
                        : isGreen
                          ? isDark ? "ring-[#1a5c2a]/30 group-hover:ring-[#1a5c2a]/60 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(26,92,42,0.4)]"
                                   : "ring-[#1a5c2a]/20 group-hover:ring-[#1a5c2a]/40 group-hover:scale-110"
                          : isDark ? "ring-[#8B1A2A]/30 group-hover:ring-[#8B1A2A]/60 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(139,26,42,0.4)]"
                                   : "ring-[#8B1A2A]/20 group-hover:ring-[#8B1A2A]/40 group-hover:scale-110"
                    }`}
                  >
                    <img
                      src={fleetImages[v.icon]}
                      alt={v.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Color overlay on hover */}
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                        isGreen ? "bg-[#1a5c2a]" : isMaroon ? "bg-[#8B1A2A]" : ""
                      }`}
                    />
                  </div>

                  {/* Tag */}
                  <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${
                      isGray
                        ? isDark ? "bg-white/5 text-gray-500" : "bg-gray-100 text-gray-400"
                        : isGreen
                          ? isDark ? "bg-[#1a5c2a]/20 text-[#4ade80]" : "bg-[#1a5c2a]/10 text-[#1a5c2a]"
                          : isDark ? "bg-[#8B1A2A]/20 text-[#e05568]" : "bg-[#8B1A2A]/10 text-[#8B1A2A]"
                    }`}
                  >
                    {v.tag}
                  </span>

                  <h3 className={`text-base font-bold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>
                    {v.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    {v.desc}
                  </p>

                  {/* Bottom accent line */}
                  {!isGray && (
                    <div
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-2/3 transition-all duration-500 rounded-full ${
                        isGreen ? "bg-[#1a5c2a]" : "bg-[#8B1A2A]"
                      }`}
                    />
                  )}
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
            {isDark && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-[#1a5c2a]/60 to-transparent" />
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {t.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`text-center py-2 ${
                    i < 3
                      ? isDark
                        ? `md:border-${isAr ? "l" : "r"} md:border-white/5`
                        : `md:border-${isAr ? "l" : "r"} md:border-white/20`
                      : ""
                  }`}
                >
                  <div
                    className={`text-3xl md:text-4xl font-bold mb-1 ${
                      isDark
                        ? i % 2 === 0 ? "gradient-text-green" : "gradient-text-maroon"
                        : "text-white"
                    }`}
                  >
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