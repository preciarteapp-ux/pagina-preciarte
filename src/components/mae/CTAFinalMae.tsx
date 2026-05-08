import { ArrowRight, Heart } from "lucide-react";
import FallingPetals from "./FallingPetals";

const CTAFinalMae = () => {
  const scroll = () => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="relative py-20 md:py-24 overflow-hidden" style={{ background: "linear-gradient(135deg,#9a1f4a 0%,#c2185b 45%,#d4af37 100%)" }}>
      <FallingPetals count={10} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 60%)" }} />
      <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)", color: "white" }}>
          <Heart className="w-4 h-4 fill-current" /> Especial Dia das Mães
        </div>
        <h2 className="font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,5.5vw,3.4rem)", textShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
          O melhor presente é o que muda a vida dela
        </h2>
        <p className="text-white/90 mb-8 text-lg max-w-2xl mx-auto">
          Profissionalize, organize e veja o lucro real do negócio. Tudo em um só lugar, por menos de R$ 12 por mês.
        </p>
        <button onClick={scroll} data-track-id="cta-final-mae" data-track-type="cta" className="inline-flex items-center gap-2 px-10 py-5 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95" style={{ background: "white", color: "#9a1f4a", boxShadow: "0 14px 36px rgba(0,0,0,0.25)" }}>
          Garantir meu presente
          <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-white/80 text-sm mt-6">🌹 7 dias de garantia incondicional</p>
      </div>
    </section>
  );
};

export default CTAFinalMae;
