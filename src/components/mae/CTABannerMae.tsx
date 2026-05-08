import { ArrowRight, Heart } from "lucide-react";

const CTABannerMae = () => {
  const scroll = () => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="relative py-12 md:py-14" style={{ background: "#fff8f0" }}>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="rounded-3xl p-8 md:p-10 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg,#9a1f4a 0%,#c2185b 50%,#d4af37 100%)", boxShadow: "0 20px 50px rgba(154,31,74,0.35)" }}>
          <Heart className="absolute -top-6 -left-6 w-32 h-32 text-white/10 fill-current" />
          <Heart className="absolute -bottom-8 -right-8 w-40 h-40 text-white/10 fill-current" />
          <div className="relative z-10">
            <h3 className="font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem,4vw,2.2rem)" }}>
              Oferta especial Dia das Mães
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Garanta agora pelo melhor preço do ano. A partir de <strong>12x R$ 11,66</strong> no Plano Anual.
            </p>
            <button onClick={scroll} data-track-id="cta-banner-mae" data-track-type="cta" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95" style={{ background: "white", color: "#9a1f4a", boxShadow: "0 10px 24px rgba(0,0,0,0.18)" }}>
              Quero aproveitar agora
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABannerMae;
