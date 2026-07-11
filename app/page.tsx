import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Kolekcija } from "@/components/Kolekcija";
import { Patterni } from "@/components/Patterni";
import { Galerija } from "@/components/Galerija";
import { Recenzije } from "@/components/Recenzije";
import { OMeni } from "@/components/OMeni";
import { Kontakt } from "@/components/Kontakt";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <Kolekcija />
      <Patterni />
      <Galerija />
      <Recenzije />
      <OMeni />
      <Kontakt />
      <Footer />
    </>
  );
}
