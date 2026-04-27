"use client";

import { useLang } from "@/lib/LangContext";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

const GALLERY_PHOTOS = [
  "/images/g-1.png",
  "/images/g-2.png",
  "/images/g-3.png",
  "/images/g-4.png",
];

const G = "#1a5c2a";   // GREEN
const M = "#8B1A2A";   // MAROON

// ─── Content ─────────────────────────────────────────────────────────────────
const content = {
  ar: {
    hero: { badge:"من نحن", title:"نيو قاسيون إكسبريس", subtitle:"شريك لوجستي من الجيل القادم",
      desc:"تأسسنا عام 2025 برؤية واضحة لإعادة تعريف قطاع التوصيل السريع واللوجستيات التعاقدية في سوريا.",
      stats:[{num:"2025",label:"تأسست"},{num:"100%",label:"تغطية سوريا"},{num:"24/7",label:"عمليات"}] },
    mission:{ badge:"رؤيتنا ورسالتنا",
      vision:{title:"رؤيتنا",desc:"أن نكون المنصة اللوجستية الأكثر قدرة وموثوقية في سوريا، والحلقة الأساسية بين التجارة المحلية والاقتصاد العالمي."},
      mission:{title:"رسالتنا",desc:"تمكين الأعمال وتسهيل النمو من خلال خدمات توصيل سريعة وموثوقة وحلول لوجستية تعاقدية مخصصة، مع وضع معايير الجودة والأمان وشراكة العملاء."} },
    values:{ badge:"قيمنا الأساسية", title:"ما نؤمن به",
      items:[
        {title:"التميز والموثوقية",desc:"في كل عملية، لكل شحنة."},
        {title:"الشراكة الرشيقة",desc:"نعمل كامتداد حقيقي لفريق عملائنا."},
        {title:"النزاهة والأمان",desc:"معايير لا تقبل المساومة في الامتثال وسلامة الشحنات."},
        {title:"الابتكار",desc:"الاستفادة من التكنولوجيا لتحقيق لوجستيات أذكى وأكثر وضوحاً."},
      ]},
    tech:{ badge:"تقنيتنا", title:"بنية تحتية للمستقبل",
      items:[
        {title:"Odoo ERP",desc:"نظام مركزي يدير العمليات والمالية وعلاقات العملاء من قاعدة بيانات واحدة."},
        {title:"تتبع GPS لحظي",desc:"أسطولنا مجهز بتتبع GPS مباشر لرؤية شاملة من الاستلام حتى التسليم."},
        {title:"اتصال مزدوج",desc:"شبكة ألياف ضوئية مع نسخة احتياطية تلقائية عبر Starlink لضمان الاستمرارية."},
        {title:"تكامل الأنظمة",desc:"مصمم للتكامل السلس مع منصات الشركاء والعملاء عالمياً."},
      ]},
  },
  en: {
    hero:{ badge:"About Us", title:"New Qasioun Express", subtitle:"Next-Generation Logistics Partner",
      desc:"Founded in 2025 with a clear vision to redefine the express delivery and contract logistics landscape in Syria. We combine the agility of a new enterprise with the financial stability of the Damsco Group.",
      stats:[{num:"2025",label:"Founded"},{num:"100%",label:"Syria Coverage"},{num:"24/7",label:"Operations"}] },
    mission:{ badge:"Vision & Mission",
      vision:{title:"Our Vision",desc:"To be the most capable and trusted express and logistics platform in Syria, recognized as the essential link between local commerce and the global economy."},
      mission:{title:"Our Mission",desc:"To empower businesses and facilitate growth by delivering reliable, time-definite express services and providing tailored, efficient contract logistics solutions."} },
    values:{ badge:"Our Core Values", title:"What We Believe In",
      items:[
        {title:"Excellence & Reliability",desc:"In every operation, for every shipment."},
        {title:"Agile Partnership",desc:"Acting as a true extension of our clients' teams."},
        {title:"Integrity & Security",desc:"Uncompromising standards in compliance and cargo safety."},
        {title:"Innovation",desc:"Leveraging technology to drive smarter, more visible logistics."},
      ]},
    tech:{ badge:"Technology", title:"Future-Built Infrastructure",
      items:[
        {title:"Odoo ERP",desc:"Centralized system managing operations, finance, and customer relations from a single database."},
        {title:"Live GPS Tracking",desc:"Fleet equipped with live GPS tracking for end-to-end shipment visibility."},
        {title:"Dual Connectivity",desc:"Fiber-optic with automatic Starlink failover ensuring 100% operational uptime."},
        {title:"System Integration",desc:"Designed for seamless integration with partners' and customers' global platforms."},
      ]},
  },
};

const VALUE_ICONS = [
  <svg key="1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>,
  <svg key="2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  <svg key="3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>,
  <svg key="4" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
];

// ─── Hooks ────────────────────────────────────────────────────────────────────
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

function useCounter(target: number, dur = 1300, active = false) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let s = 0; const step = target / (dur / 16);
    const id = setInterval(() => { s += step; if (s >= target) { setN(target); clearInterval(id); } else setN(Math.floor(s)); }, 16);
    return () => clearInterval(id);
  }, [target, dur, active]);
  return n;
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
function HeroGallery({ isAr }: { isAr: boolean }) {
  const [cur, setCur] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const [going, setGoing] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const goTo = useCallback((i: number) => {
    if (going || i === cur) return;
    setGoing(true); setPrevIdx(cur); setCur(i);
    setTimeout(() => { setPrevIdx(null); setGoing(false); }, 520);
  }, [going, cur]);

  const nxt = useCallback(() => goTo((cur + 1) % GALLERY_PHOTOS.length), [cur, goTo]);
  const prv = useCallback(() => goTo((cur - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length), [cur, goTo]);

  useEffect(() => { timer.current = setTimeout(nxt, 4200); return () => clearTimeout(timer.current); }, [cur, nxt]);

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden">
      {prevIdx !== null && (
        <div className="absolute inset-0 z-[1]" style={{ animation:"qe-slideout 0.52s cubic-bezier(0.4,0,0.2,1) forwards" }}>
          <Image src={GALLERY_PHOTOS[prevIdx]} alt="" fill className="object-cover"/>
          <div className="absolute inset-0" style={{ background:`linear-gradient(to top,${M}60 0%,transparent 55%)` }}/>
        </div>
      )}
      <div className="absolute inset-0 z-[2]" style={{ animation: going ? "qe-slidein 0.52s cubic-bezier(0.4,0,0.2,1) forwards" : undefined }}>
        <Image src={GALLERY_PHOTOS[cur]} alt="Q Express" fill className="object-cover" priority/>
        <div className="absolute inset-0" style={{ background:`linear-gradient(to top,${M}55 0%,rgba(0,0,0,0.08) 55%,transparent 100%)` }}/>
      </div>

      {/* Moving With Purpose bar */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 z-10">
        <div className="rounded-2xl px-5 py-3.5 flex items-center gap-3"
          style={{ background:"rgba(255,255,255,0.14)", backdropFilter:"blur(16px)", border:"1px solid rgba(255,255,255,0.24)" }}>
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inset-0 rounded-full opacity-60" style={{ background:G, animation:"qe-ping 1.4s cubic-bezier(0,0,0.2,1) infinite" }}/>
            <span className="relative rounded-full h-2.5 w-2.5" style={{ background:G }}/>
          </span>
          <span className="font-black text-white text-sm uppercase overflow-hidden"
            style={{ animation:"qe-vantext 0.9s cubic-bezier(0.23,1,0.32,1) both", letterSpacing:"0.12em" }}>
            Moving With Purpose
          </span>
          <span className="ms-auto text-white/55 text-xs font-semibold" style={{ animation:"qe-fadein 1s 0.6s both", opacity:0 }}>
            Since 2025
          </span>
        </div>
      </div>

      <button onClick={prv} aria-label="prev" className="absolute top-1/2 -translate-y-1/2 start-3 z-10 w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
        style={{ background:M, boxShadow:`0 4px 14px ${M}55` }}>
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isAr?"M9 5l7 7-7 7":"M15 19l-7-7 7-7"}/></svg>
      </button>
      <button onClick={nxt} aria-label="next" className="absolute top-1/2 -translate-y-1/2 end-3 z-10 w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
        style={{ background:M, boxShadow:`0 4px 14px ${M}55` }}>
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isAr?"M15 19l-7-7 7-7":"M9 5l7 7-7 7"}/></svg>
      </button>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
        {GALLERY_PHOTOS.map((_,i) => (
          <button key={i} onClick={()=>goTo(i)} className="rounded-full transition-all duration-300"
            style={{ width:i===cur?20:6, height:6, background:i===cur?M:"rgba(255,255,255,0.5)" }} aria-label={`${i+1}`}/>
        ))}
      </div>
    </div>
  );
}

// ─── TiltCard with glow ───────────────────────────────────────────────────────
function TiltCard({ children, className="", style={}, glowColor="" }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; glowColor?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX-r.left)/r.width-0.5)*14;
    const y = ((e.clientY-r.top)/r.height-0.5)*-14;
    el.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateZ(10px)`;
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

// ─── StatBadge ────────────────────────────────────────────────────────────────
function StatBadge({ num, label, active, color }: { num:string; label:string; active:boolean; color:"g"|"m" }) {
  const isN = !isNaN(parseInt(num));
  const cnt = useCounter(isN?parseInt(num):0, 1300, active&&isN);
  const display = isN?(num.includes("%")?cnt+"%":num.replace(/\d+/,String(cnt))):num;
  return (
    <div className="flex flex-col">
      <span className="text-3xl font-black tabular-nums" style={{ color:color==="g"?G:M }}>{display}</span>
      <span className="text-xs text-gray-400 mt-0.5 font-semibold tracking-widest uppercase">{label}</span>
    </div>
  );
}

// animation shorthand
const a = (name:string, delay:number, dur=0.65): React.CSSProperties => ({
  animation:`${name} ${dur}s ${delay}s cubic-bezier(0.23,1,0.32,1) both`, opacity:0,
});

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const { lang, isAr } = useLang();
  const t = content[lang];
  const heroIn    = useInView(0.05);
  const missionIn = useInView(0.12);
  const valuesIn  = useInView(0.08);
  const techIn    = useInView(0.08);

  const vd  = isAr ? "translateX(-52px)" : "translateX(52px)";   // van direction
  const vdr = isAr ? "translateX(52px)"  : "translateX(-52px)";  // van direction reverse

  return (
    <div dir={isAr?"rtl":"ltr"} className="overflow-x-hidden">
      <style>{`
        @keyframes qe-fadeup   { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes qe-fadein   { from{opacity:0} to{opacity:1} }
        @keyframes qe-vanin    { from{opacity:0;transform:${vd}} to{opacity:1;transform:translateX(0)} }
        @keyframes qe-vaninrev { from{opacity:0;transform:${vdr}} to{opacity:1;transform:translateX(0)} }
        @keyframes qe-vantext  { from{opacity:0;letter-spacing:0.32em;transform:${isAr?"translateX(14px)":"translateX(-14px)"}} to{opacity:1;letter-spacing:0.12em;transform:translateX(0)} }
        @keyframes qe-scaleup  { from{opacity:0;transform:scale(0.88) perspective(800px) rotateY(${isAr?"":"- "}6deg)} to{opacity:1;transform:scale(1) perspective(800px) rotateY(0)} }
        @keyframes qe-slidein  { from{opacity:0;transform:${vd} scale(1.03)} to{opacity:1;transform:translateX(0) scale(1)} }
        @keyframes qe-slideout { from{opacity:1;transform:translateX(0)} to{opacity:0;transform:${vdr}} }
        @keyframes qe-float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes qe-floatb   { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-6px) rotate(4deg)} }
        @keyframes qe-spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes qe-spinslow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes qe-shimmer  { 0%{transform:translateX(-130%)} 100%{transform:translateX(320%)} }
        @keyframes qe-gridmov  { from{background-position:0 0} to{background-position:60px 60px} }
        @keyframes qe-ping     { 75%,100%{transform:scale(2.2);opacity:0} }
        @keyframes qe-pulseglow { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
        @keyframes qe-drawline { from{width:0} to{width:100%} }
        @keyframes qe-rotatein { from{opacity:0;transform:perspective(700px) rotateX(18deg) translateY(24px)} to{opacity:1;transform:perspective(700px) rotateX(0) translateY(0)} }

        .qe-badge{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;padding:5px 14px;border-radius:100px}
        .qe-val-line{height:3px;border-radius:2px;width:0;transition:width .5s cubic-bezier(.23,1,.32,1)}
        .qe-val-card:hover .qe-val-line{width:100%}
        .qe-shimmer-line{position:absolute;inset:0;overflow:hidden}
        .qe-shimmer-line::after{content:'';position:absolute;inset:0;background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.09) 55%,transparent 80%);animation:qe-shimmer 3.5s ease-in-out infinite}
      `}</style>

      {/* ══════════ HERO ══════════ */}
      <section className="relative bg-white overflow-hidden pt-20 pb-28 md:pt-28 md:pb-36" ref={heroIn.ref}>

        {/* ── Background geometric shapes ── */}
        {/* Moving dual-color grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage:`linear-gradient(${M}18 1px,transparent 1px),linear-gradient(90deg,${G}14 1px,transparent 1px)`,
          backgroundSize:"60px 60px", animation:"qe-gridmov 14s linear infinite", opacity:0.4,
        }}/>

        {/* Large half-circle top-end — maroon */}
        <div className="absolute pointer-events-none" style={{
          width:480, height:480, borderRadius:"50%",
          top:-200, [isAr?"left":"right"]:-160,
          background:`radial-gradient(circle at 60% 40%,${M}12 0%,${M}06 40%,transparent 70%)`,
          border:`1.5px solid ${M}15`,
        }}/>
        {/* Quarter arc top-end decorative ring */}
        <div className="absolute pointer-events-none" style={{
          width:320, height:320, borderRadius:"50%",
          top:-100, [isAr?"left":"right"]:-60,
          border:`1px solid ${M}12`,
        }}/>

        {/* Large arc bottom-start — green */}
        <div className="absolute pointer-events-none" style={{
          width:360, height:360, borderRadius:"50%",
          bottom:-140, [isAr?"right":"left"]:-120,
          background:`radial-gradient(circle,${G}10 0%,transparent 65%)`,
          border:`1.5px solid ${G}12`,
        }}/>

        {/* Diagonal accent strip */}
        <div className="absolute pointer-events-none inset-0 overflow-hidden">
          <div style={{
            position:"absolute", top:0, [isAr?"right":"left"]:0, width:"100%", height:"100%",
            background:`linear-gradient(${isAr?"135deg":"45deg"},transparent 60%,${G}04 60%,${G}07 65%,transparent 65%)`,
          }}/>
        </div>

        {/* Small floating shapes */}
        <div className="absolute pointer-events-none" style={{ top:80, [isAr?"right":"left"]:60, width:32, height:32, borderRadius:8, border:`2px solid ${M}30`, transform:"rotate(20deg)", animation:"qe-floatb 6s ease-in-out infinite" }}/>
        <div className="absolute pointer-events-none" style={{ bottom:100, [isAr?"left":"right"]:80, width:20, height:20, borderRadius:"50%", background:`${G}25`, animation:"qe-float 5s ease-in-out infinite reverse" }}/>
        <div className="absolute pointer-events-none" style={{ top:"40%", [isAr?"right":"left"]:"8%", width:12, height:12, borderRadius:3, background:`${M}30`, transform:"rotate(45deg)", animation:"qe-floatb 8s ease-in-out infinite" }}/>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            {/* TEXT */}
            <div>
              {heroIn.visible && <>
                <div className="mb-7" style={a("qe-vanin",0,0.55)}>
                  <span className="qe-badge text-white" style={{background:M}}>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70"/>
                    {t.hero.badge}
                  </span>
                </div>
                <h1 className="text-5xl md:text-[3.5rem] font-black leading-[1.05] tracking-tight mb-4">
                  {t.hero.title.split(" ").map((w,i)=>(
                    <span key={i} className="inline-block me-2.5" style={a("qe-vanin",0.07+i*0.07,0.62)}>
                      <span style={{color:i%2===0?"#1a0a0e":M}}>{w}</span>
                    </span>
                  ))}
                </h1>
                <p className="text-lg font-bold mb-5" style={{color:G,...a("qe-vanin",0.38,0.6)}}>{t.hero.subtitle}</p>
                <p className="text-[#3a1a1e]/70 text-base leading-relaxed mb-10 max-w-md" style={a("qe-fadeup",0.45,0.65)}>
                  {t.hero.desc}
                </p>
                <div className="flex gap-10 pt-8 border-t" style={{borderColor:`${M}15`,...a("qe-fadeup",0.55,0.65)}}>
                  {t.hero.stats.map((s,i)=>(
                    <StatBadge key={s.label} num={s.num} label={s.label} active={heroIn.visible} color={i===1?"m":"g"}/>
                  ))}
                </div>
              </>}
            </div>

            {/* GALLERY */}
            <div className="relative hidden md:block" style={heroIn.visible?a("qe-scaleup",0.1,0.82):{opacity:0}}>
              <div className="absolute inset-0 rounded-[34px]" style={{background:`linear-gradient(135deg,${M}18,${G}0a)`,transform:"translate(14px,14px)"}}/>
              <div className="absolute inset-0 rounded-[32px]" style={{background:`linear-gradient(135deg,${G}0c,${M}08)`,transform:"translate(7px,7px)"}}/>
              <div className="relative rounded-3xl overflow-hidden" style={{height:350,boxShadow:`0 32px 64px -12px ${M}25`}}>
                <HeroGallery isAr={isAr}/>
              </div>
              <div className="absolute -top-6 -end-6 w-14 h-14 rounded-full border-2 flex items-center justify-center"
                style={{borderColor:`${M}35`,animation:"qe-float 5s ease-in-out infinite"}}>
                <div className="w-5 h-5 rounded-full" style={{background:`${M}60`}}/>
              </div>
              <div className="absolute -bottom-4 -start-4 w-10 h-10 rounded-full border-2"
                style={{borderColor:`${G}35`,animation:"qe-float 7s ease-in-out infinite reverse"}}/>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ MISSION ══════════ */}
      <section className="py-24 relative overflow-hidden" ref={missionIn.ref}
        style={{background:`linear-gradient(160deg,#fdf8f8 0%,#f6faf7 50%,#fdf8f8 100%)`}}>

        {/* Geometric bg: large quarter circle start + diagonal line end */}
        <div className="absolute pointer-events-none" style={{
          width:500, height:500, borderRadius:"50%",
          top:-200, [isAr?"right":"left"]:-200,
          background:`radial-gradient(circle,${G}08 0%,transparent 60%)`,
          border:`1px solid ${G}10`,
        }}/>
        <div className="absolute pointer-events-none" style={{
          width:300, height:300, borderRadius:"50%",
          bottom:-100, [isAr?"left":"right"]:-80,
          background:`radial-gradient(circle,${M}07 0%,transparent 65%)`,
          border:`1px solid ${M}10`,
        }}/>

        {/* Top/bottom separator lines */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{background:`linear-gradient(90deg,transparent,${M}35,transparent)`}}/>
        <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{background:`linear-gradient(90deg,transparent,${G}25,transparent)`}}/>

        <div className="max-w-7xl mx-auto px-6">
          {missionIn.visible && (
            <div className="text-center mb-14" style={a("qe-fadeup",0,0.6)}>
              <span className="qe-badge" style={{background:`${M}12`,color:M}}>
                <span className="w-1.5 h-1.5 rounded-full" style={{background:M}}/>
                {t.mission.badge}
              </span>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-7">
            {/* VISION card — enters from side, white bg, green accents */}
            <TiltCard glowColor={G}
              className="rounded-3xl p-9 border-2 cursor-default relative overflow-hidden"
              style={{
                background:"#fff", borderColor:`${G}20`,
                ...(missionIn.visible?a("qe-rotatein",0.1,0.75):{opacity:0}),
              }}>
              {/* Subtle dot matrix bg */}
              <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage:`radial-gradient(circle at 2px 2px,${G} 1.5px,transparent 0)`,
                backgroundSize:"22px 22px",
              }}/>
              {/* Green corner accent */}
              <div className="absolute top-0 start-0 w-20 h-20 pointer-events-none" style={{
                background:`radial-gradient(circle at 0% 0%,${G}18 0%,transparent 70%)`,
              }}/>

              <div className="relative mb-7">
                {/* Icon block */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 relative" style={{background:`${G}10`}}>
                  <svg className="w-7 h-7" style={{color:G}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-black mb-3" style={{color:"#1a0a0e"}}>{t.mission.vision.title}</h3>
                {/* Animated draw line on enter */}
                <div className="flex gap-1 overflow-hidden">
                  <div className="h-[3px] rounded-full" style={{background:G,animation:missionIn.visible?"qe-drawline 0.7s 0.6s ease both":"none",width:missionIn.visible?undefined:0}}/>
                  <div className="h-[3px] w-4 rounded-full" style={{background:M,animation:missionIn.visible?"qe-drawline 0.5s 1s ease both":"none",width:missionIn.visible?undefined:0}}/>
                </div>
              </div>
              <p className="relative text-gray-500 leading-relaxed text-[15px]">{t.mission.vision.desc}</p>
            </TiltCard>

            {/* MISSION card — maroon gradient, enters from opposite side */}
            <TiltCard glowColor={M}
              className="rounded-3xl p-9 cursor-default relative overflow-hidden"
              style={{
                background:`linear-gradient(145deg,${M} 0%,#5c0f1b 60%,#3a0510 100%)`,
                ...(missionIn.visible?a("qe-rotatein",0.22,0.75):{opacity:0}),
              }}>
              {/* Dot pattern */}
              <div className="absolute inset-0 opacity-[0.07]" style={{
                backgroundImage:"radial-gradient(circle at 2px 2px,white 1.5px,transparent 0)",
                backgroundSize:"24px 24px",
              }}/>
              {/* Green accent corner glow */}
              <div className="absolute bottom-0 end-0 w-40 h-40 pointer-events-none" style={{
                background:`radial-gradient(circle at 100% 100%,${G}25 0%,transparent 70%)`,
              }}/>
              {/* Green top strip */}
              <div className="absolute top-0 start-0 end-0 h-[3px]" style={{background:`linear-gradient(90deg,${G},${G}30,transparent)`}}/>
              {/* Orbiting ring */}
              <div className="absolute -top-10 -end-10 w-36 h-36 rounded-full border" style={{borderColor:"rgba(255,255,255,0.07)",animation:"qe-spinslow 14s linear infinite"}}/>

              <div className="relative mb-7">
                <div className="w-14 h-14 bg-white/14 rounded-2xl flex items-center justify-center mb-5" style={{backdropFilter:"blur(8px)"}}>
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-white mb-3">{t.mission.mission.title}</h3>
                <div className="flex gap-1">
                  <div className="h-[3px] w-8 rounded-full bg-white/35" style={{animation:missionIn.visible?"qe-drawline 0.6s 0.7s ease both":"none"}}/>
                  <div className="h-[3px] w-4 rounded-full" style={{background:G,animation:missionIn.visible?"qe-drawline 0.4s 1.1s ease both":"none"}}/>
                </div>
              </div>
              <p className="relative text-white/80 leading-relaxed text-[15px]">{t.mission.mission.desc}</p>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ══════════ VALUES ══════════ */}
      <section className="bg-white py-24 relative overflow-hidden" ref={valuesIn.ref}>
        {/* bg shapes */}
        <div className="absolute pointer-events-none" style={{
          width:600, height:600, borderRadius:"50%",
          top:"50%", [isAr?"right":"left"]:"50%",
          transform:"translate(-50%,-50%)",
          background:`radial-gradient(circle,${M}04 0%,transparent 60%)`,
        }}/>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage:`repeating-linear-gradient(${isAr?"-":""}45deg,${M}08 0,${M}08 1px,transparent 0,transparent 50%)`,
          backgroundSize:"30px 30px", opacity:0.5,
        }}/>

        <div className="relative max-w-7xl mx-auto px-6">
          {valuesIn.visible && (
            <div className="text-center mb-14" style={a("qe-fadeup",0,0.6)}>
              <span className="qe-badge" style={{background:`${G}10`,color:G}}>
                <span className="w-1.5 h-1.5 rounded-full" style={{background:G}}/>{t.values.badge}
              </span>
              <h2 className="text-4xl md:text-5xl font-black mt-5 tracking-tight" style={{color:"#1a0a0e"}}>{t.values.title}</h2>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.values.items.map((item, i) => {
              const ac = i%2===0?G:M;
              return (
                <TiltCard key={item.title} glowColor={ac}
                  className="qe-val-card rounded-2xl p-7 border-2 cursor-default relative overflow-hidden"
                  style={{
                    background:i%2!==0?`${M}05`:"#f9fafb",
                    borderColor:"#e5e7eb",
                    ...(valuesIn.visible?a("qe-rotatein",0.08+i*0.1,0.68):{opacity:0}),
                  }}
                  // @ts-ignore — custom event on outer div forwarded to TiltCard
                >
                  {/* Glow orb top corner */}
                  <div className="absolute -top-6 -end-6 w-20 h-20 rounded-full pointer-events-none" style={{background:`radial-gradient(circle,${ac}18 0%,transparent 70%)`,filter:"blur(8px)"}}/>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 relative" style={{background:`${ac}12`,color:ac}}>
                    {VALUE_ICONS[i]}
                    {/* Inner pulse ring on hover — handled by CSS */}
                    <div className="absolute inset-0 rounded-xl border" style={{borderColor:`${ac}25`}}/>
                  </div>

                  <div className="text-[10px] font-black tracking-[.2em] mb-3" style={{color:`${ac}55`}}>0{i+1}</div>
                  <h3 className="font-black text-sm mb-2" style={{color:ac}}>{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  <div className="qe-val-line mt-5" style={{background:`linear-gradient(90deg,${ac},${ac}25)`}}/>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ TECHNOLOGY ══════════ */}
      <section className="py-24 relative overflow-hidden" ref={techIn.ref}
        style={{background:`linear-gradient(150deg,#f0f9f3 0%,#fdf3f4 50%,#f0f9f3 100%)`}}>

        {/* الخلفيات الهندسية - تبقى كما هي */}
        <div className="absolute pointer-events-none" style={{
          width:440, height:440, borderRadius:"50%",
          top:-120, [isAr?"left":"right"]:-120,
          background:`radial-gradient(circle,${M}10 0%,transparent 65%)`,
          border:`1px solid ${M}12`,
        }}/>
        <div className="absolute pointer-events-none" style={{
          width:360, height:360, borderRadius:"50%",
          bottom:-100, [isAr?"right":"left"]:-80,
          background:`radial-gradient(circle,${G}10 0%,transparent 65%)`,
          border:`1px solid ${G}12`,
        }}/>

        {/* Section separator top */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{background:`linear-gradient(90deg,transparent,${G}30,transparent)`}}/>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {techIn.visible && (
            <div className="text-center mb-16" style={a("qe-fadeup",0,0.6)}>
              <span className="qe-badge" style={{background:`${G}12`,color:G}}>
                <span className="w-1.5 h-1.5 rounded-full" style={{background:G}}/>{t.tech.badge}
              </span>
              <h2 className="text-4xl md:text-5xl font-black mt-5 tracking-tight" style={{color:"#1a0a0e"}}>{t.tech.title}</h2>
            </div>
          )}

          {/* الـ Grid الآن بسيط gap-6 وبدون z-index معقد */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.tech.items.map((item,i) => {
              const ac = i%2===0?G:M;
              return (
                // تم إزالة TiltCard تماماً
                <div 
                  key={item.title}
                  // الكلاسات الجديدة للـ Hover البسيط: ظل خفيف، ارتفاع بسيط للأعلى، وزيادة وضوح الحواف
                  className="bg-white rounded-2xl p-7 border-2 flex gap-6 cursor-default relative overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-gray-200"
                  style={{
                    borderColor:`${ac}12`,
                    // الـ Animation الأصلي وقت الدخول يبقى كما هو
                    ...(techIn.visible?a("qe-vanin",0.1+i*0.1,0.68):{opacity:0})
                  }}
                >
                  {/* Number chip */}
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm transition-colors duration-300 group-hover:bg-[#1a5c2a]/20"
                      style={{background:`${ac}10`,border:`1.5px solid ${ac}30`,color:ac}}>
                      0{i+1}
                    </div>
                  </div>

                  <div className="relative z-10">
                    <h3 className="font-black text-base mb-2" style={{color:"#1a0a0e"}}>{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed antialiased">{item.desc}</p>
                  </div>

                  {/* Glow corner - يبقى، لكنه يظهر أكثر عند الـ Hover */}
                  <div className="absolute bottom-0 end-0 w-24 h-24 rounded-tl-3xl pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-100"
                    style={{background:`radial-gradient(circle at 100% 100%,${ac}16 0%,transparent 70%)`}}/>

                  {/* Shimmer bar at bottom - يبقى كما هو */}
                  <div className="absolute bottom-0 start-0 end-0 h-[2px] overflow-hidden rounded-b-2xl">
                    <div className="h-full w-2/5" style={{
                      background:`linear-gradient(90deg,transparent,${ac}60,transparent)`,
                      animation:techIn.visible?`qe-shimmer 3s ${i*0.5}s ease-in-out infinite`:undefined,
                    }}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
