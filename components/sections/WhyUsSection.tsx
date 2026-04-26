"use client";

import { useLang } from "@/lib/LangContext";
import GlowCard from "@/components/ui/GlowCard";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface WhyUsSectionProps {
  lang: "ar" | "en";
}

const content = {
  ar: {
    badge: "لماذا Q Express؟",
    title: "ما يميزنا عن",
    highlight: "الجميع",
    subtitle: "لا نقدم مجرد خدمة — نقدم منصة متكاملة مدعومة بشبكة إقليمية راسخة وخبرة عالمية وبنية تحتية مستقبلية.",
    reasons: [
      { icon: "network", color: "green", title: "شبكة الشبكات", desc: "موقعنا ضمن مجموعة دمسكو وتحالفات الشركات الشقيقة الإقليمية يمنحنا وصولاً لا مثيل له للسوق وثباتاً تشغيلياً لا يستطيع أي مشغل مستقل تحقيقه." },
      { icon: "globe", color: "maroon", title: "معايير عالمية وخبرة محلية", desc: "خلفية فريقنا الإداري مع كبار المشغلين العالميين تضمن عمليات وفق أفضل الممارسات الدولية مع فهم عميق للسوق السوري." },
      { icon: "tech", color: "green", title: "بنية تحتية مستقبلية", desc: "كمنضم جديد، تقنيتنا وعملياتنا حديثة بالتصميم — رشيقة وقابلة للتوسع ومبنية للتكامل، دون قيود الأنظمة القديمة." },
      { icon: "partner", color: "maroon", title: "شراكة حقيقية", desc: "نلتزم بأن نكون امتداداً حقيقياً لعمليات عملائنا، ونوائم نجاحنا مع نجاحهم من خلال التواصل الشفاف والحلول المخصصة." },
    ],
    networkTitle: "شبكتنا الإقليمية",
    partners: [
      { name: "مجموعة دمسكو", role: "المجموعة الأم — سوريا", color: "green" },
      { name: "GCL الأردن", role: "Global Central Logistics", color: "maroon" },
      { name: "GCL الإمارات", role: "Global Central Logistics", color: "maroon" },
      { name: "D2D دبي", role: "وكيل Fly Sham Airlines", color: "green" },
    ],
  },
  en: {
    badge: "Why Q Express?",
    title: "What Sets Us",
    highlight: "Apart",
    subtitle: "We provide more than a service — we offer a platform backed by a solid regional network, global expertise, and future-built infrastructure.",
    reasons: [
      { icon: "network", color: "green", title: "Network of Networks", desc: "Our embedded position within the Damsco Group and regional sister-company alliances deliver unparalleled market access and operational stability that a standalone operator cannot match." },
      { icon: "globe", color: "maroon", title: "Global Standards, Local Expertise", desc: "Our management's background with global leaders ensures we operate with an international best-practice mindset, applied with nuanced understanding of the Syrian market." },
      { icon: "tech", color: "green", title: "Future-Built Infrastructure", desc: "As a new entrant, our technology and processes are modern by design — agile, scalable, and built for integration, not held back by legacy systems." },
      { icon: "partner", color: "maroon", title: "Dedicated Partnership", desc: "We are committed to being a true extension of our clients' operations, aligning our success directly with theirs through transparent communication and customized solutions." },
    ],
    networkTitle: "Our Regional Network",
    partners: [
      { name: "Damsco Group", role: "Parent Group — Syria", color: "green" },
      { name: "GCL Jordan", role: "Global Central Logistics", color: "maroon" },
      { name: "GCL UAE", role: "Global Central Logistics", color: "maroon" },
      { name: "D2D Dubai", role: "Fly Sham Airlines Agent", color: "green" },
    ],
  },
};

const ReasonIcon = ({ type }: { type: string }) => {
  const cls = "w-6 h-6";
  if (type === "network") return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
  if (type === "globe") return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  if (type === "tech") return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" /></svg>;
  return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
};

export default function WhyUsSection({ lang }: WhyUsSectionProps) {
  const { isDark } = useLang();
  const t = content[lang];
  const isAr = lang === "ar";

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className={`relative py-24 md:py-32 overflow-hidden transition-colors duration-300 ${isDark ? "bg-[#050810]" : "bg-white"}`}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        {isDark && (
          <>
            <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#1a5c2a]/4 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#8B1A2A]/4 blur-3xl" />
          </>
        )}
        <svg className={`absolute inset-0 w-full h-full ${isDark ? "opacity-[0.025]" : "opacity-[0.035]"}`} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="whyus-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={isDark ? "#ffffff" : "#000000"} strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#whyus-grid)" />
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
            highlightColor="green"
          />
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-6 items-start">

          {/* Reasons */}
          <div className="grid gap-4">
            {t.reasons.map((reason, i) => {
              const isGreen = reason.color === "green";
              return (
                <AnimatedSection key={reason.title} delay={i * 100}>
                  <GlowCard glowColor={isGreen ? "green" : "maroon"} className="p-6 flex gap-5 group">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isGreen
                        ? isDark ? "bg-[#1a5c2a]/15 text-[#4ade80] group-hover:bg-[#1a5c2a]/25 group-hover:shadow-[0_0_20px_rgba(26,92,42,0.3)]"
                                 : "bg-[#1a5c2a]/10 text-[#1a5c2a] group-hover:bg-[#1a5c2a]/15"
                        : isDark ? "bg-[#8B1A2A]/15 text-[#e05568] group-hover:bg-[#8B1A2A]/25 group-hover:shadow-[0_0_20px_rgba(139,26,42,0.3)]"
                                 : "bg-[#8B1A2A]/10 text-[#8B1A2A] group-hover:bg-[#8B1A2A]/15"
                    }`}>
                      <ReasonIcon type={reason.icon} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold ${isGreen ? "bg-[#1a5c2a]" : "bg-[#8B1A2A]"}`}>
                          {i + 1}
                        </span>
                        <h3 className={`font-bold text-sm ${isDark ? "text-white" : "text-gray-800"}`}>
                          {reason.title}
                        </h3>
                      </div>
                      <p className={`text-sm leading-relaxed ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                        {reason.desc}
                      </p>
                    </div>
                  </GlowCard>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Network Card */}
          <AnimatedSection delay={200}>
            <div
              className="relative rounded-3xl p-8 text-white overflow-hidden h-full flex flex-col justify-between"
              style={{
                background: "linear-gradient(135deg, #1a5c2a 0%, #0d3318 60%, #1a1a2e 100%)",
                boxShadow: isDark
                  ? "0 0 60px rgba(26,92,42,0.25), inset 0 1px 0 rgba(255,255,255,0.1)"
                  : "0 16px 48px rgba(26,92,42,0.3)",
              }}
            >
              {/* Glow orbs */}
              <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#4ade80]/10 blur-3xl animate-glow" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[#8B1A2A]/20 blur-2xl" />

              {/* Dot pattern */}
              <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1" fill="white"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>
              </div>

              <div className="relative">
                {/* Title */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">{t.networkTitle}</h3>
                </div>

                {/* Partners */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {t.partners.map((partner) => (
                    <div
                      key={partner.name}
                      className={`rounded-2xl p-4 backdrop-blur-sm border ${
                        partner.color === "green"
                          ? "bg-white/10 border-white/10"
                          : "bg-[#8B1A2A]/40 border-[#8B1A2A]/30"
                      }`}
                    >
                      <p className="font-bold text-sm mb-1">{partner.name}</p>
                      <p className="text-white/50 text-xs">{partner.role}</p>
                    </div>
                  ))}
                </div>

                {/* Divider dots */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex-1 h-px bg-white/10" />
                  {[0,1,2].map((i) => (
                    <div key={i} className="w-1 h-1 rounded-full bg-white/30" />
                  ))}
                  <div className="flex-1 h-px bg-white/10" />
                </div>
              </div>

              {/* Stats */}
              <div className="relative grid grid-cols-3 gap-2 pt-5 border-t border-white/10">
                {[
                  { num: "4", label: isAr ? "دول" : "Countries" },
                  { num: "3", label: isAr ? "شركات شقيقة" : "Sister Cos." },
                  { num: "1", label: isAr ? "رؤية موحدة" : "Vision" },
                ].map((s, i) => (
                  <div key={s.label} className={`text-center py-2 ${i === 1 ? "border-x border-white/10" : ""}`}>
                    <div className="text-2xl font-bold">{s.num}</div>
                    <div className="text-white/50 text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}