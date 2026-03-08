import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame } from "lucide-react";

const CTALP2 = () => {
  const [spots, setSpots] = useState(23);

  useEffect(() => {
    // Slowly decrease spots for urgency
    const interval = setInterval(() => {
      setSpots((prev) => (prev > 5 ? prev - 1 : 5));
    }, 45000); // every 45 seconds
    return () => clearInterval(interval);
  }, []);

  const scrollToPlans = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Urgency badge */}
          <div className="inline-flex items-center gap-2 bg-destructive/10 border border-destructive/30 text-destructive px-5 py-2.5 rounded-full mb-8 font-semibold text-sm animate-pulse">
            <Flame className="w-4 h-4" />
            Apenas {spots} vagas com preço promocional
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-5">
            Sua Papelaria Merece{" "}
            <span className="text-primary">Lucrar de Verdade</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Cada dia sem controle é dinheiro que você perde. Comece agora e veja
            resultados já na primeira semana.
          </p>

          <Button
            variant="hero"
            size="xl"
            onClick={scrollToPlans}
            className="group text-base md:text-lg px-12 py-7"
            data-track-id="cta-lp2-final"
            data-track-type="cta"
          >
            Começar Agora — Risco Zero
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <p className="text-sm text-muted-foreground mt-6">
            Garantia de 7 dias • Cancele quando quiser • Suporte humanizado
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTALP2;
