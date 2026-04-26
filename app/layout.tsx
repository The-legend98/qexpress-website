import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { LangProvider } from "@/lib/LangContext";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/ui/FloatingContact";
import { Almarai } from "next/font/google";




const almarai = Almarai({
  variable: "--font-almarai",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "700", "800"],
});

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Q Express — Moving With Purpose",
  description: "Comprehensive express delivery and logistics solutions across Syria",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={`${almarai.variable} h-full antialiased`}>
      <body className={`${almarai.variable} min-h-full flex flex-col bg-white text-gray-900 font-[family-name:var(--font-almarai)]`}>
        <LangProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <FloatingContact />
          <Footer />

        </LangProvider>
      </body>
    </html>
  );
}