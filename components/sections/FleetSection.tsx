"use client";

interface FleetSectionProps {
  lang: "ar" | "en";
}

const content = {
  ar: {
    badge: "أسطولنا",
    title: "مبني للسرعة",
    titleHighlight: "والاستدامة",
    subtitle: "أسطول حديث ومتعدد الوسائط يجمع بين الرشاقة والمسؤولية البيئية — كل مركبة مجهزة بتقنية التتبع وتلتزم ببروتوكولات السلامة الصارمة.",
    vehicles: [
      {
        icon: "bike",
        title: "دراجات نارية",
        desc: "توصيل حضري سريع للوثائق والطرود الصغيرة",
        tag: "سريع",
        tagColor: "green",
      },
      {
        icon: "car",
        title: "سيارات كهربائية",
        desc: "خدمة مميزة صديقة للبيئة وهادئة",
        tag: "صديق للبيئة",
        tagColor: "green",
      },
      {
        icon: "van",
        title: "فانات وشاحنات",
        desc: "شحن البضائع الضخمة والتجارة الإلكترونية",
        tag: "سعة كبيرة",
        tagColor: "maroon",
      },
      {
        icon: "drone",
        title: "طائرات مسيّرة",
        desc: "توسيع التغطية للمناطق النائية — قادم قريباً",
        tag: "قريباً",
        tagColor: "gray",
      },
    ],
    feature1: "تتبع GPS لحظي لكل مركبة",
    feature2: "بروتوكولات أمان صارمة",
    feature3: "صيانة دورية معتمدة",
  },
  en: {
    badge: "Our Fleet",
    title: "Built for Speed",
    titleHighlight: "& Sustainability",
    subtitle: "A modern, multimodal fleet combining agility with environmental responsibility — every vehicle is equipped with tracking technology and adheres to rigorous safety protocols.",
    vehicles: [
      {
        icon: "bike",
        title: "Motorbikes",
        desc: "Fast urban delivery for documents and small parcels",
        tag: "Fast",
        tagColor: "green",
      },
      {
        icon: "car",
        title: "Electric Cars",
        desc: "Quiet, zero-emission premium service",
        tag: "Eco-Friendly",
        tagColor: "green",
      },
      {
        icon: "van",
        title: "Vans & Trucks",
        desc: "Bulk shipments and e-commerce secure transport",
        tag: "High Capacity",
        tagColor: "maroon",
      },
      {
        icon: "drone",
        title: "Drones",
        desc: "Expanding reach to remote areas — coming soon",
        tag: "Coming Soon",
        tagColor: "gray",
      },
    ],
    feature1: "Live GPS tracking on every vehicle",
    feature2: "Rigorous safety protocols",
    feature3: "Certified regular maintenance",
  },
};

const VehicleIcon = ({ type }: { type: string }) => {
  const cls = "w-8 h-8";
  if (type === "bike") return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0l-3 3m3-3l3 3M6 18a2 2 0 100-4 2 2 0 000 4zm12 0a2 2 0 100-4 2 2 0 000 4zM9 10h6" />
    </svg>
  );
  if (type === "car") return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 17H3a1 1 0 01-1-1v-4a1 1 0 01.553-.894l4-2A1 1 0 017 9h10a1 1 0 01.894.553l2 4A1 1 0 0120 14v2a1 1 0 01-1 1h-2M7 17h10M7 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
  if (type === "van") return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17H6a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v3m-4 7h-4m4 0a2 2 0 104 0 2 2 0 00-4 0zm-4 0a2 2 0 11-4 0 2 2 0 014 0zM16 9h4l2 4v2h-6V9z" />
    </svg>
  );
  return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  );
};

export default function FleetSection({ lang }: FleetSectionProps) {
  const t = content[lang];
  const isAr = lang === "ar";

  return (
    <section dir={isAr ? "rtl" : "ltr"} className="bg-white py-20 md:py-28">
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

        {/* Vehicle Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {t.vehicles.map((v) => {
            const tagColors = {
              green: "bg-[#1a5c2a]/10 text-[#1a5c2a]",
              maroon: "bg-[#8B1A2A]/10 text-[#8B1A2A]",
              gray: "bg-gray-100 text-gray-500",
            };
            const iconColors = {
              green: "bg-[#1a5c2a]/8 text-[#1a5c2a] group-hover:bg-[#1a5c2a] group-hover:text-white",
              maroon: "bg-[#8B1A2A]/8 text-[#8B1A2A] group-hover:bg-[#8B1A2A] group-hover:text-white",
              gray: "bg-gray-50 text-gray-400",
            };
            const isDimmed = v.tagColor === "gray";
            return (
              <div
                key={v.title}
                className={`group bg-white rounded-2xl p-6 border transition-all duration-300 ${
                  isDimmed
                    ? "border-gray-100 opacity-70"
                    : "border-gray-100 hover:border-[#1a5c2a]/30 hover:shadow-lg hover:-translate-y-1"
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 ${iconColors[v.tagColor as keyof typeof iconColors]}`}>
                  <VehicleIcon type={v.icon} />
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagColors[v.tagColor as keyof typeof tagColors]}`}>
                  {v.tag}
                </span>
                <h3 className="text-base font-bold text-gray-800 mt-3 mb-2">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Features bar */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
                { num: "4+", label: isAr ? "أنواع مركبات" : "Vehicle Types" },
                { num: "100%", label: isAr ? "تتبع GPS" : "GPS Tracked" },
                { num: "24/7", label: isAr ? "عمليات مستمرة" : "Operations" },
                { num: "2025", label: isAr ? "أسطول حديث" : "Modern Fleet" },
            ].map((stat) => (
                <div key={stat.label} className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
                <div className="text-2xl md:text-3xl font-bold text-[#1a5c2a] mb-1">{stat.num}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
            ))}
            </div>

      </div>
    </section>
  );
}