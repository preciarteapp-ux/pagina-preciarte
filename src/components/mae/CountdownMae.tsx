import { useEffect, useState } from "react";

const TARGET = new Date("2026-05-10T23:59:59-03:00").getTime();

const calc = () => {
  const diff = Math.max(0, TARGET - Date.now());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
};

const Box = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div
      className="min-w-[42px] sm:min-w-[68px] px-1.5 sm:px-2 py-1.5 sm:py-3 rounded-lg sm:rounded-xl text-center font-bold text-lg sm:text-3xl tabular-nums"
      style={{
        background: "linear-gradient(145deg, #fff8f0, #fdecef)",
        color: "#9a1f4a",
        boxShadow: "inset 0 0 0 1px rgba(212,175,55,0.55), 0 4px 14px rgba(212,175,55,0.25)",
      }}
    >
      {String(value).padStart(2, "0")}
    </div>
    <span className="text-[10px] sm:text-xs uppercase tracking-wider mt-1 text-white/90 font-medium">{label}</span>
  </div>
);

const CountdownMae = () => {
  const [t, setT] = useState(calc());
  useEffect(() => {
    const i = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div
      className="sticky top-0 z-40 w-full px-2 sm:px-3 py-1.5 sm:py-3"
      style={{
        background: "linear-gradient(90deg, #9a1f4a 0%, #c2185b 50%, #d4af37 100%)",
        boxShadow: "0 4px 18px rgba(154,31,74,0.35)",
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-5">
        <p className="text-white text-[11px] sm:text-sm md:text-base font-semibold text-center leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          🌹 Oferta Dia das Mães — encerra em:
        </p>
        <div className="flex gap-1.5 sm:gap-3">
          <Box value={t.d} label="Dias" />
          <Box value={t.h} label="Hrs" />
          <Box value={t.m} label="Min" />
          <Box value={t.s} label="Seg" />
        </div>
      </div>
    </div>
  );
};

export default CountdownMae;
