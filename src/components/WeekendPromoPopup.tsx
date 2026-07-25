import { useState, useEffect, useCallback } from "react";
import { X, Star, Flame, PartyPopper } from "lucide-react";
import { setPromoModalOpen, claimDiscount } from "@/lib/promoModal";

const STORAGE_KEY = "weekendPromoDismissed";
const OPEN_DELAY = 2500;

/**
 * Domingo 23:59:59 no horário de Brasília (UTC-3), independente do fuso do
 * aparelho. Desloca o relógio local para BRT, acha o domingo e desfaz o
 * deslocamento para voltar ao instante real em UTC.
 */
const getEndTime = () => {
  const now = new Date();
  const shift = (now.getTimezoneOffset() - 180) * 60000;
  const brtNow = new Date(now.getTime() + shift);
  const daysUntilSunday = (7 - brtNow.getDay()) % 7; // domingo = 0 → termina hoje
  const end = new Date(brtNow);
  end.setDate(brtNow.getDate() + daysUntilSunday);
  end.setHours(23, 59, 59, 999);
  return end.getTime() - shift;
};

const WeekendPromoPopup = () => {
  const [visible, setVisible] = useState(false);
  const [endTime, setEndTime] = useState(getEndTime);
  const [remaining, setRemaining] = useState(() => endTime - Date.now());

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setVisible(true), OPEN_DELAY);
    return () => clearTimeout(t);
  }, []);

  // Tick do contador. Ao zerar, abre o próximo ciclo em vez de travar em 00:00.
  useEffect(() => {
    if (!visible) return;
    const i = setInterval(() => {
      const left = endTime - Date.now();
      if (left <= 0) {
        setEndTime(getEndTime());
        return;
      }
      setRemaining(left);
    }, 1000);
    return () => clearInterval(i);
  }, [visible, endTime]);

  useEffect(() => setRemaining(endTime - Date.now()), [endTime]);

  // Avisa o banner de desconto para ele não abrir por baixo deste modal
  useEffect(() => {
    if (!visible) return;
    setPromoModalOpen(true);
    return () => setPromoModalOpen(false);
  }, [visible]);

  // Trava o scroll do fundo enquanto o modal está aberto (no celular, rolar a
  // página atrás do overlay é o jeito mais rápido de perder o usuário)
  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  const close = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }, []);

  /**
   * Aceitar a oferta não tira a pessoa do lugar: o modal some, a página fica
   * exatamente onde ela parou de ler e o banner do topo confirma o desconto.
   * Ela compra quando chegar nos planos por conta própria, tendo visto a
   * página inteira.
   */
  const handleClaim = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
    claimDiscount();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, close]);

  if (!visible) return null;

  const r = Math.max(0, remaining);
  const days = Math.floor(r / 86400000);
  const hours = Math.floor((r / 3600000) % 24);
  const mins = Math.floor((r / 60000) % 60);
  const secs = Math.floor((r / 1000) % 60);
  const pad = (n: number) => n.toString().padStart(2, "0");

  const FlipUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="bg-[#1a1a1a] text-white rounded-lg px-2 py-1.5 min-w-[46px] text-center">
      <div className="text-xl font-bold leading-none tabular-nums">{pad(value)}</div>
      <div className="text-[9px] mt-0.5 opacity-70 tracking-wider">{label}</div>
    </div>
  );

  const Colon = () => <span className="text-[#1a1a1a] font-bold text-lg pb-4">:</span>;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-labelledby="weekend-promo-title"
    >
      <div
        className="relative flex flex-col w-full max-w-[400px] max-h-[92dvh] bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header rosa — fixo no topo */}
        <div className="relative shrink-0 bg-gradient-to-b from-[#E85A73] to-[#D94861] px-6 pt-4 pb-8 text-center">
          <button
            onClick={close}
            aria-label="Fechar"
            className="absolute top-2 right-2 w-11 h-11 rounded-full flex items-center justify-center text-white/90 active:bg-white/30 transition"
          >
            <span className="w-8 h-8 rounded-full bg-white/25 flex items-center justify-center">
              <X className="w-4 h-4" />
            </span>
          </button>
          <div className="inline-flex items-center gap-1.5 bg-white/25 text-white text-[11px] font-bold px-3 py-1.5 rounded-full">
            <Flame className="w-3.5 h-3.5" />
            PROMOÇÃO · SÓ ATÉ DOMINGO
          </div>
          <h2
            id="weekend-promo-title"
            className="text-white text-lg sm:text-2xl font-bold mt-2 leading-tight"
          >
            Plano anual com<br />desconto especial
          </h2>
          <svg className="absolute bottom-[-1px] left-0 w-full" viewBox="0 0 400 20" preserveAspectRatio="none">
            <path d="M0,20 Q200,0 400,20 Z" fill="white" />
          </svg>
        </div>

        {/* Miolo — a única parte que rola */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 pt-1 pb-2 -mt-3">
          {/* Card Anual */}
          <div className="relative border-2 border-[#E85A73] rounded-2xl p-3.5 pt-5 bg-[#FFF5F7]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E85A73] text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
              <Star className="w-3 h-3 fill-white" /> MAIS ESCOLHIDO
            </div>
            <div className="text-center">
              <div className="text-[11px] font-bold tracking-widest text-[#E85A73]">PLANO ANUAL</div>
              <div className="text-xs text-gray-400 line-through mt-0.5">De R$ 119,90/ano</div>
              <div className="mt-0.5 flex items-baseline justify-center gap-0.5">
                <span className="text-xl sm:text-2xl font-bold">R$</span>
                <span className="text-[44px] sm:text-5xl font-extrabold leading-none">99</span>
                <span className="text-xl sm:text-2xl font-bold">,90</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">por ano · ou 12x de R$ 10,64</div>
              <div className="inline-flex items-center gap-1 bg-[#E85A73] text-white text-xs font-bold px-3 py-1 rounded-full mt-2">
                <PartyPopper className="w-3.5 h-3.5" /> Economize R$ 20,00
              </div>
            </div>
          </div>

          {/* Card Mensal */}
          <div className="mt-2.5 bg-gray-100 rounded-2xl p-2.5 text-center">
            <div className="text-[11px] font-bold tracking-widest text-gray-600">PLANO MENSAL</div>
            <div className="text-lg font-bold text-gray-800">
              R$ 29<span className="text-sm">,90/mês</span>
            </div>
          </div>

          {/* Countdown — some com "DIAS" quando zera, para caber em telas de 320px */}
          <div className="mt-3 text-center">
            <div className="text-xs text-gray-600 mb-1.5 flex items-center justify-center gap-1">
              <span>⏰</span> Oferta encerra em
            </div>
            <div className="flex items-center justify-center gap-1">
              {days > 0 && (
                <>
                  <FlipUnit value={days} label="DIAS" />
                  <Colon />
                </>
              )}
              <FlipUnit value={hours} label="HORAS" />
              <Colon />
              <FlipUnit value={mins} label="MIN" />
              <Colon />
              <FlipUnit value={secs} label="SEG" />
            </div>
          </div>

          {/* Bullets */}
          <div className="mt-2 flex flex-wrap justify-center gap-x-2.5 text-[11px] text-gray-700">
            <span>✓ Acesso imediato</span>
            <span>✓ Cancele quando quiser</span>
            <span>✓ Tudo incluso</span>
          </div>
        </div>

        {/* CTA — sempre visível, mesmo com o miolo rolado */}
        <div className="shrink-0 px-5 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))] bg-white border-t border-gray-100">
          <button
            type="button"
            onClick={handleClaim}
            data-track-id="weekend-promo-claim"
            data-track-type="cta"
            className="block w-full bg-gradient-to-r from-[#E85A73] to-[#D94861] active:from-[#D94861] active:to-[#C33A54] text-white text-center font-bold py-3.5 rounded-full shadow-lg shadow-[#E85A73]/30 transition"
          >
            → Quero garantir agora
          </button>
          <button
            onClick={close}
            className="mt-1.5 w-full text-center text-xs text-gray-500 underline py-1.5"
          >
            Não, prefiro pagar mais depois
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeekendPromoPopup;
