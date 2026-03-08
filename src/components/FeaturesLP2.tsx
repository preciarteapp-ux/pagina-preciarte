import {
  Calculator,
  BarChart3,
  ShoppingBag,
  Sparkles,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Calculator,
    title: "Precificação Inteligente",
    description:
      "Calcule o preço ideal de cada produto com margem de lucro real. Inclua custos de material, mão de obra, impostos e embalagem em segundos.",
    highlight: "Nunca mais venda no prejuízo",
  },
  {
    icon: BarChart3,
    title: "Dashboard de Lucro Real",
    description:
      "Veja em tempo real quanto cada produto, cada cliente e cada mês realmente lucram. Dados claros para decisões inteligentes.",
    highlight: "Saiba exatamente quanto você lucra",
  },
  {
    icon: ShoppingBag,
    title: "Gestão de Estoque e Materiais",
    description:
      "Controle entradas e saídas, receba alertas de estoque baixo e saiba exatamente o custo de cada material.",
    highlight: "Chega de comprar material repetido",
  },
  {
    icon: Globe,
    title: "Catálogo Online Profissional",
    description:
      "Seus clientes acessam seu catálogo pelo celular, escolhem os produtos e fazem pedidos pelo WhatsApp automaticamente.",
    highlight: "Vendas 24h sem esforço",
  },
  {
    icon: Sparkles,
    title: "Assistente de IA para Marketing",
    description:
      "Gere descrições, posts para Instagram, legendas e ideias de conteúdo com inteligência artificial integrada ao sistema.",
    highlight: "Marketing profissional sem agência",
  },
];

const FeaturesLP2 = () => {
  return (
    <section
      id="features-lp2"
      className="py-20 md:py-28 bg-gradient-to-b from-secondary/20 to-background"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
            Tudo Que Sua Papelaria{" "}
            <span className="text-primary">Precisa</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            5 ferramentas poderosas em um único sistema simples
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`flex flex-col ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-8 bg-card border border-border rounded-2xl p-8 md:p-10 hover:shadow-[var(--shadow-glow)] transition-all duration-300`}
            >
              {/* Icon side */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center">
                  <feature.icon className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                </div>
              </div>

              {/* Text side */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold text-card-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  {feature.description}
                </p>
                <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full">
                  {feature.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesLP2;
