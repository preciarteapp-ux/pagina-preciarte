import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/app-dashboard.png";

const Hero = () => {
  const scrollToPlans = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Sistema Completo para Papelarias</span>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
            PreciArte
          </h1>
          
          <p className="text-2xl md:text-3xl font-semibold text-center mb-4 text-foreground">
            Transforme Sua Papelaria em um Negócio Lucrativo
          </p>

          <p className="text-lg md:text-xl text-center text-muted-foreground max-w-3xl mx-auto mb-12">
            Pare de perder tempo com cálculos manuais e planilhas desorganizadas. 
            Tenha controle total, lucre mais e profissionalize seu negócio.
          </p>

          {/* CTA buttons */}
          <div className="flex justify-center mb-16">
            <Button 
              variant="hero" 
              size="xl"
              onClick={scrollToPlans}
              className="group"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* App preview image */}
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 blur-3xl" />
            <img 
              src={heroImage} 
              alt="PreciArte Dashboard Preview" 
              className="w-full rounded-2xl shadow-[var(--shadow-glow)] border border-primary/20 relative z-10"
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
