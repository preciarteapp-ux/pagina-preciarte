import { useEffect } from "react";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import useAnalytics from "@/hooks/useAnalytics";

const Index = () => {
  // Enable analytics tracking
  useAnalytics();

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('init', '24742614715430041');
      (window as any).fbq('track', 'PageView');
    }
  }, []);

  return (
    <main className="min-h-screen">
      <SEOHead />
      <Hero />
      <Benefits />
      <Features />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Index;
