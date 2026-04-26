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

  return (
    <div className={`mb-14 ${center ? "text-center" : ""}`}>
      {/* Badge */}
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase mb-5 ${
        isDark
          ? "bg-[#1a5c2a]/15 text-[#4ade80] border border-[#1a5c2a]/20"
          : "bg-[#1a5c2a]/8 text-[#1a5c2a] border border-[#1a5c2a]/15"
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full ${highlightColor === "green" ? "bg-[#4ade80]" : "bg-[#e05568]"} animate-pulse`} />
        {badge}
      </div>

      {/* Title */}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
        {title}{" "}
        <span className={highlightColor === "green" ? "gradient-text-green" : "gradient-text-maroon"}>
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