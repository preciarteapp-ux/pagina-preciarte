import { useEffect, useRef, useState, ReactNode } from 'react';
import { Icon } from '@iconify/react';

/* ────────────────────────────────────────────────────────────
   AP — componentes da /apresentacao

   Pagina demonstrativa, nao de venda. A diferenca aparece aqui:
   nenhum componente grita. Nao tem brilho de fundo, nao tem
   gradiente no titulo, nao tem badge pulsando. O que chama
   atencao e o produto, nao a moldura dele.

   Tipografia: Poppins — a mesma fonte do app, de proposito,
   para a pagina e o sistema parecerem a mesma coisa.
   Icones: Iconify solar (nunca Lucide, igual ao resto do repo).
   ──────────────────────────────────────────────────────────── */

export const T = {
  h1: 'font-ap font-bold text-[33px] lg:text-[54px] tracking-[-0.028em] leading-[1.1]',
  h2: 'font-ap font-bold text-[26px] lg:text-[40px] tracking-[-0.022em] leading-[1.15]',
  h3: 'font-ap font-semibold text-[18px] lg:text-[22px] tracking-[-0.012em] leading-[1.3]',
  body: 'font-ap font-normal text-[16px] lg:text-[17px] leading-[1.68]',
  small: 'font-ap font-normal text-[14px] lg:text-[15px] leading-[1.6]',
  mini: 'font-ap font-normal text-[12.5px] lg:text-[13px] leading-[1.55]',
  cap: 'font-ap font-semibold text-[11px] tracking-[0.13em] uppercase',
};

/* ── Reveal ───────────────────────────────────────────────────
   Entra uma vez e para. Em prefers-reduced-motion aparece
   pronto, sem transicao nenhuma.
   ──────────────────────────────────────────────────────────── */
export function Reveal({
  children, delay = 0, className = '', as: Tag = 'div',
}: { children: ReactNode; delay?: number; className?: string; as?: any }) {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setOn(true), delay); io.unobserve(el); }
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <Tag
      ref={ref as any}
      className={`transition-[opacity,transform] duration-[620ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
        on ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Rosa no meio da frase. Cor cheia, nao gradiente: isto nao e oferta. */
export function R({ children }: { children: ReactNode }) {
  return <span className="text-ap-rosaforte">{children}</span>;
}

/* ── Rotulo de secao ──────────────────────────────────────── */
export function Rotulo({
  children, icon, className = '',
}: { children: ReactNode; icon?: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 min-h-[32px] py-[6px] px-[14px] rounded-full
        border border-ap-rosa/25 bg-ap-rosabg text-ap-rosaforte ${T.cap} ${className}`}
    >
      {icon ? <Icon icon={icon} width={14} /> : <span className="w-[5px] h-[5px] rounded-full bg-ap-rosa" />}
      {children}
    </span>
  );
}

/* ── Item de lista com check ──────────────────────────────── */
export function Item({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <li className={`flex items-start gap-[10px] ${T.small} text-ap-tinta ${className}`}>
      <Icon
        icon="solar:check-circle-bold"
        width={18}
        className="text-ap-rosa shrink-0 mt-[2px]"
      />
      <span>{children}</span>
    </li>
  );
}

/* ── Botao ────────────────────────────────────────────────────
   `tone="solido"` usa rosaforte, o unico rosa que aceita rotulo
   branco (5,78:1). O #D46A92 do app da 3,35:1 com branco e
   reprova — ele fica nas bordas e nos acentos, nunca aqui.
   ──────────────────────────────────────────────────────────── */
type BtnProps = {
  children: ReactNode;
  href: string;
  tone?: 'solido' | 'contorno';
  size?: 'md' | 'lg';
  className?: string;
  trackId?: string;
  /** Checkout mora em outro dominio, entao abre em aba nova. Ancora nao. */
  external?: boolean;
  seta?: boolean;
};

export function Botao({
  children, href, tone = 'solido', size = 'md',
  className = '', trackId, external = true, seta = true,
}: BtnProps) {
  const skin = tone === 'solido'
    ? 'bg-ap-rosaforte text-white hover:bg-[#8F3159]'
    : 'bg-white text-ap-tinta border border-ap-linha hover:border-ap-rosa/40 hover:bg-ap-creme';
  const sizes = size === 'lg'
    ? 'h-[54px] lg:h-[58px] px-[28px] lg:px-[34px] text-[15px] lg:text-[16px]'
    : 'h-[48px] lg:h-[50px] px-[22px] lg:px-[26px] text-[14px] lg:text-[15px]';
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      data-track-id={trackId}
      data-track-type={trackId ? 'checkout' : undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-ap font-semibold
        transition-all duration-[220ms] active:scale-[0.985] hover:-translate-y-[1px]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ap-rosaforte
        ${skin} ${sizes} ${className}`}
    >
      {children}
      {seta && <Icon icon="solar:arrow-right-linear" width={17} />}
    </a>
  );
}
