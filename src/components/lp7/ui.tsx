import { useEffect, useRef, useState, ReactNode } from 'react';
import { Icon } from '@iconify/react';

/* ────────────────────────────────────────────────────────────
   LP7 — componentes base

   Sistema visual extraído da estrutura de meuassessor.com:
   ritmo escuro → faixa preta → escuro → creme → escuro,
   cantos muito arredondados, chips em pílula, cards brancos
   sobre creme, acento em gradiente violeta→rosa.

   Cores, copy, funcionalidades e imagens são nossas. As
   animações Rive deles foram substituídas por CSS.
   Tipografia: Poppins  ·  Ícones: Iconify solar (nunca Lucide)
   ──────────────────────────────────────────────────────────── */

export const T = {
  h1: 'font-lp7 font-semibold text-[38px] lg:text-[62px] tracking-[-0.03em] leading-[1.06]',
  h2: 'font-lp7 font-semibold text-[29px] lg:text-[46px] tracking-[-0.025em] leading-[1.12]',
  h3: 'font-lp7 font-semibold text-[20px] lg:text-[26px] tracking-[-0.015em] leading-[1.25]',
  body: 'font-lp7 font-light text-[16px] lg:text-[18px] leading-[1.65]',
  small: 'font-lp7 font-light text-[14px] lg:text-[15px] leading-[1.6]',
  chip: 'font-lp7 font-medium text-[13px] lg:text-[14px]',
  cap: 'font-lp7 font-medium text-[11px] tracking-[0.14em] uppercase',
};

/* ── Reveal com stagger ───────────────────────────────────── */
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
    }, { threshold: 0.12, rootMargin: '0px 0px -70px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <Tag
      ref={ref as any}
      className={`transition-[opacity,transform] duration-[700ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
        on ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ── Texto com o gradiente da marca ───────────────────────── */
export function G({ children }: { children: ReactNode }) {
  return <span className="lp7-grad-text">{children}</span>;
}

/* ── Badge de seção (pílula com ponto ou ícone) ───────────── */
export function Badge({
  children, icon, tone = 'dark', className = '',
}: { children: ReactNode; icon?: string; tone?: 'dark' | 'light' | 'grad'; className?: string }) {
  const skin = {
    dark: 'border-white/15 bg-white/[0.06] text-white/85',
    light: 'border-lp7-text/10 bg-white text-lp7-text',
    grad: 'border-transparent bg-gradient-to-r from-lp7-violet to-lp7-pink text-white',
  }[tone];
  return (
    <span className={`inline-flex items-center gap-2 min-h-[34px] py-[7px] px-[16px] rounded-full border text-center ${skin} ${T.cap} ${className}`}>
      {icon ? <Icon icon={icon} width={14} /> : <span className="w-[6px] h-[6px] rounded-full bg-lp7-violet" />}
      {children}
    </span>
  );
}

/* ── Chip de checagem, usado nas listas da seção creme ────── */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-[10px] py-[9px] pl-[9px] pr-[16px] rounded-full bg-lp7-chip border border-lp7-text/[0.07] text-lp7-text ${T.chip}`}>
      <span className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-full bg-gradient-to-br from-lp7-violet to-lp7-pink text-white shrink-0">
        <Icon icon="solar:check-circle-bold" width={14} />
      </span>
      {children}
    </span>
  );
}

/* ── CTA ──────────────────────────────────────────────────── */
type BtnProps = {
  children: ReactNode; href: string; tone?: 'light' | 'dark';
  className?: string; trackId?: string; external?: boolean; size?: 'md' | 'lg';
};

export function CTAButton({
  children, href, tone = 'light', className = '', trackId, external = true, size = 'md',
}: BtnProps) {
  // sobre o escuro o botão é branco: o violeta do gradiente afunda no #0A070D
  const skin = tone === 'dark'
    ? 'bg-white text-lp7-text hover:bg-white/90'
    : 'bg-lp7-text text-white hover:bg-lp7-text/90';
  const sizes = size === 'lg'
    ? 'h-[56px] lg:h-[60px] px-[30px] lg:px-[38px] text-[15px] lg:text-[16px]'
    : 'h-[50px] lg:h-[54px] px-[26px] lg:px-[32px] text-[14px] lg:text-[15px]';
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      data-track-id={trackId}
      data-track-type={trackId ? 'checkout' : undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-lp7 font-medium
        transition-all duration-[260ms] active:scale-[0.98] hover:-translate-y-[2px]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-lp7-violet
        ${skin} ${sizes} ${className}`}
    >
      {children}
      <Icon icon="solar:arrow-right-linear" width={17} />
    </a>
  );
}

/* ── Brilho radial de fundo das seções escuras ────────────── */
export function Glow({
  x = '50%', y = '30%', size = 900, opacity = 0.5,
}: { x?: string; y?: string; size?: number; opacity?: number }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute lp7-glow"
      style={{
        left: x, top: y, width: size, height: size, transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, rgba(195,131,236,${opacity}) 0%, rgba(219,125,195,${opacity * 0.5}) 35%, transparent 68%)`,
        filter: 'blur(40px)',
      }}
    />
  );
}
