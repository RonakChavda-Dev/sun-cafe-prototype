import { HallShowcase } from "@/components/home/hall-showcase";
import { HomeHero } from "@/components/home/home-hero";
import { ProcessFrame } from "@/components/home/process-frame";
import { DayStages, IntroStatement, LightPanel, VisitBand } from "@/components/home/sections";
import { SignatureIndex } from "@/components/home/signature-index";

export default function Home() {
  return (
    <>
      <HomeHero />
      <IntroStatement />
      <DayStages />
      <HallShowcase />
      <SignatureIndex />
      <LightPanel />
      <ProcessFrame />
      <VisitBand />
    </>
  );
}