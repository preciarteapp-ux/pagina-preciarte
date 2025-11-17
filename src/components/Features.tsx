import { Calculator, Users, Package, FileText, DollarSign, ShoppingBag, Bot, BarChart3, Clock, Sparkles } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Dashboard Inteligente",
    description: "Visualize tudo em tempo real: faturamento, produtos, clientes e estatísticas com gráficos claros."
  },
  {
    icon: Calculator,
    title: "Calculadoras Profissionais",
    description: "Calcule o valor da hora e custo de impressão. Nunca mais erre no preço!"
  },
  {
    icon: Sparkles,
    title: "Precificação Inteligente",
    description: "Cálculo automático de custos, margem de lucro em tempo real e preço sugerido."
  },
  {
    icon: Package,
    title: "Gestão de Materiais",
    description: "Controle total de estoque com alertas de estoque baixo e conversão automática de unidades."
  },
  {
    icon: Users,
    title: "Gestão de Clientes",
    description: "Cadastro completo com histórico de compras. Nunca mais perca um cliente!"
  },
  {
    icon: FileText,
    title: "Orçamentos Profissionais",
    description: "PDFs bonitos com sua identidade visual. Crie orçamentos incríveis em minutos."
  },
  {
    icon: DollarSign,
    title: "Financeiro Completo",
    description: "Controle total de receitas, despesas, custos fixos com gráficos e análises."
  },
  {
    icon: ShoppingBag,
    title: "Catálogo Online",
    description: "Venda mais pelo WhatsApp com catálogo profissional sempre disponível 24/7."
  },
  {
    icon: Bot,
    title: "Assistente de IA",
    description: "Crie legendas, roteiros virais e estratégias de marketing com inteligência artificial."
  },
  {
    icon: Clock,
    title: "Economia de Tempo",
    description: "Automatize cálculos complexos e crie orçamentos em 2 minutos. Mais tempo para criar!"
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Funcionalidades Que Vão Revolucionar Seu Negócio
          </h2>
          <p className="text-xl text-muted-foreground">
            Tudo que você precisa para profissionalizar sua papelaria em um só lugar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-card rounded-2xl p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 border border-border hover:border-primary/50"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
