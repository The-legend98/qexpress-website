"use client";

interface WhyUsSectionProps {
  lang: "ar" | "en";
}

const content = {
  ar: {
    badge: "لماذا Q Express؟",
    title: "ما يميزنا عن",
    titleHighlight: "الجميع",
    subtitle: "لا نقدم مجرد خدمة — نقدم منصة متكاملة مدعومة بشبكة إقليمية راسخة وخبرة عالمية وبنية تحتية مستقبلية.",
    reasons: [
      {
        icon: "network",
        title: "شبكة الشبكات",
        desc: "موقعنا ضمن مجموعة دمسكو وتحالفات الشركات الشقيقة الإقليمية يمنحنا وصولاً لا مثيل له للسوق وثباتاً تشغيلياً لا يستطيع أي مشغل مستقل تحقيقه.",
      },
      {
        icon: "globe",
        title: "معايير عالمية وخبرة محلية",
        desc: "خلفية فريقنا الإداري مع كبار المشغلين العالميين تضمن عمليات وفق أفضل الممارسات الدولية مع فهم عميق للسوق السوري.",
      },
      {
        icon: "tech",
        title: "بنية تحتية مستقبلية",
        desc: "كمنضم جديد، تقنيتنا وعملياتنا حديثة بالتصميم — رشيقة وقابلة للتوسع ومبنية للتكامل، دون قيود الأنظمة القديمة.",
      },
      {
        icon: "partner",
        title: "شراكة حقيقية",
        desc: "نلتزم بأن نكون امتداداً حقيقياً لعمليات عملائنا، ونوائم نجاحنا مع نجاحهم من خلال التواصل الشفاف والحلول المخصصة.",
      },
    ],
    networkTitle: "شبكتنا الإقليمية",
    partners: [
      { name: "مجموعة دمسكو", role: "المجموعة الأم — سوريا", color: "green" },
      { name: "GCL الأردن", role: "Global Central Logistics", color: "maroon" },
      { name: "GCL الإمارات", role: "Global Central Logistics", color: "maroon" },
      { name: "D2D دبي", role: "وكيل Fly Sham Airlines", color: "green" },
    ],
  },
  en: {
    badge: "Why Q Express?",
    title: "What Sets Us",
    titleHighlight: "Apart",
    subtitle: "We provide more than a service — we offer a platform backed by a solid regional network, global expertise, and future-built infrastructure.",
    reasons: [
      {
        icon: "network",
        title: "Network of Networks",
        desc: "Our embedded position within the Damsco Group and regional sister-company alliances deliver unparalleled market access and operational stability that a standalone operator cannot match.",
      },
      {
        icon: "globe",
        title: "Global Standards, Local Expertise",
        desc: "Our management's background with global leaders ensures we operate with an international best-practice mindset, applied with nuanced understanding of the Syrian market.",
      },
      {
        icon: "tech",
        title: "Future-Built Infrastructure",
        desc: "As a new entrant, our technology and processes are modern by design — agile, scalable, and built for integration, not held back by legacy systems.",
      },
      {
        icon: "partner",
        title: "Dedicated Partnership",
        desc: "We are committed to being a true extension of our clients' operations, aligning our success directly with theirs through transparent communication and customized solutions.",
      },
    ],
    networkTitle: "Our Regional Network",
    partners: [
      { name: "Damsco Group", role: "Parent Group — Syria", color: "green" },
      { name: "GCL Jordan", role: "Global Central Logistics", color: "maroon" },
      { name: "GCL UAE", role: "Global Central Logistics", color: "maroon" },
      { name: "D2D Dubai", role: "Fly Sham Airlines Agent", color: "green" },
    ],
  },
};

const ReasonIcon = ({ type }: { type: string }) => {
  const cls = "w-6 h-6";
  if (type === "network") return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  );
  if (type === "globe") return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
  if (type === "tech") return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
    </svg>
  );
  return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
};

export default function WhyUsSection({ lang }: WhyUsSectionProps) {
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

        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Reasons */}
          <div className="grid gap-5">
            {t.reasons.map((reason, i) => (
              <div
                key={reason.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#1a5c2a]/30 hover:shadow-md transition-all duration-200 flex gap-5"
              >
                <div className="w-12 h-12 bg-[#1a5c2a]/8 rounded-2xl flex items-center justify-center text-[#1a5c2a] shrink-0">
                  <ReasonIcon type={reason.icon} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 bg-[#1a5c2a] rounded-full flex items-center justify-center shrink-0">
                      <span className="text-white text-xs font-bold">{i + 1}</span>
                    </span>
                    <h3 className="font-bold text-gray-800 text-sm">{reason.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{reason.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Regional Network Card */}
          <div className="bg-[#1a5c2a] rounded-3xl p-8 text-white h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">{t.networkTitle}</h3>
              <div className="w-12 h-0.5 bg-white/30 mb-6" />

              <div className="grid grid-cols-2 gap-4 mb-8">
                {t.partners.map((partner) => (
                  <div
                    key={partner.name}
                    className={`rounded-2xl p-4 ${
                      partner.color === "green"
                        ? "bg-white/15"
                        : "bg-[#8B1A2A]/60"
                    }`}
                  >
                    <p className="font-bold text-sm mb-1">{partner.name}</p>
                    <p className="text-white/60 text-xs">{partner.role}</p>
                  </div>
                ))}
              </div>

              {/* Connection lines decoration */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center gap-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/15">
              <div className="text-center">
                <div className="text-2xl font-bold">4</div>
                <div className="text-white/60 text-xs mt-1">
                  {isAr ? "دول" : "Countries"}
                </div>
              </div>
              <div className="text-center border-x border-white/15">
                <div className="text-2xl font-bold">3</div>
                <div className="text-white/60 text-xs mt-1">
                  {isAr ? "شركات شقيقة" : "Sister Companies"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">1</div>
                <div className="text-white/60 text-xs mt-1">
                  {isAr ? "رؤية موحدة" : "Unified Vision"}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}