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
import SocialProofNotification from "@/components/SocialProofNotification";
import WeekendPromoPopup from "@/components/WeekendPromoPopup";
import SEOHead from "@/components/SEOHead";
import { useToast } from "@/hooks/use-toast";
import useAnalytics from "@/hooks/useAnalytics";

const Tiktok = () => {
  const [discountApplied, setDiscountApplied] = useState(false);
  const { toast } = useToast();

  useAnalytics();

  useEffect(() => {
    const discountClaimed = sessionStorage.getItem("discountClaimed");
    if (discountClaimed) {
      setDiscountApplied(true);
    }
  }, []);




  const handleClaimDiscount = () => {
    setDiscountApplied(true);
    toast({
      title: "🎉 Desconto Aplicado!",
      description: "Seu desconto exclusivo foi aplicado em todos os planos. Quanto maior o plano, maior o desconto!",
    });
  };

  return (
    <main className="min-h-screen pt-12">
      <SEOHead />
      <DiscountPopup onClaimDiscount={handleClaimDiscount} />
      <Hero />
      <Benefits />
      <Features />
      <PricingLP1 discountApplied={discountApplied} annualLink="https://lastlink.com/p/CBAB11667/checkout-payment/" annualInstallment="12x R$ 12,77" />
      <Testimonials />
      <CTA />
      <Footer />
      <WhatsAppButton />
      <SocialProofNotification />
      <WeekendPromoPopup />
    </main>
  );
};

export default Tiktok;
