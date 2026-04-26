"use client";

import { useLang } from "@/lib/LangContext";
import Link from "next/link";

const content = {
  ar: {
    hero: { badge: "عملاؤنا", title: "نخدم قطاعات", highlight: "متنوعة", desc: "نقدم خدماتنا لطيف واسع ومتنامٍ من العملاء عبر القطاعات الاقتصادية الرئيسية في سوريا." },
    segments: [
      { color: "green", title: "الشركات والصناعة", desc: "الشركات في قطاعات التصنيع والبناء والتجارة التي تحتاج شركاء سلسلة توريد موثوقين.", examples: ["شركات التصنيع", "مقاولو البناء", "شركات الاستيراد والتصدير", "الموزعون التجاريون"] },
      { color: "maroon", title: "التجارة الإلكترونية", desc: "المنصات الإلكترونية وتجار التجزئة والجملة الذين يحتاجون حلول توصيل آخر ميل فعّالة.", examples: ["المتاجر الإلكترونية", "تجار التجزئة", "الموزعون", "منصات البيع الإلكتروني"] },
      { color: "green", title: "المؤسسات والحكومة", desc: "الجهات الحكومية والبعثات الدبلوماسية والمنظمات غير الحكومية التي تحتاج خدمات لوجستية آمنة وموثقة.", examples: ["الجهات الحكومية", "البعثات الدبلوماسية", "المنظمات غير الحكومية", "المؤسسات الدولية"] },
    ],
    why: { title: "لماذا يختارنا عملاؤنا؟", items: ["موثوقية وسرعة لا مثيل لها", "تتبع لحظي شفاف", "حلول مخصصة لكل قطاع", "دعم عملاء متخصص", "شبكة إقليمية واسعة", "أسعار تنافسية"] },
    cta: { title: "انضم إلى عملائنا", desc: "كن جزءاً من شبكة عملائنا المتنامية واستفد من حلول لوجستية مخصصة.", btn: "ابدأ الآن" },
  },
  en: {
    hero: { badge: "Our Clients", title: "Serving Diverse", highlight: "Sectors", desc: "We serve a diverse and growing portfolio of clients across Syria's key economic sectors." },
    segments: [
      { color: "green", title: "Corporate & Industrial", desc: "Businesses in manufacturing, construction, and trading requiring reliable supply chain partners.", examples: ["Manufacturing Companies", "Construction Contractors", "Import/Export Companies", "Commercial Distributors"] },
      { color: "maroon", title: "E-Commerce & Retail", desc: "Online platforms, retailers and wholesalers needing efficient last-mile and distribution solutions.", examples: ["Online Stores", "Retail Businesses", "Distributors", "E-commerce Platforms"] },
      { color: "green", title: "Institutions & Government", desc: "Government entities, diplomatic missions, and NGOs with demands for secure, compliant logistics.", examples: ["Government Entities", "Diplomatic Missions", "NGOs", "International Organizations"] },
    ],
    why: { title: "Why Clients Choose Us?", items: ["Unmatched reliability and speed", "Transparent real-time tracking", "Customized solutions per sector", "Dedicated customer support", "Wide regional network", "Competitive pricing"] },
    cta: { title: "Join Our Client Network", desc: "Become part of our growing client base and benefit from tailored logistics solutions.", btn: "Get Started" },
  },
};

export default function ClientsPage() {
  const { lang, isAr } = useLang();
  const t = content[lang];

  return (
    <div dir={isAr ? "rtl" : "ltr"}>

      {/* Hero */}
      <section className="relative bg-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#1a5c2a]/5" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#8B1A2A]/4" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block bg-[#1a5c2a]/10 text-[#1a5c2a] text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wide">
            {t.hero.badge}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.hero.title}{" "}
            <span className="text-[#8B1A2A]">{t.hero.highlight}</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">{t.hero.desc}</p>
        </div>
      </section>

      {/* Segments */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {t.segments.map((s) => {
              const isGreen = s.color === "green";
              return (
                <div key={s.title} className={`rounded-3xl p-8 text-white ${isGreen ? "bg-[#1a5c2a]" : "bg-[#8B1A2A]"}`}>
                  <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-6">{s.desc}</p>
                  <div className="space-y-2">
                    {s.examples.map((e) => (
                      <div key={e} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
                        <span className="text-white/80 text-sm">{e}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">{t.why.title}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.why.items.map((item, i) => (
              <div key={item} className="flex items-center gap-4 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-sm ${i % 2 === 0 ? "bg-[#1a5c2a]" : "bg-[#8B1A2A]"}`}>
                  {i + 1}
                </div>
                <span className="text-gray-700 text-sm font-medium">{item}</span>
              </div>
            ))}
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