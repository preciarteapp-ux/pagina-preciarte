import { TrendingUp, Award, Clock, Target, Shield, Zap } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Lucro Garantido",
    description: "Precificação científica baseada em custos reais. Nunca mais venda no prejuízo.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Award,
    title: "Profissionalismo",
    description: "Orçamentos com visual de empresa grande. Seus clientes vão notar a diferença.",
    color: "from-primary to-accent"
  },
  {
    icon: Clock,
    title: "Economia de Tempo",
    description: "Automatize cálculos complexos. Crie orçamentos em 2 minutos.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Target,
    title: "Controle Total",
    description: "Saiba exatamente sua situação financeira em tempo real.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Shield,
    title: "Dados Seguros",
    description: "Informações protegidas na nuvem. Acesse de qualquer dispositivo.",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Zap,
    title: "Crescimento Rápido",
    description: "Decisões baseadas em dados reais. Cresça com inteligência.",
    color: "from-yellow-500 to-orange-500"
  }
];

const Benefits = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Benefícios Reais Para Seu Negócio
          </h2>
          <p className="text-xl text-muted-foreground">
            Transforme sua forma de trabalhar e alcance resultados extraordinários
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-2xl p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 border border-border overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
