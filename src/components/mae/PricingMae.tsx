import { Check, Heart, Sparkles, PiggyBank, Minus } from "lucide-react";
import { buildCheckoutUrl } from "@/lib/checkout";

const annualFeatures = [
  "Acesso completo a todos os recursos",
  "Menos que uma pizza por mês",
  "O sistema se paga na 1ª venda corrigida",
  "Suporte prioritário incluso",
];

const annualLink = "https://pay.onprofit.com.br/CUTCm7GF?off=cbP8BX";
const monthlyLink = "https://pay.hotmart.com/X105144057Q";

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto items-start">
          {/* Anual */}
          <div
            className="relative rounded-2xl md:rounded-3xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(8px)",
              border: "2px solid #d4af37",
              boxShadow: "0 24px 60px rgba(212,175,55,0.35), 0 0 0 1px rgba(212,175,55,0.4) inset",
            }}
          >
            <div className="absolute -top-3 right-6">
              <div
                className="px-4 py-1.5 rounded-full text-xs md:text-sm font-bold flex items-center gap-1 text-white whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, #c2185b, #d4af37)",
                  boxShadow: "0 6px 18px rgba(212,175,55,0.45)",
                }}
              >
                <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />
                Melhor oferta
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-3 mt-2" style={{ fontFamily: "'Playfair Display', serif", color: "#5a2438" }}>
              Anual
            </h3>
            <div className="mb-3">
              <span
                className="px-3 py-1 rounded-full text-sm font-bold text-white"
                style={{ background: "linear-gradient(135deg, #c2185b, #9a1f4a)" }}
              >
                48% OFF
              </span>
            </div>
            <span className="text-base line-through block mb-1" style={{ color: "#a07786" }}>R$ 478,80/ano</span>
            <p
              className="text-4xl md:text-5xl font-bold whitespace-nowrap leading-tight"
              style={{
                background: "linear-gradient(120deg, #9a1f4a, #d4af37)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              12x R$ 14,48
            </p>
            <p className="text-sm mt-1" style={{ color: "#6b3a4d" }}>ou R$ 139,90 à vista</p>

            <div
              className="mt-4 flex items-center gap-2 rounded-xl px-3 py-2.5 border"
              style={{ background: "rgba(22,163,74,0.08)", borderColor: "rgba(22,163,74,0.3)" }}
            >
              <PiggyBank className="w-4 h-4 flex-shrink-0" style={{ color: "#16a34a" }} />
              <span className="text-sm font-semibold" style={{ color: "#16a34a" }}>
                Você economiza R$ 338,90 por ano
              </span>
            </div>

            <ul className="space-y-3 my-6">
              {annualFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(212,175,55,0.18)" }}>
                    <Check className="w-3 h-3" style={{ color: "#9a1f4a" }} strokeWidth={3} />
                  </div>
                  <span className="text-sm md:text-base" style={{ color: "#3d1a26" }}>{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => window.open(buildCheckoutUrl(annualLink), "_blank")}
              data-track-id="checkout-mae-anual"
              data-track-type="checkout"
              className="w-full min-h-[52px] py-4 rounded-full font-bold text-white text-base transition-all hover:scale-[1.02] active:scale-95"
              style={{
                background: "linear-gradient(135deg, #c2185b 0%, #9a1f4a 50%, #d4af37 100%)",
                boxShadow: "0 10px 26px rgba(154,31,74,0.35)",
              }}
            >
              Assinar Anual agora
            </button>
          </div>

          {/* Mensal */}
          <div
            className="relative rounded-2xl md:rounded-3xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(212,175,55,0.35)",
              boxShadow: "0 12px 32px rgba(154,31,74,0.12)",
            }}
          >
            <h3 className="text-2xl font-bold mb-3 mt-2" style={{ fontFamily: "'Playfair Display', serif", color: "#5a2438" }}>
              Mensal
            </h3>
            <p className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: "#5a2438" }}>
              R$ 39,90<span className="text-base font-medium" style={{ color: "#6b3a4d" }}>/mês</span>
            </p>
            <p className="text-sm mt-2" style={{ color: "#6b3a4d" }}>Acesso completo, sem fidelidade</p>

            <ul className="space-y-3 my-6 mt-8">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(212,175,55,0.18)" }}>
                  <Check className="w-3 h-3" style={{ color: "#9a1f4a" }} strokeWidth={3} />
                </div>
                <span className="text-sm md:text-base" style={{ color: "#3d1a26" }}>Acesso completo</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(212,175,55,0.18)" }}>
                  <Check className="w-3 h-3" style={{ color: "#9a1f4a" }} strokeWidth={3} />
                </div>
                <span className="text-sm md:text-base" style={{ color: "#3d1a26" }}>Cancele quando quiser</span>
              </li>
              <li className="flex items-start gap-3">
                <Minus className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#a07786" }} />
                <span className="text-sm md:text-base" style={{ color: "#a07786" }}>Sem desconto anual</span>
              </li>
            </ul>

            <button
              onClick={() => window.open(buildCheckoutUrl(monthlyLink), "_blank")}
              data-track-id="checkout-mae-mensal"
              data-track-type="checkout"
              className="w-full min-h-[52px] py-4 rounded-full font-bold text-base transition-all hover:scale-[1.02] active:scale-95 mb-4 border-2"
              style={{
                borderColor: "#9a1f4a",
                color: "#9a1f4a",
                background: "white",
              }}
            >
              Assinar Mensal
            </button>

            <div
              className="rounded-xl px-3 py-2.5 text-center border"
              style={{ background: "rgba(154,31,74,0.05)", borderColor: "rgba(154,31,74,0.15)" }}
            >
              <p className="text-sm" style={{ color: "#6b3a4d" }}>
                No anual você paga <span className="font-bold" style={{ color: "#9a1f4a" }}>R$ 14,48/mês</span> — apenas 36% do preço mensal
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingMae;
