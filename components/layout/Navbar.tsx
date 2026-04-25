"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

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
  const [lang, setLang] = useState<"ar" | "en">("ar");

  const isAr = lang === "ar";
  const navLinks = isAr ? navLinksAr : navLinksEn;
  const logo = isAr
    ? "/images/Q Express Logos-03.png"
    : "/images/Q Express Logos-04.png";

  return (
    <header
      className="w-full bg-white border-b border-gray-100 sticky top-0 z-50"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="shrink-0">
         <Image
            src={logo}
            alt="Q Express Logo"
            width={0}
            height={0}
            sizes="140px"
            className="h-12 w-auto object-contain"
            priority
            />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-600 hover:text-[#1a5c2a] transition-colors duration-200 font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: Lang Toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(isAr ? "en" : "ar")}
            className="text-sm font-medium text-gray-500 hover:text-[#1a5c2a] border border-gray-200 rounded-lg px-3 py-2 transition-colors duration-200"
          >
            {isAr ? "EN" : "عربي"}
          </button>

          {/* CTA */}
          <Link
            href="/contact"
            className="bg-[#1a5c2a] text-white text-sm px-5 py-2.5 rounded-lg hover:bg-[#134a20] transition-colors duration-200"
          >
            {isAr ? "احجز شحنة" : "Book Shipment"}
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="القائمة"
        >
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-600 hover:text-[#1a5c2a] transition-colors font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setLang(isAr ? "en" : "ar")}
              className="text-sm font-medium text-gray-500 border border-gray-200 rounded-lg px-3 py-2"
            >
              {isAr ? "EN" : "عربي"}
            </button>
            <Link
              href="/contact"
              className="flex-1 text-center bg-[#1a5c2a] text-white text-sm px-5 py-2.5 rounded-lg hover:bg-[#134a20] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {isAr ? "احجز شحنة" : "Book Shipment"}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}