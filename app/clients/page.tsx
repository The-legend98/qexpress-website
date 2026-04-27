"use client";

import { useLang } from "@/lib/LangContext";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// الألوان المعتمدة
const G = "#1a5c2a"; 
const M = "#8B1A2A"; 

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

function TiltCard({ children, className = "", style = {}, glowColor = "" }: {
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
    const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -10;
    el.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) translateZ(10px)`;
    if (glowColor) el.style.boxShadow = `0 20px 50px -12px ${glowColor}40`;
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
      className={`${className} transition-all duration-300 ease-out`}
      style={{ transformStyle: "preserve-3d", ...style }}
    >
      {children}
    </div>
  );
}

const anim = (name: string, delay: number): React.CSSProperties => ({
  animation: `${name} 0.8s ${delay}s cubic-bezier(0.22, 1, 0.36, 1) both`,
  opacity: 0,
});

const content = {
  ar: {
    hero: { badge: "عملاؤنا", title: "نخدم قطاعات", highlight: "متنوعة", desc: "نقدم خدماتنا لطيف واسع ومتنامٍ من العملاء عبر القطاعات الاقتصادية الرئيسية في سوريا." },
    segments: [
      { id: "corp", color: "green", title: "الشركات والصناعة", desc: "الشركات في قطاعات التصنيع والبناء والتجارة التي تحتاج شركاء سلسلة توريد موثوقين.", examples: ["شركات التصنيع", "مقاولو البناء", "شركات الاستيراد والتصدير", "الموزعون التجاريون"] },
      { id: "ecom", color: "maroon", title: "التجارة الإلكترونية", desc: "المنصات الإلكترونية وتجار التجزئة والجملة الذين يحتاجون حلول توصيل آخر ميل فعّالة.", examples: ["المتاجر الإلكترونية", "تجار التجزئة", "الموزعون", "منصات البيع الإلكتروني"] },
      { id: "gov", color: "green", title: "المؤسسات والحكومة", desc: "الجهات الحكومية والبعثات الدبلوماسية والمنظمات غير الحكومية التي تحتاج خدمات لوجستية آمنة وموثقة.", examples: ["الجهات الحكومية", "البعثات الدبلوماسية", "المنظمات غير الحكومية", "المؤسسات الدولية"] },
    ],
    why: { title: "لماذا يختارنا عملاؤنا؟", items: ["موثوقية وسرعة لا مثيل لها", "تتبع لحظي شفاف", "حلول مخصصة لكل قطاع", "دعم عملاء متخصص", "شبكة إقليمية واسعة", "أسعار تنافسية"] },
    cta: { title: "انضم إلى شبكة عملائنا", desc: "كن جزءاً من مسيرة النجاح واستفد من حلولنا اللوجستية المتطورة.", btn: "ابدأ الآن" },
  },
  en: {
    hero: { badge: "Our Clients", title: "Serving Diverse", highlight: "Sectors", desc: "We serve a diverse and growing portfolio of clients across Syria's key economic sectors." },
    segments: [
      { id: "corp", color: "green", title: "Corporate & Industrial", desc: "Businesses in manufacturing, construction, and trading requiring reliable supply chain partners.", examples: ["Manufacturing Companies", "Construction Contractors", "Import/Export Companies", "Commercial Distributors"] },
      { id: "ecom", color: "maroon", title: "E-Commerce & Retail", desc: "Online platforms, retailers and wholesalers needing efficient last-mile solutions.", examples: ["Online Stores", "Retail Businesses", "Distributors", "E-commerce Platforms"] },
      { id: "gov", color: "green", title: "Institutions & Government", desc: "Government entities, diplomatic missions, and NGOs with demands for secure logistics.", examples: ["Government Entities", "Diplomatic Missions", "NGOs", "International Organizations"] },
    ],
    why: { title: "Why Clients Choose Us?", items: ["Unmatched reliability and speed", "Transparent real-time tracking", "Customized solutions per sector", "Dedicated customer support", "Wide regional network", "Competitive pricing"] },
    cta: { title: "Join Our Client Network", desc: "Become part of our growing client base and benefit from tailored logistics solutions.", btn: "Get Started" },
  },
};

export default function ClientsPage() {
  const { lang, isAr, isDark } = useLang();
  const t = content[lang];
  const heroIn = useInView(0.05);
  const segIn = useInView(0.1);
  const whyIn = useInView(0.1);

  return (
    <div dir={isAr ? "rtl" : "ltr"} className={`overflow-x-hidden ${isDark ? "bg-[#050810]" : "bg-white"}`}>
      <style>{`
        @keyframes f-up { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes f-in { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
      `}</style>

      {/* Hero */}
      <section ref={heroIn.ref} className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#1a5c2a]/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#8B1A2A]/5 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          {heroIn.visible && (
            <>
              <span className={`inline-block text-xs font-bold px-5 py-2 rounded-full mb-6 tracking-widest uppercase ${isDark ? "bg-white/5 text-white/70 border border-white/10" : "bg-[#1a5c2a]/10 text-[#1a5c2a]"}`} style={anim("f-up", 0)}>
                {t.hero.badge}
              </span>
              <h1 className={`text-4xl md:text-7xl font-black mb-6 leading-tight ${isDark ? "text-white" : "text-gray-900"}`} style={anim("f-up", 0.2)}>
                {t.hero.title} <span className="text-[#8B1A2A]">{t.hero.highlight}</span>
              </h1>
              <p className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${isDark ? "text-slate-400" : "text-gray-500"}`} style={anim("f-up", 0.4)}>
                {t.hero.desc}
              </p>
            </>
          )}
        </div>
      </section>

      {/* Segments - كروت احترافية */}
      <section ref={segIn.ref} className={`py-24 ${isDark ? "bg-[#080d14]" : "bg-gray-50/50"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {t.segments.map((s, i) => {
              const isGreen = s.color === "green";
              const ac = isGreen ? G : M;
              return (
                <TiltCard
                  key={s.title}
                  glowColor={ac}
                  className={`relative rounded-[2.5rem] p-10 border overflow-hidden group ${
                    isDark ? "bg-[#0d1421] border-white/5" : "bg-white border-gray-100 shadow-sm"
                  }`}
                  style={segIn.visible ? anim("f-in", 0.1 * i) : {opacity:0}}
                >
                  <div className={`w-14 h-14 rounded-2xl mb-8 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${isGreen ? "bg-[#1a5c2a]/10 text-[#1a5c2a]" : "bg-[#8B1A2A]/10 text-[#8B1A2A]"}`}>
                    <div className="w-6 h-6 rounded-full border-2 border-current opacity-70" />
                  </div>
                  <h3 className={`text-2xl font-black mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>{s.title}</h3>
                  <p className={`text-sm leading-relaxed mb-8 ${isDark ? "text-slate-400" : "text-gray-500"}`}>{s.desc}</p>
                  <div className="space-y-3">
                    {s.examples.map((e) => (
                      <div key={e} className="flex items-center gap-3 transition-transform duration-300 group-hover:translate-x-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${isGreen ? "bg-[#1a5c2a]" : "bg-[#8B1A2A]"}`} />
                        <span className={`text-sm font-semibold ${isDark ? "text-slate-300" : "text-gray-700"}`}>{e}</span>
                      </div>
                    ))}
                  </div>
                  {/* Decorative line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: ac }} />
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Us - Grid ناعم */}
      <section ref={whyIn.ref} className={`py-24 ${isDark ? "bg-[#050810]" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className={`text-3xl md:text-5xl font-black text-center mb-16 ${isDark ? "text-white" : "text-gray-900"}`}>{t.why.title}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.why.items.map((item, i) => (
              <div 
                key={item} 
                className={`flex items-center gap-5 p-6 rounded-3xl border transition-all duration-300 hover:shadow-xl ${isDark ? "bg-[#0d1421] border-white/5 hover:border-white/10" : "bg-white border-gray-100"}`}
                style={whyIn.visible ? anim("f-up", 0.05 * i) : {opacity:0}}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-black text-white ${i % 2 === 0 ? "bg-[#1a5c2a]" : "bg-[#8B1A2A]"}`}>
                  {i + 1}
                </div>
                <span className={`text-base font-bold ${isDark ? "text-slate-200" : "text-gray-800"}`}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Floating Design */}
      <section className="relative pb-32 pt-16">
        <div className="max-w-4xl mx-auto px-6">
          <div 
            className={`rounded-[3rem] py-16 px-10 text-center relative overflow-hidden ${isDark ? "bg-[#111624] border border-white/5" : "bg-white shadow-2xl"}`}
            style={{ boxShadow: isDark ? "0 40px 100px -20px rgba(0,0,0,0.5)" : "0 40px 100px -20px rgba(26,92,42,0.15)" }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1a5c2a] to-transparent opacity-50" />
            <h2 className={`text-3xl md:text-4xl font-black mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>{t.cta.title}</h2>
            <p className={`text-lg mb-10 ${isDark ? "text-slate-400" : "text-gray-500"}`}>{t.cta.desc}</p>
            <Link href="/contact" className="inline-flex items-center group bg-[#1a5c2a] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#134a20] transition-all duration-300 shadow-xl shadow-[#1a5c2a]/30 hover:scale-105 active:scale-95">
              {t.cta.btn}
              <svg className={`w-5 h-5 ${isAr ? "mr-3 rotate-180" : "ml-3"} group-hover:translate-x-1.5 transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}