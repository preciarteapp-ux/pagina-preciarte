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
import SEOHead from "@/components/SEOHead";
import useAnalytics from "@/hooks/useAnalytics";

const LP1 = () => {
  const [discountApplied, setDiscountApplied] = useState(false);

  // Enable analytics tracking
  useAnalytics();

  useEffect(() => {
    // Check if discount was already claimed
    const discountClaimed = sessionStorage.getItem("discountClaimed");
    if (discountClaimed) {
      setDiscountApplied(true);
    }
  }, []);




  const handleClaimDiscount = () => {
    setDiscountApplied(true);
  };

  return (
    <main className="min-h-screen">
      <SEOHead />
      <DiscountPopup onClaimDiscount={handleClaimDiscount} />
      <Hero />
      <Benefits />
      <Features />
      {/* Preço anual só desta página. As outras rotas que usam PricingLP1
          ("/" e "/tiktok") seguem com o valor padrão do componente. */}
      <PricingLP1
        discountApplied={discountApplied}
        annualPricing={{
          price: "R$ 139,90",
          installment: "R$ 14,91",
          originalPrice: "R$ 478,80",
          discount: "71% OFF",
          description: "Economize R$ 338,90 por ano",
        }}
      />
      <Testimonials />
      <CTA />
      <Footer />
      <WhatsAppButton />
      <SocialProofNotification />
    </main>
  );
};

export default LP1;
