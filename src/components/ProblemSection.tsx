import { X, Check, ArrowRight } from "lucide-react";

const withoutItems = [
  "Preços no achismo, sem margem real",
  "Horas perdidas com planilhas manuais",
  "Sem controle de estoque confiável",
  "Orçamentos demorados e imprecisos",
  "Marketing zero ou amador",
  "Não sabe o lucro real de cada produto",
];

const withItems = [
  "Preços calculados com lucro garantido",
  "Orçamentos prontos em 2 minutos",
  "Estoque organizado e atualizado",
  "Catálogo online profissional",
  "IA que cria conteúdo para você",
  "Dashboard com lucro real por produto",
];

const ProblemSection = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
            A Diferença é{" "}
            <span className="text-primary">Clara</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Veja como o PreciArte transforma a gestão da sua papelaria
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Without */}
          <div className="bg-card border-2 border-destructive/30 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-destructive to-destructive/50" />
            <h3 className="text-xl font-bold text-destructive mb-6 flex items-center gap-2">
              <X className="w-6 h-6" />
              Sem PreciArte
            </h3>
            <ul className="space-y-4">
              {withoutItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 text-destructive" />
                  </div>
                  <span className="text-card-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* With */}
          <div className="bg-card border-2 border-primary/30 rounded-2xl p-8 relative overflow-hidden shadow-[var(--shadow-glow)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
            <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
              <Check className="w-6 h-6" />
              Com PreciArte
            </h3>
            <ul className="space-y-4">
              {withItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-card-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Arrow CTA */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() =>
              document
                .getElementById("features-lp2")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            Veja como funciona <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
