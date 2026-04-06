import { useEffect, useState } from 'react';
import HeroLP3 from '@/components/lp3/HeroLP3';
import PainPointsLP3 from '@/components/lp3/PainPointsLP3';
import ImpactBlockLP3 from '@/components/lp3/ImpactBlockLP3';
import WhatIsLP3 from '@/components/lp3/WhatIsLP3';
import FeaturesLP3 from '@/components/lp3/FeaturesLP3';
import HowItWorksLP3 from '@/components/lp3/HowItWorksLP3';
import AudienceLP3 from '@/components/lp3/AudienceLP3';
import StatsLP3 from '@/components/lp3/StatsLP3';
import TestimonialsLP3 from '@/components/lp3/TestimonialsLP3';
import CTABannerLP3 from '@/components/lp3/CTABannerLP3';
import ComparisonLP3 from '@/components/lp3/ComparisonLP3';
import PricingLP3 from '@/components/lp3/PricingLP3';
import CTAFinalLP3 from '@/components/lp3/CTAFinalLP3';
import SEOHead from '@/components/SEOHead';
import WhatsAppButton from '@/components/WhatsAppButton';
import DiscountPopup from '@/components/DiscountPopup';
import SocialProofNotification from '@/components/SocialProofNotification';
import { useToast } from '@/hooks/use-toast';

const LP3 = () => {
  const [discountApplied, setDiscountApplied] = useState(false);
  const { toast } = useToast();

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
    <div style={{ background: '#F8F6F3', color: '#2C2C2C' }} className="min-h-screen font-sans pt-12">
      <SEOHead />
      <DiscountPopup onClaimDiscount={handleClaimDiscount} />
      <HeroLP3 />
      <PainPointsLP3 />
      <ImpactBlockLP3 />
      <WhatIsLP3 />
      <FeaturesLP3 />
      <HowItWorksLP3 />
      <AudienceLP3 />
      <StatsLP3 />
      <TestimonialsLP3 />
      <CTABannerLP3 text="Junte-se a centenas de artesãos que já precificam com confiança" />
      <ComparisonLP3 />
      <CTABannerLP3 text="Pronto pra parar de perder dinheiro?" />
      <PricingLP3 />
      <CTAFinalLP3 />
      <WhatsAppButton />
      <SocialProofNotification />
    </div>
  );
};

export default LP3;
