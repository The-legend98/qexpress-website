"use client";

import { useLang } from "@/lib/LangContext";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const G = "#1a5c2a";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const a = (name: string, delay: number, dur = 0.6): React.CSSProperties => ({
  animation: `${name} ${dur}s ${delay}s cubic-bezier(0.23,1,0.32,1) both`,
  opacity: 0,
});

const content = {
  ar: {
    hero: {
      badge: "تواصل معنا",
      title: "نحن هنا لتقديم",
      highlight: "أفضل الحلول اللوجستية",
      desc: "سواء كنت تريد حجز شحنة أو الاستفسار عن خدماتنا — فريقنا جاهز للرد خلال 24 ساعة وضمان وصول أعمالك لوجهتها.",
      stats: [
        { label: "تغطية كاملة", val: "100%" },
        { label: "دعم فني", val: "24/7" },
        { label: "تأسست في", val: "2025" },
      ],
      fastResponse: "استجابة سريعة",
    },
    form: {
      title: "أرسل لنا رسالة",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      company: "اسم الشركة (اختياري)",
      service: "الخدمة المطلوبة",
      serviceOptions: ["توصيل سريع", "لوجستيات تعاقدية", "شحن دولي", "دعم تجارة إلكترونية", "استفسار عام"],
      message: "رسالتك",
      submit: "إرسال الرسالة",
      success: "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.",
    },
    info: {
      title: "معلومات التواصل",
      items: [
        { label: "العنوان", value: "أبو رمانة، دمشق، سوريا", icon: "location" },
        { label: "الهاتف", value: "+963 11 XXX XXXX", icon: "phone" },
        { label: "البريد الإلكتروني", value: "info@qexpress.sy", icon: "email" },
        { label: "ساعات العمل", value: "الأحد - الخميس: 8ص - 6م", icon: "clock" },
      ],
      follow: "تابعونا على منصاتنا",
      hq: "المقر الرئيسي",
      hqSub: "أبو رمانة، دمشق — سوريا",
    },
  },
  en: {
    hero: {
      badge: "Contact Us",
      title: "We are here to provide",
      highlight: "Premium Logistics Solutions",
      desc: "Whether you want to book a shipment or inquire about our services — our team is ready to respond within 24 hours.",
      stats: [
        { label: "Coverage", val: "100%" },
        { label: "Support", val: "24/7" },
        { label: "Founded", val: "2025" },
      ],
      fastResponse: "Fast Response",
    },
    form: {
      title: "Send Us a Message",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      company: "Company Name (Optional)",
      service: "Service Required",
      serviceOptions: ["Express Delivery", "Contract Logistics", "International Shipping", "E-Commerce Support", "General Inquiry"],
      message: "Your Message",
      submit: "Send Message",
      success: "Your message was sent successfully! We'll contact you soon.",
    },
    info: {
      title: "Contact Information",
      items: [
        { label: "Address", value: "Abu Rummaneh, Damascus, Syria", icon: "location" },
        { label: "Phone", value: "+963 11 XXX XXXX", icon: "phone" },
        { label: "Email", value: "info@qexpress.sy", icon: "email" },
        { label: "Working Hours", value: "Sun - Thu: 8AM - 6PM", icon: "clock" },
      ],
      follow: "Follow Our Channels",
      hq: "Head Office",
      hqSub: "Abu Rummaneh, Damascus — Syria",
    },
  },
};

export default function ContactPage() {
  const { lang, isAr, isDark } = useLang();
  const t = content[lang];
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", service: "", message: "" });

  const heroIn = useInView(0.05);
  const formIn = useInView(0.1);
  const infoIn = useInView(0.1);

  const handleSubmit = () => {
    if (form.name && form.email && form.message) setSubmitted(true);
  };

  const inputCls = `w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-all ${
    isDark
      ? "bg-[#0d1421] border-white/10 text-white placeholder-slate-600 focus:border-[#1a5c2a]/50 focus:ring-[#1a5c2a]/20"
      : "bg-white border-gray-200 text-gray-800 focus:border-[#1a5c2a] focus:ring-[#1a5c2a]/20"
  }`;

  const labelCls = `block text-xs font-medium mb-1.5 ${isDark ? "text-slate-400" : "text-gray-500"}`;

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className={`overflow-x-hidden transition-colors duration-300 ${isDark ? "bg-[#020408]" : "bg-white"}`}
    >
      <style>{`
        @keyframes qe-fadeup   { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes qe-vanin    { from{opacity:0;transform:translateX(${isAr ? "50px" : "-50px"})} to{opacity:1;transform:translateX(0)} }
        @keyframes qe-rotatein { from{opacity:0;transform:perspective(1000px) rotateX(10deg) translateY(20px)} to{opacity:1;transform:perspective(1000px) rotateX(0) translateY(0)} }
      `}</style>

      {/* Hero */}
      <section
        ref={heroIn.ref}
        className={`relative pt-24 pb-20 overflow-hidden ${isDark ? "bg-[#050810]" : "bg-slate-50"}`}
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(${G}18 1px, transparent 1px), linear-gradient(90deg, ${G}18 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Glow orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#1a5c2a]/8 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#8B1A2A]/5 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Text */}
            <div>
              {heroIn.visible && (
                <>
                  <div className="mb-6" style={a("qe-fadeup", 0)}>
                    <span className={`px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase border ${
                      isDark
                        ? "bg-[#1a5c2a]/20 text-[#4ade80] border-[#1a5c2a]/30"
                        : "bg-[#1a5c2a]/10 text-[#1a5c2a] border-[#1a5c2a]/20"
                    }`}>
                      {t.hero.badge}
                    </span>
                  </div>

                  <h1 className={`text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                    <span className="block" style={a("qe-vanin", 0.1)}>{t.hero.title}</span>
                    <span className="text-[#1a5c2a] block" style={a("qe-vanin", 0.3)}>{t.hero.highlight}</span>
                  </h1>

                  <p
                    className={`text-base md:text-lg mb-8 max-w-xl leading-relaxed ${isDark ? "text-slate-400" : "text-gray-600"}`}
                    style={a("qe-fadeup", 0.5)}
                  >
                    {t.hero.desc}
                  </p>

                  <div
                    className={`flex gap-8 border-t pt-8 ${isDark ? "border-white/8" : "border-gray-200"}`}
                    style={a("qe-fadeup", 0.7)}
                  >
                    {t.hero.stats.map((s, i) => (
                      <div key={i}>
                        <div className={`text-2xl font-black ${i === 0 ? "text-[#1a5c2a]" : i === 1 ? "text-[#8B1A2A]" : isDark ? "text-white" : "text-gray-900"}`}>
                          {s.val}
                        </div>
                        <div className={`text-xs mt-0.5 ${isDark ? "text-slate-500" : "text-gray-400"}`}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Image */}
            <div
              className="relative group"
              style={heroIn.visible ? a("qe-rotatein", 0.4) : { opacity: 0 }}
            >
              <div className="relative h-[380px] md:h-[460px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl">
                <Image
                  src="/images/fleet-drone.png"
                  alt="Q Express Logistics"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a5c2a]/40 to-transparent" />
              </div>

              {/* Floating badge */}
              <div
                className={`absolute -bottom-5 ${isAr ? "-left-5" : "-right-5"} px-5 py-4 rounded-2xl shadow-xl border hidden md:block ${
                  isDark ? "bg-[#0d1421] border-white/8" : "bg-white border-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1a5c2a] rounded-xl flex items-center justify-center text-white shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{t.hero.fastResponse}</div>
                    <div className="text-xs text-gray-500">24 Hours / 7 Days</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className={`py-24 ${isDark ? "bg-[#080d14]" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-start">

            {/* Form */}
            <div
              ref={formIn.ref}
              className={`lg:col-span-7 rounded-[2rem] p-8 md:p-10 border shadow-xl transition-colors duration-300 ${
                isDark ? "bg-[#0d1421] border-white/5" : "bg-white border-gray-100"
              }`}
              style={formIn.visible ? a("qe-rotatein", 0) : { opacity: 0 }}
            >
              <h2 className={`text-2xl font-bold mb-8 ${isDark ? "text-white" : "text-gray-800"}`}>
                {t.form.title}
              </h2>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isDark ? "bg-[#1a5c2a]/20" : "bg-[#1a5c2a]/10"}`}>
                    <svg className="w-10 h-10 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className={`text-lg font-semibold ${isDark ? "text-slate-200" : "text-gray-800"}`}>
                    {t.form.success}
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>{t.form.name}</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>{t.form.phone}</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputCls}
                        dir="ltr"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>{t.form.email}</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputCls}
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label className={labelCls}>{t.form.service}</label>
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className={inputCls}
                      >
                        <option value="">—</option>
                        {t.form.serviceOptions.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>{t.form.message}</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={5}
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="relative w-full overflow-hidden group bg-[#1a5c2a] text-white py-4 rounded-xl font-bold text-base transition-all duration-300 hover:-translate-y-0.5"
                    style={{ boxShadow: "0 8px 25px rgba(26,92,42,0.3)" }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative">{t.form.submit}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Info */}
            <div ref={infoIn.ref} className="lg:col-span-5 flex flex-col gap-6">

              {/* Location Image Card */}
              <div
                className="relative rounded-[2rem] overflow-hidden min-h-[320px] flex flex-col shadow-2xl group"
                style={infoIn.visible ? a("qe-rotatein", 0.2) : { opacity: 0 }}
              >
                <div className="absolute inset-0">
                  <Image
                    src="/images/location.png"
                    alt="Q Express Location"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover object-center transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                </div>

                {/* Location badge top */}
                <div className="relative z-10 p-5 flex justify-end">
                  <div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-white text-xs font-semibold"
                    style={{ background: "rgba(139,26,42,0.85)", backdropFilter: "blur(8px)" }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {isAr ? "دمشق، سوريا" : "Damascus, Syria"}
                  </div>
                </div>

                <div className="relative z-10 mt-auto p-7 text-white">
                  <h3 className="text-xl font-bold mb-1">{t.info.hq}</h3>
                  <p className="text-white/60 text-sm mb-5">{t.info.hqSub}</p>
                  <div className="space-y-2 border-t border-white/10 pt-5">
                    {t.info.items.slice(1, 3).map((item) => (
                      <div key={item.label} className="flex items-center justify-between text-sm">
                        <span className="text-white/50">{item.label}</span>
                        <span className="font-bold text-white">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social */}
              <div
                className={`rounded-[2rem] p-7 border transition-colors duration-300 ${
                  isDark ? "bg-[#0d1421] border-white/5" : "bg-white border-gray-100 shadow-sm"
                }`}
                style={infoIn.visible ? a("qe-rotatein", 0.3) : { opacity: 0 }}
              >
                <p className={`text-xs font-bold uppercase tracking-widest mb-5 ${isDark ? "text-slate-500" : "text-gray-400"}`}>
                  {t.info.follow}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Facebook", color: "#1877F2" },
                    { label: "LinkedIn", color: "#0A66C2" },
                    { label: "Instagram", color: "#E1306C" },
                    { label: "WhatsApp", color: "#25D366" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href="#"
                      className={`flex items-center justify-center gap-2 py-3 rounded-2xl border text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 ${
                        isDark
                          ? "bg-white/5 border-white/8 text-white hover:border-white/20"
                          : "bg-gray-50 border-gray-100 text-gray-700 hover:border-gray-200 hover:shadow-sm"
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ background: s.color }}
                      />
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}