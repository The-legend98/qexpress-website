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
            ? "bg-[#050810]/95 backdrop-blur-xl border-b border-white/6 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-[#050810]/80 backdrop-blur-md border-b border-white/4"
          : scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
            : "bg-white/80 backdrop-blur-md border-b border-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src={isAr ? "/images/Q Express Logos-03.png" : "/images/Q Express Logos-04.png"}
              alt="Q Express"
              width={120}
              height={40}
              className={`h-9 w-auto object-contain transition-all duration-300 hover:opacity-80 ${isDark ? "brightness-0 invert" : ""}`}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 group ${
                    active
                      ? isDark
                        ? "text-[#4ade80] bg-[#1a5c2a]/15"
                        : "text-[#1a5c2a] bg-[#1a5c2a]/8"
                      : isDark
                        ? "text-slate-400 hover:text-[#e05568] hover:bg-[#8B1A2A]/15"
                        : "text-slate-500 hover:text-[#8B1A2A] hover:bg-[#8B1A2A]/8"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#1a5c2a]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isDark
                  ? "bg-white/6 border border-white/8 text-slate-400 hover:bg-[#1a5c2a]/15 hover:text-[#4ade80] hover:border-[#1a5c2a]/25"
                  : "bg-gray-50 border border-gray-100 text-gray-500 hover:bg-[#1a5c2a]/8 hover:text-[#1a5c2a] hover:border-[#1a5c2a]/15"
              }`}
            >
              {isDark ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setLang(isAr ? "en" : "ar")}
              className={`text-xs font-bold border rounded-xl px-3 py-2 transition-all duration-300 ${
                isDark
                  ? "border-white/8 text-slate-400 hover:border-[#1a5c2a]/30 hover:text-[#4ade80] hover:bg-[#1a5c2a]/10"
                  : "border-gray-100 text-gray-400 hover:border-[#1a5c2a]/20 hover:text-[#1a5c2a] hover:bg-[#1a5c2a]/5"
              }`}
            >
              {isAr ? "EN" : "ع"}
            </button>

            <Link
              href="/contact"
              className="relative group overflow-hidden bg-[#1a5c2a] text-white text-sm px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{
                boxShadow: isDark
                  ? "0 0 20px rgba(26,92,42,0.3)"
                  : "0 4px 12px rgba(26,92,42,0.25)",
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              <span className="relative">{isAr ? "احجز شحنة" : "Book Shipment"}</span>
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                isDark ? "bg-white/6 border border-white/8 text-slate-400" : "bg-gray-50 border border-gray-100 text-gray-500"
              }`}
            >
              {isDark ? (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              className={`w-9 h-9 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all duration-200 ${
                isDark ? "bg-white/6 border border-white/8" : "bg-gray-50 border border-gray-100"
              }`}
            >
              <span
                className={`block h-0.5 rounded-full transition-all duration-300 ${isDark ? "bg-white" : "bg-gray-700"} ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
                style={{ width: "18px" }}
              />
              <span
                className={`block h-0.5 rounded-full transition-all duration-300 ${isDark ? "bg-white" : "bg-gray-700"} ${menuOpen ? "opacity-0 w-0" : "w-3"}`}
              />
              <span
                className={`block h-0.5 rounded-full transition-all duration-300 ${isDark ? "bg-white" : "bg-gray-700"} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                style={{ width: "18px" }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className={`border-t px-5 py-4 ${isDark ? "border-white/5 bg-[#050810]" : "border-gray-50 bg-white"}`}>

          {/* Nav links — grid نصفين */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link, idx) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                      ? isDark
                        ? "bg-[#1a5c2a]/15 text-[#4ade80] border border-[#1a5c2a]/20"
                        : "bg-[#1a5c2a]/8 text-[#1a5c2a] border border-[#1a5c2a]/10"
                      : isDark
                        ? "text-slate-400 hover:bg-[#8B1A2A]/15 hover:text-[#e05568]"
                        : "text-slate-500 hover:bg-[#8B1A2A]/8 hover:text-[#8B1A2A]"
                  }`}
                  style={{ transitionDelay: menuOpen ? `${idx * 30}ms` : "0ms" }}
                >
                  <span>{link.label}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-[#1a5c2a] shrink-0" />}
                </Link>
              );
            })}
          </div>

          {/* Bottom actions */}
          <div className={`flex gap-2 pt-3 border-t ${isDark ? "border-white/5" : "border-gray-50"}`}>
            <button
              onClick={() => setLang(isAr ? "en" : "ar")}
              className={`text-xs font-bold border rounded-xl px-4 py-2.5 transition-all duration-200 ${
                isDark
                  ? "border-white/8 text-slate-400 hover:border-[#1a5c2a]/30 hover:text-[#4ade80]"
                  : "border-gray-100 text-gray-400 hover:border-[#1a5c2a]/20 hover:text-[#1a5c2a]"
              }`}
            >
              {isAr ? "English" : "عربي"}
            </button>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center bg-[#1a5c2a] text-white text-sm px-5 py-2.5 rounded-xl font-semibold hover:bg-[#134a20] transition-all duration-200"
              style={{ boxShadow: "0 4px 12px rgba(26,92,42,0.25)" }}
            >
              {isAr ? "احجز شحنة" : "Book Shipment"}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}