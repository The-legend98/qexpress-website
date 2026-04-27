"use client";

import { useLang } from "@/lib/LangContext";

interface SectionHeaderProps {
  badge: string;
  title: string;
  highlight: string;
  subtitle?: string;
  highlightColor?: "green" | "maroon";
  center?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  highlight,
  subtitle,
  highlightColor = "green",
  center = true,
}: SectionHeaderProps) {
  const { isDark } = useLang();
  const isMaroon = highlightColor === "maroon";

  return (
    <div className={`mb-14 ${center ? "text-center" : ""}`}>

      {/* Badge */}
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase mb-5 ${
        isMaroon
          ? isDark
            ? "bg-[#8B1A2A]/15 text-[#e05568] border border-[#8B1A2A]/20"
            : "bg-[#8B1A2A]/8 text-[#8B1A2A] border border-[#8B1A2A]/15"
          : isDark
            ? "bg-[#1a5c2a]/15 text-[#4ade80] border border-[#1a5c2a]/20"
            : "bg-[#1a5c2a]/8 text-[#1a5c2a] border border-[#1a5c2a]/15"
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isMaroon ? "bg-[#e05568]" : "bg-[#4ade80]"}`} />
        {badge}
      </div>

      {/* Title */}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
        {title}{" "}
        <span className={isMaroon ? "gradient-text-maroon" : "gradient-text-green"}>
          {highlight}
        </span>
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className={`text-base md:text-lg max-w-2xl leading-relaxed ${center ? "mx-auto" : ""} ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          {subtitle}
        </p>
      )}

    </div>
  );
}