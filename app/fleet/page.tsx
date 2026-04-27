"use client";

import { useLang } from "@/lib/LangContext";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const G = "#1a5c2a";
const M = "#8B1A2A";

const fleetImages: Record<string, string> = {
  bike: "/images/fleet-bike.png",
  car: "/images/fleet-car.png",
  van: "/images/fleet-van.png",
  drone: "/images/fleet-drone.png",
};

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
    const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -12;
    el.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) translateZ(10px)`;
    if (glowColor) el.style.boxShadow = `0 20px 50px -10px ${glowColor}30`;
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

const a = (name: string, delay: number, dur = 0.6): React.CSSProperties => ({
  animation: `${name} ${dur}s ${delay}s cubic-bezier(0.23,1,0.32,1) both`,
  opacity: 0,
});

const content = {
  ar: {
    hero: {
      badge: "أسطولنا",
      title: "مبني للسرعة",
      highlight: "والاستدامة",
      desc: "أسطول حديث ومتعدد الوسائط يجمع بين الرشاقة والمسؤولية البيئية. كل مركبة مجهزة بتقنية التتبع وتلتزم ببروتوكولات السلامة الصارمة.",
    },
    vehicles: [
      { id: "bike", odd : true , color: "green", title: "دراجات نارية", tag: "سريع", desc: "التوصيل الحضري السريع للوثائق والطرود الصغيرة في المناطق الحضرية.", features: ["توصيل فائق السرعة", "مثالية للوثائق العاجلة", "تغطية كاملة داخل المدن", "تتبع GPS لحظي"] },
      { id: "car", odd : false , color: "maroon", title: "سيارات كهربائية", tag: "صديق للبيئة", desc: "خدمة مميزة هادئة وصديقة للبيئة للطرود المتوسطة والعملاء المميزين.", features: ["انبعاثات صفرية", "هادئة وأنيقة", "مثالية لعملاء الشركات", "تتبع لحظي متكامل"] },
      { id: "van", odd : true , color: "green", title: "فانات وشاحنات", tag: "سعة كبيرة", desc: "نقل البضائع الضخمة ودعم التجارة الإلكترونية بحجم عالي ونقل آمن.", features: ["شحن البضائع الكبيرة", "دعم التجارة الإلكترونية", "نقل آمن ومؤمّن", "مناسبة للشركات والمصانع"] },
      { id: "drone", odd : false , color: "maroon", title: "طائرات درون", tag: "قادم قريباً", desc: "توسيع نطاق التغطية للمناطق النائية وتحقيق سرعة توصيل غير مسبوقة.", features: ["وصول للمناطق النائية", "سرعة توصيل فائقة", "تقنية مستقبلية", "قيد التطوير"] },
    ],
    tech: {
      title: "تقنية الأسطول",
      items: ["تتبع GPS لحظي لكل مركبة", "بروتوكولات أمان صارمة", "صيانة دورية معتمدة", "اتصال مستمر بالمركز"],
    },
    cta: { title: "هل تحتاج توصيلاً سريعاً؟", btn: "احجز شحنة الآن" },
  },
  en: {
    hero: {
      badge: "Our Fleet",
      title: "Built for Speed",
      highlight: "& Sustainability",
      desc: "A modern, multimodal fleet combining agility with environmental responsibility. Every vehicle equipped with tracking technology and adhering to rigorous safety protocols.",
    },
    vehicles: [
      { id: "bike",odd : true ,  color: "green", title: "Motorbikes", tag: "Fast", desc: "Fast urban delivery for documents and small parcels in city areas.", features: ["Ultra-fast delivery", "Perfect for urgent documents", "Full city coverage", "Live GPS tracking"] },
      { id: "car", odd : false , color: "maroon", title: "Electric Cars", tag: "Eco-Friendly", desc: "Premium, quiet, zero-emission service for mid-size parcels and corporate clients.", features: ["Zero emissions", "Quiet and elegant", "Ideal for corporate clients", "Integrated live tracking"] },
      { id: "van", odd : true , color: "green", title: "Vans & Trucks", tag: "High Capacity", desc: "Heavy cargo transport and high-volume e-commerce support with secure handling.", features: ["Large cargo shipping", "E-commerce support", "Safe and insured transport", "Suitable for businesses"] },
      { id: "drone",odd : false , color: "maroon", title: "Drones", tag: "Coming Soon", desc: "Expanding coverage to remote areas and achieving unprecedented delivery speeds.", features: ["Remote area access", "Ultra-fast delivery", "Future technology", "Under development"] },
    ],
    tech: {
      title: "Fleet Technology",
      items: ["Live GPS tracking on every vehicle", "Rigorous safety protocols", "Certified regular maintenance", "Continuous hub connectivity"],
    },
    cta: { title: "Need a Fast Delivery?", btn: "Book a Shipment Now" },
  },
};

export default function FleetPage() {
  const { lang, isAr, isDark } = useLang();
  const t = content[lang];
  const heroIn = useInView(0.05);
  const fleetIn = useInView(0.1);
  const techIn = useInView(0.1);
  const ctaIn = useInView(0.1);

  const vd = isAr ? "translateX(-50px)" : "translateX(50px)";

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className={`overflow-x-hidden transition-colors duration-300 ${isDark ? "bg-[#050810]" : "bg-white"}`}
    >
      <style>{`
        @keyframes qe-fadeup   { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes qe-vanin    { from{opacity:0;transform:${vd}} to{opacity:1;transform:translateX(0)} }
        @keyframes qe-rotatein { from{opacity:0;transform:perspective(1000px) rotateX(10deg) translateY(20px)} to{opacity:1;transform:perspective(1000px) rotateX(0) translateY(0)} }
        @keyframes qe-shimmer  { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      `}</style>

      {/* Hero Section */}
      <section
        ref={heroIn.ref}
        className={`relative py-24 md:py-32 overflow-hidden ${isDark ? "bg-[#050810]" : "bg-white"}`}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#8B1A2A]/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#1a5c2a]/5 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          {heroIn.visible && (
            <>
              <div className="mb-6" style={a("qe-fadeup", 0)}>
                <span className={`inline-flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-full tracking-widest uppercase ${
                  isDark ? "bg-[#8B1A2A]/15 text-[#e05568] border border-[#8B1A2A]/20" : "bg-[#8B1A2A]/10 text-[#8B1A2A]"
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ background: M }} />
                  {t.hero.badge}
                </span>
              </div>
              <h1 className={`text-4xl md:text-7xl font-black mb-6 leading-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                <span className="inline-block" style={a("qe-vanin", 0.1)}>{t.hero.title}</span>
                <br />
                <span className="text-[#1a5c2a] inline-block" style={a("qe-vanin", 0.3)}>{t.hero.highlight}</span>
              </h1>
              <p className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${isDark ? "text-slate-400" : "text-gray-500"}`} style={a("qe-fadeup", 0.5)}>
                {t.hero.desc}
              </p>
            </>
          )}
        </div>
      </section>

{/* Vehicles Grid */}
      <section
        ref={fleetIn.ref}
        className={`py-24 ${isDark ? "bg-[#080d14]" : "bg-gray-50/50"}`}>
          
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-y-20"> {/* مسافات عمودية أكبر لمنع التداخل */}
            {t.vehicles.map((v, i) => {
              const isGreen = v.color === "green";
              const ac = isGreen ? G : M;
              const isSoon = v.tag === "قادم قريباً" || v.tag === "Coming Soon";
              
              return (
                <TiltCard
                  key={v.title}
                  glowColor={ac}
                  className={`relative rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 border transition-all duration-300 overflow-hidden ${
                    isDark
                      ? "bg-[#0d1421] border-white/6 hover:border-white/12"
                      : "bg-white border-gray-100 shadow-sm hover:shadow-xl"
                  }`}
                  style={fleetIn.visible ? a("qe-rotatein", 0.1 + i * 0.1) : {opacity:0}}
                >
                  <div className="flex items-start justify-between mb-8 relative z-10">
                    <div className={`relative w-24 h-24 rounded-3xl overflow-hidden mb-5 transition-all duration-300 border-1 border-solid ${v.odd ? "border-[#1a5c2a]" : "border-[#8B1A2A]"} flex items-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                      isGreen
                        ? isDark ? "bg-[#1a5c2a]/15" : "bg-[#1a5c2a]/5"
                        : isDark ? "bg-[#8B1A2A]/15" : "bg-[#8B1A2A]/5"
                    }`}>
                      <img
                        src={fleetImages[v.id]}
                        alt={v.title}
                        className="w-full h-full object-cover dropped-shadow-lg"
                      />
                    </div>
                    <span className={`text-[10px] font-black tracking-widest px-4 py-2 rounded-full uppercase shadow-lg transition-transform duration-300 group-hover:-translate-y-1 ${isGreen ? "bg-[#1a5c2a] text-white" : "bg-[#8B1A2A] text-white"}`}>
                      {v.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className={`text-2xl md:text-3xl font-black mb-3 relative z-10 transition-colors duration-300 ${isDark ? "text-white" : "text-gray-900"} group-hover:text-[#1a5c2a]`}>{v.title}</h3>
                  <p className={`text-base md:text-lg leading-relaxed mb-8 relative z-10 ${isDark ? "text-slate-400" : "text-gray-500"}`}>{v.desc}</p>
                  
                  {/* Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                    {v.features.map((f, idx) => (
                      <div key={f} className="flex items-center gap-3 transition-transform duration-300 group-hover:translate-x-1" style={{ transitionDelay: `${idx * 50}ms` }}>
                        <div className={`w-2 h-2 rounded-full shrink-0 ${isGreen ? "bg-[#1a5c2a] shadow-[#1a5c2a]/50" : "bg-[#8B1A2A] shadow-[#8B1A2A]/50"}`} style={{boxShadow: "0 0 8px currentcolor"}} />
                        <span className={`text-sm font-semibold ${isDark ? "text-slate-300" : "text-gray-700"}`}>{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Border Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background: `linear-gradient(to right, transparent, ${ac}, transparent)`}} />

                  {isSoon && (
                    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none z-20 ${isDark ? "bg-[#050810]/60 backdrop-blur-[1px]" : "bg-white/60 backdrop-blur-[1px]"}`}>
                      <span className={`font-black text-sm uppercase tracking-[0.4em] rotate-12 border-2 px-6 py-2 opacity-40 transition-all duration-500 group-hover:opacity-80 group-hover:scale-110 ${isDark ? "border-white/20 text-white" : "border-gray-300 text-gray-400"}`}>
                        {isAr ? "قريباً" : "Coming Soon"}
                      </span>
                    </div>
                  )}
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Tech Bar Section */}
      <section ref={techIn.ref} className={`py-14 ${isDark ? "bg-[#050810]" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`relative rounded-3xl overflow-hidden p-8 transition-all duration-500 group/tech-bar ${
              isDark
                ? "bg-[#0d1421] border border-white/5"
                : "bg-gradient-to-r from-[#1a5c2a] to-[#134a20]"
            }`}
            style={isDark ? { boxShadow: "0 0 60px rgba(26,92,42,0.08)" } : { boxShadow: "0 16px 48px rgba(26,92,42,0.3)" }}
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[length:200%_100%]" 
                 style={{ 
                   backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                   animation: 'qe-shimmer 3s infinite linear' 
                 }} />

            <h3 className="text-center font-bold mb-8 text-white relative z-10 text-xl tracking-tight">
              {t.tech.title}
            </h3>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {t.tech.items.map((item, idx) => (
                <div key={idx} 
                     className="group/item flex items-center gap-4 bg-white/5 backdrop-blur-md rounded-2xl px-6 py-5 border border-white/10 transition-all duration-300 hover:bg-white/15 hover:-translate-y-1 hover:shadow-lg"
                     style={techIn.visible ? a("qe-fadeup", idx * 0.1) : { opacity: 0 }}>
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/90 text-sm font-bold tracking-wide">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA Section */}
      <section ref={ctaIn.ref} className={`py-24 overflow-hidden ${isDark ? "bg-[#080d14]" : "bg-white"}`}>
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          {ctaIn.visible && (
            <>
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-40 skew-y-3 -z-10 ${
                isDark ? "bg-[#8B1A2A]/5" : "bg-[#8B1A2A]/5"
              }`} />
              <h2
                className={`text-3xl md:text-5xl font-black mb-10 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
                style={a("qe-fadeup", 0)}
              >
                {t.cta.title}
              </h2>
              <Link
                href="/contact"
                className="inline-flex items-center group bg-[#8B1A2A] text-white px-10 md:px-12 py-4 md:py-5 rounded-[2rem] font-black text-base md:text-lg hover:bg-[#6d1421] transition-all duration-300 shadow-2xl shadow-[#8B1A2A]/30 hover:scale-105"
                style={a("qe-fadeup", 0.2)}
              >
                {t.cta.btn}
                <svg
                  className={`w-6 h-6 ${isAr ? "mr-3 rotate-180" : "ml-3"} group-hover:translate-x-2 transition-transform duration-300`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7-7 7" />
                </svg>
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
}