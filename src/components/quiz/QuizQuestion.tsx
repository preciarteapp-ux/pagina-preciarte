import { LucideIcon, Check } from "lucide-react";
import { useEffect, useState } from "react";

export type QuizOption = {
  label: string;
  sublabel?: string;
  value: any;
  icon?: LucideIcon;
  emoji?: string;
};

interface QuizQuestionProps {
  number: number;
  total: number;
  title: string;
  subtitle?: string;
  options: QuizOption[];
  onSelect: (value: any) => void;
  questionKey: string;
}

const QuizQuestion = ({
  number,
  total,
  title,
  subtitle,
  options,
  onSelect,
  questionKey,
}: QuizQuestionProps) => {
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    setSelected(null);
  }, [questionKey]);

  const handleClick = (value: any, index: number) => {
    if (selected !== null) return;
    setSelected(index);
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(15);
      } catch {
        /* ignore */
      }
    }
    setTimeout(() => onSelect(value), 350);
  };

  return (
    <div
      key={questionKey}
      className="mx-auto w-full max-w-xl px-5 py-6 animate-fade-in"
    >
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-[var(--shadow-card)]">
        <div className="mb-3 text-[11px] font-bold uppercase tracking-widest text-primary">
          Pergunta {number} de {total}
        </div>
        <h2 className="font-display text-[22px] sm:text-[26px] font-bold leading-tight tracking-tight text-foreground">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
        )}

        <div className="mt-7 flex flex-col gap-2.5">
          {options.map((opt, i) => {
            const Icon = opt.icon;
            const isSelected = selected === i;
            return (
              <button
                key={i}
                onClick={() => handleClick(opt.value, i)}
                className={`group relative flex w-full items-center gap-3.5 rounded-2xl border-[1.5px] p-4 text-left transition-all duration-200 active:scale-[0.985] ${
                  isSelected
                    ? "border-primary bg-secondary scale-[1.015] shadow-[var(--shadow-glow)]"
                    : "border-border bg-card hover:border-primary/60 hover:bg-secondary/50 hover:-translate-y-0.5"
                }`}
              >
                {opt.emoji && (
                  <span className="flex-shrink-0 text-2xl" aria-hidden>
                    {opt.emoji}
                  </span>
                )}
                {Icon && (
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] font-semibold leading-tight text-card-foreground">
                    {opt.label}
                  </div>
                  {opt.sublabel && (
                    <div className="mt-0.5 text-xs text-muted-foreground">{opt.sublabel}</div>
                  )}
                </div>
                <div
                  className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-[1.5px] transition-all ${
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-transparent group-hover:border-primary/50"
                  }`}
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
