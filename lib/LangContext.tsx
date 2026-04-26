"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "ar" | "en";
type Theme = "light" | "dark";

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  isAr: boolean;
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const LangContext = createContext<LangContextType>({
  lang: "ar",
  setLang: () => {},
  isAr: true,
  theme: "light",
  toggleTheme: () => {},
  isDark: false,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  // تطبيق الثيم على الـ document مباشرة
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.style.backgroundColor = "#0a0f0b";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.backgroundColor = "#ffffff";
    }
  }, [theme]);

  return (
    <LangContext.Provider value={{
      lang, setLang, isAr: lang === "ar",
      theme, toggleTheme, isDark: theme === "dark",
    }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);