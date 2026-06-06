"use client";

import { useLang } from "@/lib/LangContext";
import { useState, useEffect } from "react";
import Select from "react-select";

const COMING_SOON = false;

// ── Types ──────────────────────────────────────────────────
type CountryOpt = { value: number; label: string; code: string };
type CityOpt    = { value: number; label: string; cityId: number };

type FormData = {
  shipmentType: string;
  fromCountryId: number | null;
  fromCountryCode: string;
  fromCityId: number | null;
  toCountryId: number | null;
  toCountryCode: string;
  toCityId: number | null;
  weight: string;
  length: string;
  width: string;
  height: string;
};

const INIT: FormData = {
  shipmentType: "",
  fromCountryId: null, fromCountryCode: "", fromCityId: null,
  toCountryId: null,   toCountryCode: "", toCityId: null,
  weight: "", length: "", width: "", height: "",
};

const content = {
  ar: {
    badge: "احسب تكلفة شحنتك",
    title: "حاسبة",
    highlight: "أسعار الشحن",
    comingSoon: "قريباً",
    shipmentType: {
      label: "نوع الشحنة",
      options: [
        { value: "document", label: "وثيقة" },
        { value: "parcel",   label: "طرد" },
      ],
    },
    from:    { title: "الشحن من",  country: "الدولة", city: "المدينة" },
    to:      { title: "الشحن إلى", country: "الدولة", city: "المدينة" },
    package: { title: "تفاصيل الطرد", weight: "الوزن (كغ)", length: "الطول (سم)", width: "العرض (سم)", height: "الارتفاع (سم)" },
    btn:        "احسب السعر",
    loading:    "جاري الحساب...",
    result:     "تكلفة الشحن",
    error:      "حدث خطأ، يرجى المحاولة مجدداً",
    note:       "السعر تقديري وقد يختلف حسب الظروف الفعلية",
    selectCountry: "ابحث عن دولة...",
    selectCity:    "اختر المدينة",
    noOptions:     "لا توجد نتائج",
    domestic:      "شحن داخلي",
    international: "شحن دولي",
    loadingCities: "جاري التحميل...",
  },
  en: {
    badge: "Calculate Shipping Cost",
    title: "Shipping Cost",
    highlight: "Calculator",
    comingSoon: "Coming Soon",
    shipmentType: {
      label: "Shipment Type",
      options: [
        { value: "document", label: "Document" },
        { value: "parcel",   label: "Parcel" },
      ],
    },
    from:    { title: "Shipping From", country: "Country", city: "City" },
    to:      { title: "Shipping To",   country: "Country", city: "City" },
    package: { title: "Package Details", weight: "Weight (kg)", length: "Length (cm)", width: "Width (cm)", height: "Height (cm)" },
    btn:        "Calculate Price",
    loading:    "Calculating...",
    result:     "Shipping Cost",
    error:      "An error occurred, please try again",
    note:       "Price is estimated and may vary based on actual conditions",
    selectCountry: "Search country...",
    selectCity:    "Select City",
    noOptions:     "No results",
    domestic:      "Domestic",
    international: "International",
    loadingCities: "Loading...",
  },
};

// ── API helpers ────────────────────────────────────────────
async function loadCountries(): Promise<CountryOpt[]> {
  const res  = await fetch("/api/countries");
  const data = await res.json();
  if (!data.success) return [];
  return data.data.map((c: { id: number; name: string; code: string }) => ({
    value: c.id, label: c.name, code: c.code,
  }));
}

async function loadCities(countryId: number): Promise<CityOpt[]> {
  const res  = await fetch(`/api/areas?country_id=${countryId}`);
  const data = await res.json();
  if (!data.success) return [];

  // استخرج المدن الفريدة من المناطق
  const citiesMap = new Map<number, CityOpt>();
  data.data.forEach((s: { city_id: number; city_name: string }) => {
    if (!citiesMap.has(s.city_id)) {
      citiesMap.set(s.city_id, {
        value:  s.city_id,
        label:  s.city_name,
        cityId: s.city_id,
      });
    }
  });
  return Array.from(citiesMap.values()).sort((a, b) => a.label.localeCompare(b.label));
}

async function calculateShipping(form: FormData): Promise<{ price: number; currency: string }> {
  const isDomestic = form.fromCountryId !== null && form.fromCountryId === form.toCountryId;
  const weight = parseFloat(form.weight);
  const l = parseFloat(form.length), w = parseFloat(form.width), h = parseFloat(form.height);
  const volume = l > 0 && w > 0 && h > 0 ? (l * w * h) / 1_000_000 : 0; // cm³ → m³

  let pricing_method = "fixed";
  const extra: Record<string, unknown> = {};
  if (weight > 0) {
    pricing_method = "weight";
    extra.weight = weight;
    extra.uom = "kilogram";
  } else if (volume > 0) {
    pricing_method = "volume";
    extra.volume = volume;
    extra.uom = "cubicmeter";
  }

  const body = isDomestic
    ? {
        shipping_type: "domestic",
        pricing_method,
        shipment_type: form.shipmentType,
        country_id: form.fromCountryId,
        from_city_id: form.fromCityId,  // city_id مباشرة
        to_city_id:   form.toCityId,
        ...extra,
      }
    : {
        shipping_type: "international",
        pricing_method,
        shipment_type: form.shipmentType,
        from_country_id: form.fromCountryId,
        to_country_id:   form.toCountryId,
        ...extra,
      };

  const res  = await fetch("/api/calculate-rates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Calculation failed");
  return { price: data.data.amount, currency: data.data.currency };
}

// ── Select styles ──────────────────────────────────────────
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
  menuList: (base: object) => ({ ...base, padding: "4px", maxHeight: "220px" }),
  option: (base: object, state: { isFocused: boolean; isSelected: boolean }) => ({
    ...base,
    background: state.isSelected ? "#1a5c2a" : state.isFocused ? (isDark ? "rgba(26,92,42,0.15)" : "#f0fdf4") : "transparent",
    color: state.isSelected ? "#fff" : isDark ? "#e2e8f0" : "#1f2937",
    cursor: "pointer", fontSize: "13px", borderRadius: "0.5rem", padding: "8px 12px",
  }),
  singleValue: (base: object) => ({ ...base, color: isDark ? "#ffffff" : "#1f2937", fontSize: "14px" }),
  input: (base: object) => ({ ...base, color: isDark ? "#ffffff" : "#1f2937", fontSize: "14px" }),
  placeholder: (base: object) => ({ ...base, color: isDark ? "#475569" : "#9ca3af", fontSize: "14px" }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base: object) => ({ ...base, color: isDark ? "#475569" : "#9ca3af" }),
  clearIndicator: (base: object) => ({ ...base, color: isDark ? "#475569" : "#9ca3af", "&:hover": { color: "#8B1A2A" } }),
});

// ── Coming Soon Wrapper ────────────────────────────────────
function ComingSoonWrapper({ children }: { children: React.ReactNode }) {
  const { lang, isAr, isDark } = useLang();
  const t = content[lang];
  return (
    <div className="relative" dir={isAr ? "rtl" : "ltr"}>
      <div className="pointer-events-none select-none blur-[3px] opacity-50 saturate-[0.85]" aria-hidden="true">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center cursor-not-allowed">
        <div className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-full backdrop-blur-sm border shadow-lg ${
          isDark ? "bg-[#0d1421]/80 border-[#8B1A2A]/30 text-white" : "bg-white/85 border-[#8B1A2A]/20 text-gray-900"
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

// ── Live Component ─────────────────────────────────────────
function ShippingCalculatorLive() {
  const { lang, isAr, isDark } = useLang();
  const t = content[lang];

  const [form, setForm]     = useState<FormData>(INIT);
  const [result, setResult] = useState<{ price: number; currency: string } | null>(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const [countries, setCountries]               = useState<CountryOpt[]>([]);
  const [fromCities, setFromCities]             = useState<CityOpt[]>([]);
  const [toCities, setToCities]                 = useState<CityOpt[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingFrom, setLoadingFrom]           = useState(false);
  const [loadingTo, setLoadingTo]               = useState(false);

  const set = (key: keyof FormData, val: string | number | null) =>
    setForm(p => ({ ...p, [key]: val }));

  useEffect(() => {
    setLoadingCountries(true);
    loadCountries().then(setCountries).finally(() => setLoadingCountries(false));
  }, []);

  useEffect(() => {
    if (!form.fromCountryId) { setFromCities([]); return; }
    setLoadingFrom(true);
    loadCities(form.fromCountryId).then(setFromCities).finally(() => setLoadingFrom(false));
  }, [form.fromCountryId]);

  useEffect(() => {
    if (!form.toCountryId) { setToCities([]); return; }
    setLoadingTo(true);
    loadCities(form.toCountryId).then(setToCities).finally(() => setLoadingTo(false));
  }, [form.toCountryId]);

  const isDomestic = form.fromCountryId !== null && form.fromCountryId === form.toCountryId;

  const isValid =
    form.shipmentType &&
    form.fromCountryId !== null &&
    form.toCountryId !== null &&
    (!isDomestic || (form.fromCityId !== null && form.toCityId !== null));

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true); setResult(null); setError("");
    try {
      const data = await calculateShipping(form);
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : t.error);
    } finally {
      setLoading(false);
    }
  };

  const selectStyles = getSelectStyles(isDark);
  const labelCls = `block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? "text-slate-400" : "text-gray-500"}`;
  const inputCls = `w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#1a5c2a]/30 ${
    isDark ? "bg-[#050810] border-white/8 text-white placeholder-slate-600 focus:border-[#1a5c2a]/50" : "bg-gray-50 border-gray-200 text-gray-800 focus:border-[#1a5c2a] focus:bg-white"
  }`;
  const sectionCls = `rounded-2xl p-5 border ${isDark ? "bg-[#0d1421] border-white/6" : "bg-white border-gray-100 shadow-sm"}`;

  const sectionTitle = (title: string, icon: React.ReactNode, badge?: string) => (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isDark ? "bg-[#1a5c2a]/20 text-[#4ade80]" : "bg-[#1a5c2a]/10 text-[#1a5c2a]"}`}>{icon}</div>
        <h3 className={`font-black text-sm ${isDark ? "text-white" : "text-gray-800"}`}>{title}</h3>
      </div>
      {badge && (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
          isDomestic
            ? isDark ? "bg-[#1a5c2a]/20 text-[#4ade80]" : "bg-[#1a5c2a]/10 text-[#1a5c2a]"
            : isDark ? "bg-[#8B1A2A]/20 text-[#e05568]" : "bg-[#8B1A2A]/10 text-[#8B1A2A]"
        }`}>{badge}</span>
      )}
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
            {/* From */}
            <div className={sectionCls}>
              {sectionTitle(t.from.title,
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
                form.fromCountryId && form.toCountryId ? (isDomestic ? t.domestic : t.international) : undefined
              )}
              <div className="flex flex-col gap-3">
                <div>
                  <label className={labelCls}>{t.from.country}</label>
                  <Select
                    options={countries}
                    value={countries.find(o => o.value === form.fromCountryId) || null}
                    onChange={opt => {
                      setForm(p => ({ ...p, fromCountryId: opt?.value ?? null, fromCountryCode: opt?.code ?? "", fromCityId: null }));
                    }}
                    placeholder={loadingCountries ? "..." : t.selectCountry}
                    isLoading={loadingCountries}
                    noOptionsMessage={() => t.noOptions}
                    styles={selectStyles}
                    isClearable isSearchable
                    instanceId="from-country"
                  />
                </div>
                {isDomestic && (
                  <div>
                    <label className={labelCls}>{t.from.city}</label>
                    <Select
                      options={fromCities}
                      value={fromCities.find(o => o.value === form.fromCityId) || null}
                      onChange={opt => set("fromCityId", opt?.value ?? null)}
                      placeholder={loadingFrom ? t.loadingCities : t.selectCity}
                      isLoading={loadingFrom}
                      noOptionsMessage={() => t.noOptions}
                      styles={selectStyles}
                      isDisabled={!form.fromCountryId || loadingFrom}
                      isClearable isSearchable
                      instanceId="from-city"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* To */}
            <div className={sectionCls}>
              {sectionTitle(t.to.title,
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
              )}
              <div className="flex flex-col gap-3">
                <div>
                  <label className={labelCls}>{t.to.country}</label>
                  <Select
                    options={countries}
                    value={countries.find(o => o.value === form.toCountryId) || null}
                    onChange={opt => {
                      setForm(p => ({ ...p, toCountryId: opt?.value ?? null, toCountryCode: opt?.code ?? "", toCityId: null }));
                    }}
                    placeholder={loadingCountries ? "..." : t.selectCountry}
                    isLoading={loadingCountries}
                    noOptionsMessage={() => t.noOptions}
                    styles={selectStyles}
                    isClearable isSearchable
                    instanceId="to-country"
                  />
                </div>
                {isDomestic && (
                  <div>
                    <label className={labelCls}>{t.to.city}</label>
                    <Select
                      options={toCities}
                      value={toCities.find(o => o.value === form.toCityId) || null}
                      onChange={opt => set("toCityId", opt?.value ?? null)}
                      placeholder={loadingTo ? t.loadingCities : t.selectCity}
                      isLoading={loadingTo}
                      noOptionsMessage={() => t.noOptions}
                      styles={selectStyles}
                      isDisabled={!form.toCountryId || loadingTo}
                      isClearable isSearchable
                      instanceId="to-city"
                    />
                  </div>
                )}
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
                ["width",  t.package.width,  "20"],
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
              <span className="text-sm text-red-600 font-medium">{error}</span>
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
                <p className="text-[#4ade80] font-bold">{result.currency}</p>
                <p className="text-white/50 text-xs mt-3">{t.note}</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

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