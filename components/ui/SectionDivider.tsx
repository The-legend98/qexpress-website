"use client";

import { useLang } from "@/lib/LangContext";

export default function SectionDivider({ flip = false }: { flip?: boolean }) {
  const { isDark } = useLang();

  return (
    <div className={`relative h-px w-full overflow-visible ${flip ? "rotate-180" : ""}`}>
      <div
        className="absolute inset-x-0 h-px"
        style={{
          background: isDark
            ? "linear-gradient(to right, transparent, rgba(26,92,42,0.3), rgba(139,26,42,0.2), transparent)"
            : "linear-gradient(to right, transparent, rgba(26,92,42,0.15), transparent)",
        }}
      />
      {/* Center glow dot */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
        style={{
          background: isDark ? "#1a5c2a" : "#1a5c2a",
          boxShadow: isDark ? "0 0 8px rgba(26,92,42,0.8)" : "0 0 6px rgba(26,92,42,0.4)",
        }}
      />
    </div>
  );
}