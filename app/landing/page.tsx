import { HeroSection } from "@/components/landing/hero-section";
import { StatsSection } from "@/components/landing/stats-section";
import { FeaturesBento } from "@/components/landing/features-bento";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <HeroSection />
      <StatsSection />
      <FeaturesBento />
      <HowItWorksSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
