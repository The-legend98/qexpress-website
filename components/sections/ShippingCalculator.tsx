"use client";

import { useLang } from "@/lib/LangContext";
import { useState, useMemo } from "react";
import { Country, City } from "country-state-city";
import Select from "react-select";

/* ════════════════════════════════════════════════════════════
   🔌 لما يجهز الـ API من أودو: غيّر هالمتغير لـ false وبس
   ════════════════════════════════════════════════════════════ */
const COMING_SOON = true;

const content = {
  ar: {
    badge: "احسب تكلفة شحنتك",
    title: "حاسبة",
    highlight: "أسعار الشحن",
    comingSoon: "قريباً",
    comingSoonNote: "نعمل حالياً على تفعيل حاسبة أسعار الشحن، ترقبونا قريباً",
    shipmentType: { label: "نوع الشحنة", options: [{ value: "document", label: "وثيقة" }, { value: "parcel", label: "طرد" }, { value: "cargo", label: "بضاعة" }] },
    from: { title: "الشحن من", country: "الدولة", city: "المدينة / الفرع" },
    to: { title: "الشحن إلى", country: "الدولة", city: "المدينة" },
    package: { title: "تفاصيل الطرد", weight: "الوزن (كغ)", length: "الطول (سم)", width: "العرض (سم)", height: "الارتفاع (سم)" },
    service: { label: "نوع الخدمة", options: [{ value: "cargo", label: "شحن عادي" }, { value: "express", label: "شحن سريع" }] },
    btn: "احسب السعر",
    loading: "جاري الحساب...",
    result: "تكلفة الشحن التقديرية",
    currency: "ل.س",
    error: "حدث خطأ، يرجى المحاولة مجدداً",
    note: "السعر تقديري وقد يختلف حسب الظروف الفعلية",
    selectCountry: "ابحث عن دولة...",
    selectCity: "اختر المدينة",
    noOptions: "لا توجد نتائج",
  },
  en: {
    badge: "Calculate Shipping Cost",
    title: "Shipping Cost",
    highlight: "Calculator",
    comingSoon: "Coming Soon",
    comingSoonNote: "We're working on activating the shipping cost calculator. Stay tuned!",
    shipmentType: { label: "Shipment Type", options: [{ value: "document", label: "Document" }, { value: "parcel", label: "Parcel" }, { value: "cargo", label: "Cargo" }] },
    from: { title: "Shipping From", country: "Country", city: "City / Branch" },
    to: { title: "Shipping To", country: "Country", city: "City" },
    package: { title: "Package Details", weight: "Weight (kg)", length: "Length (cm)", width: "Width (cm)", height: "Height (cm)" },
    service: { label: "Service Type", options: [{ value: "cargo", label: "Cargo" }, { value: "express", label: "Express" }] },
    btn: "Calculate Price",
    loading: "Calculating...",
    result: "Estimated Shipping Cost",
    currency: "SYP",
    error: "An error occurred, please try again",
    note: "Price is estimated and may vary based on actual conditions",
    selectCountry: "Search country...",
    selectCity: "Select City",
    noOptions: "No results",
  }
};

const MAIN_CITIES: Record<string, string[]> = {
  SY: ["Damascus", "Aleppo", "Homs", "Latakia", "Hama", "Tartus", "Deir ez-Zor", "Raqqa", "Qamishli", "Daraa", "Idlib", "Sweida"],
  LB: ["Beirut", "Tripoli", "Sidon", "Tyre", "Jounieh", "Zahle", "Baalbek", "Nabatieh"],
  JO: ["Amman", "Zarqa", "Irbid", "Aqaba", "Madaba", "Jerash", "Ajloun", "Salt"],
  IQ: ["Baghdad", "Basra", "Mosul", "Erbil", "Kirkuk", "Najaf", "Karbala", "Sulaymaniyah", "Nasiriyah"],
  SA: ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam", "Taif", "Tabuk", "Khobar", "Abha"],
  AE: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Al Ain", "Umm Al Quwain"],
  EG: ["Cairo", "Alexandria", "Giza", "Luxor", "Aswan", "Port Said", "Suez", "Sharm El Sheikh", "Hurghada"],
  TR: ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya", "Gaziantep", "Konya", "Adana", "Mersin"],
  KW: ["Kuwait City", "Hawalli", "Salmiya", "Farwaniya", "Ahmadi", "Jahra"],
  QA: ["Doha", "Al Rayyan", "Al Wakrah", "Al Khor", "Lusail"],
  BH: ["Manama", "Muharraq", "Riffa", "Hamad Town", "Isa Town"],
  OM: ["Muscat", "Salalah", "Sohar", "Nizwa", "Sur", "Buraimi"],
  DE: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne", "Stuttgart", "Düsseldorf", "Leipzig"],
  FR: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Bordeaux"],
  GB: ["London", "Manchester", "Birmingham", "Liverpool", "Leeds", "Glasgow", "Edinburgh", "Bristol"],
  US: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "Dallas", "Miami"],
  CN: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu", "Hangzhou", "Wuhan", "Tianjin"],
  IN: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad"],
};

type FormData = {
  shipmentType: string;
  fromCountryCode: string;
  fromCountryName: string;
  fromCity: string;
  toCountryCode: string;
  toCountryName: string;
  toCity: string;
  weight: string;
  length: string;
  width: string;
  height: string;
  serviceType: string;
};

const INIT: FormData = {
  shipmentType: "",
  fromCountryCode: "", fromCountryName: "", fromCity: "",
  toCountryCode: "", toCountryName: "", toCity: "",
  weight: "", length: "", width: "", height: "", serviceType: "",
};

async function calculateShipping(data: FormData): Promise<{ price: number; currency: string }> {
  // TODO: استبدل بالـ API الحقيقي
  // const res = await fetch("https://api.qexpress.sy/calculate", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data),
  // });
  // if (!res.ok) throw new Error("Failed");
  // return res.json();
  await new Promise(r => setTimeout(r, 1500));
  const base = data.serviceType === "express" ? 15000 : 8000;
  const weight = parseFloat(data.weight) || 1;
  const price = Math.round(base + weight * 2000);
  return { price, currency: "SYP" };
}

const getSelectStyles = (isDark: boolean) => ({
  control: (base: object, state: { isFocused: boolean }) => ({
    ...base,
    background: isDark ? "#050810" : "#f9fafb",
    borderColor: state.isFocused ? "#1a5c2a" : isDark ? "rgba(255,255,255,0.08)" : "#e5e7eb",
    borderRadius: "0.75rem",
    padding: "2px 4px",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(26,92,42,0.2)" : "none",
    "&:hover": { borderColor: "#1a5c2a" },
    minHeight: "46px",
  }),
  menu: (base: object) => ({
    ...base,
    background: isDark ? "#0d1421" : "#ffffff",
    borderRadius: "0.75rem",
    border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e5e7eb",
    boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
    overflow: "hidden",
    zIndex: 100,
  }),
  menuList: (base: object) => ({
    ...base,
    padding: "4px",
    maxHeight: "220px",
  }),
  option: (base: object, state: { isFocused: boolean; isSelected: boolean }) => ({
    ...base,
    background: state.isSelected ? "#1a5c2a" : state.isFocused ? (isDark ? "rgba(26,92,42,0.15)" : "#f0fdf4") : "transparent",
    color: state.isSelected ? "#fff" : isDark ? "#e2e8f0" : "#1f2937",
    cursor: "pointer",
    fontSize: "13px",
    borderRadius: "0.5rem",
    padding: "8px 12px",
  }),
  singleValue: (base: object) => ({ ...base, color: isDark ? "#ffffff" : "#1f2937", fontSize: "14px" }),
  input: (base: object) => ({ ...base, color: isDark ? "#ffffff" : "#1f2937", fontSize: "14px" }),
  placeholder: (base: object) => ({ ...base, color: isDark ? "#475569" : "#9ca3af", fontSize: "14px" }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base: object) => ({ ...base, color: isDark ? "#475569" : "#9ca3af" }),
  clearIndicator: (base: object) => ({ ...base, color: isDark ? "#475569" : "#9ca3af", "&:hover": { color: "#8B1A2A" } }),
});

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
            ? "bg-[#0d1421]/80 border-[#8B1A2A]/30 text-white"
            : "bg-white/85 border-[#8B1A2A]/20 text-gray-900"
        }`}>
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#8B1A2A] opacity-60 animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#8B1A2A]" />
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
function ShippingCalculatorLive() {
  const { lang, isAr, isDark } = useLang();
  const t = content[lang];

  const [form, setForm] = useState<FormData>(INIT);
  const [result, setResult] = useState<{ price: number; currency: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const set = (key: keyof FormData, val: string) => setForm(p => ({ ...p, [key]: val }));

  const isValid =
    form.shipmentType &&
    form.fromCountryCode && form.fromCity &&
    form.toCountryCode && form.toCity &&
    form.weight && form.serviceType;

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true); setResult(null); setError(false);
    try {
      const data = await calculateShipping(form);
      setResult(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const countryOptions = useMemo(() =>
    Country.getAllCountries().map(c => ({
      value: c.isoCode,
      label: `${c.flag} ${c.name}`,
      name: c.name,
    })), []);

  const fromCityOptions = useMemo(() => {
    const code = form.fromCountryCode;
    if (!code) return [];
    const cities = MAIN_CITIES[code] ||
      (City.getCitiesOfCountry(code) || [])
        .filter(c => /^[a-zA-Z\s\-'.()0-9]+$/.test(c.name))
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(0, 50)
        .map(c => c.name);
    return cities.map(name => ({ value: name, label: name }));
  }, [form.fromCountryCode]);

  const toCityOptions = useMemo(() => {
    const code = form.toCountryCode;
    if (!code) return [];
    const cities = MAIN_CITIES[code] ||
      (City.getCitiesOfCountry(code) || [])
        .filter(c => /^[a-zA-Z\s\-'.()0-9]+$/.test(c.name))
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(0, 50)
        .map(c => c.name);
    return cities.map(name => ({ value: name, label: name }));
  }, [form.toCountryCode]);

  const selectStyles = getSelectStyles(isDark);
  const labelCls = `block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? "text-slate-400" : "text-gray-500"}`;
  const inputCls = `w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#1a5c2a]/30 ${
    isDark ? "bg-[#050810] border-white/8 text-white placeholder-slate-600 focus:border-[#1a5c2a]/50" : "bg-gray-50 border-gray-200 text-gray-800 focus:border-[#1a5c2a] focus:bg-white"
  }`;
  const sectionCls = `rounded-2xl p-5 border ${isDark ? "bg-[#0d1421] border-white/6" : "bg-white border-gray-100 shadow-sm"}`;

  const sectionTitle = (title: string, icon: React.ReactNode) => (
    <div className="flex items-center gap-2 mb-4">
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isDark ? "bg-[#1a5c2a]/20 text-[#4ade80]" : "bg-[#1a5c2a]/10 text-[#1a5c2a]"}`}>
        {icon}
      </div>
      <h3 className={`font-black text-sm ${isDark ? "text-white" : "text-gray-800"}`}>{title}</h3>
    </div>
  );

  return (
    <section className={`py-16 md:py-20 transition-colors duration-300 ${isDark ? "bg-[#050810]" : "bg-white"}`}>
      <div className="max-w-4xl mx-auto px-6" dir={isAr ? "rtl" : "ltr"}>

        <div className="text-center mb-10">
          <span className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full tracking-widest uppercase mb-4 ${
            isDark ? "bg-[#8B1A2A]/15 text-[#e05568] border border-[#8B1A2A]/20" : "bg-[#8B1A2A]/10 text-[#8B1A2A]"
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {t.badge}
          </span>
          <h2 className={`text-3xl md:text-4xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
            {t.title}{" "}<span className="text-[#8B1A2A]">{t.highlight}</span>
          </h2>
        </div>

        <div className="flex flex-col gap-5">

          {/* 1 — Shipment Type */}
          <div className={sectionCls}>
            {sectionTitle(t.shipmentType.label,
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
            )}
            <div className="flex flex-wrap gap-3">
              {t.shipmentType.options.map(opt => (
                <button key={opt.value} onClick={() => set("shipmentType", opt.value)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold border-2 transition-all duration-200 ${
                    form.shipmentType === opt.value ? "border-[#1a5c2a] bg-[#1a5c2a] text-white"
                    : isDark ? "border-white/10 text-slate-400 hover:border-[#1a5c2a]/50" : "border-gray-200 text-gray-500 hover:border-[#1a5c2a]/40"
                  }`}>{opt.label}</button>
              ))}
            </div>
          </div>

          {/* 2 & 3 — From / To */}
          <div className="grid md:grid-cols-2 gap-5">
            <div className={sectionCls}>
              {sectionTitle(t.from.title,
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              )}
              <div className="flex flex-col gap-3">
                <div>
                  <label className={labelCls}>{t.from.country}</label>
                  <Select
                    options={countryOptions}
                    value={countryOptions.find(o => o.value === form.fromCountryCode) || null}
                    onChange={opt => { set("fromCountryCode", opt?.value || ""); set("fromCountryName", opt?.name || ""); set("fromCity", ""); }}
                    placeholder={t.selectCountry}
                    noOptionsMessage={() => t.noOptions}
                    styles={selectStyles}
                    isClearable isSearchable
                    instanceId="from-country"
                  />
                </div>
                <div>
                  <label className={labelCls}>{t.from.city}</label>
                  <Select
                    options={fromCityOptions}
                    value={fromCityOptions.find(o => o.value === form.fromCity) || null}
                    onChange={opt => set("fromCity", opt?.value || "")}
                    placeholder={t.selectCity}
                    noOptionsMessage={() => t.noOptions}
                    styles={selectStyles}
                    isDisabled={!form.fromCountryCode}
                    isClearable isSearchable
                    instanceId="from-city"
                  />
                </div>
              </div>
            </div>

            <div className={sectionCls}>
              {sectionTitle(t.to.title,
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
              )}
              <div className="flex flex-col gap-3">
                <div>
                  <label className={labelCls}>{t.to.country}</label>
                  <Select
                    options={countryOptions}
                    value={countryOptions.find(o => o.value === form.toCountryCode) || null}
                    onChange={opt => { set("toCountryCode", opt?.value || ""); set("toCountryName", opt?.name || ""); set("toCity", ""); }}
                    placeholder={t.selectCountry}
                    noOptionsMessage={() => t.noOptions}
                    styles={selectStyles}
                    isClearable isSearchable
                    instanceId="to-country"
                  />
                </div>
                <div>
                  <label className={labelCls}>{t.to.city}</label>
                  <Select
                    options={toCityOptions}
                    value={toCityOptions.find(o => o.value === form.toCity) || null}
                    onChange={opt => set("toCity", opt?.value || "")}
                    placeholder={t.selectCity}
                    noOptionsMessage={() => t.noOptions}
                    styles={selectStyles}
                    isDisabled={!form.toCountryCode}
                    isClearable isSearchable
                    instanceId="to-city"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 4 — Package Details */}
          <div className={sectionCls}>
            {sectionTitle(t.package.title,
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {([
                ["weight", t.package.weight, "1"],
                ["length", t.package.length, "30"],
                ["width", t.package.width, "20"],
                ["height", t.package.height, "15"],
              ] as const).map(([key, label, ph]) => (
                <div key={key}>
                  <label className={labelCls}>{label}</label>
                  <input type="number" min="0" value={form[key]}
                    onChange={e => set(key, e.target.value)}
                    className={inputCls} placeholder={ph} dir="ltr" />
                </div>
              ))}
            </div>
          </div>

          {/* 5 — Service Type */}
          <div className={sectionCls}>
            {sectionTitle(t.service.label,
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            )}
            <div className="flex flex-wrap gap-3">
              {t.service.options.map(opt => (
                <button key={opt.value} onClick={() => set("serviceType", opt.value)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold border-2 transition-all duration-200 ${
                    form.serviceType === opt.value ? "border-[#8B1A2A] bg-[#8B1A2A] text-white"
                    : isDark ? "border-white/10 text-slate-400 hover:border-[#8B1A2A]/50" : "border-gray-200 text-gray-500 hover:border-[#8B1A2A]/40"
                  }`}>{opt.label}</button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button onClick={handleSubmit} disabled={!isValid || loading}
            className="relative overflow-hidden group w-full py-4 rounded-2xl font-black text-base text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#8B1A2A,#6d1421)", boxShadow: "0 8px 25px rgba(139,26,42,0.3)" }}>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative flex items-center justify-center gap-3">
              {loading && <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {loading ? t.loading : t.btn}
            </span>
          </button>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-100">
              <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-red-600 font-medium">{t.error}</span>
            </div>
          )}

          {/* Result */}
          {result && !loading && (
            <div className="rounded-2xl p-6 text-center relative overflow-hidden"
              style={{ background: "linear-gradient(135deg,#1a5c2a,#0d3318)", boxShadow: "0 8px 30px rgba(26,92,42,0.3)" }}>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px,white 1px,transparent 0)", backgroundSize: "20px 20px" }} />
              <div className="relative">
                <p className="text-white/60 text-sm mb-2">{t.result}</p>
                <p className="text-5xl font-black text-white mb-1">{result.price.toLocaleString()}</p>
                <p className="text-[#4ade80] font-bold">{t.currency}</p>
                <p className="text-white/50 text-xs mt-3">{t.note}</p>
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
export default function ShippingCalculator() {
  if (COMING_SOON) {
    return (
      <ComingSoonWrapper>
        <ShippingCalculatorLive />
      </ComingSoonWrapper>
    );
  }
  return <ShippingCalculatorLive />;
}