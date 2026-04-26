"use client";

import Link from "next/link";
import Image from "next/image";

interface HeroSectionProps {
  lang: "ar" | "en";
}

const content = {
  ar: {
    badge: "شركة لوجستية رائدة في سوريا",
    title: "نقل بهدف،",
    titleHighlight: "وصول بثقة",
    description: "نيو قاسيون إكسبريس — شريككم اللوجستي من الجيل القادم. نقدم حلول توصيل سريعة وموثوقة لكل محافظات سوريا وإلى وجهات عالمية.",
    cta: "احجز شحنة الآن",
    ctaSecondary: "تعرف علينا",
  },
  en: {
    badge: "Syria's Next-Generation Logistics Partner",
    title: "Moving With",
    titleHighlight: "Purpose",
    description: "New Qasioun Express delivers reliable, time-definite express services across Syria and to global destinations — powered by modern technology and regional expertise.",
    cta: "Book a Shipment",
    ctaSecondary: "Learn More",
  },
};

export default function HeroSection({ lang }: HeroSectionProps) {
  const t = content[lang];
  const isAr = lang === "ar";

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="relative bg-white overflow-hidden min-h-[calc(100vh-72px)] flex items-center"
    >
      {/* خلفية هندسية CSS */}
      <div className="absolute inset-0 pointer-events-none">
        {/* دوائر كبيرة */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#1a5c2a]/5" />
        <div className="absolute top-1/2 -translate-y-1/2 -left-20 w-72 h-72 rounded-full bg-[#1a5c2a]/4" />
        <div className="absolute -bottom-20 left-1/4 w-64 h-64 rounded-full bg-[#8B1A2A]/4" />
        <div className="absolute top-10 left-1/3 w-48 h-48 rounded-full bg-[#1a5c2a]/3" />

        {/* خطوط هندسية */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1a5c2a" strokeWidth="0.8"/>
            </pattern>
          </defs>
          <rect width="60%" height="100%" fill="url(#grid)" />
        </svg>

        {/* نقاط زخرفية */}
        <div className="absolute top-20 left-20 w-2 h-2 rounded-full bg-[#1a5c2a]/20" />
        <div className="absolute top-40 left-48 w-1.5 h-1.5 rounded-full bg-[#1a5c2a]/15" />
        <div className="absolute top-64 left-32 w-2 h-2 rounded-full bg-[#8B1A2A]/15" />
        <div className="absolute bottom-32 left-24 w-1.5 h-1.5 rounded-full bg-[#1a5c2a]/20" />
        <div className="absolute bottom-48 left-64 w-2 h-2 rounded-full bg-[#1a5c2a]/15" />
        <div className="absolute top-32 left-72 w-1 h-1 rounded-full bg-[#8B1A2A]/20" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center md:flex md:flex-row-reverse">

          {/* صورة — يسار على desktop، تحت على موبايل */}
          <div className="relative flex items-center justify-center order-2 md:order-1">
            <div className="relative w-full max-w-lg">

              {/* الصورة */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#1a5c2a]/15">
                <Image
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
                  alt="Q Express Delivery"
                  width={800}
                  height={500}
                  className="w-full h-64 md:h-80 object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a5c2a]/40 to-transparent" />

                {/* لوغو فوق الصورة */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                  <Image
                    src="/images/Q Express Logos-03.png"
                    alt="Q Express"
                    width={90}
                    height={30}
                    className="h-6 w-auto object-contain"
                  />
                </div>
              </div>

              {/* Moving With Purpose */}
              <div className="absolute -bottom-4 -left-4 bg-white border border-gray-100 rounded-2xl px-4 py-2.5 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-gray-700">Moving With Purpose</span>
                </div>
              </div>

              {/* توصيل سريع */}
              <div className="absolute -top-4 -right-4 bg-[#1a5c2a] rounded-2xl px-3 py-2.5 shadow-xl">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-white text-xs font-semibold">
                    {isAr ? "توصيل سريع" : "Express"}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* النص — يمين على desktop، فوق على موبايل */}
          <div className="flex flex-col gap-6 order-1 md:order-2">

            <span className="inline-flex w-fit bg-[#1a5c2a]/10 text-[#1a5c2a] text-xs font-semibold px-4 py-2 rounded-full tracking-wide">
              {t.badge}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-gray-900 leading-tight">
              {t.title}{" "}
              <span className="text-[#1a5c2a]">{t.titleHighlight}</span>
            </h1>

            <p className="text-gray-500 text-base md:text-lg leading-relaxed">
              {t.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="bg-[#1a5c2a] text-white px-6 md:px-8 py-3 md:py-3.5 rounded-xl font-semibold hover:bg-[#134a20] transition-all duration-200 shadow-lg shadow-[#1a5c2a]/20 text-sm md:text-base"
              >
                {t.cta}
              </Link>
              <Link
                href="/about"
                className="border border-gray-200 text-gray-700 px-6 md:px-8 py-3 md:py-3.5 rounded-xl font-semibold hover:border-[#1a5c2a] hover:text-[#1a5c2a] transition-all duration-200 text-sm md:text-base"
              >
                {t.ctaSecondary}
              </Link>
            </div>

            <div className="flex gap-8 pt-5 border-t border-gray-100">
              <div className="flex flex-col gap-1">
                <span className="text-xl md:text-2xl font-bold text-[#1a5c2a]">24/7</span>
                <span className="text-xs md:text-sm text-gray-400">{isAr ? "أمن وحماية" : "Security"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xl md:text-2xl font-bold text-[#1a5c2a]">100%</span>
                <span className="text-xs md:text-sm text-gray-400">{isAr ? "تغطية سوريا" : "Syria Coverage"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xl md:text-2xl font-bold text-[#1a5c2a]">2025</span>
                <span className="text-xs md:text-sm text-gray-400">{isAr ? "تأسست" : "Established"}</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}