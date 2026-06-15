import { useEffect } from "react";
import CountdownMae from "@/components/mae/CountdownMae";
import HeroMae from "@/components/mae/HeroMae";
import ProblemMae from "@/components/mae/ProblemMae";
import WhatIsMae from "@/components/mae/WhatIsMae";
import BenefitsMae from "@/components/mae/BenefitsMae";
import FeaturesMae from "@/components/mae/FeaturesMae";
import HowItWorksMae from "@/components/mae/HowItWorksMae";
import TestimonialsMae from "@/components/mae/TestimonialsMae";
import CTABannerMae from "@/components/mae/CTABannerMae";
import PricingMae from "@/components/mae/PricingMae";
import FAQMae from "@/components/mae/FAQMae";
import CTAFinalMae from "@/components/mae/CTAFinalMae";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SocialProofNotification from "@/components/SocialProofNotification";
import SEOHead from "@/components/SEOHead";
import useAnalytics from "@/hooks/useAnalytics";

const Mae = () => {
  useAnalytics();

  useEffect(() => {
    const id = "playfair-font";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&display=swap";
      document.head.appendChild(link);
    }
  }, []);


  return (
    <main className="min-h-screen" style={{ background: "#fff8f0" }}>
      <SEOHead />
      <CountdownMae />
      <HeroMae />
      <ProblemMae />
      <WhatIsMae />
      <BenefitsMae />
      <FeaturesMae />
      <HowItWorksMae />
      <TestimonialsMae />
      <CTABannerMae />
      <PricingMae />
      <FAQMae />
      <CTAFinalMae />
      <Footer />
      <WhatsAppButton />
      <SocialProofNotification />
    </main>
  );
};

export default Mae;
