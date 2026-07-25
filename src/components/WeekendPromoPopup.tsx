import { useState, useEffect, useCallback } from "react";
import { X, Star, Flame, PartyPopper } from "lucide-react";
import { buildCheckoutUrl } from "@/lib/checkout";

const STORAGE_KEY = "weekendPromoDismissed";
const ANNUAL_LINK = "https://lastlink.com/p/CBB8498E8/checkout-payment/";

// próximo domingo 23:59:59 horário Brasília (UTC-3)
const getEndTime = () => {
  const now = new Date();
  // Brasília offset em minutos vs UTC = -180
  const brtNow = new Date(now.getTime() + (now.getTimezoneOffset() - 180) * 60000);
  const daysUntilSunday = (7 - brtNow.getDay()) % 7; // domingo = 0
  const end = new Date(brtNow);
  end.setDate(brtNow.getDate() + (daysUntilSunday === 0 && brtNow.getHours() >= 24 ? 7 : daysUntilSunday));
  end.setHours(23, 59, 59, 999);
  // volta para UTC real
  return end.getTime() - (now.getTimezoneOffset() - 180) * 60000;
};

const WeekendPromoPopup = () => {
  const [visible, setVisible] = useState(false);
  const [endTime] = useState(getEndTime);
  const [remaining, setRemaining] = useState(endTime - Date.now());

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const i = setInterval(() => setRemaining(endTime - Date.now()), 1000);
    return () => clearInterval(i);
  }, [visible, endTime]);

  const close = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }, []);

  if (!visible) return null;

  const r = Math.max(0, remaining);
  const days = Math.floor(r / 86400000);
  const hours = Math.floor((r / 3600000) % 24);
  const mins = Math.floor((r / 60000) % 60);
  const secs = Math.floor((r / 1000) % 60);
  const pad = (n: number) => n.toString().padStart(2, "0");

  const FlipUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-[#1a1a1a] text-white rounded-lg px-2.5 py-2 min-w-[52px] text-center">
        <div className="text-2xl font-bold leading-none tabular-nums">{pad(value)}</div>
        <div className="text-[9px] mt-1 opacity-70 tracking-wider">{label}</div>
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={close}
    >
      <div
        className="relative w-full max-w-[400px] bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header rosa */}
        <div className="relative bg-gradient-to-b from-[#E85A73] to-[#D94861] px-6 pt-6 pb-10 text-center">
          <button
            onClick={close}
            aria-label="Fechar"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="inline-flex items-center gap-1.5 bg-white/25 text-white text-[11px] font-bold px-3 py-1.5 rounded-full">
            <Flame className="w-3.5 h-3.5" />
            PROMOÇÃO · SÓ ATÉ DOMINGO
          </div>
          <h2 className="text-white text-xl sm:text-2xl font-bold mt-3 leading-tight">
            Plano anual com<br />desconto especial
          </h2>
          <svg className="absolute bottom-[-1px] left-0 w-full" viewBox="0 0 400 20" preserveAspectRatio="none">
            <path d="M0,20 Q200,0 400,20 Z" fill="white" />
          </svg>
        </div>

        <div className="px-5 pt-2 pb-5 -mt-3">
          {/* Card Anual */}
          <div className="relative border-2 border-[#E85A73] rounded-2xl p-4 pt-6 bg-[#FFF5F7]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E85A73] text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
              <Star className="w-3 h-3 fill-white" /> MAIS ESCOLHIDO
            </div>
            <div className="text-center">
              <div className="text-[11px] font-bold tracking-widest text-[#E85A73]">PLANO ANUAL</div>
              <div className="text-sm text-gray-400 line-through mt-1">De R$ 119,90/ano</div>
              <div className="mt-1 flex items-baseline justify-center gap-0.5">
                <span className="text-2xl font-bold">R$</span>
                <span className="text-5xl font-extrabold leading-none">99</span>
                <span className="text-2xl font-bold">,90</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">por ano · ou 12x de R$ 9,32</div>
              <div className="inline-flex items-center gap-1 bg-[#E85A73] text-white text-xs font-bold px-3 py-1.5 rounded-full mt-3">
                <PartyPopper className="w-3.5 h-3.5" /> Economize R$ 20,00
              </div>
            </div>
          </div>

          {/* Card Mensal */}
          <div className="mt-3 bg-gray-100 rounded-2xl p-3 text-center">
            <div className="text-[11px] font-bold tracking-widest text-gray-600">PLANO MENSAL</div>
            <div className="text-xl font-bold text-gray-800 mt-1">
              R$ 29<span className="text-base">,90/mês</span>
            </div>
            <div className="text-[11px] text-gray-500">cancele quando quiser</div>
          </div>

          {/* Countdown */}
          <div className="mt-4 text-center">
            <div className="text-xs text-gray-600 mb-2 flex items-center justify-center gap-1">
              <span>⏰</span> Oferta encerra em
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FlipUnit value={days} label="DIAS" />
              <span className="text-[#1a1a1a] font-bold text-xl pb-4">:</span>
              <FlipUnit value={hours} label="HORAS" />
              <span className="text-[#1a1a1a] font-bold text-xl pb-4">:</span>
              <FlipUnit value={mins} label="MIN" />
              <span className="text-[#1a1a1a] font-bold text-xl pb-4">:</span>
              <FlipUnit value={secs} label="SEG" />
            </div>
          </div>

          {/* Bullets */}
          <div className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-gray-700">
            <span>✓ Acesso imediato</span>
            <span>✓ Cancele quando quiser</span>
            <span>✓ Tudo incluso</span>
          </div>

          {/* CTA */}
          <a
            href={buildCheckoutUrl(ANNUAL_LINK)}
            className="mt-4 block w-full bg-gradient-to-r from-[#E85A73] to-[#D94861] hover:from-[#D94861] hover:to-[#C33A54] text-white text-center font-bold py-4 rounded-full shadow-lg shadow-[#E85A73]/30 transition"
          >
            → Quero garantir agora
          </a>
          <button
            onClick={close}
            className="mt-3 w-full text-center text-xs text-gray-500 underline hover:text-gray-700"
          >
            Não, prefiro pagar mais depois
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeekendPromoPopup;
