import { useEffect } from "react";
import CountdownMae from "@/components/mae/CountdownMae";
import HeroMae from "@/components/mae/HeroMae";
import PricingMae from "@/components/mae/PricingMae";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SocialProofNotification from "@/components/SocialProofNotification";
import SEOHead from "@/components/SEOHead";
import useAnalytics from "@/hooks/useAnalytics";

const Mae = () => {
  useAnalytics();

  useEffect(() => {
    // Playfair Display font
    const id = "playfair-font";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&display=swap";
      document.head.appendChild(link);
    }
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("init", "1503006167441659");
      (window as any).fbq("track", "PageView");
    }
  }, []);

  return (
    <main className="min-h-screen" style={{ background: "#fff8f0" }}>
      <SEOHead
        title="Promoção Dia das Mães — PreciArte | Sistema para Papelarias"
        description="Oferta especial de Dia das Mães: assine o PreciArte e transforme sua papelaria em um negócio lucrativo. Anual a partir de 12x R$ 11,66."
      />
      <CountdownMae />
      <HeroMae />
      <PricingMae />
      <Testimonials />
      <Footer />
      <WhatsAppButton />
      <SocialProofNotification />
    </main>
  );
};

export default Mae;
