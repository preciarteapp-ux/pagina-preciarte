import { useState, useEffect, useCallback } from "react";
import { CheckCircle, X, Sparkles, Clock } from "lucide-react";
import { onDiscountClaim } from "@/lib/promoModal";

interface DiscountPopupProps {
  onClaimDiscount: () => void;
  gradientStyle?: string;
}

const TIMER_DURATION = 5 * 60; // 5 minutes in seconds

/**
 * Banner de confirmação do desconto.
 *
 * Só aparece quando a pessoa resgata a oferta no popup promocional — nunca
 * sozinho. Ao acabar o tempo ele some, em vez de ficar na tela anunciando um
 * cupom "Expirado!" logo abaixo de "desconto aplicado".
 */
const DiscountPopup = ({ onClaimDiscount, gradientStyle }: DiscountPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [endsAt, setEndsAt] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);

  const formatTime = useCallback((seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }, []);

  useEffect(() => {
    // Já resgatou nesta sessão? Volta a mostrar apenas se ainda houver tempo.
    if (sessionStorage.getItem("discountClaimed")) {
      const savedEnd = Number(sessionStorage.getItem("discountEndTime")) || 0;
      if (savedEnd > Date.now()) {
        setEndsAt(savedEnd);
        setIsVisible(true);
      }
      return;
    }

    return onDiscountClaim(() => {
      const end = Date.now() + TIMER_DURATION * 1000;
      setEndsAt(end);
      setIsVisible(true);
      sessionStorage.setItem("discountClaimed", "true");
      sessionStorage.setItem("discountEndTime", String(end));
      onClaimDiscount();
    });
  }, [onClaimDiscount]);

  /**
   * Conta a partir do horário de término, não de tique em tique: o celular
   * suspende timers com a aba em segundo plano, e um contador decremental
   * voltaria atrasado — anunciando tempo que já passou.
   */
  useEffect(() => {
    if (!endsAt) return;
    const tick = () => {
      const left = Math.ceil((endsAt - Date.now()) / 1000);
      if (left <= 0) {
        setTimeLeft(0);
        setIsVisible(false);
        return;
      }
      setTimeLeft(left);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [endsAt]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 animate-in slide-in-from-top duration-500">
      <div
        className="text-white py-2.5 px-3"
        style={{ background: gradientStyle || 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))' }}
      >
        <div className="container mx-auto flex items-center justify-center gap-2 relative pr-7">
          <CheckCircle className="w-5 h-5 shrink-0 hidden sm:block" />
          <p className="text-sm md:text-base font-semibold text-center">
            <Sparkles className="w-4 h-4 inline mr-1" />
            Desconto aplicado!
          </p>
          <span className="flex items-center gap-1 bg-primary-foreground/20 rounded-full px-2.5 py-1 text-sm font-bold shrink-0 tabular-nums">
            <Clock className="w-4 h-4" />
            {formatTime(timeLeft)}
          </span>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-0 w-7 h-7 flex items-center justify-center rounded-sm hover:opacity-80 transition-opacity"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountPopup;
