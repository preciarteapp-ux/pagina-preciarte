import { Button } from "@/components/ui/button";
import { Check, Sparkles, PiggyBank, Minus } from "lucide-react";
import { buildCheckoutUrl } from "@/lib/checkout";

const annualLink = "https://pay.hotmart.com/X105144057Q?off=moc4qfni";
const monthlyLink = "https://pay.hotmart.com/X105144057Q";

const annualFeatures = [
  "Acesso completo a todos os recursos",
  "Menos que uma pizza por mês",
  "O sistema se paga na 1ª venda corrigida",
  "Suporte prioritário incluso",
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Escolha Seu Plano</h2>
          <p className="text-xl text-muted-foreground">
            Investimento que se paga na primeira venda com margem de lucro correta
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
          {/* Anual */}
          <div className="relative bg-card rounded-2xl p-8 border-2 border-primary shadow-[var(--shadow-glow)] md:scale-105">
            <div className="absolute -top-4 right-6">
              <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                Melhor oferta
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-3 text-card-foreground">Anual</h3>
            <div className="mb-3">
              <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-bold">48% OFF</span>
            </div>
            <span className="text-base text-muted-foreground line-through block mb-1">R$ 478,80/ano</span>
            <p className="text-4xl md:text-5xl font-bold text-primary leading-tight">12x R$ 14,48</p>
            <p className="text-sm text-muted-foreground mt-1">ou R$ 139,90 à vista</p>

            <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2.5">
              <PiggyBank className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span className="text-sm font-semibold text-emerald-500">Você economiza R$ 338,90 por ano</span>
            </div>

            <ul className="space-y-3 my-6">
              {annualFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-card-foreground">{f}</span>
                </li>
              ))}
            </ul>

            <Button
              variant="hero"
              className="w-full"
              size="lg"
              onClick={() => window.open(buildCheckoutUrl(annualLink), "_blank")}
              data-track-id="checkout-anual"
              data-track-type="checkout"
            >
              Assinar Anual agora
            </Button>
          </div>

          {/* Mensal */}
          <div className="relative bg-card rounded-2xl p-8 border-2 border-border">
            <h3 className="text-2xl font-bold mb-3 text-card-foreground">Mensal</h3>
            <p className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              R$ 39,90<span className="text-base font-medium text-muted-foreground">/mês</span>
            </p>
            <p className="text-sm text-muted-foreground mt-2">Acesso completo, sem fidelidade</p>

            <ul className="space-y-3 my-6 mt-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-card-foreground">Acesso completo</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-card-foreground">Cancele quando quiser</span>
              </li>
              <li className="flex items-start gap-3">
                <Minus className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Sem desconto anual</span>
              </li>
            </ul>

            <Button
              variant="outline"
              className="w-full mb-4"
              size="lg"
              onClick={() => window.open(buildCheckoutUrl(monthlyLink), "_blank")}
              data-track-id="checkout-mensal"
              data-track-type="checkout"
            >
              Assinar Mensal
            </Button>

            <div className="rounded-xl border border-border bg-secondary/40 px-3 py-2.5 text-center">
              <p className="text-sm text-muted-foreground">
                No anual você paga <span className="font-bold text-primary">R$ 14,48/mês</span> — apenas 36% do preço mensal
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">Todos os planos incluem 7 dias de garantia incondicional</p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
