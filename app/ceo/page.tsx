"use client";

import { useLang } from "@/lib/LangContext";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const G = "#1a5c2a";
const M = "#8B1A2A";

const CEO_PHOTO = "/images/ceo.jpeg";

// ─── Content ─────────────────────────────────────────────────────────────────
const content = {
  ar: {
    hero: {
      badge: "قيادة المجموعة",
      role: "رئيس مجلس الإدارة",
      name: "محمد مؤمن محمد أيمن المراياتي",
      tagline: "قائد استراتيجي | خبير اقتصادي | رائد أعمال",
      summary: "رجل أعمال وقائد استراتيجي من الطراز الرفيع يتمتع بخبرة تنفيذية تزيد عن 20 عاماً في إدارة المجموعات الاستثمارية المتنوعة عبر منطقة الشرق الأوسط وشمال أفريقيا.",
      edu: { label: "التعليم", value: "بكالوريوس إدارة أعمال — تخصص اقتصاد", school: "جامعة دمشق، 2009" },
      presence: { label: "التواجد الإقليمي", countries: ["الأردن", "الإمارات", "مصر", "تركيا", "سوريا"] },
      exp: { label: "سنوات الخبرة", value: "+20" },
    },
    quote: {
      badge: "كلمة رئيس مجلس الإدارة",
      text: "رسالتنا هي بناء منظومة متكاملة من الثقة. وسواء كنا نقوم بتحويل الأموال، أو نقل البضائع، أو تقديم الخدمات التجارية والغذائية، فإن هدفنا هو أن نكون الجسر الذي يربط الناس بطموحاتهم. نحن لا نؤسس شركات فحسب، بل نبني إرثاً من الموثوقية العابرة للحدود.",
    },
    portfolio: {
      badge: "المحفظة الاستراتيجية",
      title: "إنجازات القيادة",
      sectors: [
        {
          color: "green",
          icon: "finance",
          title: "الخدمات المالية والتجارة الدولية",
          companies: [
            { name: "شركة المركزية للصرافة", loc: "الأردن، تأسست 1993", desc: "المؤسسة الأم للمجموعة — طوّرها وحدّثها لتحافظ على مكانتها ركيزةً مالية موثوقة." },
            { name: "جلوبال سنترال جنرال تريدنغ", loc: "دبي، تأسست 2016", desc: "المركز الاستراتيجي للتجارة الدولية والعمليات التجارية العابرة للحدود." },
            { name: "شادن للتجارة الدولية", loc: "الأردن، تأسست 2018", desc: "تعزيز حضور المجموعة في مشهد التجارة العالمية." },
          ],
        },
        {
          color: "maroon",
          icon: "logistics",
          title: "اللوجستيات والشحن والبريد السريع",
          companies: [
            { name: "جلوبال سنترال لوجيستكس", loc: "دبي 2016 / الأردن 2023", desc: "ريادة حلول الإمداد والشحن لتعزيز الربط التجاري الإقليمي." },
            { name: "نيو قاسيون إكسبريس", loc: "سوريا، تأسست 2025", desc: "رؤية مستقبلية تركز على التخزين المتطور والبريد السريع لمتطلبات التجارة الحديثة." },
          ],
        },
        {
          color: "green",
          icon: "industry",
          title: "التصنيع الغذائي والضيافة",
          companies: [
            { name: "شركة القمح الذهبي", loc: "مصر، استحوذت 2016", desc: "استثمار صناعي ضخم في التصنيع الغذائي والأمن الغذائي." },
            { name: "سلسلة مطاعم سلطان بالك", loc: "تركيا، تأسست 2016", desc: "تجسيد معايير التميز في قطاع الضيافة العالمي." },
            { name: "سلسلة مطاعم بيت الخير", loc: "الأردن، تأسست 2022", desc: "دعم وتطوير قطاع المطاعم التابع للمجموعة." },
          ],
        },
      ],
    },
    competencies: {
      badge: "الكفاءات الجوهرية",
      title: "مهارات القيادة والحوكمة",
      items: [
        { title: "الامتثال والأخلاقيات", desc: "مدافع قوي عن معايير مكافحة غسل الأموال (AML) والشفافية الدولية." },
        { title: "التحول الرقمي", desc: "قيادة التحول نحو التكنولوجيا المالية واللوجستيات الآلية." },
        { title: "الاستراتيجية الإقليمية", desc: "خبير في المشهد الاقتصادي لمنطقة الشرق الأوسط وشمال أفريقيا وبناء الشراكات الاستراتيجية." },
        { title: "إدارة المجموعات", desc: "قيادة مجموعات متنوعة عبر قطاعات متعددة وبلدان مختلفة." },
      ],
    },
    contact: {
      badge: "التواصل المباشر",
      title: "تواصل مع رئيس المجلس",
      items: [
        { label: "سوريا", value: "+963 955 597 000", icon: "phone" },
        { label: "الأردن", value: "+962 799 217 215", icon: "phone" },
        { label: "البريد الإلكتروني", value: "Moumen.marayati@qexpress-sy.com", icon: "email" },
      ],
      cta: "تواصل معنا",
    },
  },
  en: {
    hero: {
      badge: "Group Leadership",
      role: "Chairman of the Board",
      name: "Moh'd Moumen Moh'd Ayman Marayati",
      tagline: "Strategic Leader | Economist | Visionary Entrepreneur",
      summary: "A high-caliber strategic leader and businessman with over 20 years of executive experience managing diversified regional conglomerates across the MENA region.",
      edu: { label: "Education", value: "B.A. in Business Administration — Economics", school: "Damascus University, 2009" },
      presence: { label: "Regional Presence", countries: ["Jordan", "UAE", "Egypt", "Turkey", "Syria"] },
      exp: { label: "Years of Experience", value: "20+" },
    },
    quote: {
      badge: "Chairman's Message",
      text: "Our mission is to build ecosystems of trust. Whether we are moving capital, goods, or providing food security, our objective is to be the bridge that connects people to their aspirations. We establish not just businesses, but a legacy of reliability across borders.",
    },
    portfolio: {
      badge: "Strategic Portfolio",
      title: "Leadership Milestones",
      sectors: [
        {
          color: "green",
          icon: "finance",
          title: "Financial Services & International Trade",
          companies: [
            { name: "Al Markaziya Exchange", loc: "Jordan, Est. 1993", desc: "The group's legacy institution; managed and modernized to maintain its position as a trusted financial cornerstone." },
            { name: "Global Central General Trading FZCO", loc: "Dubai, Est. 2016", desc: "The strategic hub for international commerce and cross-border trade operations." },
            { name: "Shaden International Trading", loc: "Jordan, Est. 2018", desc: "Further diversifying the group's footprint in global commodity trading." },
          ],
        },
        {
          color: "maroon",
          icon: "logistics",
          title: "Logistics, Express & Supply Chain",
          companies: [
            { name: "Global Central Logistics FZCO", loc: "Dubai 2016 / Jordan 2023", desc: "Driving regional connectivity through specialized freight and supply chain solutions." },
            { name: "New Qasioun Express", loc: "Syria, Est. 2025", desc: "A forward-looking venture focused on advanced warehousing and express courier services." },
          ],
        },
        {
          color: "green",
          icon: "industry",
          title: "Industrial Manufacturing & Hospitality",
          companies: [
            { name: "Golden Wheat Company & Factory", loc: "Egypt, Est. 2016", desc: "A large-scale industrial investment in food manufacturing and security." },
            { name: "Sultan Balik Restaurant Chain", loc: "Turkey, Est. 2016", desc: "Leading the group's international hospitality and culinary sector." },
            { name: "Beit AlKheir Restaurant Chain", loc: "Jordan, Est. 2022", desc: "Supporting and developing the group's restaurant sector." },
          ],
        },
      ],
    },
    competencies: {
      badge: "Core Competencies",
      title: "Leadership & Governance Skills",
      items: [
        { title: "Compliance & Ethics", desc: "A staunch advocate for International AML standards and global transparency." },
        { title: "Digital Transformation", desc: "Leading the shift toward fintech and automated logistics to enhance operational speed." },
        { title: "Regional Strategy", desc: "Expert in navigating MENA economic landscapes and fostering trade relations." },
        { title: "Conglomerate Management", desc: "Leading diversified groups across multiple sectors and countries simultaneously." },
      ],
    },
    contact: {
      badge: "Direct Contact",
      title: "Reach the Chairman",
      items: [
        { label: "Syria", value: "+963 955 597 000", icon: "phone" },
        { label: "Jordan", value: "+962 799 217 215", icon: "phone" },
        { label: "Email", value: "Moumen.marayati@qexpress-sy.com", icon: "email" },
      ],
      cta: "Contact Us",
    },
  },
};

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── TiltCard ─────────────────────────────────────────────────────────────────
function TiltCard({
  children,
  className = "",
  style = {},
  glowColor = "",
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  glowColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -12;
    el.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateZ(10px)`;
    if (glowColor) el.style.boxShadow = `0 24px 60px -10px ${glowColor}40, 0 0 0 1px ${glowColor}15`;
  };
  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "";
    if (glowColor) ref.current.style.boxShadow = "";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transition: "transform 0.2s ease-out, box-shadow 0.3s ease", transformStyle: "preserve-3d", ...style }}
    >
      {children}
    </div>
  );
}

// ─── Animation helper ─────────────────────────────────────────────────────────
const a = (name: string, delay: number, dur = 0.7): React.CSSProperties => ({
  animation: `${name} ${dur}s ${delay}s cubic-bezier(0.23,1,0.32,1) both`,
  opacity: 0,
});

// ─── Sector icon ──────────────────────────────────────────────────────────────
function SectorIcon({ type, color }: { type: string; color: string }) {
  if (type === "finance")
    return (
      <svg className="w-7 h-7" style={{ color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  if (type === "logistics")
    return (
      <svg className="w-7 h-7" style={{ color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17H6a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v3m-4 7h-4m4 0a2 2 0 104 0 2 2 0 00-4 0zm-4 0a2 2 0 11-4 0 2 2 0 014 0zM16 9h4l2 4v2h-6V9z" />
      </svg>
    );
  return (
    <svg className="w-7 h-7" style={{ color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CEOPage() {
  const { lang, isAr, isDark } = useLang();
  const t = content[lang];

  const heroIn    = useInView(0.05);
  const quoteIn   = useInView(0.12);
  const portIn    = useInView(0.08);
  const compIn    = useInView(0.08);
  const contactIn = useInView(0.1);

  const vd  = isAr ? "translateX(-50px)" : "translateX(50px)";
  const vdr = isAr ? "translateX(50px)"  : "translateX(-50px)";

  // ── Dark mode colour tokens ──────────────────────────────────────────────────
  // Backgrounds
  const heroBg      = isDark ? "#060b0f"  : "white";
  const portBg      = isDark ? "#060b0f"  : "linear-gradient(160deg,#fdf8f8 0%,#f6faf7 50%,#fdf8f8 100%)";
  const compBg      = isDark ? "#0a0f14"  : "white";
  const contactBg   = isDark ? "#060b0f"  : "linear-gradient(150deg,#f0f9f3 0%,#fdf3f4 50%,#f0f9f3 100%)";
  // Text
  const headingCol  = isDark ? "#f0f4f8"  : "#1a0a0e";
  const subTextCol  = isDark ? "#94a3b8"  : "rgba(58,26,30,0.65)";  // slate-400 / dark maroon muted
  const labelCol    = isDark ? "#64748b"  : "#9ca3af";               // slate-500 / gray-400
  // Cards
  const cardBg      = isDark ? "#0d1421"  : "#fff";
  const cardBorder  = isDark ? "rgba(255,255,255,0.07)" : "#e5e7eb";
  const compCardBg  = (i: number) => isDark
    ? (i % 2 !== 0 ? "rgba(139,26,42,0.08)" : "rgba(255,255,255,0.04)")
    : (i % 2 !== 0 ? `${M}04` : "#f9fafb");
  // Sector company cards
  const coCardBg    = (ac: string) => isDark ? `${ac}08` : `${ac}05`;

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="overflow-x-hidden" style={{ background: isDark ? "#060b0f" : "white" }}>
      <style>{`
        @keyframes ceo-fadeup   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ceo-vanin    { from{opacity:0;transform:${vd}} to{opacity:1;transform:translateX(0)} }
        @keyframes ceo-vaninrev { from{opacity:0;transform:${vdr}} to{opacity:1;transform:translateX(0)} }
        @keyframes ceo-scalein  { from{opacity:0;transform:scale(0.88) perspective(700px) rotateY(${isAr ? "" : "-"}8deg)} to{opacity:1;transform:scale(1) perspective(700px) rotateY(0)} }
        @keyframes ceo-rotatein { from{opacity:0;transform:perspective(700px) rotateX(16deg) translateY(22px)} to{opacity:1;transform:perspective(700px) rotateX(0) translateY(0)} }
        @keyframes ceo-drawline { from{width:0} to{width:100%} }
        @keyframes ceo-float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes ceo-floatb   { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-6px) rotate(5deg)} }
        @keyframes ceo-spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes ceo-gridmov  { from{background-position:0 0} to{background-position:60px 60px} }
        @keyframes ceo-shimmer  { 0%{transform:translateX(-130%)} 100%{transform:translateX(320%)} }
        @keyframes ceo-ping     { 75%,100%{transform:scale(2.2);opacity:0} }
        @keyframes ceo-quote    { from{opacity:0;transform:scale(0.96) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }

        .ceo-badge { display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;padding:5px 14px;border-radius:100px }
        .ceo-val-line { height:3px;border-radius:2px;width:0;transition:width .5s cubic-bezier(.23,1,.32,1) }
        .ceo-comp-card:hover .ceo-val-line { width:100% }
        .ceo-shimmer { position:relative;overflow:hidden }
        .ceo-shimmer::after { content:'';position:absolute;inset:0;background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.08) 55%,transparent 80%);animation:ceo-shimmer 3.5s ease-in-out infinite }
      `}</style>

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section
        className="relative overflow-hidden pt-20 pb-28 md:pt-28 md:pb-36"
        style={{ background: heroBg }}
        ref={heroIn.ref}
      >
        {/* Moving grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(${M}15 1px,transparent 1px),linear-gradient(90deg,${G}12 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
          animation: "ceo-gridmov 14s linear infinite",
          opacity: isDark ? 0.15 : 0.4,
        }} />
        {/* Half circle top-end — maroon */}
        <div className="absolute pointer-events-none" style={{ width: 500, height: 500, borderRadius: "50%", top: -200, [isAr ? "left" : "right"]: -160, background: `radial-gradient(circle at 60% 40%,${M}${isDark ? "20" : "12"} 0%,${M}05 40%,transparent 70%)`, border: `1.5px solid ${M}15` }} />
        <div className="absolute pointer-events-none" style={{ width: 320, height: 320, borderRadius: "50%", top: -90, [isAr ? "left" : "right"]: -50, border: `1px solid ${M}10` }} />
        {/* Bottom-start green arc */}
        <div className="absolute pointer-events-none" style={{ width: 380, height: 380, borderRadius: "50%", bottom: -140, [isAr ? "right" : "left"]: -120, background: `radial-gradient(circle,${G}${isDark ? "18" : "09"} 0%,transparent 65%)`, border: `1.5px solid ${G}10` }} />
        {/* Diagonal strip */}
        <div className="absolute pointer-events-none inset-0 overflow-hidden">
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(${isAr ? "135deg" : "45deg"},transparent 62%,${G}04 62%,${G}06 67%,transparent 67%)` }} />
        </div>
        {/* Floating shapes */}
        <div className="absolute pointer-events-none" style={{ top: 90, [isAr ? "right" : "left"]: 55, width: 28, height: 28, borderRadius: 7, border: `2px solid ${M}28`, transform: "rotate(18deg)", animation: "ceo-floatb 6s ease-in-out infinite" }} />
        <div className="absolute pointer-events-none" style={{ bottom: 110, [isAr ? "left" : "right"]: 70, width: 18, height: 18, borderRadius: "50%", background: `${G}22`, animation: "ceo-float 5s ease-in-out infinite reverse" }} />
        <div className="absolute pointer-events-none" style={{ top: "42%", [isAr ? "right" : "left"]: "7%", width: 11, height: 11, borderRadius: 3, background: `${M}28`, transform: "rotate(45deg)", animation: "ceo-floatb 8s ease-in-out infinite" }} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-14 items-center">

            {/* TEXT */}
            <div>
              {heroIn.visible && (
                <>
                  <div className="mb-7" style={a("ceo-vanin", 0, 0.55)}>
                    <span className="ceo-badge text-white" style={{ background: M }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                      {t.hero.badge}
                    </span>
                  </div>

                  <div className="mb-3" style={a("ceo-vanin", 0.1, 0.6)}>
                    <span className="text-sm font-bold tracking-widest uppercase" style={{ color: G }}>{t.hero.role}</span>
                  </div>

                  <h1 className="text-4xl md:text-[2.8rem] font-black leading-[1.1] tracking-tight mb-4">
                    {t.hero.name.split(" ").map((w, i) => (
                      <span key={i} className="inline-block me-2" style={a("ceo-vanin", 0.12 + i * 0.06, 0.62)}>
                        <span style={{ color: i % 3 === 1 ? M : headingCol }}>{w}</span>
                      </span>
                    ))}
                  </h1>

                  <p className="text-sm font-bold mb-5 tracking-wide" style={{ color: M, ...a("ceo-vanin", 0.42, 0.6) }}>
                    {t.hero.tagline}
                  </p>

                  <p className="text-base leading-relaxed mb-10 max-w-md" style={{ color: subTextCol, ...a("ceo-fadeup", 0.5, 0.65) }}>
                    {t.hero.summary}
                  </p>

                  <div className="flex flex-wrap gap-8 pt-7 border-t" style={{ borderColor: `${M}15`, ...a("ceo-fadeup", 0.6, 0.65) }}>
                    <div className="flex flex-col">
                      <span className="text-3xl font-black" style={{ color: M }}>{t.hero.exp.value}</span>
                      <span className="text-xs mt-0.5 font-semibold tracking-widest uppercase" style={{ color: labelCol }}>{t.hero.exp.label}</span>
                    </div>
                    <div className="flex flex-col max-w-xs">
                      <span className="text-xs font-black tracking-widest uppercase mb-1" style={{ color: G }}>{t.hero.edu.label}</span>
                      <span className="text-sm font-bold" style={{ color: headingCol }}>{t.hero.edu.value}</span>
                      <span className="text-xs" style={{ color: labelCol }}>{t.hero.edu.school}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-6" style={a("ceo-fadeup", 0.7, 0.65)}>
                    <span className="text-xs font-black tracking-widest uppercase me-2 self-center" style={{ color: G }}>{t.hero.presence.label}:</span>
                    {t.hero.presence.countries.map((c, i) => (
                      <span key={c} className="text-xs font-bold px-3 py-1.5 rounded-full"
                        style={{ background: i % 2 === 0 ? `${G}${isDark ? "20" : "10"}` : `${M}${isDark ? "20" : "10"}`, color: i % 2 === 0 ? G : M, border: `1px solid ${i % 2 === 0 ? G : M}25` }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* PHOTO */}
            <div className="relative hidden md:flex justify-center" style={heroIn.visible ? a("ceo-scalein", 0.1, 0.85) : { opacity: 0 }}>
              <div className="absolute inset-0 rounded-[40px]" style={{ background: `linear-gradient(135deg,${M}18,${G}0a)`, transform: "translate(14px,14px)" }} />
              <div className="absolute inset-0 rounded-[38px]" style={{ background: `linear-gradient(135deg,${G}0c,${M}08)`, transform: "translate(7px,7px)" }} />
              <div className="relative rounded-[32px] overflow-hidden" style={{ width: 380, height: 480, boxShadow: `0 40px 80px -16px ${M}30` }}>
                <Image src={CEO_PHOTO} alt={t.hero.name} fill className="object-cover object-top" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top,${M}65 0%,transparent 55%)` }} />
                <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
                  <div className="rounded-2xl px-5 py-4" style={{ background: "rgba(255,255,255,0.13)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.22)" }}>
                    <p className="text-white font-black text-base leading-tight">{t.hero.name}</p>
                    <p className="text-white/70 text-xs mt-1 font-semibold tracking-wide">{t.hero.role}</p>
                    <div className="flex items-center gap-2 mt-2.5">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inset-0 rounded-full opacity-60" style={{ background: G, animation: "ceo-ping 1.6s ease-in-out infinite" }} />
                        <span className="relative rounded-full h-2 w-2" style={{ background: G }} />
                      </span>
                      <span className="text-white/60 text-[10px] font-bold tracking-widest uppercase">Q Express Group</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -end-6 w-14 h-14 rounded-full border-2 flex items-center justify-center" style={{ borderColor: `${M}35`, animation: "ceo-float 5s ease-in-out infinite" }}>
                <div className="w-5 h-5 rounded-full" style={{ background: `${M}55` }} />
              </div>
              <div className="absolute -bottom-4 -start-4 w-10 h-10 rounded-full border-2" style={{ borderColor: `${G}30`, animation: "ceo-float 7s ease-in-out infinite reverse" }} />
              <div className="absolute inset-0 rounded-[32px] pointer-events-none" style={{ border: `1px solid ${M}15`, animation: "ceo-spin 20s linear infinite" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ QUOTE ══════════════════════ */}
      {/* Quote section is always maroon-based — looks great in both modes */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: isDark ? `linear-gradient(150deg,#1a0508 0%,#3d0a12 60%,#120205 100%)` : `linear-gradient(150deg,${M} 0%,#5c0f1b 60%,#3a0510 100%)` }}
        ref={quoteIn.ref}
      >
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px,white 1.5px,transparent 0)", backgroundSize: "26px 26px" }} />
        <div className="absolute bottom-0 end-0 w-64 h-64 pointer-events-none" style={{ background: `radial-gradient(circle at 100% 100%,${G}30 0%,transparent 70%)`, filter: "blur(40px)" }} />
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg,${G},${G}30,transparent)` }} />
        <div className="absolute pointer-events-none" style={{ width: 400, height: 400, borderRadius: "50%", top: -160, [isAr ? "right" : "left"]: -80, border: "1px solid rgba(255,255,255,0.06)" }} />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          {quoteIn.visible && (
            <>
              <div className="mb-8" style={a("ceo-fadeup", 0, 0.6)}>
                {/* FIX: bg-white/12 is not a valid Tailwind class — replaced with inline style */}
                <span className="ceo-badge text-white/80" style={{ background: "rgba(255,255,255,0.12)" }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: G }} />
                  {t.quote.badge}
                </span>
              </div>
              <div className="text-7xl font-black leading-none mb-2 select-none" style={{ color: "rgba(255,255,255,0.12)", fontFamily: "Georgia,serif" }} aria-hidden>
                {isAr ? "،،" : "\""}
              </div>
              <blockquote className="text-xl md:text-2xl font-bold text-white/90 leading-relaxed" style={a("ceo-quote", 0.1, 0.8)}>
                {t.quote.text}
              </blockquote>
              <div className="mt-8 flex items-center justify-center gap-4" style={a("ceo-fadeup", 0.4, 0.6)}>
                <div className="h-px w-16 rounded-full" style={{ background: "rgba(255,255,255,0.25)" }} />
                <div className="text-center">
                  <p className="text-white font-black text-sm">{t.hero.name}</p>
                  <p className="text-white/55 text-xs mt-0.5 font-semibold">{t.hero.role}</p>
                </div>
                <div className="h-px w-16 rounded-full" style={{ background: "rgba(255,255,255,0.25)" }} />
              </div>
            </>
          )}
        </div>
      </section>

      {/* ══════════════════════ PORTFOLIO ══════════════════════ */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: portBg }}
        ref={portIn.ref}
      >
        <div className="absolute pointer-events-none" style={{ width: 480, height: 480, borderRadius: "50%", top: -160, [isAr ? "right" : "left"]: -180, background: `radial-gradient(circle,${G}07 0%,transparent 65%)`, border: `1px solid ${G}10` }} />
        <div className="absolute pointer-events-none" style={{ width: 320, height: 320, borderRadius: "50%", bottom: -80, [isAr ? "left" : "right"]: -80, background: `radial-gradient(circle,${M}06 0%,transparent 65%)`, border: `1px solid ${M}08` }} />
        {[25, 50, 75].map(p => (
          <div key={p} className="absolute left-0 right-0 h-px pointer-events-none" style={{ top: `${p}%`, background: `linear-gradient(90deg,transparent,${p === 50 ? M : G}10,transparent)` }} />
        ))}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg,transparent,${M}30,transparent)` }} />
        <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg,transparent,${G}20,transparent)` }} />

        <div className="relative max-w-7xl mx-auto px-6">
          {portIn.visible && (
            <div className="text-center mb-16" style={a("ceo-fadeup", 0, 0.6)}>
              <span className="ceo-badge" style={{ background: `${M}12`, color: M }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: M }} />
                {t.portfolio.badge}
              </span>
              <h2 className="text-4xl md:text-5xl font-black mt-5 tracking-tight" style={{ color: headingCol }}>{t.portfolio.title}</h2>
            </div>
          )}

          <div className="space-y-6">
            {t.portfolio.sectors.map((sector, si) => {
              const ac = sector.color === "green" ? G : M;
              const animName = si % 2 === 0 ? "ceo-vanin" : "ceo-vaninrev";
              return (
                <TiltCard key={sector.title} glowColor={ac}
                  className="rounded-3xl p-8 border-2 relative overflow-hidden cursor-default"
                  style={{ background: cardBg, borderColor: `${ac}${isDark ? "25" : "18"}`, ...(portIn.visible ? a(animName, 0.1 + si * 0.12, 0.75) : { opacity: 0 }) }}>
                  <div className="absolute top-0 start-0 w-32 h-32 pointer-events-none" style={{ background: `radial-gradient(circle at 0% 0%,${ac}${isDark ? "18" : "12"} 0%,transparent 70%)` }} />
                  <div className="absolute top-0 start-0 end-0 h-[3px]" style={{ background: `linear-gradient(90deg,${ac},${ac}30,transparent)` }} />

                  <div className="flex items-center gap-4 mb-7 relative">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center relative" style={{ background: `${ac}${isDark ? "18" : "10"}` }}>
                      <SectorIcon type={sector.icon} color={ac} />
                      <div className="absolute inset-0 rounded-2xl border" style={{ borderColor: `${ac}25`, animation: "ceo-spin 12s linear infinite" }} />
                    </div>
                    <h3 className="text-xl font-black" style={{ color: headingCol }}>{sector.title}</h3>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 relative">
                    {sector.companies.map((co) => (
                      <div key={co.name}
                        className="rounded-2xl p-5 border transition-all duration-300"
                        style={{ background: coCardBg(ac), borderColor: `${ac}${isDark ? "20" : "15"}` }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = ac + "40"; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px -6px ${ac}20`; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = ac + (isDark ? "20" : "15"); (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: ac }} />
                          <p className="font-black text-sm leading-tight" style={{ color: ac }}>{co.name}</p>
                        </div>
                        <p className="text-[10px] font-bold tracking-wide mb-2" style={{ color: `${ac}${isDark ? "90" : "70"}` }}>{co.loc}</p>
                        <p className="text-xs leading-relaxed" style={{ color: isDark ? "#64748b" : "#6b7280" }}>{co.desc}</p>
                      </div>
                    ))}
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════ COMPETENCIES ══════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: compBg }} ref={compIn.ref}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `repeating-linear-gradient(${isAr ? "-" : ""}45deg,${M}07 0,${M}07 1px,transparent 0,transparent 50%)`,
          backgroundSize: "28px 28px",
          opacity: isDark ? 0.3 : 0.6,
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 50%,${M}${isDark ? "08" : "04"} 0%,transparent 65%)` }} />

        <div className="relative max-w-7xl mx-auto px-6">
          {compIn.visible && (
            <div className="text-center mb-14" style={a("ceo-fadeup", 0, 0.6)}>
              <span className="ceo-badge" style={{ background: `${G}${isDark ? "20" : "10"}`, color: G }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: G }} />
                {t.competencies.badge}
              </span>
              <h2 className="text-4xl md:text-5xl font-black mt-5 tracking-tight" style={{ color: headingCol }}>{t.competencies.title}</h2>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.competencies.items.map((item, i) => {
              const ac = i % 2 === 0 ? G : M;
              return (
                <TiltCard key={item.title} glowColor={ac}
                  className="ceo-comp-card rounded-2xl p-7 border-2 cursor-default relative overflow-hidden"
                  style={{
                    background: compCardBg(i),
                    borderColor: cardBorder,
                    ...(compIn.visible ? a("ceo-rotatein", 0.08 + i * 0.1, 0.68) : { opacity: 0 }),
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = ac + "40"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = cardBorder; }}
                >
                  <div className="absolute -top-5 -end-5 w-20 h-20 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle,${ac}${isDark ? "25" : "15"} 0%,transparent 70%)`, filter: "blur(8px)" }} />
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 relative" style={{ background: `${ac}${isDark ? "20" : "12"}`, color: ac }}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {i === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                      {i === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />}
                      {i === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />}
                      {i === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />}
                    </svg>
                    <div className="absolute inset-0 rounded-xl border" style={{ borderColor: `${ac}20` }} />
                  </div>
                  <div className="text-[10px] font-black tracking-[.2em] mb-3" style={{ color: `${ac}${isDark ? "70" : "50"}` }}>0{i + 1}</div>
                  <h3 className="font-black text-sm mb-2" style={{ color: ac }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: isDark ? "#64748b" : "#9ca3af" }}>{item.desc}</p>
                  <div className="ceo-val-line mt-5" style={{ background: `linear-gradient(90deg,${ac},${ac}20)` }} />
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════ CONTACT ══════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: contactBg }} ref={contactIn.ref}>
        <div className="absolute pointer-events-none" style={{ width: 400, height: 400, borderRadius: "50%", top: -120, [isAr ? "left" : "right"]: -100, background: `radial-gradient(circle,${M}${isDark ? "15" : "09"} 0%,transparent 65%)`, border: `1px solid ${M}10` }} />
        <div className="absolute pointer-events-none" style={{ width: 300, height: 300, borderRadius: "50%", bottom: -80, [isAr ? "right" : "left"]: -60, background: `radial-gradient(circle,${G}${isDark ? "12" : "08"} 0%,transparent 65%)`, border: `1px solid ${G}10` }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg,transparent,${G}25,transparent)` }} />

        <div className="relative max-w-4xl mx-auto px-6">
          {contactIn.visible && (
            <div className="text-center mb-12" style={a("ceo-fadeup", 0, 0.6)}>
              <span className="ceo-badge" style={{ background: `${G}${isDark ? "20" : "10"}`, color: G }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: G }} />
                {t.contact.badge}
              </span>
              <h2 className="text-3xl md:text-4xl font-black mt-5 tracking-tight" style={{ color: headingCol }}>{t.contact.title}</h2>
            </div>
          )}

          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {t.contact.items.map((item, i) => {
              const ac = i % 2 === 0 ? G : M;
              return (
                <TiltCard key={item.label} glowColor={ac}
                  className="ceo-shimmer rounded-2xl p-6 border-2 text-center cursor-default relative overflow-hidden"
                  style={{ background: cardBg, borderColor: `${ac}${isDark ? "25" : "18"}`, ...(contactIn.visible ? a("ceo-rotatein", 0.1 + i * 0.1, 0.68) : { opacity: 0 }) }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: `${ac}${isDark ? "20" : "10"}` }}>
                    {item.icon === "phone"
                      ? <svg className="w-5 h-5" style={{ color: ac }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      : <svg className="w-5 h-5" style={{ color: ac }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    }
                  </div>
                  <p className="text-[10px] font-black tracking-widest uppercase mb-2" style={{ color: `${ac}${isDark ? "90" : "70"}` }}>{item.label}</p>
                  <p className="font-black text-sm" style={{ color: headingCol }} dir="ltr">{item.value}</p>
                  <div className="absolute bottom-0 start-0 end-0 h-[2px] overflow-hidden rounded-b-2xl">
                    <div className="h-full w-2/5" style={{ background: `linear-gradient(90deg,transparent,${ac}55,transparent)`, animation: contactIn.visible ? `ceo-shimmer 3s ${i * 0.5}s ease-in-out infinite` : undefined }} />
                  </div>
                </TiltCard>
              );
            })}
          </div>

          {contactIn.visible && (
            <div className="text-center" style={a("ceo-fadeup", 0.5, 0.6)}>
              <Link href="/contact"
                className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-white transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ background: `linear-gradient(135deg,${M},#5c0f1b)`, boxShadow: `0 16px 40px -8px ${M}40` }}>
                {t.contact.cta}
                <svg className={`w-5 h-5 ${isAr ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}