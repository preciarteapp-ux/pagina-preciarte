import { Check, Heart, Sparkles } from "lucide-react";
import { buildCheckoutUrl } from "@/lib/checkout";

const plans = [
  {
    name: "Anual",
    price: "R$ 97,90",
    installment: "R$ 10,43",
    period: "/ano",
    originalPrice: "R$ 358,80",
    discount: "73% OFF",
    description: "Economize mais de R$ 350 por ano",
    features: [
      "700 créditos de IA inclusos",
      "Dashboard completo",
      "Calculadoras profissionais",
      "Produtos ilimitados",
      "Gestão de clientes",
      "Orçamentos ilimitados",
      "Gestão de materiais e estoque",
      "Financeiro completo",
      "Catálogo online",
      "Assistente de IA",
      "Suporte especializado",
      "Atualizações constantes",
    ],
    popular: true,
    link: "https://pay.onprofit.com.br/CUTCm7GF?off=cbP8BX",
  },
  {
    name: "Mensal",
    price: "R$ 39,90",
    period: "/mês",
    description: "Acesso completo com flexibilidade mensal",
    features: [
      "50 créditos de IA por mês",
      "Dashboard completo",
      "Calculadoras profissionais",
      "Produtos ilimitados",
      "Gestão de clientes",
      "Orçamentos ilimitados",
      "Gestão de materiais e estoque",
      "Financeiro completo",
      "Catálogo online",
      "Assistente de IA",
      "Suporte especializado",
      "Atualizações constantes",
    ],
    popular: false,
    link: "https://pay.hotmart.com/X105144057Q?off=awlgyuqd",
  },
];

const PricingMae = () => {
  return (
    <section
      id="pricing"
      className="relative py-12 md:py-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #fff8f0 0%, #fde7ed 60%, #fff8f0 100%)",
      }}
    >
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full opacity-30 blur-3xl pointer-events-none" style={{ background: "#f5b7c8" }} />
      <div className="absolute bottom-10 right-10 w-56 h-56 rounded-full opacity-25 blur-3xl pointer-events-none" style={{ background: "#d4af37" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ background: "rgba(154,31,74,0.08)", color: "#9a1f4a", border: "1px solid rgba(212,175,55,0.5)" }}>
            <Heart className="w-4 h-4 fill-current" /> Oferta Dia das Mães
          </div>
          <h2
            className="font-bold mb-3"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              color: "#5a2438",
            }}
          >
            Escolha o presente certo
          </h2>
          <p className="text-base md:text-lg" style={{ color: "#6b3a4d" }}>
            Investimento que se paga já na primeira venda com a margem correta
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="relative rounded-2xl md:rounded-3xl p-5 md:p-8 transition-all duration-300 hover:-translate-y-1 md:[&.popular]:scale-[1.02]"
              style={{
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(8px)",
                border: plan.popular ? "2px solid #d4af37" : "1px solid rgba(212,175,55,0.35)",
                boxShadow: plan.popular
                  ? "0 24px 60px rgba(212,175,55,0.35), 0 0 0 1px rgba(212,175,55,0.4) inset"
                  : "0 12px 32px rgba(154,31,74,0.12)",
              }}
            >
              {plan.popular && (
                <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2">
                  <div
                    className="px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-bold flex items-center gap-1 text-white whitespace-nowrap"
                    style={{
                      background: "linear-gradient(135deg, #c2185b, #d4af37)",
                      boxShadow: "0 6px 18px rgba(212,175,55,0.45)",
                    }}
                  >
                    <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    Melhor Oferta
                  </div>
                </div>
              )}

              <div className="text-center mb-5 md:mb-7">
                <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#5a2438" }}>
                  {plan.name}
                </h3>
                <p className="text-xs md:text-sm mb-3 md:mb-4" style={{ color: "#6b3a4d" }}>{plan.description}</p>
                {plan.discount && (
                  <div className="mb-3">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-bold text-white"
                      style={{ background: "linear-gradient(135deg, #c2185b, #9a1f4a)" }}
                    >
                      {plan.discount}
                    </span>
                  </div>
                )}
                <div className="flex flex-col items-center justify-center gap-1">
                  {plan.originalPrice && (
                    <span className="text-base line-through" style={{ color: "#a07786" }}>{plan.originalPrice}</span>
                  )}
                  {plan.installment ? (
                    <>
                      <span
                        className="text-3xl md:text-5xl font-bold whitespace-nowrap"
                        style={{
                          background: "linear-gradient(120deg, #9a1f4a, #d4af37)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {plan.installment}
                        <span className="text-xl font-medium ml-1" style={{ color: "#9a1f4a" }}>/mês</span>
                      </span>
                      <span className="text-xs mt-1" style={{ color: "#6b3a4d" }}>
                        ou {plan.price} à vista no plano anual
                      </span>
                    </>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span
                        className="text-4xl md:text-5xl font-bold"
                        style={{
                          background: "linear-gradient(120deg, #9a1f4a, #d4af37)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {plan.price}
                      </span>
                      <span className="mb-2" style={{ color: "#6b3a4d" }}>{plan.period}</span>
                    </div>
                  )}
                </div>
              </div>

              <ul className="space-y-2.5 md:space-y-3 mb-6 md:mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 md:gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(212,175,55,0.18)" }}>
                      <Check className="w-3 h-3" style={{ color: "#9a1f4a" }} />
                    </div>
                    <span className="text-sm md:text-base" style={{ color: "#3d1a26" }}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => window.open(buildCheckoutUrl(plan.link), "_blank")}
                data-track-id={`checkout-mae-${plan.name.toLowerCase()}`}
                data-track-type="checkout"
                className="w-full min-h-[52px] py-4 rounded-full font-bold text-white text-base transition-all hover:scale-[1.02] active:scale-95"
                style={{
                  background: plan.popular
                    ? "linear-gradient(135deg, #c2185b 0%, #9a1f4a 50%, #d4af37 100%)"
                    : "linear-gradient(135deg, #9a1f4a, #c2185b)",
                  boxShadow: "0 10px 26px rgba(154,31,74,0.35)",
                }}
              >
                Garantir meu presente
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PricingMae;
