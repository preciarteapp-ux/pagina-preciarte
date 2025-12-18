import { useEffect } from "react";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Features from "@/components/Features";
import PricingLP1 from "@/components/PricingLP1";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const LP1 = () => {
  useEffect(() => {
    // Remove o pixel original e inicializa o novo para LP1
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('init', '1503006167441659');
      (window as any).fbq('track', 'PageView');
    }
  }, []);
  return (
    <main className="min-h-screen">
      <Hero />
      <Benefits />
      <Features />
      <PricingLP1 />
      <Testimonials />
      <CTA />
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default LP1;
