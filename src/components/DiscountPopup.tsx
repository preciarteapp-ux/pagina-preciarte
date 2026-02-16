import { useState, useEffect, useCallback } from "react";
import { CheckCircle, X, Sparkles, Clock } from "lucide-react";

interface DiscountPopupProps {
  onClaimDiscount: () => void;
}

const TIMER_DURATION = 5 * 60; // 5 minutes in seconds

const DiscountPopup = ({ onClaimDiscount }: DiscountPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);

  const formatTime = useCallback((seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }, []);

  useEffect(() => {
    const discountClaimed = sessionStorage.getItem("discountClaimed");
    if (discountClaimed) {
      const savedEnd = sessionStorage.getItem("discountEndTime");
      if (savedEnd) {
        const remaining = Math.max(0, Math.floor((Number(savedEnd) - Date.now()) / 1000));
        setTimeLeft(remaining);
      }
      setIsVisible(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
      sessionStorage.setItem("discountClaimed", "true");
      sessionStorage.setItem("discountEndTime", String(Date.now() + TIMER_DURATION * 1000));
      onClaimDiscount();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClaimDiscount]);

  useEffect(() => {
    if (!isVisible || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isVisible, timeLeft]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 animate-in slide-in-from-top duration-500">
      <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-3 px-4">
        <div className="container mx-auto flex items-center justify-center gap-3 relative">
          <CheckCircle className="w-5 h-5 shrink-0 hidden sm:block" />
          <p className="text-sm md:text-base font-semibold text-center">
            <Sparkles className="w-4 h-4 inline mr-1" />
            Cupom de desconto aplicado! Até 50% OFF
            <Sparkles className="w-4 h-4 inline ml-1" />
          </p>
          <span className="flex items-center gap-1 bg-primary-foreground/20 rounded-full px-3 py-1 text-sm font-bold shrink-0">
            <Clock className="w-4 h-4" />
            {timeLeft > 0 ? formatTime(timeLeft) : "Expirado!"}
          </span>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-0 p-1 rounded-sm hover:opacity-80 transition-opacity"
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
