"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/LangContext";
import { useEffect, useState, useRef } from "react";

const content = {
  ar: {
    badge: "شركة لوجستية رائدة في سوريا",
    title: "نقل بسرعة و أمان",
    titleHighlight: "وصول بثقة",
    description: "نيو قاسيون إكسبريس — شريككم اللوجستي من الجيل القادم. نقدم حلول توصيل سريعة وموثوقة لكل محافظات سوريا وإلى وجهات عالمية.",
    cta: "احجز شحنة الآن",
    ctaSecondary: "تعرف علينا",
    stats: [
      { value: 100, suffix: "%", label: "تغطية سوريا" },
      { value: 24, suffix: "/7", label: "عمليات مستمرة" },
      { value: 2025, suffix: "", label: "تأسست" },
    ],
    damsco: "جزء من مجموعة دمسكو",
  },
  en: {
    badge: "Syria's Next-Generation Logistics Partner",
    title: "Moving With",
    titleHighlight: "Purpose",
    description: "New Qasioun Express delivers reliable, time-definite express services across Syria and to global destinations — powered by modern technology and regional expertise.",
    cta: "Book a Shipment",
    ctaSecondary: "Learn More",
    stats: [
      { value: 100, suffix: "%", label: "Syria Coverage" },
      { value: 24, suffix: "/7", label: "Operations" },
      { value: 2025, suffix: "", label: "Established" },
    ],
    damsco: "Part of Damsco Group",
  },
};

function useCounter(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function useTypewriter(text: string, speed = 60, start = false) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!start) return;
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, start]);
  return displayed;
}

const heroImages = [
  "/images/hero-1.png",
  "/images/hero-2.png",
  "/images/hero-3.png",
];

export default function HeroSection() {
  const { lang, isAr, isDark } = useLang();
  const t = content[lang];
  const [visible, setVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStatsVisible(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const typewriterText = useTypewriter(t.titleHighlight, 80, visible);
  const c0 = useCounter(t.stats[0].value, 1800, statsVisible);
  const c1 = useCounter(t.stats[1].value, 1200, statsVisible);
  const c2 = useCounter(t.stats[2].value, 2000, statsVisible);
  const counters = [c0, c1, c2];

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className={`relative overflow-hidden min-h-[100svh] md:min-h-[calc(100vh-72px)] flex items-center transition-colors duration-300 ${
        isDark ? "bg-[#050810]" : "bg-white"
      }`}
    >
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {heroImages.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`Q Express ${i + 1}`}
            fill
            sizes="100vw"
            className={`object-cover transition-all duration-[1500ms] ${
              currentImage === i ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            priority={i === 0}
          />
        ))}

        {/* Overlay */}
        <div className={`absolute inset-0 ${
          isDark
            ? "bg-gradient-to-l from-[#050810] via-[#050810]/92 to-[#050810]/60"
            : isAr
              ? "bg-gradient-to-l from-white/98 via-white/88 to-white/40 md:from-white md:via-white/82 md:to-white/30"
              : "bg-gradient-to-r from-white/98 via-white/88 to-white/40 md:from-white md:via-white/82 md:to-white/30"
        }`} />

        {/* Top fade */}
        <div className={`absolute top-0 inset-x-0 h-24 md:h-32 ${
          isDark ? "bg-gradient-to-b from-[#050810] to-transparent" : "bg-gradient-to-b from-white/80 to-transparent"
        }`} />

        {/* Slideshow dots */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`transition-all duration-300 rounded-full ${
                currentImage === i ? "w-6 h-1.5 bg-[#1a5c2a]" : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className={`w-full h-full ${isDark ? "opacity-[0.03]" : "opacity-[0.02]"}`} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke={isDark ? "#4ade80" : "#1a5c2a"} strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="60%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Glow orbs — dark only */}
      {isDark && (
        <>
          <div className="absolute w-80 h-80 md:w-96 md:h-96 rounded-full blur-3xl pointer-events-none" style={{
            background: "radial-gradient(circle, rgba(26,92,42,0.12) 0%, transparent 70%)",
            top: "20%",
            left: isAr ? "auto" : "5%",
            right: isAr ? "5%" : "auto",
            animation: "float 6s ease-in-out infinite",
          }} />
          <div className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full blur-3xl pointer-events-none" style={{
            background: "radial-gradient(circle, rgba(139,26,42,0.1) 0%, transparent 70%)",
            bottom: "15%",
            left: isAr ? "auto" : "15%",
            right: isAr ? "15%" : "auto",
            animation: "float 8s ease-in-out infinite reverse",
          }} />
        </>
      )}

      {/* Accent line */}
      <div
        className={`absolute top-0 bottom-0 w-px transition-all duration-1000 ${visible ? "opacity-60" : "opacity-0"} ${isAr ? "left-0" : "right-0"}`}
        style={{ background: "linear-gradient(to bottom, transparent, #1a5c2a, #8B1A2A, transparent)" }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-6 py-16 md:py-24">
        <div className="max-w-2xl">

          {/* Badge */}
          <div
            className={`flex items-center gap-3 mb-5 md:mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className={`flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full border text-xs font-semibold tracking-wider uppercase ${
              isDark
                ? "bg-[#1a5c2a]/15 border-[#1a5c2a]/25 text-[#4ade80]"
                : "bg-[#1a5c2a]/8 border-[#1a5c2a]/15 text-[#1a5c2a]"
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse shrink-0" />
              {t.badge}
            </div>
          </div>

          {/* Title */}
          <div
            className={`mb-4 md:mb-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "400ms" }}
          >
            <h1 className={`text-[2rem] sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight ${isDark ? "text-white" : "text-gray-900"}`}>
              {t.title}
              <br />
              <span className="relative">
                <span className="gradient-text-green">{typewriterText}</span>
                {typewriterText.length < t.titleHighlight.length && (
                  <span className="inline-block w-0.5 h-8 md:h-14 bg-[#1a5c2a] mx-1 animate-pulse align-middle" />
                )}
              </span>
            </h1>
          </div>

          {/* Description */}
          <p
            className={`text-sm md:text-lg leading-relaxed mb-6 md:mb-8 max-w-lg transition-all duration-700 ${
              isDark ? "text-slate-400" : "text-slate-600"
            } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "600ms" }}
          >
            {t.description}
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-wrap gap-3 mb-10 md:mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "800ms" }}
          >
            <Link
              href="/contact"
              className="relative group bg-[#1a5c2a] text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-sm overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{
                boxShadow: isDark
                  ? "0 0 30px rgba(26,92,42,0.4), 0 4px 15px rgba(26,92,42,0.3)"
                  : "0 4px 20px rgba(26,92,42,0.3)",
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">{t.cta}</span>
            </Link>

            <Link
              href="/about"
              className={`px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm border transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? "border-white/15 text-white hover:border-[#1a5c2a]/60 hover:bg-[#1a5c2a]/10"
                  : "border-gray-300 text-gray-700 hover:border-[#1a5c2a] hover:text-[#1a5c2a] hover:shadow-md"
              }`}
            >
              {t.ctaSecondary}
            </Link>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className={`flex gap-6 md:gap-10 pt-6 md:pt-8 border-t transition-all duration-700 ${
              isDark ? "border-white/8" : "border-gray-100"
            } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "1000ms" }}
          >
            {t.stats.map((stat, i) => (
              <div key={stat.label} className="cursor-default">
                <div className={`text-xl md:text-3xl font-bold ${
                  i === 0 ? "gradient-text-green" : i === 1 ? "gradient-text-maroon" : isDark ? "text-white" : "text-gray-900"
                }`}>
                  {statsVisible ? counters[i] : 0}{stat.suffix}
                </div>
                <div className={`text-xs mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom scroll hint */}
      <div
        className={`absolute bottom-6 flex items-center gap-2 transition-all duration-700 ${
          isAr ? "right-6" : "left-6"
        } ${visible ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDelay: "1200ms" }}
      >
        <div className="flex flex-col items-center gap-1">
          <div className={`w-px h-5 ${isDark ? "bg-white/20" : "bg-gray-300"}`} />
          <div className="w-1 h-1 rounded-full bg-[#1a5c2a] animate-bounce" />
        </div>
      </div>

    </section>
  );
}