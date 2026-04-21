import { LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";

export type QuizOption = {
  label: string;
  sublabel?: string;
  value: any;
  icon?: LucideIcon;
  emoji?: string;
};

interface QuizQuestionProps {
  title: string;
  subtitle?: string;
  options: QuizOption[];
  onSelect: (value: any) => void;
  questionKey: string; // força remount na mudança de pergunta para reativar animações
}

const QuizQuestion = ({ title, subtitle, options, onSelect, questionKey }: QuizQuestionProps) => {
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
        // ignore
      }
    }
    setTimeout(() => onSelect(value), 280);
  };

  return (
    <div key={questionKey} className="w-full max-w-md mx-auto px-4 pt-6 pb-10 animate-fade-in">
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-2 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-muted-foreground text-center mb-6">{subtitle}</p>
      )}

      <div className="flex flex-col gap-3 mt-6">
        {options.map((opt, i) => {
          const Icon = opt.icon;
          const isSelected = selected === i;
          return (
            <button
              key={i}
              onClick={() => handleClick(opt.value, i)}
              className={`w-full text-left rounded-2xl border-2 p-4 sm:p-5 bg-card transition-all duration-200 active:scale-[0.98] ${
                isSelected
                  ? "border-primary bg-primary/10 scale-[1.02] shadow-[var(--shadow-glow)]"
                  : "border-border hover:border-primary/50 hover:bg-secondary/40"
              }`}
            >
              <div className="flex items-center gap-3">
                {opt.emoji && (
                  <span className="text-2xl flex-shrink-0" aria-hidden>
                    {opt.emoji}
                  </span>
                )}
                {Icon && (
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="font-semibold text-card-foreground text-base sm:text-lg leading-tight">
                    {opt.label}
                  </div>
                  {opt.sublabel && (
                    <div className="text-xs text-muted-foreground mt-0.5">{opt.sublabel}</div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizQuestion;
