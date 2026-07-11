import type { Metadata } from "next";
import { LangProvider } from "@/lib/LangProvider";
import { ScrollRevealInit } from "@/components/ScrollRevealInit";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ariko Studio — Heklane torbe i patterni",
  description:
    "Ručno heklane torbe po narudžbi i digitalni patterni za heklanje. Male serije, prirodni i reciklirani materijali. Ariana Kovačić.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hr">
      <body>
        <LangProvider>
          {children}
          <ScrollRevealInit />
        </LangProvider>
      </body>
    </html>
  );
}
