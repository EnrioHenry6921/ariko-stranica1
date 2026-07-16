import { Suspense } from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Konfigurator } from "@/components/Konfigurator";
import { FooterSlim } from "@/components/FooterSlim";

export const metadata: Metadata = {
  title: "Ariko Studio · Složi svoju torbu",
  description: "Složi svoju heklanu torbu: model, veličina, boja pređe, naramenica i privjesci, s cijenom uživo.",
};

export default function KonfiguratorPage() {
  return (
    <>
      <Header />
      <Suspense>
        <Konfigurator />
      </Suspense>
      <FooterSlim />
    </>
  );
}
