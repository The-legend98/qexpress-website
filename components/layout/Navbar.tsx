"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/LangContext";

const navLinksAr = [
  { label: "من نحن", href: "/about" },
  { label: "خدماتنا", href: "/services" },
  { label: "أسطولنا", href: "/fleet" },
  { label: "عملاؤنا", href: "/clients" },
  { label: "تواصل معنا", href: "/contact" },
];

const navLinksEn = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Our Fleet", href: "/fleet" },
  { label: "Clients", href: "/clients" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { lang, setLang, isAr, isDark, toggleTheme } = useLang();
  const pathname = usePathname();
  const navLinks = isAr ? navLinksAr : navLinksEn;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isDark
          ? scrolled
            ? "bg-[#050810]/95 backdrop-blur-2xl border-b border-white/8 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
            : "bg-transparent backdrop-blur-sm"
          : scrolled
            ? "bg-white/95 backdrop-blur-2xl border-b border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
            : "bg-white/70 backdrop-blur-md"
      }`}
    >
      {/* Top accent gradient line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#1a5c2a]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between" style={{ height: "72px" }}>

          {/* Logo */}
          <Link href="/" className="shrink-0 group relative">
            <Image
              src={isAr ? "/images/Q Express Logos-03.png" : "/images/Q Express Logos-04.png"}
              alt="Q Express"
              width={130}
              height={44}
              loading="eager"

              className="h-11 w-auto object-contain mb-5"

            />
            <div className="absolute inset-0 bg-[#1a5c2a]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center">
            {navLinks.map((link, i) => {
              const active = isActive(link.href);
              const hovered = hoveredLink === link.href;

              return (
                <div key={link.href} className="flex items-center">
                  <Link
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 overflow-hidden ${
                      active
                        ? isDark ? "text-[#4ade80]" : "text-[#1a5c2a]"
                        : isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-gray-900"
                    }`}
                  >
                    {/* Hover/Active bg */}
                    <span className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                      active
                        ? isDark ? "bg-[#1a5c2a]/12 opacity-100" : "bg-[#1a5c2a]/8 opacity-100"
                        : hovered
                          ? isDark ? "bg-[#8B1A2A]/12 opacity-100" : "bg-[#8B1A2A]/6 opacity-100"
                          : "opacity-0"
                    }`} />

                    {/* Shine on hover */}
                    <span className={`absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/8 to-transparent transition-transform duration-500 ${
                      hovered ? "translate-x-full" : "-translate-x-full"
                    }`} />

                    <span className="relative">{link.label}</span>

                    {/* Active dot */}
                    {active && (
                      <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                        isDark ? "bg-[#4ade80] shadow-[0_0_6px_rgba(74,222,128,0.8)]" : "bg-[#1a5c2a]"
                      }`} />
                    )}

                    {/* Hover underline */}
                    {!active && (
                      <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ${
                        isDark ? "bg-[#e05568]" : "bg-[#8B1A2A]"
                      } ${hovered ? "w-4" : "w-0"}`} />
                    )}
                  </Link>

                  {/* Separator */}
                  {i < navLinks.length - 1 && (
                    <span className={`w-px h-4 mx-0.5 ${isDark ? "bg-white/8" : "bg-gray-200"}`} />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-2">

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 overflow-hidden group ${
                isDark
                  ? "bg-white/5 border border-white/8 text-slate-400 hover:border-[#1a5c2a]/40 hover:text-[#4ade80]"
                  : "bg-gray-50 border border-gray-100 text-gray-500 hover:border-[#1a5c2a]/25 hover:text-[#1a5c2a]"
              }`}
            >
              <span className="absolute inset-0 bg-gradient-to-br from-[#1a5c2a]/0 group-hover:from-[#1a5c2a]/8 transition-all duration-300" />
              <span className="relative transition-all duration-700 group-hover:rotate-[360deg] block">
                {isDark ? (
                  <svg style={{ width: "18px", height: "18px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg style={{ width: "18px", height: "18px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </span>
            </button>

            {/* Lang Toggle */}
            <button
              onClick={() => setLang(isAr ? "en" : "ar")}
              className={`relative flex items-center gap-1.5 text-xs font-bold border rounded-xl px-3 py-2 transition-all duration-300 overflow-hidden group ${
                isDark
                  ? "border-white/8 text-slate-400 hover:border-[#1a5c2a]/35 hover:text-[#4ade80]"
                  : "border-gray-100 text-gray-400 hover:border-[#1a5c2a]/25 hover:text-[#1a5c2a]"
              }`}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#1a5c2a]/0 group-hover:from-[#1a5c2a]/6 group-hover:to-[#1a5c2a]/3 transition-all duration-300" />
              <svg className="relative w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span className="relative">{isAr ? "EN" : "ع"}</span>
            </button>

            {/* CTA */}
            <Link
              href="/contact"
              className="relative group overflow-hidden bg-[#1a5c2a] text-white text-sm px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(26,92,42,0.5)]"
              style={{
                boxShadow: isDark
                  ? "0 0 20px rgba(26,92,42,0.25), inset 0 1px 0 rgba(255,255,255,0.1)"
                  : "0 4px 12px rgba(26,92,42,0.25)",
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#1a5c2a] via-[#2d7a3f] to-[#1a5c2a] bg-[length:200%_100%] group-hover:bg-right transition-all duration-500" />
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
              <span className="relative">{isAr ? "احجز شحنة" : "Book Shipment"}</span>
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group ${
                isDark
                  ? "bg-white/5 border border-white/8 text-slate-400 hover:text-[#4ade80]"
                  : "bg-gray-50 border border-gray-100 text-gray-500"
              }`}
            >
              <span className="transition-all duration-700 group-hover:rotate-[360deg] block">
                {isDark ? (
                  <svg style={{ width: "16px", height: "16px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg style={{ width: "16px", height: "16px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </span>
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              className={`w-9 h-9 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 ${
                isDark
                  ? "bg-white/5 border border-white/8 hover:border-[#1a5c2a]/30"
                  : "bg-gray-50 border border-gray-100 hover:border-[#1a5c2a]/20"
              }`}
            >
              <span className={`block h-0.5 rounded-full transition-all duration-300 ${isDark ? "bg-white" : "bg-gray-700"} ${menuOpen ? "rotate-45 translate-y-2" : ""}`} style={{ width: "18px" }} />
              <span className={`block h-0.5 rounded-full transition-all duration-300 ${isDark ? "bg-white" : "bg-gray-700"} ${menuOpen ? "opacity-0 w-0" : "w-3"}`} />
              <span className={`block h-0.5 rounded-full transition-all duration-300 ${isDark ? "bg-white" : "bg-gray-700"} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} style={{ width: "18px" }} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className={`border-t px-4 py-4 ${isDark ? "border-white/5 bg-[#050810]/98 backdrop-blur-2xl" : "border-gray-50 bg-white/98 backdrop-blur-2xl"}`}>

          <div className="h-px bg-gradient-to-r from-transparent via-[#1a5c2a]/30 to-transparent mb-3" />

          {/* Nav links — grid 2 cols */}
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {navLinks.map((link, idx) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 border ${
                    active
                      ? isDark
                        ? "bg-[#1a5c2a]/15 text-[#4ade80] border-[#1a5c2a]/25"
                        : "bg-[#1a5c2a]/8 text-[#1a5c2a] border-[#1a5c2a]/12"
                      : isDark
                        ? "text-slate-400 border-transparent hover:bg-[#8B1A2A]/12 hover:text-[#e05568] hover:border-[#8B1A2A]/20"
                        : "text-slate-500 border-transparent hover:bg-[#8B1A2A]/6 hover:text-[#8B1A2A] hover:border-[#8B1A2A]/12"
                  }`}
                  style={{ transitionDelay: menuOpen ? `${idx * 30}ms` : "0ms" }}
                >
                  <span>{link.label}</span>
                  {active && (
                    <span className={`w-1 h-1 rounded-full shrink-0 ${isDark ? "bg-[#4ade80]" : "bg-[#1a5c2a]"}`} />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Bottom actions */}
          <div className={`flex items-center gap-2 pt-3 border-t ${isDark ? "border-white/5" : "border-gray-50"}`}>
            <button
              onClick={() => setLang(isAr ? "en" : "ar")}
              className={`flex items-center gap-1 text-xs font-bold border rounded-lg px-3 py-2 transition-all duration-200 shrink-0 ${
                isDark
                  ? "border-white/8 text-slate-400 hover:border-[#1a5c2a]/30 hover:text-[#4ade80]"
                  : "border-gray-100 text-gray-400 hover:border-[#1a5c2a]/20 hover:text-[#1a5c2a]"
              }`}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span>{isAr ? "EN" : "ع"}</span>
            </button>

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="relative flex-1 text-center bg-[#1a5c2a] text-white text-xs px-4 py-2 rounded-lg font-semibold overflow-hidden group"
              style={{ boxShadow: "0 4px 12px rgba(26,92,42,0.3)" }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              <span className="relative">{isAr ? "احجز شحنة" : "Book Shipment"}</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}