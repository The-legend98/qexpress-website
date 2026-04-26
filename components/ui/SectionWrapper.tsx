"use client";

import { useLang } from "@/lib/LangContext";

interface SectionWrapperProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function SectionWrapper({
  children,
  variant = "primary",
  className = "",
}: SectionWrapperProps) {
  const { isDark } = useLang();

  const bg = isDark
    ? variant === "primary" ? "bg-[#0a0f0b]" : "bg-[#0d1410]"
    : variant === "primary" ? "bg-white" : "bg-gray-50";

  return (
    <div className={`${bg} transition-colors duration-300 ${className}`}>
      {children}
    </div>
  );
}