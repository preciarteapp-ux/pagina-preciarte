import { useEffect, useState } from "react";

interface QuizProgressProps {
  current: number;
  total: number;
  onBack?: () => void;
}

const QuizProgress = ({ current, total, onBack }: QuizProgressProps) => {
  const target = Math.round((current / total) * 100);
  const [pct, setPct] = useState(target);

  useEffect(() => {
    const start = pct;
    const diff = target - start;
    const dur = 500;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(Math.round(start + diff * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return (
    <div className="mx-auto w-full max-w-xl px-5 pt-5">
      <div className="mb-2 flex items-center justify-between">
        <button
          onClick={onBack}
          disabled={!onBack || current === 1}
          className="text-xs font-semibold text-muted-foreground transition-colors hover:text-primary disabled:opacity-30"
          aria-label="Voltar"
        >
          ← Voltar
        </button>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-muted-foreground">
            Pergunta {current} de {total}
          </span>
          <span className="font-display text-xs font-bold text-primary">{pct}%</span>
        </div>
      </div>
      <div className="h-[6px] w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary via-primary to-accent transition-[width] duration-500 ease-out"
          style={{
            width: `${pct}%`,
            boxShadow: "0 0 12px hsl(var(--primary) / 0.6)",
          }}
        />
      </div>
    </div>
  );
};

export default QuizProgress;
