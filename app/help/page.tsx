"use client";

import { useLang } from "@/lib/LangContext";
import { useEffect, useRef, useState } from "react";
import { submitHelp } from "@/lib/forms";

const MAX_FILE_MB = 10;
const ACCEPT = ".png,.jpg,.jpeg,.pdf,image/*,application/pdf";

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
    badge: "مركز المساعدة",
    title: "كيف يمكننا",
    highlight: "مساعدتك اليوم؟",
    desc: "واجهت مشكلة بشحنتك أو عندك استفسار تقني؟ افتح تذكرة دعم وفريقنا سيتابع معك حتى الحل بأسرع وقت ممكن.",
    form: {
      title: "افتح تذكرة دعم",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      company: "اسم الشركة",
      subject: "موضوع الطلب",
      subjectOptions: ["مشكلة في الشحنة", "تأخير في التوصيل", "شحنة مفقودة أو تالفة", "استفسار عن فاتورة", "طلب استرجاع", "مشكلة تقنية في الموقع", "أخرى"],
      message: "وصف المشكلة (اختياري)",
      attachment: "إرفاق ملف (اختياري)",
      attachmentBtn: "اختر ملف",
      attachmentHint: `صورة أو PDF — حتى ${MAX_FILE_MB}MB`,
      remove: "إزالة",
      submit: "إرسال التذكرة",
      sending: "جاري الإرسال...",
      success: "تم استلام تذكرتك بنجاح! سيتواصل معك فريق الدعم قريباً.",
      errorRequired: "يرجى تعبئة جميع الحقول المطلوبة",
      errorFileSize: `حجم الملف كبير جداً (الحد الأقصى ${MAX_FILE_MB}MB)`,
      errorGeneric: "حدث خطأ، يرجى المحاولة مجدداً أو التواصل معنا مباشرة",
    },
  },
  en: {
    badge: "Help Center",
    title: "How can we",
    highlight: "help you today?",
    desc: "Facing an issue with your shipment or have a technical question? Open a support ticket and our team will follow up until it's resolved.",
    form: {
      title: "Open a Support Ticket",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      company: "Company Name",
      subject: "Subject",
      subjectOptions: ["Shipment Issue", "Delivery Delay", "Lost or Damaged Shipment", "Invoice Inquiry", "Return Request", "Website Technical Issue", "Other"],
      message: "Describe the Issue (Optional)",
      attachment: "Attach a File (Optional)",
      attachmentBtn: "Choose File",
      attachmentHint: `Image or PDF — up to ${MAX_FILE_MB}MB`,
      remove: "Remove",
      submit: "Submit Ticket",
      sending: "Sending...",
      success: "Your ticket was received successfully! Our support team will contact you soon.",
      errorRequired: "Please fill all required fields",
      errorFileSize: `File too large (max ${MAX_FILE_MB}MB)`,
      errorGeneric: "An error occurred, please try again or contact us directly",
    },
  },
};

export default function HelpPage() {
  const { lang, isAr, isDark } = useLang();
  const t = content[lang];
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", subject: "", message: "" });

  const headIn = useInView(0.05);
  const formIn = useInView(0.1);

  const isValid =
    form.name.trim() && form.email.trim() && form.phone.trim() &&
    form.company.trim() && form.subject.trim();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    if (f.size > MAX_FILE_MB * 1024 * 1024) { setError(t.form.errorFileSize); return; }
    setError(""); setFile(f);
  };

  const handleSubmit = async () => {
    if (!isValid) { setError(t.form.errorRequired); return; }
    setLoading(true); setError("");
    try {
      await submitHelp({ fullname: form.name, email: form.email, phone: form.phone, company: form.company, subject: form.subject, body: form.message }, file);
      setSubmitted(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : t.form.errorGeneric);
    } finally { setLoading(false); }
  };

  const inputCls = `w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-all ${
    isDark
      ? "bg-[#0d1421] border-white/10 text-white placeholder-slate-600 focus:border-[#1a5c2a]/50 focus:ring-[#1a5c2a]/20"
      : "bg-white border-gray-200 text-gray-800 focus:border-[#1a5c2a] focus:ring-[#1a5c2a]/20"
  }`;
  const labelCls = `block text-xs font-medium mb-1.5 ${isDark ? "text-slate-400" : "text-gray-500"}`;
  const req = <span className="text-[#8B1A2A]"> *</span>;

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className={`relative overflow-x-hidden min-h-screen transition-colors duration-300 ${isDark ? "bg-[#050810]" : "bg-white"}`}
    >
      <style>{`
        @keyframes qe-fadeup   { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes qe-vanin    { from{opacity:0;transform:translateX(${isAr ? "50px" : "-50px"})} to{opacity:1;transform:translateX(0)} }
        @keyframes qe-rotatein { from{opacity:0;transform:perspective(1000px) rotateX(10deg) translateY(20px)} to{opacity:1;transform:perspective(1000px) rotateX(0) translateY(0)} }
      `}</style>

      {/* ── أشكال ديكورية بسيطة بلوني الموقع ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">

        {/* دائرة كبيرة — أخضر — أعلى يمين */}
        <div className={`absolute -top-24 -right-24 w-80 h-80 rounded-full ${isDark ? "opacity-[0.07]" : "opacity-[0.08]"}`}
          style={{ background: "radial-gradient(circle, #1a5c2a, transparent 70%)" }} />

        {/* دائرة صغيرة — أحمر — أعلى يسار */}
        <div className={`absolute -top-10 -left-10 w-44 h-44 rounded-full ${isDark ? "opacity-[0.06]" : "opacity-[0.07]"}`}
          style={{ background: "radial-gradient(circle, #8B1A2A, transparent 70%)" }} />

        {/* مربع دوّار — أخضر — وسط يسار */}
        <div className={`absolute top-1/3 -left-16 w-52 h-52 rounded-3xl rotate-12 border-2 border-[#1a5c2a] ${isDark ? "opacity-[0.06]" : "opacity-[0.05]"}`} />

        {/* مربع دوّار — أحمر — أسفل يمين */}
        <div className={`absolute bottom-24 -right-10 w-36 h-36 rounded-2xl -rotate-12 border-2 border-[#8B1A2A] ${isDark ? "opacity-[0.06]" : "opacity-[0.05]"}`} />

        {/* دائرة متوسطة مفرغة — أخضر — أسفل يسار */}
        <div className={`absolute -bottom-10 left-1/4 w-28 h-28 rounded-full border-4 border-[#1a5c2a] ${isDark ? "opacity-[0.06]" : "opacity-[0.05]"}`} />

        {/* نقطة صغيرة ممتلئة — أحمر — وسط يمين */}
        <div className={`absolute top-1/2 -right-4 w-16 h-16 rounded-full bg-[#8B1A2A] ${isDark ? "opacity-[0.07]" : "opacity-[0.06]"}`} />

      </div>

      <section className="relative z-10 pt-28 pb-24">
        <div className="max-w-2xl mx-auto px-6">

          {/* Header */}
          <div ref={headIn.ref} className="text-center mb-12">
            {headIn.visible && (
              <>
                <div className="mb-6" style={a("qe-fadeup", 0)}>
                  <span className={`inline-block px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase border ${
                    isDark
                      ? "bg-[#1a5c2a]/20 text-[#4ade80] border-[#1a5c2a]/30"
                      : "bg-[#1a5c2a]/10 text-[#1a5c2a] border-[#1a5c2a]/20"
                  }`}>{t.badge}</span>
                </div>
                <h1 className={`text-4xl md:text-5xl font-black mb-6 leading-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                  <span className="block" style={a("qe-vanin", 0.1)}>{t.title}</span>
                  <span className="text-[#1a5c2a] block" style={a("qe-vanin", 0.3)}>{t.highlight}</span>
                </h1>
                <p className={`text-base md:text-lg leading-relaxed max-w-xl mx-auto ${isDark ? "text-slate-400" : "text-gray-600"}`}
                  style={a("qe-fadeup", 0.5)}>{t.desc}</p>
              </>
            )}
          </div>

          {/* Form */}
          <div
            ref={formIn.ref}
            className={`rounded-[2rem] p-8 md:p-10 border shadow-xl transition-colors duration-300 ${
              isDark ? "bg-[#0d1421] border-white/5" : "bg-white border-gray-100"
            }`}
            style={formIn.visible ? a("qe-rotatein", 0) : { opacity: 0 }}
          >
            <h2 className={`text-2xl font-bold mb-8 ${isDark ? "text-white" : "text-gray-800"}`}>{t.form.title}</h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isDark ? "bg-[#1a5c2a]/20" : "bg-[#1a5c2a]/10"}`}>
                  <svg className="w-10 h-10 text-[#1a5c2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className={`text-lg font-semibold ${isDark ? "text-slate-200" : "text-gray-800"}`}>{t.form.success}</p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelCls}>{t.form.name}{req}</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>{t.form.phone}{req}</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} dir="ltr" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelCls}>{t.form.email}{req}</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} dir="ltr" />
                  </div>
                  <div>
                    <label className={labelCls}>{t.form.company}{req}</label>
                    <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>{t.form.subject}{req}</label>
                  <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputCls}>
                    <option value="">—</option>
                    {t.form.subjectOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>{t.form.message}</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className={`${inputCls} resize-none`} />
                </div>

                {/* Attachment */}
                <div>
                  <label className={labelCls}>{t.form.attachment}</label>
                  {!file ? (
                    <label className={`flex flex-wrap items-center justify-center gap-2 cursor-pointer border border-dashed rounded-xl px-4 py-4 text-sm transition-all ${
                      isDark
                        ? "border-white/15 text-slate-400 hover:border-[#1a5c2a]/50 hover:text-slate-300"
                        : "border-gray-300 text-gray-500 hover:border-[#1a5c2a] hover:text-gray-700"
                    }`}>
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="font-medium">{t.form.attachmentBtn}</span>
                      <span className="text-xs opacity-60">— {t.form.attachmentHint}</span>
                      <input type="file" accept={ACCEPT} className="hidden" onChange={handleFile} />
                    </label>
                  ) : (
                    <div className={`flex items-center gap-3 rounded-xl px-4 py-3 border ${isDark ? "bg-[#050810] border-white/10" : "bg-gray-50 border-gray-200"}`}>
                      <svg className="w-5 h-5 text-[#1a5c2a] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      <span className={`flex-1 text-sm font-medium truncate ${isDark ? "text-slate-200" : "text-gray-700"}`} dir="ltr">{file.name}</span>
                      <button type="button" onClick={() => setFile(null)} className="text-xs font-bold text-[#8B1A2A] hover:underline shrink-0">{t.form.remove}</button>
                    </div>
                  )}
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-100">
                    <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-red-600 font-medium">{error}</span>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="relative w-full overflow-hidden group bg-[#1a5c2a] text-white py-4 rounded-xl font-bold text-base transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  style={{ boxShadow: "0 8px 25px rgba(26,92,42,0.3)" }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative flex items-center justify-center gap-3">
                    {loading && <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                    {loading ? t.form.sending : t.form.submit}
                  </span>
                </button>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}