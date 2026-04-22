import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  Check,
  Shield,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { buildCheckoutUrl } from "@/lib/checkout";
import type { QuizResult as QuizResultType } from "@/lib/quizCalculator";
import { trackQuizEvent } from "@/lib/quizTracking";

const ANNUAL_LINK = "https://pay.onprofit.com.br/CUTCm7GF?off=0jene1";
const MONTHLY_LINK = "https://pay.hotmart.com/X105144057Q";

const formatBRL = (n: number) =>
  "R$ " + Math.round(n).toLocaleString("pt-BR");

const formatBRLDec = (n: number) =>
  n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

interface QuizResultProps {
  result: QuizResultType;
  onRestart: () => void;
}

const useCountUp = (target: number, durationMs = 1800) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / durationMs);
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
  const [pulse, setPulse] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead", {
        content_name: "Quiz - Resultado",
        value: result.monthlyLoss,
        currency: "BRL",
      });
    }
    const t = setTimeout(() => setPulse(true), 1900);
    return () => clearTimeout(t);
  }, [result.monthlyLoss]);

  useEffect(() => {
    const onScroll = () => {
      if (!ctaRef.current) return;
      const rect = ctaRef.current.getBoundingClientRect();
      // Mostra sticky enquanto CTA principal não está visível
      setShowSticky(rect.top > window.innerHeight - 60 || rect.bottom < 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const trackCheckout = (plan: string, source: string) => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "InitiateCheckout", {
        content_name: `Quiz - ${plan}`,
        value: plan === "Anual" ? 123.95 : 39.9,
        currency: "BRL",
      });
    }
    trackQuizEvent({
      event_type: "checkout_clicked",
      plan_clicked: source,
      monthly_loss: result.monthlyLoss,
    });
  };

  const goAnnual = () => {
    trackCheckout("Anual", "anual");
    window.open(buildCheckoutUrl(ANNUAL_LINK), "_blank");
  };
  const goAnnualSticky = () => {
    trackCheckout("Anual", "sticky_anual");
    window.open(buildCheckoutUrl(ANNUAL_LINK), "_blank");
  };
  const goMonthly = () => {
    trackCheckout("Mensal", "mensal");
    window.open(buildCheckoutUrl(MONTHLY_LINK), "_blank");
  };

  return (
    <div className="mx-auto w-full max-w-xl px-5 pt-6 pb-32 animate-fade-in">
      {/* Bloco Impacto */}
      <div className="overflow-hidden rounded-3xl bg-[hsl(340_50%_8%)] shadow-2xl">
        <div className="relative px-6 py-10 text-center">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 50% 0%, hsl(340 82% 52% / 0.55), transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <div className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/40">
              <AlertTriangle className="h-3 w-3 text-accent" />
              Você está deixando de lucrar
            </div>
            <div
              className={`font-display text-[56px] sm:text-[72px] font-extrabold leading-none tracking-tight text-[#FAC775] transition-transform ${
                pulse ? "animate-pulse-once" : ""
              }`}
              style={{ textShadow: "0 0 60px hsl(340 82% 52% / 0.5)" }}
            >
              {formatBRL(animated)}
            </div>
            <div className="mt-2 text-[15px] text-white/55">por mês — sem perceber.</div>
            <div className="mt-5 inline-block rounded-xl border border-primary/40 bg-primary/20 px-5 py-2.5">
              <div className="text-[10px] uppercase tracking-wider text-white/45">
                Isso representa
              </div>
              <div className="font-display text-xl font-extrabold text-white">
                {formatBRL(result.yearlyLoss)} por ano
              </div>
            </div>
          </div>
        </div>
        <div className="h-px bg-white/[0.06]" />
        <div className="flex flex-wrap gap-4 px-6 py-4">
          {[
            { label: "Pedidos/mês", val: `${result.pedidos}` },
            { label: "Ticket médio", val: formatBRLDec(result.ticket) },
            { label: "Faturamento", val: `${formatBRL(result.faturamento)}/mês` },
          ].map((c) => (
            <div key={c.label} className="min-w-[100px] flex-1 text-center">
              <div className="text-[10px] uppercase tracking-wider text-white/30">{c.label}</div>
              <div className="mt-1 font-display text-[15px] font-bold text-white/75">{c.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Diagnóstico */}
      <div className="mt-5 overflow-hidden rounded-3xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h3 className="font-display text-base font-bold text-card-foreground">
            Diagnóstico do seu negócio
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Veja onde o dinheiro está escapando — e como o PreciArte resolve cada ponto.
          </p>
        </div>
        <div className="flex flex-col">
          {result.diagnostics.map((d, i) => (
            <div
              key={d.key}
              className="border-b border-border last:border-b-0 animate-fade-in"
              style={{ animationDelay: `${i * 110}ms`, animationFillMode: "both" }}
            >
              <div className="flex items-center gap-3 px-5 py-4">
                <div className="flex-shrink-0 text-2xl" aria-hidden>
                  {d.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-semibold leading-tight text-card-foreground">
                    {d.label}
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{d.desc}</div>
                  {/* Barra de peso */}
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-secondary/70">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-destructive to-accent transition-[width] duration-1000 ease-out"
                      style={{ width: `${Math.max(8, d.weight * 100)}%` }}
                    />
                  </div>
                </div>
                <div className="flex-shrink-0 whitespace-nowrap font-display text-[15px] font-bold text-destructive">
                  -{formatBRL(d.value)}/mês
                </div>
              </div>
              <div className="flex items-start gap-2.5 border-t border-border bg-secondary/40 px-5 py-3">
                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/15">
                  <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                </div>
                <p
                  className="text-[13px] leading-relaxed text-card-foreground [&_strong]:text-primary"
                  dangerouslySetInnerHTML={{ __html: d.solution }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Frase de impacto */}
      <div className="mt-5 rounded-2xl border border-primary/20 bg-secondary/60 p-5 text-center">
        <p
          className="font-display text-[16px] font-bold leading-relaxed text-foreground [&_strong]:text-primary"
          dangerouslySetInnerHTML={{ __html: result.phrase }}
        />
      </div>

      {/* CTA */}
      <div
        ref={ctaRef}
        className="relative mt-5 overflow-hidden rounded-3xl bg-[hsl(340_50%_8%)] p-7 text-center shadow-2xl"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 100%, hsl(340 82% 52% / 0.4), transparent)",
          }}
        />
        <div className="relative z-10">
          <Sparkles className="mx-auto mb-2 h-6 w-6 text-accent" />
          <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-white">
            O PreciArte resolve
            <br />
            <span className="bg-gradient-to-r from-accent to-[#FAC775] bg-clip-text text-transparent">
              cada um desses problemas.
            </span>
          </h3>

          <ul className="mx-auto mt-5 flex max-w-sm flex-col gap-2 text-left">
            {[
              "Precificação automática — preço certo em segundos",
              "Calculadora do valor da sua hora",
              "Custo fixo rateado automaticamente",
              "Orçamento em PDF profissional em 1 clique",
              "Controle financeiro completo — lucro real todo mês",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-[14px] text-white/75">
                <Check className="h-4 w-4 flex-shrink-0 text-[#97C459]" strokeWidth={3} />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          {/* Plano Anual — destaque */}
          <div className="mt-6 rounded-2xl border-2 border-accent/60 bg-accent/10 p-4">
            <div className="mb-1 inline-block rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
              Mais escolhido
            </div>
            <div className="font-display text-3xl font-extrabold text-white">
              R$ 12,44
              <span className="text-base font-normal text-white/50">/mês</span>
            </div>
            <div className="mt-0.5 text-xs text-white/50">
              Plano Anual · R$ 123,95 à vista
            </div>
            <button
              onClick={goAnnual}
              data-track-id="checkout-quiz-anual"
              data-track-type="checkout"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 font-display text-[15px] font-bold text-accent-foreground shadow-[0_8px_30px_hsl(var(--accent)/0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_40px_hsl(var(--accent)/0.55)]"
            >
              Quero parar de perder dinheiro
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* Plano Mensal — opção secundária visível */}
          <div className="mt-3 rounded-2xl border border-white/15 bg-white/[0.04] p-4">
            <div className="font-display text-2xl font-extrabold text-white">
              R$ 39,90
              <span className="text-sm font-normal text-white/50">/mês</span>
            </div>
            <div className="mt-0.5 text-xs text-white/50">
              Plano Mensal · teste com flexibilidade
            </div>
            <button
              onClick={goMonthly}
              data-track-id="checkout-quiz-mensal"
              data-track-type="checkout"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-transparent px-6 py-3 font-display text-[14px] font-bold text-white transition-all hover:bg-white/10"
            >
              Assinar plano mensal
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/40">
            <Shield className="h-3.5 w-3.5" />
            7 dias de garantia incondicional · risco zero
          </div>
        </div>
      </div>

      {/* Prova social */}
      <div className="mt-5 grid gap-3">
        {[
          {
            name: "Camila",
            text: "Em 1 mês cobrindo o custo certo, fechei R$ 1.800 a mais que no mês anterior.",
          },
          {
            name: "Renata",
            text: "Eu vendia no prejuízo sem saber. O PreciArte me mostrou e mudou meu negócio.",
          },
        ].map((t) => (
          <div key={t.name} className="rounded-xl border border-border bg-card p-3">
            <p className="text-xs italic leading-relaxed text-card-foreground">"{t.text}"</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              — {t.name}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={onRestart}
        className="mt-6 block w-full text-center text-xs text-muted-foreground underline hover:text-primary"
      >
        ↩ Refazer o teste
      </button>

      {/* Sticky bottom CTA */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-card/95 backdrop-blur-md p-3 shadow-[0_-8px_30px_hsl(0_0%_0%/0.15)] transition-transform duration-300 ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto max-w-xl">
          <button
            onClick={goAnnualSticky}
            data-track-id="checkout-quiz-sticky"
            data-track-type="checkout"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 font-display text-[14px] font-bold text-accent-foreground shadow-[0_4px_20px_hsl(var(--accent)/0.4)] transition-all active:scale-[0.98]"
          >
            Quero o PreciArte agora
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
