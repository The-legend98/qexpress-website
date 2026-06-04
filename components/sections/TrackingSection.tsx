"use client";

import { useLang } from "@/lib/LangContext";
import { useState } from "react";

/* ════════════════════════════════════════════════════════════
    لما يجهز الـ API من أودو: غيّر هالمتغير لـ false وبس
   ════════════════════════════════════════════════════════════ */
const COMING_SOON = false;

// ── Types ──────────────────────────────────────────────────
type TrackingStatus = {
  code: string;
  status: string;
  is_completed: boolean;
  is_current: boolean;
};

type ShipmentAttempt = {
  date: string;
  station: string;
  code: string;
  description: string;
};

type TrackingResult = {
  shipment_number: string;
  internal_tracking_number: string | false;
  current_status: { code: string; status: string };
  statuses: TrackingStatus[];
  shipment_attempts: ShipmentAttempt[];
};

// ── Content ────────────────────────────────────────────────
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
    shipmentNo: "رقم الشحنة",
    internalNo: "رقم التتبع الداخلي",
    history: "سجل الشحنة",
    noHistory: "لا يوجد سجل متاح",
    statusLabels: {
      created: "تم الإنشاء",
      collected: "تم الاستلام",
      departed: "غادرت المنشأ",
      in_transit: "في الطريق",
      arrived_destination: "وصلت الوجهة",
      out_for_delivery: "خارجة للتسليم",
      delivered: "تم التسليم",
    },
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
    shipmentNo: "Shipment Number",
    internalNo: "Internal Tracking No.",
    history: "Shipment History",
    noHistory: "No history available",
    statusLabels: {
      created: "Created",
      collected: "Collected",
      departed: "Departed",
      in_transit: "In Transit",
      arrived_destination: "Arrived at Destination",
      out_for_delivery: "Out for Delivery",
      delivered: "Delivered",
    },
  },
};

// ── Fetch ──────────────────────────────────────────────────
async function fetchShipment(trackingNumber: string): Promise<TrackingResult> {
  const res = await fetch(
    `${window.location.origin}/api/track?shipment_number=${encodeURIComponent(trackingNumber)}`
  );
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Not found");
  const td = data.data.tracking_details;
  return {
    shipment_number: td.shipment_number,
    internal_tracking_number: td.internal_tracking_number,
    current_status: td.current_status,
    statuses: td.statuses,
    shipment_attempts: data.data.shipment_history.shipment_attempts,
  };
}

// ── Coming Soon Wrapper ────────────────────────────────────
function ComingSoonWrapper({ children }: { children: React.ReactNode }) {
  const { lang, isAr, isDark } = useLang();
  const t = content[lang];
  return (
    <div className="relative" dir={isAr ? "rtl" : "ltr"}>
      <div className="pointer-events-none select-none blur-[3px] opacity-50 saturate-[0.85]" aria-hidden="true">
        {children}
      </div>
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

// ── Live Section ───────────────────────────────────────────
function TrackingSectionLive() {
  const { lang, isAr, isDark } = useLang();
  const t = content[lang];

  const [trackingNumber, setTrackingNumber] = useState("");
  const [result, setResult] = useState<TrackingResult | null>(null);
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

  const statusLabel = (code: string) =>
    t.statusLabels[code as keyof typeof t.statusLabels] || code;

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
            {t.title}{" "}<span className="text-[#1a5c2a]">{t.highlight}</span>
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
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center justify-center gap-2">
                {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                {loading ? t.loading : t.btn}
              </span>
            </button>
          </div>

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
          {result && !loading && (
            <div className={`mt-5 rounded-xl border transition-colors duration-300 overflow-hidden ${
              isDark ? "bg-[#050810] border-white/6" : "bg-gray-50 border-gray-100"
            }`}>

              {/* Header بيانات الشحنة */}
              <div className={`flex flex-wrap items-center justify-between gap-3 p-5 border-b ${
                isDark ? "border-white/6" : "border-gray-100"
              }`}>
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isDark ? "text-slate-500" : "text-gray-400"}`}>
                    {t.shipmentNo}
                  </p>
                  <p className={`text-sm font-bold font-mono ${isDark ? "text-white" : "text-gray-800"}`} dir="ltr">
                    {result.shipment_number}
                  </p>
                  {result.internal_tracking_number && (
                    <p className={`text-xs mt-0.5 font-mono ${isDark ? "text-slate-500" : "text-gray-400"}`} dir="ltr">
                      {t.internalNo}: {result.internal_tracking_number}
                    </p>
                  )}
                </div>
                {/* Current Status Badge */}
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-[#1a5c2a] text-white"
                  style={{ boxShadow: "0 4px 12px rgba(26,92,42,0.3)" }}>
                  <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
                  {statusLabel(result.current_status.code)}
                </span>
              </div>

              {/* Timeline */}
              <div className="p-5">
                <div className="flex items-start gap-0">
                  {result.statuses.map((step, i) => {
                    const isLast = i === result.statuses.length - 1;
                    return (
                      <div key={step.code} className="flex-1 flex flex-col items-center">
                        {/* Connector + Circle row */}
                        <div className="flex items-center w-full">
                          {/* Left line */}
                          {i > 0 && (
                            <div className={`flex-1 h-0.5 transition-colors duration-300 ${
                              result.statuses[i - 1].is_completed
                                ? "bg-[#1a5c2a]"
                                : isDark ? "bg-white/10" : "bg-gray-200"
                            }`} />
                          )}
                          {/* Circle */}
                          <div className={`relative w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                            step.is_current
                              ? "bg-[#1a5c2a] ring-4 ring-[#1a5c2a]/25"
                              : step.is_completed
                                ? "bg-[#1a5c2a]"
                                : isDark ? "bg-white/10 border border-white/20" : "bg-white border-2 border-gray-200"
                          }`}>
                            {step.is_current && (
                              <span className="absolute inset-0 rounded-full bg-[#1a5c2a]/40 animate-ping" />
                            )}
                            {step.is_completed || step.is_current ? (
                              <svg className="w-3.5 h-3.5 text-white relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <span className={`w-2 h-2 rounded-full ${isDark ? "bg-white/20" : "bg-gray-300"}`} />
                            )}
                          </div>
                          {/* Right line */}
                          {!isLast && (
                            <div className={`flex-1 h-0.5 transition-colors duration-300 ${
                              step.is_completed
                                ? "bg-[#1a5c2a]"
                                : isDark ? "bg-white/10" : "bg-gray-200"
                            }`} />
                          )}
                        </div>
                        {/* Label */}
                        <p className={`text-center mt-2 leading-tight transition-colors duration-300 ${
                          step.is_current
                            ? "text-[#1a5c2a] font-bold text-[10px]"
                            : step.is_completed
                              ? isDark ? "text-slate-300 text-[9px] font-medium" : "text-gray-500 text-[9px] font-medium"
                              : isDark ? "text-slate-600 text-[9px]" : "text-gray-300 text-[9px]"
                        }`}>
                          {statusLabel(step.code)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* History */}
              {result.shipment_attempts.length > 0 && (
                <div className={`border-t px-5 pb-5 pt-4 ${isDark ? "border-white/6" : "border-gray-100"}`}>
                  <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDark ? "text-slate-500" : "text-gray-400"}`}>
                    {t.history}
                  </p>
                  <div className="space-y-3">
                    {result.shipment_attempts.map((attempt, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 rounded-full bg-[#1a5c2a] mt-1.5 shrink-0" />
                          {i < result.shipment_attempts.length - 1 && (
                            <div className={`w-px flex-1 mt-1 ${isDark ? "bg-white/10" : "bg-gray-200"}`} />
                          )}
                        </div>
                        <div className="pb-3">
                          <p className={`text-xs font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                            {attempt.description}
                          </p>
                          <p className={`text-xs mt-0.5 ${isDark ? "text-slate-500" : "text-gray-400"}`} dir="ltr">
                            {attempt.station} — {attempt.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

// ── Export ─────────────────────────────────────────────────
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