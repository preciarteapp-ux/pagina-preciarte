import { Sparkle } from "lucide-react";

const QuizHero = () => {
  return (
    <header className="relative overflow-hidden bg-[hsl(340_50%_8%)] px-6 pt-14 pb-12 text-center">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 0%, hsl(340 82% 52% / 0.55), transparent 70%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-accent">
          <Sparkle className="h-3 w-3" />
          Calculadora gratuita · 2 minutos
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.05] tracking-tight text-white">
          Descubra quanto você está{" "}
          <span className="bg-gradient-to-r from-accent to-[#FAC775] bg-clip-text text-transparent">
            perdendo
          </span>{" "}
          por mês sem perceber.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/55">
          Responda 8 perguntas honestas sobre o seu negócio. O resultado vai te surpreender.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-8">
          {[
            { num: "8", label: "perguntas" },
            { num: "2min", label: "tempo médio" },
            { num: "100%", label: "gratuito" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-2xl font-extrabold text-[#FAC775]">{s.num}</div>
              <div className="mt-0.5 text-[11px] uppercase tracking-wider text-white/40">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default QuizHero;
