import { useState, useEffect } from "react";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  { name: "Amanda R.", text: "Finalmente sei quanto cobrar sem medo de errar!" },
  { name: "Juliana S.", text: "Recuperei o investimento logo na primeira semana." },
  { name: "Camila M.", text: "Meus clientes agora recebem orçamento profissional." },
  { name: "Fernanda L.", text: "Parei de perder dinheiro em cada peça que vendia." },
  { name: "Larissa P.", text: "Super fácil de usar, até eu que não entendo de planilha." },
];

const SocialProofNotification = () => {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (finished) return;

    const showNext = () => {
      if (step >= TESTIMONIALS.length) {
        setFinished(true);
        return;
      }

      setCurrentIndex(step);
      setVisible(true);

      if (step === TESTIMONIALS.length - 1) {
        setFinished(true);
        return;
      }

      setTimeout(() => {
        setVisible(false);
      }, 5000);

      setStep((prev) => prev + 1);
    };

    const delay = step === 0 ? 8000 : 20000;
    const timer = setTimeout(showNext, delay);
    return () => clearTimeout(timer);
  }, [step, finished]);

  if (!visible) return null;

  const t = TESTIMONIALS[currentIndex];

  return (
    <div className="fixed bottom-20 left-4 z-40 max-w-xs animate-in slide-in-from-left duration-500">
      <div className="bg-card border border-border rounded-xl shadow-lg p-4 flex items-start gap-3">
        <div
          className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white"
          style={{ background: '#8B1A4A' }}
        >
          <Star className="w-5 h-5 fill-current" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">
            "{t.text}"
          </p>
          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-current" style={{ color: '#E07B2A' }} />
            ))}
            <span className="text-xs text-muted-foreground ml-1">— {t.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProofNotification;
