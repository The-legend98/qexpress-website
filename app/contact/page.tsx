"use client";

import { useLang } from "@/lib/LangContext";
import { useState } from "react";

const content = {
  ar: {
    hero: { badge: "تواصل معنا", title: "نحن هنا", highlight: "لمساعدتك", desc: "سواء كنت تريد حجز شحنة أو الاستفسار عن خدماتنا — فريقنا جاهز للرد خلال 24 ساعة." },
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
      follow: "تابعونا",
    },
  },
  en: {
    hero: { badge: "Contact Us", title: "We're Here", highlight: "to Help", desc: "Whether you want to book a shipment or inquire about our services — our team is ready to respond within 24 hours." },
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
      follow: "Follow Us",
    },
  },
};

const InfoIcon = ({ type }: { type: string }) => {
  const cls = "w-5 h-5 text-[#1a5c2a]";
  if (type === "location") return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
  if (type === "phone") return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
  if (type === "email") return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
  return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
};

export default function ContactPage() {
  const { lang, isAr } = useLang();
  const t = content[lang];
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", service: "", message: "" });

  const handleSubmit = () => {
    if (form.name && form.email && form.message) setSubmitted(true);
  };

  return (
    <div dir={isAr ? "rtl" : "ltr"}>

      {/* Hero */}
      <section className="relative bg-white py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#1a5c2a]/5" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#8B1A2A]/4" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block bg-[#1a5c2a]/10 text-[#1a5c2a] text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wide">
            {t.hero.badge}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.hero.title}{" "}
            <span className="text-[#1a5c2a]">{t.hero.highlight}</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">{t.hero.desc}</p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-start">

            {/* Form */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-6">{t.form.title}</h2>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-[#1a5c2a]/10 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium">{t.form.success}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">{t.form.name}</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#1a5c2a] focus:ring-1 focus:ring-[#1a5c2a]/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">{t.form.phone}</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#1a5c2a] focus:ring-1 focus:ring-[#1a5c2a]/20 transition-all"
                        dir="ltr"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">{t.form.email}</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#1a5c2a] focus:ring-1 focus:ring-[#1a5c2a]/20 transition-all"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">{t.form.company}</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#1a5c2a] focus:ring-1 focus:ring-[#1a5c2a]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">{t.form.service}</label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#1a5c2a] focus:ring-1 focus:ring-[#1a5c2a]/20 transition-all bg-white"
                    >
                      <option value="">—</option>
                      {t.form.serviceOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">{t.form.message}</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#1a5c2a] focus:ring-1 focus:ring-[#1a5c2a]/20 transition-all resize-none"
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-[#1a5c2a] text-white py-3.5 rounded-xl font-semibold hover:bg-[#134a20] transition-all duration-200 shadow-lg shadow-[#1a5c2a]/20 text-sm"
                  >
                    {t.form.submit}
                  </button>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-5">
              <div className="bg-[#1a5c2a] rounded-3xl p-8 text-white">
                <h3 className="text-xl font-bold mb-6">{t.info.title}</h3>
                <div className="space-y-5">
                  {t.info.items.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
                        <InfoIcon type={item.icon} />
                      </div>
                      <div>
                        <p className="text-white/50 text-xs mb-0.5">{item.label}</p>
                        <p className="text-white font-medium text-sm">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100">
                <p className="text-gray-500 text-sm mb-4">{t.info.follow}</p>
                <div className="flex gap-3">
                  {[
                    { id: "fb", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg> },
                    { id: "ig", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></svg> },
                    { id: "li", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg> },
                  ].map((s) => (
                    <a key={s.id} href="#" className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:bg-[#1a5c2a] hover:text-white hover:border-[#1a5c2a] transition-all duration-200">
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-[#8B1A2A]/8 border border-[#8B1A2A]/20 rounded-3xl p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-[#8B1A2A]/15 rounded-2xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-[#8B1A2A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[#8B1A2A] text-sm">
                    {isAr ? "المقر الرئيسي" : "Head Office"}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {isAr ? "أبو رمانة، دمشق — المستودع: صحنايا" : "Abu Rummaneh, Damascus — Warehouse: Sahnaya"}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}