import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Features from "@/components/Features";
import PricingLP1 from "@/components/PricingLP1";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import DiscountPopup from "@/components/DiscountPopup";
import SEOHead from "@/components/SEOHead";
import { useToast } from "@/hooks/use-toast";
import useAnalytics from "@/hooks/useAnalytics";

const LP1 = () => {
  const [discountApplied, setDiscountApplied] = useState(false);
  const { toast } = useToast();

  // Enable analytics tracking
  useAnalytics();

  useEffect(() => {
    // Check if discount was already claimed
    const discountClaimed = sessionStorage.getItem("discountClaimed");
    if (discountClaimed) {
      setDiscountApplied(true);
    }
  }, []);

  useEffect(() => {
    // Remove o pixel original e inicializa o novo para LP1
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('init', '1503006167441659');
      (window as any).fbq('track', 'PageView');
    }
  }, []);

  const handleClaimDiscount = () => {
    setDiscountApplied(true);
    toast({
      title: "🎉 Desconto Aplicado!",
      description: "Seu desconto exclusivo foi aplicado em todos os planos. Quanto maior o plano, maior o desconto!",
    });
    // Scroll to pricing section
    setTimeout(() => {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  return (
    <main className="min-h-screen">
      <SEOHead />
      <DiscountPopup onClaimDiscount={handleClaimDiscount} />
      <Hero />
      <Benefits />
      <Features />
      <PricingLP1 discountApplied={discountApplied} />
      <Testimonials />
      <CTA />
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default LP1;
