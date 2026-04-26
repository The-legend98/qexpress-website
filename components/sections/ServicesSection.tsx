"use client";

import Link from "next/link";

interface ServicesSectionProps {
  lang: "ar" | "en";
}

const Icons = {
  express: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  logistics: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  ecommerce: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
  corporate: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  secure: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  international: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  check: (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  ),
  arrowLeft: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  ),
  arrowRight: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
};

const content = {
  ar: {
    badge: "ما نقدمه",
    title: "خدمات متكاملة",
    titleHighlight: "لكل احتياجاتكم",
    subtitle: "نتخصص في ركيزتين أساسيتين مصممتين لتلبية احتياجات السوق السوري الحديث",
    services: [
      {
        icon: "express",
        title: "التوصيل السريع",
        description: "توصيل سريع ومحدد الوقت من الباب للباب للوثائق والطرود داخل سوريا وإلى وجهات دولية.",
        features: ["تغطية كل المحافظات", "شحن دولي متكامل", "تتبع لحظي", "توصيل آمن للوثائق"],
        color: "green",
      },
      {
        icon: "logistics",
        title: "اللوجستيات التعاقدية",
        description: "حلول متكاملة تشمل التخزين وإدارة المخزون وتلبية الطلبات والتوزيع المخصص.",
        features: ["17,000 م² تخزين", "إدارة مخزون ذكية", "تلبية طلبات التجارة الإلكترونية", "خدمات توزيع مخصصة"],
        color: "maroon",
      },
    ],
    subServices: [
      { icon: "ecommerce", title: "دعم التجارة الإلكترونية", desc: "استلام وتحضير وتوصيل الطلبات للمتاجر الإلكترونية" },
      { icon: "corporate", title: "حلول مؤسسية", desc: "برامج توصيل مخصصة للشركات والمؤسسات" },
      { icon: "secure", title: "توصيل آمن ومعتمد", desc: "معالجة خاصة للوثائق الرسمية والمواد الحساسة" },
      { icon: "international", title: "الشحن الدولي", desc: "خدمات شحن متكاملة لوجهات عالمية عبر شبكتنا الإقليمية" },
    ],
    cta: "تعرف على كل خدماتنا",
  },
  en: {
    badge: "What We Offer",
    title: "Integrated Services",
    titleHighlight: "For All Your Needs",
    subtitle: "We specialize in two core pillars designed to meet the critical needs of the modern Syrian market",
    services: [
      {
        icon: "express",
        title: "Express Delivery",
        description: "Time-definite, door-to-door delivery for documents and parcels across Syria and to international destinations.",
        features: ["All Governorates Coverage", "International Shipping", "Real-time Tracking", "Secure Document Delivery"],
        color: "green",
      },
      {
        icon: "logistics",
        title: "Contract Logistics",
        description: "Integrated solutions including warehousing, inventory management, order fulfillment, and dedicated distribution.",
        features: ["17,000 m² Storage", "Smart Inventory Management", "E-Commerce Fulfillment", "Dedicated Distribution"],
        color: "maroon",
      },
    ],
    subServices: [
      { icon: "ecommerce", title: "E-Commerce Support", desc: "Pickup, preparation and last-mile delivery for online retailers" },
      { icon: "corporate", title: "Corporate Solutions", desc: "Customized delivery programs for businesses and institutions" },
      { icon: "secure", title: "Secured & Fast", desc: "Specialized handling for official mail and sensitive materials" },
      { icon: "international", title: "International Shipping", desc: "Integrated shipping to global destinations via our regional network" },
    ],
    cta: "Explore All Services",
  },
};

export default function ServicesSection({ lang }: ServicesSectionProps) {
  const t = content[lang];
  const isAr = lang === "ar";

  return (
    <section dir={isAr ? "rtl" : "ltr"} className="bg-gray-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-[#1a5c2a]/10 text-[#1a5c2a] text-xs font-semibold px-4 py-2 rounded-full mb-4 tracking-wide">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.title}{" "}
            <span className="text-[#1a5c2a]">{t.titleHighlight}</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Main 2 Services */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {t.services.map((service) => {
            const isGreen = service.color === "green";
            return (
              <div
                key={service.title}
                className={`rounded-2xl p-8 ${isGreen ? "bg-[#1a5c2a]" : "bg-[#8B1A2A]"} text-white`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${isGreen ? "bg-white/15" : "bg-white/15"}`}>
                  {Icons[service.icon as keyof typeof Icons]}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="space-y-3">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                        {Icons.check}
                      </div>
                      <span className="text-white/85 text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sub Services */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {t.subServices.map((sub) => (
            <div
              key={sub.title}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#1a5c2a]/30 hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-[#1a5c2a]/8 rounded-xl flex items-center justify-center mb-4 text-[#1a5c2a] group-hover:bg-[#1a5c2a] group-hover:text-white transition-all duration-200">
                {Icons[sub.icon as keyof typeof Icons]}
              </div>
              <h4 className="font-semibold text-gray-800 mb-2 text-sm">{sub.title}</h4>
              <p className="text-gray-400 text-xs leading-relaxed">{sub.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-[#1a5c2a] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#134a20] transition-all duration-200 shadow-lg shadow-[#1a5c2a]/20"
          >
            {t.cta}
            {isAr ? Icons.arrowLeft : Icons.arrowRight}
          </Link>
        </div>

      </div>
    </section>
  );
}