"use client";

import Link from "next/link";
import { useLang } from "@/lib/LangContext";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface ContactCTASectionProps {
  lang: "ar" | "en";
}

const content = {
  ar: {
    badge: "تواصل معنا",
    title: "جاهزون",
    highlight: "لخدمتكم",
    subtitle: "سواء كنت فرداً أو شركة أو مؤسسة — فريقنا جاهز لتقديم الحل اللوجستي المناسب لاحتياجاتكم.",
    cta1: "احجز شحنة",
    cta2: "تواصل معنا",
    features: ["رد خلال 24 ساعة", "حلول مخصصة لكل عميل", "دعم مستمر على مدار الساعة"],
    phone: "+963 11 XXX XXXX",
    email: "info@qexpress.sy",
    address: "أبو رمانة، دمشق، سوريا",
    follow: "تابعونا على",
    contactInfo: "معلومات التواصل",
  },
  en: {
    badge: "Contact Us",
    title: "Ready to",
    highlight: "Serve You",
    subtitle: "Whether you're an individual, business, or institution — our team is ready to provide the right logistics solution for your needs.",
    cta1: "Book a Shipment",
    cta2: "Contact Us",
    features: ["Response within 24 hours", "Customized solutions per client", "24/7 continuous support"],
    phone: "+963 11 XXX XXXX",
    email: "info@qexpress.sy",
    address: "Abu Rummaneh, Damascus, Syria",
    follow: "Follow us on",
    contactInfo: "Contact Information",
  },
};

const socials = [
  { id: "fb", label: "Facebook", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg> },
  { id: "ig", label: "Instagram", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></svg> },
  { id: "li", label: "LinkedIn", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg> },
];

const contactItems = (t: typeof content.ar, isAr: boolean) => [
  {
    label: isAr ? "الهاتف" : "Phone",
    value: t.phone,
    dir: "ltr" as const,
    color: "green",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
  },
  {
    label: isAr ? "البريد الإلكتروني" : "Email",
    value: t.email,
    dir: "ltr" as const,
    color: "maroon",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  },
  {
    label: isAr ? "العنوان" : "Address",
    value: t.address,
    dir: undefined,
    color: "green",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  },
];

export default function ContactCTASection({ lang }: ContactCTASectionProps) {
  const { isDark } = useLang();
  const t = content[lang];
  const isAr = lang === "ar";
  const items = contactItems(t, isAr);

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className={`relative py-24 md:py-32 overflow-hidden transition-colors duration-300 section-sep ${
          isDark ? "section-dark-4" : "section-light-1"
        }`}    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        {isDark && (
          <>
            <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#1a5c2a]/5 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#8B1A2A]/5 blur-3xl" />
          </>
        )}
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <AnimatedSection>
          <SectionHeader
            badge={t.badge}
            title={t.title}
            highlight={t.highlight}
            subtitle={t.subtitle}
            highlightColor="green"
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6 items-stretch">

          {/* CTA Card */}
          <AnimatedSection delay={100}>
            <div
              className="relative rounded-3xl p-8 md:p-10 flex flex-col justify-between overflow-hidden h-full"
              style={{
                background: "linear-gradient(135deg, #1a5c2a 0%, #0d3318 50%, #1a1a2e 100%)",
                boxShadow: isDark
                  ? "0 0 60px rgba(26,92,42,0.2), inset 0 1px 0 rgba(255,255,255,0.08)"
                  : "0 20px 60px rgba(26,92,42,0.3)",
              }}
            >
              {/* Glow orbs */}
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#4ade80]/8 blur-3xl animate-glow" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#8B1A2A]/15 blur-2xl" />

              {/* Top accent line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <div className="relative">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {isAr ? "هل أنت مستعد للبدء؟" : "Ready to Get Started?"}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-8">
                  {isAr
                    ? "تواصل معنا اليوم واحصل على حل لوجستي مخصص لاحتياجاتك."
                    : "Contact us today and get a logistics solution tailored to your needs."}
                </p>

                <div className="space-y-4 mb-8">
                  {t.features.map((f, i) => (
                    <div key={f} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${i % 2 === 0 ? "bg-[#4ade80]/20" : "bg-[#8B1A2A]/30"}`}>
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white/80 text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="bg-white text-[#1a5c2a] px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all duration-200 text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  {t.cta1}
                </Link>
                <Link
                  href="/contact"
                  className="border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all duration-200 text-sm backdrop-blur-sm"
                >
                  {t.cta2}
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection delay={200}>
            <div
              className={`rounded-3xl p-8 md:p-10 flex flex-col justify-between h-full border transition-all duration-300 ${
                isDark
                  ? "bg-[#0d1421] border-white/5"
                  : "bg-white border-gray-100 shadow-sm"
              }`}
              style={
                isDark
                  ? { boxShadow: "0 4px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)" }
                  : {}
              }
            >
              <div>
                <h3 className={`text-xl font-bold mb-7 ${isDark ? "text-white" : "text-gray-800"}`}>
                  {t.contactInfo}
                </h3>

                <div className="space-y-5">
                  {items.map((item) => {
                    const isGreen = item.color === "green";
                    return (
                      <div key={item.label} className="flex items-center gap-4 group">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isGreen
                            ? isDark
                              ? "bg-[#1a5c2a]/15 text-[#4ade80] group-hover:bg-[#1a5c2a]/25 group-hover:shadow-[0_0_15px_rgba(26,92,42,0.3)]"
                              : "bg-[#1a5c2a]/8 text-[#1a5c2a] group-hover:bg-[#1a5c2a]/15"
                            : isDark
                              ? "bg-[#8B1A2A]/15 text-[#e05568] group-hover:bg-[#8B1A2A]/25 group-hover:shadow-[0_0_15px_rgba(139,26,42,0.3)]"
                              : "bg-[#8B1A2A]/8 text-[#8B1A2A] group-hover:bg-[#8B1A2A]/15"
                        }`}>
                          {item.icon}
                        </div>
                        <div>
                          <p className={`text-xs mb-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                            {item.label}
                          </p>
                          <p className={`font-semibold text-sm ${isDark ? "text-white" : "text-gray-800"}`} dir={item.dir}>
                            {item.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Social */}
              <div className={`pt-6 border-t mt-6 ${isDark ? "border-white/5" : "border-gray-100"}`}>
                <p className={`text-xs mb-4 ${isDark ? "text-slate-500" : "text-slate-400"}`}>{t.follow}</p>
                <div className="flex gap-2">
                  {socials.map((s) => (
                      <a
                      key={s.id}
                      href="#"
                      aria-label={s.label}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 ${
                        isDark
                          ? "bg-white/5 border border-white/8 text-slate-400 hover:bg-[#1a5c2a] hover:text-white hover:border-[#1a5c2a] hover:shadow-[0_0_15px_rgba(26,92,42,0.4)]"
                          : "bg-gray-50 border border-gray-100 text-gray-400 hover:bg-[#1a5c2a] hover:text-white hover:border-[#1a5c2a] hover:shadow-md"
                      }`}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}