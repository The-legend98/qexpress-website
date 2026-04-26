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
    scrollText: "اكتشف المزيد",
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
    scrollText: "Discover More",
    damsco: "Part of Damsco Group",
  },
};

// Counter animation hook
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

// Typewriter hook
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

export default function HeroSection() {
  const { lang, isAr, isDark } = useLang();
  const t = content[lang];
  const [visible, setVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Trigger entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Trigger stats counter when visible
  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStatsVisible(true); obs.disconnect(); }
    }, { threshold: 0.5 });
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
      className={`relative overflow-hidden min-h-[calc(100vh-72px)] flex items-center transition-colors duration-300 ${isDark ? "bg-[#050810]" : "bg-white"}`}
    >
      {/* Background Image with parallax feel */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80"
          alt="Q Express Warehouse"
          fill
          className={`object-cover transition-all duration-[2000ms] ${visible ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
          priority
        />
        <div className={`absolute inset-0 transition-opacity duration-1000 ${
          isDark
            ? "bg-gradient-to-l from-[#050810] via-[#050810]/90 to-[#050810]/50"
            : "bg-gradient-to-l from-white via-white/94 to-white/60"
        }`} />
        {/* Top fade */}
        <div className={`absolute top-0 inset-x-0 h-32 ${isDark ? "bg-gradient-to-b from-[#050810] to-transparent" : "bg-gradient-to-b from-white to-transparent"}`} />
      </div>

      {/* Animated grid overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className={`w-full h-full ${isDark ? "opacity-[0.03]" : "opacity-[0.025]"}`} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke={isDark ? "#4ade80" : "#1a5c2a"} strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="60%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Glow orbs */}
      {isDark && (
        <>
          <div
            className="absolute w-96 h-96 rounded-full blur-3xl pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(26,92,42,0.12) 0%, transparent 70%)",
              top: "20%",
              left: isAr ? "auto" : "5%",
              right: isAr ? "5%" : "auto",
              animation: "float 6s ease-in-out infinite",
            }}
          />
          <div
            className="absolute w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(139,26,42,0.1) 0%, transparent 70%)",
              bottom: "15%",
              left: isAr ? "auto" : "15%",
              right: isAr ? "15%" : "auto",
              animation: "float 8s ease-in-out infinite reverse",
            }}
          />
        </>
      )}

      {/* Accent line */}
      <div
        className={`absolute top-0 bottom-0 w-px transition-all duration-1000 ${visible ? "opacity-60" : "opacity-0"} ${isAr ? "left-0" : "right-0"}`}
        style={{ background: "linear-gradient(to bottom, transparent, #1a5c2a, #8B1A2A, transparent)" }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="max-w-2xl">

          {/* Badge — slides in */}
          <div
            className={`flex items-center gap-3 mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-widest uppercase ${
              isDark
                ? "bg-[#1a5c2a]/15 border-[#1a5c2a]/25 text-[#4ade80]"
                : "bg-[#1a5c2a]/8 border-[#1a5c2a]/15 text-[#1a5c2a]"
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              {t.badge}
            </div>
          </div>

          {/* Title — slides in with delay */}
          <div
            className={`mb-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "400ms" }}
          >
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-tight  ${isDark ? "text-white" : "text-gray-900"}`}>
              {t.title}
              <br />
              <span className="relative">
                <span className="gradient-text-green">
                  {typewriterText}
                </span>
                {/* Blinking cursor */}
                {typewriterText.length < t.titleHighlight.length && (
                  <span className="inline-block w-0.5 h-12 md:h-16 bg-[#1a5c2a] mx-1 animate-pulse align-middle" />
                )}
              </span>
            </h1>
          </div>

          {/* Description */}
          <p
            className={`text-base md:text-lg leading-relaxed mb-8 max-w-lg transition-all duration-700 ${
              isDark ? "text-slate-400" : "text-slate-500"
            } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "600ms" }}
          >
            {t.description}
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-wrap gap-4 mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "800ms" }}
          >
            <Link
              href="/contact"
              className="relative group bg-[#1a5c2a] text-white px-8 py-4 rounded-xl font-bold text-sm overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{
                boxShadow: isDark
                  ? "0 0 30px rgba(26,92,42,0.4), 0 4px 15px rgba(26,92,42,0.3)"
                  : "0 4px 20px rgba(26,92,42,0.3)",
              }}
            >
              {/* Shine effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">{t.cta}</span>
            </Link>

            <Link
              href="/about"
              className={`px-8 py-4 rounded-xl font-semibold text-sm border transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? "border-white/15 text-white hover:border-[#1a5c2a]/60 hover:bg-[#1a5c2a]/10 hover:shadow-[0_0_20px_rgba(26,92,42,0.2)]"
                  : "border-gray-200 text-gray-700 hover:border-[#1a5c2a] hover:text-[#1a5c2a] hover:shadow-md"
              }`}
            >
              {t.ctaSecondary}
            </Link>
          </div>

          {/* Stats with counter animation */}
          <div
            ref={statsRef}
            className={`flex gap-10 pt-8 border-t transition-all duration-700 ${
              isDark ? "border-white/8" : "border-gray-100"
            } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "1000ms" }}
          >
            {t.stats.map((stat, i) => (
              <div key={stat.label} className="group cursor-default">
                <div className={`text-2xl md:text-3xl font-bold transition-colors duration-300 ${
                  i === 0
                    ? "gradient-text-green"
                    : i === 1
                      ? "gradient-text-maroon"
                      : isDark ? "text-white" : "text-gray-900"
                }`}>
                  {statsVisible ? counters[i] : 0}{stat.suffix}
                </div>
                <div className={`text-xs mt-1 transition-colors duration-300 ${isDark ? "text-slate-500 group-hover:text-slate-400" : "text-slate-400 group-hover:text-slate-600"}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div
        className={`absolute bottom-6 left-6 right-6 flex items-center justify-between transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDelay: "1200ms" }}
      >
        {/* Scroll hint */}
        <div className={`flex items-center gap-3 ${isDark ? "text-slate-600" : "text-gray-300"}`}>
          <div className={`flex flex-col items-center gap-0.5 ${isDark ? "text-slate-600" : "text-gray-300"}`}>
            <div className="w-px h-6 bg-current opacity-50" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#1a5c2a] animate-bounce" />
          </div>
          <span className="text-xs font-medium">{t.scrollText}</span>
        </div>

        {/* Moving With Purpose tag */}
        <div className={`flex items-center gap-2 text-xs ${isDark ? "text-slate-600" : "text-gray-300"}`}>
          <div className="w-1.5 h-1.5 bg-[#1a5c2a] rounded-full animate-pulse" />
          <span>{t.damsco}</span>
        </div>
      </div>

    </section>
  );
}