"use client";

import { useLang } from "@/lib/LangContext";
import Link from "next/link";

const content = {
  ar: {
    hero: { badge: "أسطولنا", title: "مبني للسرعة", highlight: "والاستدامة", desc: "أسطول حديث ومتعدد الوسائط يجمع بين الرشاقة والمسؤولية البيئية. كل مركبة مجهزة بتقنية التتبع وتلتزم ببروتوكولات السلامة الصارمة." },
    vehicles: [
      { color: "green", title: "دراجات نارية", tag: "سريع", desc: "التوصيل الحضري السريع للوثائق والطرود الصغيرة في المناطق الحضرية.", features: ["توصيل فائق السرعة", "مثالية للوثائق العاجلة", "تغطية كاملة داخل المدن", "تتبع GPS لحظي"] },
      { color: "maroon", title: "سيارات كهربائية", tag: "صديق للبيئة", desc: "خدمة مميزة هادئة وصديقة للبيئة للطرود المتوسطة والعملاء المميزين.", features: ["انبعاثات صفرية", "هادئة وأنيقة", "مثالية لعملاء الشركات", "تتبع لحظي متكامل"] },
      { color: "green", title: "فانات وشاحنات", tag: "سعة كبيرة", desc: "نقل البضائع الضخمة ودعم التجارة الإلكترونية بحجم عالي ونقل آمن.", features: ["شحن البضائع الكبيرة", "دعم التجارة الإلكترونية", "نقل آمن ومؤمّن", "مناسبة للشركات والمصانع"] },
      { color: "maroon", title: "طائرات مسيّرة", tag: "قادم قريباً", desc: "توسيع نطاق التغطية للمناطق النائية وتحقيق سرعة توصيل غير مسبوقة.", features: ["وصول للمناطق النائية", "سرعة توصيل فائقة", "تقنية مستقبلية", "قيد التطوير"] },
    ],
    tech: { title: "تقنية الأسطول", items: ["تتبع GPS لحظي لكل مركبة", "بروتوكولات أمان صارمة", "صيانة دورية معتمدة", "اتصال مستمر بالمركز"] },
    cta: { title: "هل تحتاج توصيلاً سريعاً؟", btn: "احجز شحنة الآن" },
  },
  en: {
    hero: { badge: "Our Fleet", title: "Built for Speed", highlight: "& Sustainability", desc: "A modern, multimodal fleet combining agility with environmental responsibility. Every vehicle equipped with tracking technology and adhering to rigorous safety protocols." },
    vehicles: [
      { color: "green", title: "Motorbikes", tag: "Fast", desc: "Fast urban delivery for documents and small parcels in city areas.", features: ["Ultra-fast delivery", "Perfect for urgent documents", "Full city coverage", "Live GPS tracking"] },
      { color: "maroon", title: "Electric Cars", tag: "Eco-Friendly", desc: "Premium, quiet, zero-emission service for mid-size parcels and corporate clients.", features: ["Zero emissions", "Quiet and elegant", "Ideal for corporate clients", "Integrated live tracking"] },
      { color: "green", title: "Vans & Trucks", tag: "High Capacity", desc: "Heavy cargo transport and high-volume e-commerce support with secure handling.", features: ["Large cargo shipping", "E-commerce support", "Safe and insured transport", "Suitable for businesses"] },
      { color: "maroon", title: "Drones", tag: "Coming Soon", desc: "Expanding coverage to remote areas and achieving unprecedented delivery speeds.", features: ["Remote area access", "Ultra-fast delivery", "Future technology", "Under development"] },
    ],
    tech: { title: "Fleet Technology", items: ["Live GPS tracking on every vehicle", "Rigorous safety protocols", "Certified regular maintenance", "Continuous hub connectivity"] },
    cta: { title: "Need a Fast Delivery?", btn: "Book a Shipment Now" },
  },
};

export default function FleetPage() {
  const { lang, isAr } = useLang();
  const t = content[lang];

  return (
    <div dir={isAr ? "rtl" : "ltr"}>

      {/* Hero */}
      <section className="relative bg-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#8B1A2A]/4" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#1a5c2a]/5" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block bg-[#8B1A2A]/10 text-[#8B1A2A] text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wide">
            {t.hero.badge}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.hero.title}{" "}
            <span className="text-[#1a5c2a]">{t.hero.highlight}</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">{t.hero.desc}</p>
        </div>
      </section>

      {/* Vehicles */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {t.vehicles.map((v) => {
              const isGreen = v.color === "green";
              const isDimmed = v.tag === "قادم قريباً" || v.tag === "Coming Soon";
              return (
                <div
                  key={v.title}
                  className={`rounded-3xl p-7 border transition-all duration-200 ${
                    isDimmed
                      ? "bg-gray-100 border-gray-200 opacity-70"
                      : "bg-white border-gray-100 hover:shadow-lg hover:-translate-y-1"
                  }`}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isGreen ? "bg-[#1a5c2a]/10 text-[#1a5c2a]" : "bg-[#8B1A2A]/10 text-[#8B1A2A]"}`}>
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17H6a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v3m-4 7h-4m4 0a2 2 0 104 0 2 2 0 00-4 0zm-4 0a2 2 0 11-4 0 2 2 0 014 0zM16 9h4l2 4v2h-6V9z" />
                      </svg>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${isGreen ? "bg-[#1a5c2a]/10 text-[#1a5c2a]" : "bg-[#8B1A2A]/10 text-[#8B1A2A]"}`}>
                      {v.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{v.desc}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {v.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isGreen ? "bg-[#1a5c2a]" : "bg-[#8B1A2A]"}`} />
                        <span className="text-gray-500 text-xs">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Bar */}
      <section className="bg-[#1a5c2a] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-white font-bold text-center mb-8">{t.tech.title}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.tech.items.map((item) => (
              <div key={item} className="flex items-center gap-3 bg-white/10 rounded-2xl px-5 py-4">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white/90 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.cta.title}</h2>
          <Link href="/contact" className="bg-[#8B1A2A] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#6d1421] transition-all duration-200 shadow-lg shadow-[#8B1A2A]/20">
            {t.cta.btn}
          </Link>
        </div>
      </section>

    </div>
  );
}