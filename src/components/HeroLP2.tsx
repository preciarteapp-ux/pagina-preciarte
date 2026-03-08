import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, X, Users, TrendingUp, Clock } from "lucide-react";

const pains = [
  "Precificando seus produtos no achismo e perdendo lucro",
  "Gastando horas com planilhas que nunca ficam certas",
  "Sem saber quais produtos realmente dão lucro",
];

const stats = [
  { icon: Users, value: "+2.500", label: "Papelarias usam" },
  { icon: TrendingUp, value: "40%", label: "Mais lucro real" },
  { icon: Clock, value: "2 min", label: "Por orçamento" },
];

const HeroLP2 = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const scrollToPlans = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const scriptSrc =
      "https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js";
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      document.head.appendChild(script);
    }
    if (iframeRef.current) {
      iframeRef.current.src = `https://scripts.converteai.net/f04f0c1f-d8c5-4ccf-aa51-6f81483a882e/players/696bebcc521058214ca6e141/v4/embed.html${window.location.search || "?"}${"&vl=" + encodeURIComponent(window.location.href)}`;
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background">
      {/* Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 -left-32 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 -right-32 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-center mb-6 leading-tight text-foreground">
            Você Está{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Perdendo Dinheiro
            </span>{" "}
            na Sua Papelaria
            <br className="hidden md:block" />
            <span className="text-muted-foreground text-2xl sm:text-3xl md:text-4xl font-semibold block mt-2">
              (E Nem Sabe Disso)
            </span>
          </h1>

          {/* Pain points */}
          <div className="flex flex-col items-center gap-3 mb-10">
            {pains.map((pain, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-destructive/5 border border-destructive/20 rounded-xl px-5 py-3 max-w-xl w-full"
              >
                <X className="w-5 h-5 text-destructive flex-shrink-0" />
                <span className="text-foreground text-sm md:text-base font-medium">
                  {pain}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center mb-12">
            <Button
              variant="hero"
              size="xl"
              onClick={scrollToPlans}
              className="group text-base md:text-lg px-10 py-7"
              data-track-id="hero-lp2-cta"
              data-track-type="cta"
            >
              Quero Parar de Perder Dinheiro
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* VSL */}
          <div className="relative max-w-4xl mx-auto mb-14">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-15 blur-3xl rounded-3xl" />
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-[var(--shadow-glow)] border border-primary/20 bg-black">
              <div style={{ margin: "0 auto", width: "100%" }}>
                <div style={{ position: "relative", paddingTop: "56.25%" }}>
                  <iframe
                    ref={iframeRef}
                    frameBorder="0"
                    allowFullScreen
                    src="about:blank"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                    referrerPolicy="origin"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Social proof stats bar */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1 bg-card border border-border rounded-xl py-4 px-2 shadow-sm"
              >
                <stat.icon className="w-6 h-6 text-primary mb-1" />
                <span className="text-2xl md:text-3xl font-extrabold text-primary">
                  {stat.value}
                </span>
                <span className="text-xs md:text-sm text-muted-foreground text-center">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroLP2;
