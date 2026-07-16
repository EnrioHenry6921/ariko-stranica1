import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { PatternDetail } from "@/components/PatternDetail";
import { FooterSlim } from "@/components/FooterSlim";
import { patternDetails } from "@/lib/patternData";

export function generateStaticParams() {
  return Object.keys(patternDetails).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = patternDetails[params.slug];
  if (!p) return { title: "Ariko Studio · Pattern" };
  return {
    title: `Ariko Studio · ${p.hr}`,
    description: p.descHr,
  };
}

export default function PatternPage({ params }: { params: { slug: string } }) {
  if (!patternDetails[params.slug]) notFound();

  return (
    <>
      <Header />
      <PatternDetail slug={params.slug} />
      <FooterSlim />
    </>
  );
}
