"use client";

import { useLang } from "@/lib/LangContext";
import { useState } from "react";

/* ════════════════════════════════════════════════════════════
    لما يجهز الـ API من أودو: غيّر هالمتغير لـ false وبس
   ════════════════════════════════════════════════════════════ */
const COMING_SOON = true;

const content = {
  ar: {
    badge: "تتبع شحنتك",
    title: "أين شحنتك",
    highlight: "الآن؟",
    placeholder: "أدخل رقم الشحنة",
    btn: "تتبع",
    loading: "جاري البحث...",
    notFound: "لم يتم العثور على شحنة بهذا الرقم",
    comingSoon: "قريباً",
    comingSoonNote: "نعمل حالياً على تفعيل خدمة تتبع الشحنات، ترقبونا قريباً",
    labels: {
      status: "الحالة",
      location: "الموقع الحالي",
      delivery: "الوصول المتوقع",
    },
    statuses: {
      "In Transit": "في الطريق",
      "Delivered": "تم التسليم",
      "Pending": "قيد الانتظار",
      "Out for Delivery": "خارج للتسليم",
    }
  },
  en: {
    badge: "Track Your Shipment",
    title: "Where is your",
    highlight: "shipment?",
    placeholder: "Enter tracking number",
    btn: "Track",
    loading: "Searching...",
    notFound: "No shipment found with this number",
    comingSoon: "Coming Soon",
    comingSoonNote: "We're working on activating the shipment tracking service. Stay tuned!",
    labels: {
      status: "Status",
      location: "Current Location",
      delivery: "Expected Delivery",
    },
    statuses: {
      "In Transit": "In Transit",
      "Delivered": "Delivered",
      "Pending": "Pending",
      "Out for Delivery": "Out for Delivery",
    }
  }
};

const STATUS_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  "In Transit":       { bg: "bg-blue-50",   text: "text-blue-700",   dot: "bg-blue-500" },
  "Delivered":        { bg: "bg-green-50",  text: "text-green-700",  dot: "bg-green-500" },
  "Pending":          { bg: "bg-yellow-50", text: "text-yellow-700", dot: "bg-yellow-500" },
  "Out for Delivery": { bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500" },
};

type ShipmentResult = {
  status: string;
  location: string;
  estimatedDelivery: string;
};

async function fetchShipment(trackingNumber: string): Promise<ShipmentResult> {
  // ══════════════════════════════════════════
  // TODO: استبدل هيدا بالـ API الحقيقي
  // const res = await fetch(`https://api.qexpress.sy/track/${trackingNumber}`);
  // if (!res.ok) throw new Error("Not found");
  // return res.json();
  // ══════════════════════════════════════════

  // Mock data مؤقت
  await new Promise(r => setTimeout(r, 1200));
  if (trackingNumber.startsWith("QE")) {
    return {
      status: "In Transit",
      location: "دمشق - المستودع الرئيسي",
      estimatedDelivery: "2026-05-05",
    };
  }
  throw new Error("Not found");
}

/* ════════════════════════════════════════════════════════════
   غلاف "قريباً" — يخلي السكشن مغبّش ومعطّل بدون ما يغيّر شكله
   ════════════════════════════════════════════════════════════ */
function ComingSoonWrapper({ children }: { children: React.ReactNode }) {
  const { lang, isAr, isDark } = useLang();
  const t = content[lang];

  return (
    <div className="relative" dir={isAr ? "rtl" : "ltr"}>
      {/* السكشن الأصلي — مغبّش ومعطّل التفاعل */}
      <div className="pointer-events-none select-none blur-[3px] opacity-50 saturate-[0.85]" aria-hidden="true">
        {children}
      </div>

      {/* طبقة المنع + البادج */}
      <div className="absolute inset-0 flex items-center justify-center cursor-not-allowed">
        <div className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-full backdrop-blur-sm border shadow-lg ${
          isDark
            ? "bg-[#0d1421]/80 border-[#1a5c2a]/30 text-white"
            : "bg-white/85 border-[#1a5c2a]/20 text-gray-900"
        }`}>
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#1a5c2a] opacity-60 animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#1a5c2a]" />
          </span>
          <span className="text-sm font-black tracking-wide">{t.comingSoon}</span>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   النسخة الفعلية — جاهزة وما تغيّر فيها شي
   ════════════════════════════════════════════════════════════ */
function TrackingSectionLive() {
  const { lang, isAr, isDark } = useLang();
  const t = content[lang];

  const [trackingNumber, setTrackingNumber] = useState("");
  const [result, setResult] = useState<ShipmentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleTrack = async () => {
    if (!trackingNumber.trim()) return;
    setLoading(true);
    setResult(null);
    setError(false);
    try {
      const data = await fetchShipment(trackingNumber.trim());
      setResult(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const statusColor = result ? (STATUS_COLORS[result.status] || STATUS_COLORS["Pending"]) : null;
  const statusLabel = result ? (t.statuses[result.status as keyof typeof t.statuses] || result.status) : null;

  return (
    <section className={`py-16 md:py-20 transition-colors duration-300 ${isDark ? "bg-[#080d14]" : "bg-gray-50"}`}>
      <div className="max-w-3xl mx-auto px-6" dir={isAr ? "rtl" : "ltr"}>

        {/* Header */}
        <div className="text-center mb-8">
          <span className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full tracking-widest uppercase mb-4 ${
            isDark ? "bg-[#1a5c2a]/15 text-[#4ade80] border border-[#1a5c2a]/20" : "bg-[#1a5c2a]/10 text-[#1a5c2a]"
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {t.badge}
          </span>
          <h2 className={`text-3xl md:text-4xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
            {t.title}{" "}
            <span className="text-[#1a5c2a]">{t.highlight}</span>
          </h2>
        </div>

        {/* Input */}
        <div className={`rounded-2xl p-6 border transition-colors duration-300 ${
          isDark ? "bg-[#0d1421] border-white/6" : "bg-white border-gray-100 shadow-sm"
        }`}>
          <div className="flex flex-col sm:flex-row gap-3">

            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              placeholder={t.placeholder}
              dir="ltr"
               className={`flex-1 px-4 py-3.5 rounded-xl border text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#1a5c2a]/30 ${
                  isDark
                    ? "bg-[#050810] border-white/8 text-white placeholder-slate-600 focus:border-[#1a5c2a]/50"
                    : "bg-gray-50 border-gray-200 text-gray-800 focus:border-[#1a5c2a] focus:bg-white"
                }`}
            />
            <button
                onClick={handleTrack}
                disabled={loading || !trackingNumber.trim()}
                className="relative overflow-hidden group px-6 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 w-full sm:w-auto"
                style={{ background: "linear-gradient(135deg,#1a5c2a,#134a20)", boxShadow: "0 4px 20px rgba(26,92,42,0.3)" }}
              >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">{loading ? t.loading : t.btn}</span>
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="mt-5 flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-[#1a5c2a] border-t-transparent rounded-full animate-spin" />
              <span className={`text-sm ${isDark ? "text-slate-400" : "text-gray-500"}`}>{t.loading}</span>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="mt-5 flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-100">
              <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-red-600 font-medium">{t.notFound}</span>
            </div>
          )}

          {/* Result */}
          {result && !loading && statusColor && (
            <div className={`mt-5 rounded-xl border p-5 transition-colors duration-300 ${
              isDark ? "bg-[#050810] border-white/6" : "bg-gray-50 border-gray-100"
            }`}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                {/* Status */}
                <div className="flex flex-col gap-1.5">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? "text-slate-500" : "text-gray-400"}`}>
                    {t.labels.status}
                  </span>
                  <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-bold w-fit ${statusColor.bg} ${statusColor.text}`}>
                    <span className={`w-2 h-2 rounded-full ${statusColor.dot} animate-pulse`} />
                    {statusLabel}
                  </span>
                </div>

                {/* Location */}
                <div className="flex flex-col gap-1.5">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? "text-slate-500" : "text-gray-400"}`}>
                    {t.labels.location}
                  </span>
                  <span className={`text-sm font-semibold flex items-center gap-2 ${isDark ? "text-white" : "text-gray-800"}`}>
                    <svg className="w-4 h-4 text-[#1a5c2a] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {result.location}
                  </span>
                </div>

                {/* Delivery */}
                <div className="flex flex-col gap-1.5">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? "text-slate-500" : "text-gray-400"}`}>
                    {t.labels.delivery}
                  </span>
                  <span className={`text-sm font-semibold flex items-center gap-2 ${isDark ? "text-white" : "text-gray-800"}`}>
                    <svg className="w-4 h-4 text-[#8B1A2A] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(result.estimatedDelivery).toLocaleDateString(isAr ? "ar-SY" : "en-US", {
                      year: "numeric", month: "long", day: "numeric"
                    })}
                  </span>
                </div>

              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   التصدير — يقرر شو يعرض حسب COMING_SOON
   ════════════════════════════════════════════════════════════ */
export default function TrackingSection() {
  if (COMING_SOON) {
    return (
      <ComingSoonWrapper>
        <TrackingSectionLive />
      </ComingSoonWrapper>
    );
  }
  return <TrackingSectionLive />;
}