"use client";

import { useLang } from "@/lib/LangContext";
import Link from "next/link";

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

  return (
    <div dir={isAr ? "rtl" : "ltr"}>

      {/* Hero */}
      <section className="relative bg-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#1a5c2a]/5" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#8B1A2A]/4" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block bg-[#1a5c2a]/10 text-[#1a5c2a] text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wide">
            {t.hero.badge}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.hero.title}{" "}
            <span className="text-[#1a5c2a]">{t.hero.highlight}</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">{t.hero.desc}</p>
        </div>
      </section>

      {/* Main Services */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {t.mainServices.map((s) => {
              const isGreen = s.color === "green";
              return (
                <div key={s.title} className={`rounded-3xl p-8 md:p-10 ${isGreen ? "bg-[#1a5c2a]" : "bg-[#8B1A2A]"} text-white`}>
                  <div className={`w-14 h-14 ${isGreen ? "bg-white/15" : "bg-white/15"} rounded-2xl flex items-center justify-center mb-6`}>
                    {isGreen ? (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    ) : (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold mb-3">{s.title}</h2>
                  <p className="text-white/70 leading-relaxed mb-7">{s.desc}</p>
                  <div className="space-y-3">
                    {s.features.map((f) => (
                      <div key={f} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white/85 text-sm">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sub Services */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">{t.subTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {t.subServices.map((s) => {
              const isGreen = s.color === "green";
              return (
                <div key={s.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-200 flex gap-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${isGreen ? "bg-[#1a5c2a]/10 text-[#1a5c2a]" : "bg-[#8B1A2A]/10 text-[#8B1A2A]"}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={`font-bold mb-2 text-sm ${isGreen ? "text-[#1a5c2a]" : "text-[#8B1A2A]"}`}>{s.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{t.cta.title}</h2>
          <p className="text-gray-500 mb-6">{t.cta.desc}</p>
          <Link href="/contact" className="bg-[#1a5c2a] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#134a20] transition-all duration-200 shadow-lg shadow-[#1a5c2a]/20">
            {t.cta.btn}
          </Link>
        </div>
      </section>

    </div>
  );
}