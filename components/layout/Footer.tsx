"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/LangContext";



const content = {
  ar: {
    desc: "شريككم اللوجستي من الجيل القادم في سوريا. نقدم حلول توصيل سريعة وموثوقة لكل محافظات سوريا وإلى وجهات عالمية.",
    company: {
      title: "الشركة",
      items: [
        { label: "من نحن", href: "/about" },
        { label: "رؤيتنا ورسالتنا", href: "/about" },
        { label: "أسطولنا", href: "/fleet" },
        { label: "عملاؤنا", href: "/clients" },
      ],
    },
    services: {
      title: "خدماتنا",
      items: [
        { label: "التوصيل السريع", href: "/services" },
        { label: "اللوجستيات التعاقدية", href: "/services" },
        { label: "دعم التجارة الإلكترونية", href: "/services" },
        { label: "الشحن الدولي", href: "/services" },
      ],
    },
    contact: {
      title: "تواصل معنا",
      address: "أبو رمانة، دمشق، سوريا",
      email: "info@qexpress.sy",
      phone: "+963 11 XXX XXXX",
    },
    rights: "جميع الحقوق محفوظة",
    part: "جزء من مجموعة دمسكو",
    follow: "تابعونا",
  },
  en: {
    desc: "Syria's next-generation logistics partner. Reliable, time-definite express services across Syria and to global destinations.",
    company: {
      title: "Company",
      items: [
        { label: "About Us", href: "/about" },
        { label: "Vision & Mission", href: "/about" },
        { label: "Our Fleet", href: "/fleet" },
        { label: "Our Clients", href: "/clients" },
      ],
    },
    services: {
      title: "Services",
      items: [
        { label: "Express Delivery", href: "/services" },
        { label: "Contract Logistics", href: "/services" },
        { label: "E-Commerce Support", href: "/services" },
        { label: "International Shipping", href: "/services" },
      ],
    },
    contact: {
      title: "Contact",
      address: "Abu Rummaneh, Damascus, Syria",
      email: "info@qexpress.sy",
      phone: "+963 11 XXX XXXX",
    },
    rights: "All rights reserved",
    part: "Part of Damsco Group",
    follow: "Follow Us",
  },
};

const socials = [
  {
    id: "fb",
    href: "#",
    icon: (
      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    id: "ig",
    href: "#",
    icon: (
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "li",
    href: "#",
    icon: (
      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { lang, isAr } = useLang();
  const t = content[lang];
  const year = new Date().getFullYear();
  const { isDark } = useLang();



  return (
    <footer dir={isAr ? "rtl" : "ltr"} className={`text-white transition-colors duration-300 ${isDark ? "bg-[#050a06]" : "bg-[#0f1a12]"}`}>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-8">

          {/* Brand */}
          <div className="lg:col-span-4 col-span-2">

            <Link href="/">
            <Image
                src={isAr ? "/images/Q Express Logos-03.png" : "/images/Q Express Logos-04.png"}
                alt="Q Express"
                width={140}
                height={48}
                className="h-11 w-auto object-contain mb-5"
                />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              {t.desc}
            </p>
            <div className="inline-flex items-center gap-2 bg-[#1a5c2a]/25 border border-[#1a5c2a]/40 rounded-xl px-4 py-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
              <span className="text-[#4ade80] text-xs font-semibold">{t.part}</span>
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-3">{t.follow}</p>
              <div className="flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.href}
                    className="w-9 h-9 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-[#1a5c2a] hover:border-[#1a5c2a] transition-all duration-200"
                  >
                    {s.icon} </a>
                ))}
              </div>
            </div>
          </div>

          {/* Company */}
          <div className="lg:col-span-2 col-span-1">

            <h4 className="text-white font-semibold text-sm mb-5 pb-2 border-b border-white/10">
              {t.company.title}
            </h4>
            <ul className="space-y-3">
              {t.company.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-500 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#1a5c2a] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3 col-span-1">
            <h4 className="text-white font-semibold text-sm mb-5 pb-2 border-b border-white/10">
              {t.services.title}
            </h4>
            <ul className="space-y-3">
              {t.services.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-500 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#1a5c2a] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 col-span-2">
            <h4 className="text-white font-semibold text-sm mb-5 pb-2 border-b border-white/10">
              {t.contact.title}
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#1a5c2a]/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-[#4ade80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{t.contact.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#1a5c2a]/20 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-[#4ade80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href={`mailto:${t.contact.email}`} className="text-gray-400 hover:text-white text-sm transition-colors" dir="ltr">
                  {t.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#1a5c2a]/20 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-[#4ade80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <a href={`tel:${t.contact.phone}`} className="text-gray-400 hover:text-white text-sm transition-colors" dir="ltr">
                  {t.contact.phone}
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            © {year} New Qasioun Express. {t.rights}.
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1a5c2a]" />
            <span className="text-gray-600 text-xs">{t.part}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}