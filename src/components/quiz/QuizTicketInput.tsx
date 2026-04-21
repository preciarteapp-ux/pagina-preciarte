import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

interface QuizTicketInputProps {
  number: number;
  total: number;
  onSubmit: (value: number) => void;
}

const SUGGESTIONS = [50, 80, 120, 200];
const MIN = 10;
const MAX = 500;

const QuizTicketInput = ({ number, total, onSubmit }: QuizTicketInputProps) => {
  const [value, setValue] = useState<number>(80);
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value, 10);
    setValue(v);
    setTouched(true);
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(3);
      } catch {
        /* ignore */
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value, 10);
    if (!isNaN(v)) {
      setValue(Math.min(MAX * 4, Math.max(0, v)));
      setTouched(true);
    } else {
      setValue(0);
    }
  };

  const submit = () => {
    if (value < MIN) return;
    onSubmit(value);
  };

  const sliderValue = Math.min(MAX, Math.max(MIN, value));
  const fillPct = ((sliderValue - MIN) / (MAX - MIN)) * 100;

  return (
    <div className="mx-auto w-full max-w-xl px-5 py-6 animate-fade-in">
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-[var(--shadow-card)]">
        <div className="mb-3 text-[11px] font-bold uppercase tracking-widest text-primary">
          Pergunta {number} de {total}
        </div>
        <h2 className="font-display text-[22px] sm:text-[26px] font-bold leading-tight tracking-tight text-foreground">
          Qual é o valor médio que você cobra por pedido?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Pense no pedido mais comum. Pode ser uma estimativa.
        </p>

        {/* Big number display */}
        <div className="mt-7 flex items-baseline justify-center gap-2 rounded-2xl bg-secondary/60 py-6">
          <span className="font-display text-2xl font-bold text-muted-foreground">R$</span>
          <input
            ref={inputRef}
            type="number"
            inputMode="numeric"
            value={value || ""}
            onChange={handleInput}
            placeholder="80"
            className="w-[160px] bg-transparent text-center font-display text-5xl font-extrabold tracking-tight text-primary outline-none placeholder:text-muted-foreground/40 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>

        {/* Slider */}
        <div className="mt-5">
          <input
            type="range"
            min={MIN}
            max={MAX}
            step={5}
            value={sliderValue}
            onChange={handleSlider}
            className="quiz-slider w-full"
            style={{
              background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--accent)) ${fillPct}%, hsl(var(--secondary)) ${fillPct}%, hsl(var(--secondary)) 100%)`,
            }}
          />
          <div className="mt-1.5 flex justify-between text-[11px] text-muted-foreground">
            <span>R$ {MIN}</span>
            <span>R$ {MAX}+</span>
          </div>
        </div>

        {/* Chips */}
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setValue(s);
                setTouched(true);
              }}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-all ${
                value === s
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-card-foreground hover:border-primary/60"
              }`}
            >
              R$ {s}
            </button>
          ))}
        </div>

        <button
          onClick={submit}
          disabled={value < MIN}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-display text-[15px] font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none disabled:hover:translate-y-0"
        >
          Continuar
          <ArrowRight className="h-4 w-4" />
        </button>
        {!touched && (
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Arraste o slider, digite ou escolha um valor
          </p>
        )}
      </div>
    </div>
  );
};

export default QuizTicketInput;
