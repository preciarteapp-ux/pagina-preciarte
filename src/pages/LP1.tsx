import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const LP1 = () => {
  return (
    <main className="min-h-screen">
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

export default LP1;
