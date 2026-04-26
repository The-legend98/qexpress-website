"use client";

import { useLang } from "@/lib/LangContext";
import Image from "next/image";

const content = {
  ar: {
    hero: {
      badge: "من نحن",
      title: "نيو قاسيون إكسبريس",
      subtitle: "شريك لوجستي من الجيل القادم",
      desc: "تأسسنا عام 2025 برؤية واضحة لإعادة تعريف قطاع التوصيل السريع واللوجستيات التعاقدية في سوريا. نجمع بين رشاقة المؤسسة الناشئة والاستقرار المالي لمجموعة دمسكو.",
    },
    mission: {
      badge: "رؤيتنا ورسالتنا",
      vision: { title: "رؤيتنا", desc: "أن نكون المنصة اللوجستية الأكثر قدرة وموثوقية في سوريا، والحلقة الأساسية بين التجارة المحلية والاقتصاد العالمي." },
      mission: { title: "رسالتنا", desc: "تمكين الأعمال وتسهيل النمو من خلال خدمات توصيل سريعة وموثوقة وحلول لوجستية تعاقدية مخصصة، مع وضع معايير الجودة والأمان وشراكة العملاء." },
    },
    values: {
      badge: "قيمنا الأساسية",
      title: "ما نؤمن به",
      items: [
        { title: "التميز والموثوقية", desc: "في كل عملية، لكل شحنة." },
        { title: "الشراكة الرشيقة", desc: "نعمل كامتداد حقيقي لفريق عملائنا." },
        { title: "النزاهة والأمان", desc: "معايير لا تقبل المساومة في الامتثال وسلامة الشحنات." },
        { title: "الابتكار", desc: "الاستفادة من التكنولوجيا لتحقيق لوجستيات أذكى وأكثر وضوحاً." },
      ],
    },
    team: {
      badge: "فريقنا",
      title: "خبراء بمعايير عالمية",
      desc: "فريقنا من محترفي اللوجستيات والتكنولوجيا ومتخصصي خدمة العملاء متحدون بالتزام بالتميز التشغيلي.",
    },
    tech: {
      badge: "تقنيتنا",
      title: "بنية تحتية للمستقبل",
      items: [
        { title: "Odoo ERP", desc: "نظام مركزي يدير العمليات والمالية وعلاقات العملاء من قاعدة بيانات واحدة." },
        { title: "تتبع GPS لحظي", desc: "أسطولنا مجهز بتتبع GPS مباشر لرؤية شاملة من الاستلام حتى التسليم." },
        { title: "اتصال مزدوج", desc: "شبكة ألياف ضوئية مع نسخة احتياطية تلقائية عبر Starlink لضمان الاستمرارية." },
        { title: "تكامل الأنظمة", desc: "مصمم للتكامل السلس مع منصات الشركاء والعملاء عالمياً." },
      ],
    },
  },
  en: {
    hero: {
      badge: "About Us",
      title: "New Qasioun Express",
      subtitle: "Next-Generation Logistics Partner",
      desc: "Founded in 2025 with a clear vision to redefine the express delivery and contract logistics landscape in Syria. We combine the agility of a new enterprise with the financial stability of the Damsco Group.",
    },
    mission: {
      badge: "Vision & Mission",
      vision: { title: "Our Vision", desc: "To be the most capable and trusted express and logistics platform in Syria, recognized as the essential link between local commerce and the global economy." },
      mission: { title: "Our Mission", desc: "To empower businesses and facilitate growth by delivering reliable, time-definite express services and providing tailored, efficient contract logistics solutions." },
    },
    values: {
      badge: "Our Core Values",
      title: "What We Believe In",
      items: [
        { title: "Excellence & Reliability", desc: "In every operation, for every shipment." },
        { title: "Agile Partnership", desc: "Acting as a true extension of our clients' teams." },
        { title: "Integrity & Security", desc: "Uncompromising standards in compliance and cargo safety." },
        { title: "Innovation", desc: "Leveraging technology to drive smarter, more visible logistics." },
      ],
    },
    team: {
      badge: "Our Team",
      title: "Experts with Global Standards",
      desc: "Our team of logistics professionals, technologists, and customer service specialists united by a commitment to operational excellence.",
    },
    tech: {
      badge: "Technology",
      title: "Future-Built Infrastructure",
      items: [
        { title: "Odoo ERP", desc: "Centralized system managing operations, finance, and customer relations from a single database." },
        { title: "Live GPS Tracking", desc: "Fleet equipped with live GPS tracking for end-to-end shipment visibility." },
        { title: "Dual Connectivity", desc: "Fiber-optic with automatic Starlink failover ensuring 100% operational uptime." },
        { title: "System Integration", desc: "Designed for seamless integration with partners' and customers' global platforms." },
      ],
    },
  },
};

const valueIcons = [
  <svg key="1" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
  <svg key="2" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  <svg key="3" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  <svg key="4" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
];

export default function AboutPage() {
  const { lang, isAr } = useLang();
  const t = content[lang];

  return (
    <div dir={isAr ? "rtl" : "ltr"}>

      {/* Hero */}
      <section className="relative bg-white overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#1a5c2a]/5" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#8B1A2A]/4" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="grid-about" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1a5c2a" strokeWidth="0.8"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#grid-about)" />
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-[#1a5c2a]/10 text-[#1a5c2a] text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wide">
                {t.hero.badge}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight">
                {t.hero.title}
              </h1>
              <p className="text-[#1a5c2a] font-semibold text-lg mb-5">{t.hero.subtitle}</p>
              <p className="text-gray-500 text-base leading-relaxed">{t.hero.desc}</p>

              <div className="flex gap-8 mt-8 pt-8 border-t border-gray-100">
                {[
                  { num: "2025", label: isAr ? "تأسست" : "Founded" },
                  { num: "100%", label: isAr ? "تغطية سوريا" : "Syria Coverage" },
                  { num: "24/7", label: isAr ? "عمليات" : "Operations" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-bold text-[#1a5c2a]">{s.num}</div>
                    <div className="text-sm text-gray-400 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#1a5c2a]/15">
                <Image
                  src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80"
                  alt="Q Express Warehouse"
                  width={800}
                  height={500}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a5c2a]/30 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-xl border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-gray-700">Moving With Purpose</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#1a5c2a]/10 text-[#1a5c2a] text-xs font-semibold px-4 py-2 rounded-full mb-4 tracking-wide">
              {t.mission.badge}
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-[#1a5c2a]/10 rounded-2xl flex items-center justify-center mb-5 text-[#1a5c2a]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t.mission.vision.title}</h3>
              <p className="text-gray-500 leading-relaxed">{t.mission.vision.desc}</p>
            </div>
            <div className="bg-[#1a5c2a] rounded-3xl p-8 text-white">
              <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{t.mission.mission.title}</h3>
              <p className="text-white/80 leading-relaxed">{t.mission.mission.desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#1a5c2a]/10 text-[#1a5c2a] text-xs font-semibold px-4 py-2 rounded-full mb-4 tracking-wide">
              {t.values.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.values.title}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.values.items.map((item, i) => (
              <div key={item.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-[#1a5c2a]/30 hover:shadow-md transition-all duration-200">
                <div className="w-10 h-10 bg-[#1a5c2a]/10 rounded-xl flex items-center justify-center text-[#1a5c2a] mb-4">
                  {valueIcons[i]}
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-sm">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#1a5c2a]/10 text-[#1a5c2a] text-xs font-semibold px-4 py-2 rounded-full mb-4 tracking-wide">
              {t.tech.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.tech.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {t.tech.items.map((item, i) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-gray-100 flex gap-5 hover:shadow-md transition-all duration-200">
                <div className="w-10 h-10 bg-[#1a5c2a] rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1 text-sm">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}