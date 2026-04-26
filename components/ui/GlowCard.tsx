"use client";

import { useLang } from "@/lib/LangContext";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "green" | "maroon" | "none";
  hover?: boolean;
}

export default function GlowCard({
  children,
  className = "",
  glowColor = "green",
  hover = true,
}: GlowCardProps) {
  const { isDark } = useLang();

  const glowStyles = {
    green: isDark
      ? "shadow-[0_0_30px_rgba(26,92,42,0.12)] hover:shadow-[0_0_50px_rgba(26,92,42,0.2)]"
      : "shadow-[0_4px_20px_rgba(26,92,42,0.08)] hover:shadow-[0_8px_32px_rgba(26,92,42,0.15)]",
    maroon: isDark
      ? "shadow-[0_0_30px_rgba(139,26,42,0.12)] hover:shadow-[0_0_50px_rgba(139,26,42,0.2)]"
      : "shadow-[0_4px_20px_rgba(139,26,42,0.08)] hover:shadow-[0_8px_32px_rgba(139,26,42,0.15)]",
    none: "",
  };

  const baseStyles = isDark
    ? "bg-[#0d1421] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(26,92,42,0.35)]"
    : "bg-white border border-gray-100 hover:border-[rgba(26,92,42,0.25)]";

  return (
    <div
      className={`rounded-2xl transition-all duration-300 ${hover ? "card-hover" : ""} ${baseStyles} ${glowStyles[glowColor]} ${className}`}
    >
      {children}
    </div>
  );
}