import { useState, useEffect, useCallback, useRef } from "react";
import { Check, X, Clock } from "lucide-react";
import { onDiscountClaim } from "@/lib/promoModal";

interface DiscountPopupProps {
  onClaimDiscount: () => void;
  /** Cor de destaque da barra de progresso, para páginas com paleta própria. */
  gradientStyle?: string;
}

const TIMER_DURATION = 5 * 60; // 5 minutes in seconds

/**
 * Barra de confirmação do desconto.
 *
 * Só aparece quando a pessoa resgata a oferta no popup promocional — nunca
 * sozinha. Ao acabar o tempo ela some, em vez de ficar na tela anunciando um
 * cupom vencido.
 */
const DiscountPopup = ({ onClaimDiscount, gradientStyle }: DiscountPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [endsAt, setEndsAt] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const barRef = useRef<HTMLDivElement>(null);

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

  /**
   * Empurra a página para baixo pela altura real da barra. Como ela é fixa e
   * só existe depois do resgate, reservar o espaço no CSS da página deixaria
   * uma faixa vazia no topo o resto do tempo.
   */
  useEffect(() => {
    if (!isVisible) return;
    const altura = barRef.current?.offsetHeight ?? 0;
    const anterior = document.body.style.paddingTop;
    document.body.style.paddingTop = `${altura}px`;
    return () => {
      document.body.style.paddingTop = anterior;
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const restante = Math.max(0, Math.min(100, (timeLeft / TIMER_DURATION) * 100));

  return (
    <div
      ref={barRef}
      className="fixed top-0 inset-x-0 z-50 animate-in slide-in-from-top duration-500"
    >
      <div className="bg-[#14141B]/95 backdrop-blur-md text-white shadow-lg shadow-black/25">
        <div className="mx-auto max-w-2xl flex items-center gap-2.5 px-3 py-2.5">
          <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/30 flex items-center justify-center">
            <Check className="w-3.5 h-3.5 text-emerald-400" strokeWidth={3} />
          </span>

          <p className="flex-1 min-w-0 text-sm font-semibold tracking-tight truncate">
            Desconto aplicado
          </p>

          <span className="shrink-0 flex items-center gap-1.5 rounded-full bg-white/10 ring-1 ring-white/15 px-2.5 py-1">
            <Clock className="w-3.5 h-3.5 text-white/60" />
            <span className="text-sm font-bold tabular-nums">{formatTime(timeLeft)}</span>
          </span>

          <button
            onClick={() => setIsVisible(false)}
            aria-label="Fechar"
            className="shrink-0 w-7 h-7 -mr-1 rounded-full flex items-center justify-center text-white/50 hover:text-white/90 active:bg-white/10 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* tempo escoando */}
        <div className="h-[3px] bg-white/10">
          <div
            className="h-full transition-[width] duration-1000 ease-linear"
            style={{
              width: `${restante}%`,
              background: gradientStyle || "linear-gradient(to right, #E85A73, #F2A65A)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DiscountPopup;
