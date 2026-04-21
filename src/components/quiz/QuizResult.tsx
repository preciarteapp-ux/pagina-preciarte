import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Clock,
  TrendingDown,
  Calculator,
  Check,
  Sparkles,
  Shield,
  ArrowRight,
} from "lucide-react";
import { buildCheckoutUrl } from "@/lib/checkout";
import type { QuizResult as QuizResultType } from "@/lib/quizCalculator";

const ICONS = {
  alert: AlertTriangle,
  clock: Clock,
  trending: TrendingDown,
  calculator: Calculator,
};

const ANNUAL_LINK = "https://pay.hotmart.com/X105144057Q?off=moc4qfni";
const MONTHLY_LINK = "https://pay.hotmart.com/X105144057Q";

const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

interface QuizResultProps {
  result: QuizResultType;
  onRestart: () => void;
}

const useCountUp = (target: number, durationMs = 1500) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / durationMs);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);
  return value;
};

const QuizResult = ({ result, onRestart }: QuizResultProps) => {
  const animated = useCountUp(result.monthlyLoss, 1800);

  useEffect(() => {
    // Pixel: lead qualificado
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead", {
        content_name: "Quiz - Resultado",
        value: result.monthlyLoss,
        currency: "BRL",
      });
    }
  }, [result.monthlyLoss]);

  const trackCheckout = (plan: string) => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "InitiateCheckout", {
        content_name: `Quiz - ${plan}`,
        value: plan === "Anual" ? 123.95 : 39.9,
        currency: "BRL",
      });
    }
  };

  const handleAnnual = () => {
    trackCheckout("Anual");
    window.open(buildCheckoutUrl(ANNUAL_LINK), "_blank");
  };

  const handleMonthly = () => {
    trackCheckout("Mensal");
    window.open(buildCheckoutUrl(MONTHLY_LINK), "_blank");
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 animate-fade-in">
      {/* Bloco principal do resultado */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-semibold mb-4">
          <AlertTriangle className="w-3.5 h-3.5" />
          Diagnóstico do seu negócio
        </div>
        <p className="text-base text-muted-foreground mb-3 leading-snug">
          Com base nas suas respostas, você está deixando de lucrar até
        </p>
        <div className="relative">
          <div className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-none">
            {formatBRL(animated)}
          </div>
          <div className="text-base text-muted-foreground mt-1 font-medium">por mês</div>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Isso é <span className="font-bold text-foreground">{formatBRL(result.yearlyLoss)}</span> por ano que ficam fora do seu bolso.
        </p>
      </div>

      {/* Diagnósticos */}
      <div className="space-y-3 mb-8">
        {result.diagnostics.map((d, i) => {
          const Icon = ICONS[d.icon];
          return (
            <div
              key={i}
              className="flex gap-3 p-4 rounded-xl border border-border bg-card animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-destructive" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm text-card-foreground mb-1">{d.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{d.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Solução */}
      <div className="rounded-2xl border-2 border-primary bg-gradient-to-b from-secondary/40 to-card p-5 sm:p-6 mb-6 shadow-[var(--shadow-glow)]">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-lg text-card-foreground">
            Como o PreciArte resolve isso
          </h3>
        </div>
        <ul className="space-y-2.5 mb-5">
          {[
            "Calculadora de preço com margem garantida em cada peça",
            "Dashboard mostra lucro real por produto e por mês",
            "Controle de materiais e custos sem planilha",
            "IA que precifica em segundos e sugere preço ideal",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-card-foreground">
              <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="bg-primary/10 rounded-xl p-4 mb-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Plano Anual no PreciArte</p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl font-bold text-primary">R$ 12,44</span>
            <span className="text-sm text-muted-foreground">/mês</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Ou seja: <span className="font-semibold text-foreground">menos de 1% do que você perde</span> por mês
          </p>
        </div>

        <Button
          variant="hero"
          size="xl"
          className="w-full"
          onClick={handleAnnual}
          data-track-id="checkout-quiz-anual"
          data-track-type="checkout"
        >
          Quero parar de perder {formatBRL(result.monthlyLoss)}/mês
          <ArrowRight className="w-5 h-5" />
        </Button>

        <button
          onClick={handleMonthly}
          className="w-full text-center text-sm text-muted-foreground hover:text-primary mt-3 underline underline-offset-4"
          data-track-id="checkout-quiz-mensal"
          data-track-type="checkout"
        >
          Prefiro testar no plano mensal (R$ 39,90/mês)
        </button>
      </div>

      {/* Garantia + prova social */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-6">
        <Shield className="w-4 h-4 text-primary" />
        <span>7 dias de garantia incondicional — risco zero</span>
      </div>

      <div className="space-y-3 mb-6">
        {[
          {
            name: "Camila",
            text: "Em 1 mês cobrindo o custo certo, fechei R$ 1.800 a mais que no mês anterior.",
          },
          {
            name: "Renata",
            text: "Eu vendia no prejuízo sem saber. O PreciArte me mostrou e mudou meu negócio.",
          },
        ].map((t, i) => (
          <div key={i} className="rounded-xl bg-secondary/40 p-3 border border-border">
            <p className="text-xs text-card-foreground italic leading-relaxed mb-1">"{t.text}"</p>
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide">
              — {t.name}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={onRestart}
        className="w-full text-center text-xs text-muted-foreground hover:text-primary"
      >
        Refazer o quiz
      </button>
    </div>
  );
};

export default QuizResult;
