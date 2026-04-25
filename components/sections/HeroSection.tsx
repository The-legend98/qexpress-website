"use client";

import Link from "next/link";

interface HeroSectionProps {
  lang: "ar" | "en";
}

const content = {
  ar: {
    badge: "شركة لوجستية رائدة في سوريا",
    title: "نقل بهدف،",
    titleHighlight: "وصول بثقة",
    description:
      "نيو قاسيون إكسبريس — شريككم اللوجستي من الجيل القادم. نقدم حلول توصيل سريعة وموثوقة لكل محافظات سوريا وإلى وجهات عالمية.",
    cta: "احجز شحنة الآن",
    ctaSecondary: "تعرف علينا",
  },
  en: {
    badge: "Syria's Next-Generation Logistics Partner",
    title: "Moving With",
    titleHighlight: "Purpose",
    description:
      "New Qasioun Express delivers reliable, time-definite express services across Syria and to global destinations — powered by modern technology and regional expertise.",
    cta: "Book a Shipment",
    ctaSecondary: "Learn More",
  },
};

const features = {
  ar: ["تتبع لحظي GPS", "تغطية كل سوريا", "شحن دولي", "أمان 24/7"],
  en: ["Live GPS Tracking", "All Syria Coverage", "International Shipping", "24/7 Security"],
};

export default function HeroSection({ lang }: HeroSectionProps) {
  const t = content[lang];
  const isAr = lang === "ar";

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="relative bg-white overflow-hidden min-h-[calc(100vh-72px)] flex items-center"
    >
      {/* Background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#1a5c2a]/5" />
        <div className="absolute top-1/2 -left-20 w-72 h-72 rounded-full bg-[#8B1A2A]/5" />
        <div className="absolute bottom-10 right-1/4 w-56 h-56 rounded-full bg-[#1a5c2a]/4" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Text Content */}
          <div className="flex flex-col gap-7">

            {/* Badge */}
            <span className="inline-flex w-fit bg-[#1a5c2a]/10 text-[#1a5c2a] text-xs font-semibold px-4 py-2 rounded-full tracking-wide">
              {t.badge}
            </span>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-gray-900 leading-tight">
              {t.title}{" "}
              <span className="text-[#1a5c2a]">{t.titleHighlight}</span>
            </h1>

            {/* Description */}
            <p className="text-gray-500 text-lg leading-relaxed max-w-lg">
              {t.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-[#1a5c2a] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#134a20] transition-all duration-200 shadow-lg shadow-[#1a5c2a]/20"
              >
                {t.cta}
              </Link>
              <Link
                href="/about"
                className="border border-gray-200 text-gray-700 px-8 py-3.5 rounded-xl font-semibold hover:border-[#1a5c2a] hover:text-[#1a5c2a] transition-all duration-200"
              >
                {t.ctaSecondary}
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-10 pt-6 border-t border-gray-100">
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-[#1a5c2a]">24/7</span>
                <span className="text-sm text-gray-400">
                  {isAr ? "أمن وحماية" : "Security"}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-[#1a5c2a]">100%</span>
                <span className="text-sm text-gray-400">
                  {isAr ? "تغطية سوريا" : "Syria Coverage"}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-[#1a5c2a]">2025</span>
                <span className="text-sm text-gray-400">
                  {isAr ? "تأسست" : "Established"}
                </span>
              </div>
            </div>
          </div>

          {/* Visual Card */}
          <div className="relative hidden md:flex items-center justify-center">
            <div className="relative w-full max-w-sm">

              {/* Main green card */}
              <div className="bg-[#1a5c2a] rounded-3xl p-8 text-white shadow-2xl shadow-[#1a5c2a]/30">

                {/* Card header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-base">
                      {isAr ? "توصيل سريع" : "Express Delivery"}
                    </p>
                    <p className="text-white/60 text-sm">
                      {isAr ? "باب لباب" : "Door to Door"}
                    </p>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-4">
                  {features[lang].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-white/15 rounded-full flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white/85 text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Card footer */}
                <div className="mt-8 pt-6 border-t border-white/15 flex items-center justify-between">
                  <span className="text-white/50 text-xs">
                    {isAr ? "جزء من مجموعة دمسكو" : "Part of Damsco Group"}
                  </span>
                  <span className="bg-white/15 text-white/90 text-xs px-3 py-1 rounded-full">
                    {isAr ? "تأسست 2025" : "Est. 2025"}
                  </span>
                </div>
              </div>

              {/* Floating pill - Moving With Purpose */}
              <div className="absolute -bottom-5 -left-5 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-gray-700">
                    Moving With Purpose
                  </span>
                </div>
              </div>

              {/* Floating accent - top left */}
              <div className="absolute -top-5 -right-5 bg-[#8B1A2A] rounded-2xl px-4 py-3 shadow-xl">
                <span className="text-white text-xs font-semibold">
                  {isAr ? "شحن دولي" : "International"}
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}