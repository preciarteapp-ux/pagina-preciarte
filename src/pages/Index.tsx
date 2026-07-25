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
import useAnalytics from "@/hooks/useAnalytics";

const Index = () => {
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
    <main className="min-h-screen pt-12">
      <SEOHead />
      <DiscountPopup onClaimDiscount={handleClaimDiscount} />
      <Hero />
      <Benefits />
      <Features />
      <PricingLP1 discountApplied={discountApplied} annualLink="https://lastlink.com/p/CBB8498E8/checkout-payment/" />
      <Testimonials />
      <CTA />
      <Footer />
      <WhatsAppButton />
      <SocialProofNotification />
      <WeekendPromoPopup />
    </main>
  );
};

export default Index;
