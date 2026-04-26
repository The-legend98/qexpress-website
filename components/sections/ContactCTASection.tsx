"use client";

import Link from "next/link";

interface ContactCTASectionProps {
  lang: "ar" | "en";
}

const content = {
  ar: {
    badge: "تواصل معنا",
    title: "جاهزون لخدمتكم",
    titleHighlight: "ابدأ الآن",
    subtitle: "سواء كنت فرداً أو شركة أو مؤسسة — فريقنا جاهز لتقديم الحل اللوجستي المناسب لاحتياجاتكم.",
    cta1: "احجز شحنة",
    cta2: "تواصل معنا",
    features: ["رد خلال 24 ساعة", "حلول مخصصة", "دعم مستمر"],
    phone: "+963 11 XXX XXXX",
    email: "info@qexpress.sy",
    address: "أبو رمانة، دمشق، سوريا",
    follow: "تابعونا",
    contactInfo: "معلومات التواصل",
  },
  en: {
    badge: "Contact Us",
    title: "Ready to Serve You",
    titleHighlight: "Start Now",
    subtitle: "Whether you're an individual, business, or institution — our team is ready to provide the right logistics solution for your needs.",
    cta1: "Book a Shipment",
    cta2: "Contact Us",
    features: ["Response within 24h", "Customized Solutions", "Continuous Support"],
    phone: "+963 11 XXX XXXX",
    email: "info@qexpress.sy",
    address: "Abu Rummaneh, Damascus, Syria",
    follow: "Follow Us",
    contactInfo: "Contact Information",
  },
};

export default function ContactCTASection({ lang }: ContactCTASectionProps) {
  const t = content[lang];
  const isAr = lang === "ar";

  return (
    <section dir={isAr ? "rtl" : "ltr"} className="bg-gray-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
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

        <div className="grid md:grid-cols-2 gap-8 items-stretch">

          {/* Left — CTA Card */}
          <div className="bg-[#1a5c2a] rounded-3xl p-8 md:p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {isAr ? "هل أنت مستعد للبدء؟" : "Ready to Get Started?"}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-8">
                {isAr
                  ? "تواصل معنا اليوم واحصل على حل لوجستي مخصص لاحتياجاتك."
                  : "Contact us today and get a logistics solution tailored to your needs."}
              </p>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {t.features.map((f) => (
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

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="bg-white text-[#1a5c2a] px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all duration-200 text-sm shadow-lg"
              >
                {t.cta1}
              </Link>
              <Link
                href="/contact"
                className="border border-white/40 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all duration-200 text-sm"
              >
                {t.cta2}
              </Link>
            </div>
          </div>

          {/* Right — Contact Info */}
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6">{t.contactInfo}</h3>

              <div className="space-y-5">
                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#1a5c2a]/8 rounded-2xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-0.5">{isAr ? "الهاتف" : "Phone"}</p>
                    <p className="text-gray-800 font-semibold text-sm" dir="ltr">{t.phone}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#1a5c2a]/8 rounded-2xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-0.5">{isAr ? "البريد الإلكتروني" : "Email"}</p>
                    <p className="text-gray-800 font-semibold text-sm" dir="ltr">{t.email}</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#1a5c2a]/8 rounded-2xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-0.5">{isAr ? "العنوان" : "Address"}</p>
                    <p className="text-gray-800 font-semibold text-sm">{t.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="pt-6 border-t border-gray-100 mt-6">
              <p className="text-gray-400 text-xs mb-3">{t.follow}</p>
              <div className="flex gap-2">
                {[
                  { id: "fb", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg> },
                  { id: "ig", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></svg> },
                  { id: "li", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg> },
                ].map((s) => (
                    <a
                    key={s.id}
                    href="#"
                    className="w-9 h-9 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:bg-[#1a5c2a] hover:text-white hover:border-[#1a5c2a] transition-all duration-200"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}