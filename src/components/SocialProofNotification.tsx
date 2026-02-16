import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

const NAMES = [
  "Amanda",
  "Juliana",
  "Camila",
  "Fernanda",
  "Larissa",
];

const SocialProofNotification = () => {
  const [visible, setVisible] = useState(false);
  const [currentName, setCurrentName] = useState("");
  const [spotsLeft, setSpotsLeft] = useState(5);
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (finished) return;

    const showNext = () => {
      if (step >= NAMES.length) {
        // All names shown, stay fixed at 1 vaga
        setFinished(true);
        return;
      }

      setCurrentName(NAMES[step]);
      setSpotsLeft(5 - step);
      setVisible(true);

      // If this is the last one (1 vaga), keep it visible permanently
      if (step === NAMES.length - 1) {
        setSpotsLeft(1);
        setFinished(true);
        return;
      }

      // Hide after 4s, then schedule next
      setTimeout(() => {
        setVisible(false);
      }, 4000);

      setStep((prev) => prev + 1);
    };

    const delay = step === 0 ? 8000 : 20000;
    const timer = setTimeout(showNext, delay);
    return () => clearTimeout(timer);
  }, [step, finished]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 left-4 z-40 max-w-xs animate-in slide-in-from-left duration-500">
      <div className="bg-card border border-border rounded-xl shadow-lg p-4 flex items-start gap-3">
        <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="min-w-0">
          {!finished || spotsLeft > 1 ? (
            <p className="text-sm font-semibold text-foreground">
              {currentName} acabou de assinar! 🎉
            </p>
          ) : null}
          <p className="text-xs text-muted-foreground mt-1">
            Resta{spotsLeft > 1 ? "m" : ""}{" "}
            <span className="font-bold text-destructive">
              {spotsLeft} vaga{spotsLeft > 1 ? "s" : ""}
            </span>{" "}
            com desconto
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialProofNotification;
