"use client";

import { useLang } from "@/lib/LangContext";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const G = "#1a5c2a";   // GREEN
const M = "#8B1A2A";   // MAROON

// ─── Hooks (Shared from About) ───────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function TiltCard({ children, className="", style={}, glowColor="" }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; glowColor?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX-r.left)/r.width-0.5)*14;
    const y = ((e.clientY-r.top)/r.height-0.5)*-14;
    el.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) translateZ(10px)`;
    if (glowColor) el.style.boxShadow = `0 20px 60px -10px ${glowColor}40, 0 0 0 1px ${glowColor}15`;
  };
  const onLeave = () => { if (!ref.current) return; ref.current.style.transform=""; if (glowColor) ref.current.style.boxShadow=""; };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={className}
      style={{ transition:"transform 0.2s ease-out, box-shadow 0.3s ease", transformStyle:"preserve-3d", ...style }}>
      {children}
    </div>
  );
}

const a = (name:string, delay:number, dur=0.65): React.CSSProperties => ({
  animation:`${name} ${dur}s ${delay}s cubic-bezier(0.23,1,0.32,1) both`, opacity:0,
});

const content = {
  ar: {
    hero: { badge: "خدماتنا", title: "حلول لوجستية", highlight: "متكاملة", desc: "نتخصص في ركيزتين أساسيتين مصممتين لتلبية احتياجات السوق السوري الحديث — التوصيل السريع واللوجستيات التعاقدية." },
    mainServices: [
      {
        color: "green",
        title: "التوصيل السريع",
        desc: "توصيل سريع ومحدد الوقت من الباب للباب للوثائق والطرود داخل سوريا وإلى وجهات دولية.",
        features: ["تغطية كل المحافظات السورية", "شحن دولي متكامل", "تتبع لحظي من الاستلام للتسليم", "توصيل آمن للوثائق الرسمية", "خدمة باب لباب"],
      },
      {
        color: "maroon",
        title: "اللوجستيات التعاقدية",
        desc: "حلول متكاملة تشمل التخزين وإدارة المخزون وتلبية الطلبات والتوزيع المخصص.",
        features: ["17,000 م² مساحة تخزين آمنة", "إدارة مخزون ذكية", "تلبية طلبات التجارة الإلكترونية", "خدمات توزيع مخصصة", "تقارير وتحليلات دورية"],
      },
    ],
    subTitle: "خدمات متخصصة",
    subServices: [
      { color: "green", title: "دعم التجارة الإلكترونية", desc: "استلام وتحضير وتوصيل الطلبات للمتاجر الإلكترونية بكفاءة عالية وتكلفة منخفضة." },
      { color: "maroon", title: "حلول مؤسسية وحكومية", desc: "برامج توصيل مخصصة للشركات والمؤسسات الحكومية والدبلوماسية." },
      { color: "green", title: "توصيل آمن ومعتمد", desc: "معالجة خاصة للوثائق الرسمية والمواد الحساسة مع ضمان سلامة المحتوى." },
      { color: "maroon", title: "الشحن الدولي", desc: "خدمات شحن متكاملة لوجهات عالمية عبر شبكتنا الإقليمية في الأردن والإمارات ودبي." },
    ],
    cta: { title: "مستعد للبدء؟", desc: "تواصل معنا اليوم للحصول على حل لوجستي مخصص.", btn: "تواصل معنا" },
  },
  en: {
    hero: { badge: "Our Services", title: "Integrated", highlight: "Logistics Solutions", desc: "We specialize in two core pillars designed to meet the critical needs of the modern Syrian market — Express Delivery and Contract Logistics." },
    mainServices: [
      {
        color: "green",
        title: "Express Delivery",
        desc: "Time-definite, door-to-door delivery for documents and parcels across Syria and to international destinations.",
        features: ["All Syria Governorates Coverage", "Fully Integrated International Shipping", "Real-time End-to-End Tracking", "Secure Official Document Delivery", "Door-to-Door Service"],
      },
      {
        color: "maroon",
        title: "Contract Logistics",
        desc: "Integrated solutions including warehousing, inventory management, order fulfillment, and dedicated distribution.",
        features: ["17,000 m² Secure Storage Area", "Smart Inventory Management", "E-Commerce Order Fulfillment", "Dedicated Distribution Services", "Periodic Reports & Analytics"],
      },
    ],
    subTitle: "Specialized Services",
    subServices: [
      { color: "green", title: "E-Commerce Support", desc: "Pickup, preparation and last-mile delivery for online retailers with high efficiency and low cost." },
      { color: "maroon", title: "Corporate & Government Solutions", desc: "Customized delivery programs for businesses, government entities, and diplomatic missions." },
      { color: "green", title: "Secured & Fast Delivery", desc: "Specialized handling for official mail and sensitive materials with guaranteed content integrity." },
      { color: "maroon", title: "International Shipping", desc: "Integrated shipping services to global destinations via our regional network in Jordan, UAE, and Dubai." },
    ],
    cta: { title: "Ready to Get Started?", desc: "Contact us today for a customized logistics solution.", btn: "Contact Us" },
  },
};

export default function ServicesPage() {
  const { lang, isAr } = useLang();
  const t = content[lang];
  const heroIn = useInView(0.05);
  const mainIn = useInView(0.1);
  const subIn = useInView(0.1);
  const ctaIn = useInView(0.1);

  const vd = isAr ? "translateX(-52px)" : "translateX(52px)";

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="overflow-x-hidden">
      <style>{`
        @keyframes qe-fadeup   { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes qe-vanin    { from{opacity:0;transform:${vd}} to{opacity:1;transform:translateX(0)} }
        @keyframes qe-rotatein { from{opacity:0;transform:perspective(1000px) rotateX(12deg) translateY(30px)} to{opacity:1;transform:perspective(1000px) rotateX(0) translateY(0)} }
        @keyframes qe-gridmov  { from{background-position:0 0} to{background-position:60px 60px} }
        @keyframes qe-float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes qe-shimmer  { 0%{transform:translateX(-130%)} 100%{transform:translateX(320%)} }
        @keyframes qe-drawline { from{width:0} to{width:100%} }
        .qe-badge-anim{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;padding:5px 14px;border-radius:100px}
        .qe-shimmer-card:hover .shimmer-effect{animation: qe-shimmer 2s infinite;}
      `}</style>

      {/* Hero */}
      <section className="relative bg-white py-20 md:py-32 overflow-hidden" ref={heroIn.ref}>
        {/* Background Animation */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage:`linear-gradient(${M}12 1px,transparent 1px),linear-gradient(90deg,${G}08 1px,transparent 1px)`,
          backgroundSize:"60px 60px", animation:"qe-gridmov 20s linear infinite", opacity:0.3,
        }}/>
        
        <div className="absolute pointer-events-none" style={{
          width:500, height:500, borderRadius:"50%",
          top:-250, [isAr?"left":"right"]:-150,
          background:`radial-gradient(circle,${G}08 0%,transparent 70%)`,
          border:`1px solid ${G}10`,
        }}/>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          {heroIn.visible && (
            <>
              <div className="mb-6" style={a("qe-fadeup", 0)}>
                <span className="qe-badge-anim" style={{background:`${G}10`, color:G}}>
                   <span className="w-1.5 h-1.5 rounded-full" style={{background:G}}/>
                   {t.hero.badge}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                <span className="inline-block" style={a("qe-vanin", 0.1)}>{t.hero.title}</span>{" "}
                <span className="text-[#1a5c2a] inline-block" style={a("qe-vanin", 0.2)}>{t.hero.highlight}</span>
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed" style={a("qe-fadeup", 0.4)}>
                {t.hero.desc}
              </p>
            </>
          )}
        </div>
      </section>

      {/* Main Services */}
      <section className="py-24 bg-white relative z-10" ref={mainIn.ref}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {t.mainServices.map((s, i) => {
              const isGreen = s.color === "green";
              const ac = isGreen ? G : M;
              return (
                <TiltCard 
                  key={s.title} 
                  glowColor={ac}
                  className="group rounded-[3.5rem] p-10 md:p-16 relative overflow-hidden text-white shadow-2xl"
                  style={{
                    background: isGreen 
                      ? `linear-gradient(165deg, ${G} 0%, #0d3117 100%)` 
                      : `linear-gradient(165deg, ${M} 0%, #4a0d16 100%)`,
                    ...(mainIn.visible ? a("qe-rotatein", 0.2 + i * 0.2) : {opacity:0})
                  }}
                >
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/10 transition-colors duration-700" />
                  
                  <div className="relative z-10">
                    <div className="w-24 h-24 bg-white/10 backdrop-blur-2xl rounded-[2.5rem] flex items-center justify-center mb-12 border border-white/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                         style={{ animation: 'qe-float 5s infinite ease-in-out' }}>
                      {isGreen ? (
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      ) : (
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      )}
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">{s.title}</h2>
                    <p className="text-white/70 text-xl leading-relaxed mb-12 max-w-md font-medium">{s.desc}</p>
                    
                    <div className="space-y-5">
                      {s.features.map((f, idx) => (
                        <div key={f} className="flex items-center gap-5 group/item"
                             style={mainIn.visible ? a("qe-vanin", 0.5 + idx * 0.1) : {}}>
                          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0 group-hover/item:bg-white group-hover/item:text-black transition-all">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-white/80 font-bold text-lg">{f}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-16">
                      <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20">
                         {isAr ? "اطلب الخدمة الآن" : "Order Now"}
                         <svg className={`w-5 h-5 ${isAr?'rotate-180':''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sub Services */}
      <section className="bg-gray-50 py-24" ref={subIn.ref}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 text-center mb-20 tracking-tight" style={subIn.visible ? a("qe-fadeup", 0) : {opacity:0}}>
            {t.subTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {t.subServices.map((s, i) => {
              const isGreen = s.color === "green";
              return (
                <div key={s.title} 
                     className="bg-white rounded-[2rem] p-10 border border-gray-100 hover:shadow-2xl transition-all duration-500 group flex flex-col sm:flex-row gap-8"
                     style={subIn.visible ? a("qe-rotatein", 0.1 + i * 0.1) : {opacity:0}}>
                  <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ${isGreen ? "bg-[#1a5c2a]/10 text-[#1a5c2a]" : "bg-[#8B1A2A]/10 text-[#8B1A2A]"}`}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={`font-black mb-4 text-xl ${isGreen ? "text-[#1a5c2a]" : "text-[#8B1A2A]"}`}>{s.title}</h3>
                    <p className="text-gray-500 text-lg leading-relaxed font-medium">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-24 relative overflow-hidden" ref={ctaIn.ref}>
        <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
          backgroundImage: `radial-gradient(${M}15 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }} />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          {ctaIn.visible && (
            <div style={a("qe-fadeup", 0)}>
              <h2 className="text-4xl font-black text-gray-900 mb-6">{t.cta.title}</h2>
              <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">{t.cta.desc}</p>
              <Link 
                href="/contact" 
                className="inline-flex items-center group bg-[#1a5c2a] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#134a20] transition-all duration-300 shadow-xl shadow-[#1a5c2a]/30 hover:-translate-y-1"
              >
                {t.cta.btn}
                <svg className={`w-5 h-5 ${isAr?'mr-3 rotate-180':'ml-3'} group-hover:translate-x-1 transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}