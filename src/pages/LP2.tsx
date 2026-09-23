import { useEffect, useState } from "react";
import HeroLP2 from "@/components/HeroLP2";
import ProblemSection from "@/components/ProblemSection";
import FeaturesLP2 from "@/components/FeaturesLP2";
import TestimonialsLP2 from "@/components/TestimonialsLP2";
import PricingLP2 from "@/components/PricingLP2";
import CTALP2 from "@/components/CTALP2";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import DiscountPopup from "@/components/DiscountPopup";
import SocialProofNotification from "@/components/SocialProofNotification";
import SEOHead from "@/components/SEOHead";

const LP2 = () => {
  const [discountApplied, setDiscountApplied] = useState(false);

  useEffect(() => {
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
      <HeroLP2 />
      <ProblemSection />
      <FeaturesLP2 />
      <TestimonialsLP2 />
      <PricingLP2 discountApplied={discountApplied} />
      <CTALP2 />
      <Footer />
      <WhatsAppButton />
      <SocialProofNotification />
    </main>
  );
};

export default LP2;
