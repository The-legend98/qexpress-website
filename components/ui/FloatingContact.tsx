"use client";

import { useState } from "react";
import { useLang } from "@/lib/LangContext";

const PHONE = "+963XXXXXXXXX";
const WHATSAPP = "963XXXXXXXXX";

export default function FloatingContact() {
  const { isAr } = useLang();
  const [expanded, setExpanded] = useState(false);

  const openWhatsApp = () => window.open(`https://wa.me/${WHATSAPP}`, "_blank");
  const openCall = () => window.open(`tel:${PHONE}`);

  return (
    <div className={`fixed bottom-6 z-50 flex flex-col items-center gap-3 ${isAr ? "left-4" : "right-4"}`}>

      {/* WhatsApp Button */}
      <button
        onClick={openWhatsApp}
        aria-label="WhatsApp"
        className={`group relative w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 hover:-translate-y-1 ${expanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
        style={{ background: "linear-gradient(135deg,#25D366,#128C7E)", boxShadow: "0 4px 20px rgba(37,211,102,0.4)" }}
      >
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.533 5.854L0 24l6.29-1.51A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.002-1.366l-.36-.214-3.733.897.933-3.625-.235-.373A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
        </svg>
       
      </button>

      {/* Call Button */}
      <button
        onClick={openCall}
        aria-label="Call"
        className={`group relative w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 hover:-translate-y-1 ${expanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
        style={{ background: "linear-gradient(135deg,#1a5c2a,#134a20)", boxShadow: "0 4px 20px rgba(26,92,42,0.4)" }}
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
       
      </button>

      {/* Toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        aria-label="Contact options"
        className="relative flex items-center justify-center rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
        style={{
          width: "52px",
          height: "52px",
          background: expanded ? "linear-gradient(135deg,#8B1A2A,#6d1421)" : "linear-gradient(135deg,#1a5c2a,#134a20)",
          boxShadow: expanded ? "0 0 25px rgba(139,26,42,0.4)" : "0 0 25px rgba(26,92,42,0.4)",
        }}
      >
        {!expanded && (
          <span className="absolute inset-0 rounded-2xl animate-ping opacity-20 bg-[#1a5c2a]" />
        )}
        <svg
          className={`w-5 h-5 text-white transition-transform duration-300 ${expanded ? "rotate-45" : "rotate-0"}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={expanded ? "M6 18L18 6M6 6l12 12" : "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"} />
        </svg>
      </button>

    </div>
  );
}