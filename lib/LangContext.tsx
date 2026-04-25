"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "ar" | "en";

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  isAr: boolean;
}

const LangContext = createContext<LangContextType>({
  lang: "ar",
  setLang: () => {},
  isAr: true,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");
  return (
    <LangContext.Provider value={{ lang, setLang, isAr: lang === "ar" }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);