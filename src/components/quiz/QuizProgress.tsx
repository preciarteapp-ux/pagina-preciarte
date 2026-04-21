interface QuizProgressProps {
  current: number;
  total: number;
  onBack?: () => void;
}

const QuizProgress = ({ current, total, onBack }: QuizProgressProps) => {
  const percent = (current / total) * 100;
  return (
    <div className="w-full max-w-md mx-auto px-4 pt-4">
      <div className="flex items-center justify-between mb-2 text-xs font-medium text-muted-foreground">
        <button
          onClick={onBack}
          disabled={!onBack || current === 1}
          className="disabled:opacity-30 hover:text-primary transition-colors"
          aria-label="Voltar"
        >
          ← Voltar
        </button>
        <span>
          {current} de {total}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default QuizProgress;
