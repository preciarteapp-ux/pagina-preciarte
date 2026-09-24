import { useEffect, useRef, useState, ReactNode } from 'react';

/* ────────────────────────────────────────────────────────────
   Telas vivas do produto — base

   Em vez de PNG estático, cada tela é um componente que anima:
   números contando, barra de margem mudando de cor, conversa
   entrando mensagem a mensagem.

   Regras de todas elas:
   · só animam quando entram na viewport (não queimam CPU fora dela)
   · em prefers-reduced-motion vão direto para o estado final
   · usam os tokens reais do app (rosa #D46A92, borda #F9E6EF),
     porque é o produto que a pessoa vai encontrar depois
   ──────────────────────────────────────────────────────────── */

export const APP = {
  rosa: '#D46A92',
  rosaClaro: '#F9E6EF',
  input: '#F1E5EC',
  texto: '#2D2D2D',
  suave: '#737373',
  verdeBg: '#F0FDF4',
  verdeBorda: '#BBF7D0',
  verdeTexto: '#166534',
  vermelho: '#EF4444',
  amarelo: '#CA8A04',
  verde: '#16A34A',
};

export const semMovimento = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Dispara quando o elemento entra em cena. Fica ativo enquanto visível. */
export function useEmCena<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [ativo, setAtivo] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setAtivo(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, ativo };
}

/**
 * Avança um índice de passo enquanto ativo, e reinicia no fim.
 * `pausaFinal` segura o último passo antes de recomeçar.
 */
export function useSequencia(total: number, ativo: boolean, intervalo = 850, pausaFinal = 2200) {
  const [passo, setPasso] = useState(0);
  useEffect(() => {
    if (!ativo) return;
    if (semMovimento()) { setPasso(total - 1); return; }
    let t: ReturnType<typeof setTimeout>;
    const proximo = (p: number) => {
      const ultimo = p >= total - 1;
      t = setTimeout(() => {
        const n = ultimo ? 0 : p + 1;
        setPasso(n);
        proximo(n);
      }, ultimo ? pausaFinal : intervalo);
    };
    proximo(passo);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ativo, total, intervalo, pausaFinal]);
  return passo;
}

/** Conta até `alvo` quando `ligado` vira true. Volta a zero quando desliga. */
export function useContador(alvo: number, ligado: boolean, duracao = 900) {
  const [valor, setValor] = useState(0);
  const raf = useRef<number>();
  useEffect(() => {
    if (!ligado) { setValor(0); return; }
    if (semMovimento()) { setValor(alvo); return; }
    const t0 = performance.now();
    const passo = (agora: number) => {
      const p = Math.min((agora - t0) / duracao, 1);
      setValor(alvo * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf.current = requestAnimationFrame(passo);
    };
    raf.current = requestAnimationFrame(passo);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [alvo, ligado, duracao]);
  return valor;
}

export const brl = (n: number) =>
  n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ── molduras ─────────────────────────────────────────────── */

/** Celular com a tela do app dentro. */
export function Celular({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[20px] border-0 lg:rounded-[42px] lg:border-[10px] border-[#1B1620] bg-[#1B1620] shadow-[0_50px_100px_-30px_rgba(212,175,55,0.30)] ${className}`}>
      <div className="relative rounded-[20px] lg:rounded-[32px] overflow-hidden bg-white font-lp7">
        {children}
      </div>
    </div>
  );
}

/** Barra de topo do app, igual ao Layout.tsx do sistema. */
export function BarraApp({ titulo }: { titulo: string }) {
  return (
    <div
      className="relative flex items-center justify-center h-[54px] pt-[6px] font-poppins font-semibold text-[15px]"
      style={{ color: APP.texto, borderBottom: `1px solid ${APP.rosaClaro}` }}
    >
      {titulo}
      <span className="absolute right-4 top-1/2 -translate-y-1/2 w-[24px] h-[24px] rounded-full" style={{ background: APP.rosaClaro }} />
    </div>
  );
}

/** Rótulo + caixa de campo do app (Input h-10 rounded-md). */
export function Campo({
  rotulo, valor, visivel, seta,
}: { rotulo: string; valor: string; visivel: boolean; seta?: boolean }) {
  return (
    <div className="mt-[10px]">
      <span className="block text-[12.5px] font-medium mb-[5px]" style={{ color: APP.texto }}>{rotulo}</span>
      <div
        className="flex items-center justify-between h-[38px] rounded-[10px] px-3 text-[15px] transition-colors duration-300"
        style={{ border: `1px solid ${visivel ? APP.rosaClaro : APP.input}`, color: visivel ? APP.texto : 'transparent' }}
      >
        <span className={`transition-opacity duration-300 ${visivel ? 'opacity-100' : 'opacity-0'}`}>{valor}</span>
        {seta && (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={APP.suave} strokeWidth="2" opacity=".5">
            <path d="m6 9 6 6 6-6" />
          </svg>
        )}
      </div>
    </div>
  );
}
