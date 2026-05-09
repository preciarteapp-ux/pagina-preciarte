import { Button } from "@/components/ui/button";
import { Check, Sparkles, Tag } from "lucide-react";
import { buildCheckoutUrl } from "@/lib/checkout";

interface PricingLP1Props {
  discountApplied?: boolean;
  annualLink?: string;
}

const getPlans = (discountApplied: boolean, annualLink: string) => [
  {
    name: "Anual",
    price: discountApplied ? "R$ 139,90" : "R$ 139,90",
    installment: "12x R$ 14,48",
    period: "/ano",
    originalPrice: discountApplied ? "R$ 247,90" : "R$ 478,80",
    discount: discountApplied ? "50% OFF" : "48% OFF",
    description: discountApplied ? "Maior desconto disponível!" : "Economize mais de R$ 230 por ano",
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
    link: annualLink,
    discountBadge: discountApplied ? "50% OFF" : null,
  },
  {
    name: "Mensal",
    price: "R$ 39,90",
    period: "/mês",
    originalPrice: undefined,
    description: "Acesso completo com flexibilidade mensal",
    installment: undefined,
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
    link: "https://pay.hotmart.com/X105144057Q",
    discountBadge: null,
  },
];

const PricingLP1 = ({
  discountApplied = false,
  annualLink = "https://pay.onprofit.com.br/CUTCm7GF?off=0jene1",
}: PricingLP1Props) => {
  const plans = getPlans(discountApplied, annualLink);
  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Escolha Seu Plano</h2>
          <p className="text-xl text-muted-foreground">
            Investimento que se paga na primeira venda com margem de lucro correta
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-card rounded-2xl p-8 border-2 transition-all duration-300 ${
                plan.popular
                  ? "border-primary shadow-[var(--shadow-glow)] md:scale-105"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    Melhor Oferta
                  </div>
                </div>
              )}

              {plan.discountBadge && (
                <div className="absolute -top-3 -right-3">
                  <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg animate-pulse">
                    <Tag className="w-3 h-3" />
                    {plan.discountBadge}
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-card-foreground">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                {plan.discount && (
                  <div className="mb-3">
                    <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-bold">
                      {plan.discount}
                    </span>
                  </div>
                )}
                <div className="flex flex-col items-center justify-center gap-1">
                  {plan.originalPrice && (
                    <span className="text-base text-muted-foreground line-through">{plan.originalPrice}</span>
                  )}
                  {plan.installment ? (
                    <>
                      <span className="text-4xl font-bold text-primary">{plan.installment}</span>
                      <span className="text-xs text-muted-foreground mt-1">
                        ou {plan.price} à vista
                      </span>
                    </>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span className="text-5xl font-bold text-primary">{plan.price}</span>
                      <span className="text-muted-foreground mb-2">{plan.period}</span>
                    </div>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-card-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "hero" : "outline"}
                className="w-full"
                size="lg"
                onClick={() => window.open(buildCheckoutUrl(plan.link), "_blank")}
                data-track-id={`checkout-lp1-${plan.name.toLowerCase()}`}
                data-track-type="checkout"
              >
                Assinar {plan.name}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">Todos os planos incluem 7 dias de garantia incondicional</p>
        </div>
      </div>
    </section>
  );
};

export default PricingLP1;
