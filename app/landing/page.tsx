import { CtaSection } from "@/components/landing/cta-section";
import { FeaturesBento } from "@/components/landing/features-bento";
import { FooterSection } from "@/components/landing/footer-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { StatsSection } from "@/components/landing/stats-section";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-muted">
      <HeroSection />
      <StatsSection />
      <FeaturesBento />
      <HowItWorksSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
