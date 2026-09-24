import { useEffect, useRef, useState, ReactNode } from 'react';
import { Icon } from '@iconify/react';

/* ────────────────────────────────────────────────────────────
   BF — componentes base do Esquenta Black Friday

   Sistema visual extraído da estrutura de meuassessor.com:
   ritmo escuro → faixa preta → escuro → creme → escuro,
   cantos muito arredondados, chips em pílula, cards brancos
   sobre creme, acento em gradiente violeta→rosa.

   Cores, copy, funcionalidades e imagens são nossas. As
   animações Rive deles foram substituídas por CSS.
   Tipografia: Poppins  ·  Ícones: Iconify solar (nunca Lucide)
   ──────────────────────────────────────────────────────────── */

export const T = {
  // Sora nos titulos (700/800, que e o que esta carregado) e DM Sans no
  // corpo. Sora nao tem 400 na tag do index.html, entao nada de font-light.
  h1: 'font-bf font-extrabold text-[38px] lg:text-[62px] tracking-[-0.03em] leading-[1.06]',
  h2: 'font-bf font-bold text-[29px] lg:text-[46px] tracking-[-0.025em] leading-[1.12]',
  h3: 'font-bf font-bold text-[20px] lg:text-[26px] tracking-[-0.015em] leading-[1.25]',
  body: 'font-bfbody font-normal text-[16px] lg:text-[18px] leading-[1.65]',
  small: 'font-bfbody font-normal text-[14px] lg:text-[15px] leading-[1.6]',
  chip: 'font-bfbody font-medium text-[13px] lg:text-[14px]',
  cap: 'font-bf font-bold text-[11px] tracking-[0.14em] uppercase',
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
  return <span className="bf-grad-text">{children}</span>;
}

/* ── Badge de seção (pílula com ponto ou ícone) ───────────── */
export function Badge({
  children, icon, tone = 'dark', className = '',
}: { children: ReactNode; icon?: string; tone?: 'dark' | 'light' | 'grad'; className?: string }) {
  const skin = {
    dark: 'border-bf-gold/30 bg-bf-gold/[0.10] text-bf-goldlight',
    light: 'border-bf-text/10 bg-white text-bf-text',
    grad: 'border-transparent bg-gradient-to-r from-bf-gold to-bf-goldlight text-bf-ink',
  }[tone];
  return (
    <span className={`inline-flex items-center gap-2 min-h-[34px] py-[7px] px-[16px] rounded-full border text-center ${skin} ${T.cap} ${className}`}>
      {icon ? <Icon icon={icon} width={14} /> : <span className="w-[6px] h-[6px] rounded-full bg-bf-gold" />}
      {children}
    </span>
  );
}

/* ── Chip de checagem, usado nas listas da seção creme ────── */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-[10px] py-[9px] pl-[9px] pr-[16px] rounded-full bg-bf-chip border border-bf-text/[0.07] text-bf-text ${T.chip}`}>
      <span className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-full bg-gradient-to-br from-bf-gold to-bf-goldlight text-bf-ink shrink-0">
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
  // o rotulo do botao dourado e SEMPRE escuro: branco sobre #D4AF37 da
  // 2,1:1 e reprova; com o ink da 9,4:1.
  const skin = tone === 'dark'
    ? 'bg-bf-gold text-bf-ink hover:bg-bf-goldlight'
    : 'bg-bf-text text-white hover:bg-bf-text/90';
  const sizes = size === 'lg'
    ? 'h-[56px] lg:h-[60px] px-[30px] lg:px-[38px] text-[15px] lg:text-[16px]'
    : 'h-[50px] lg:h-[54px] px-[26px] lg:px-[32px] text-[14px] lg:text-[15px]';
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      data-track-id={trackId}
      data-track-type={trackId ? 'checkout' : undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-bf font-bold
        transition-all duration-[260ms] active:scale-[0.98] hover:-translate-y-[2px]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-bf-gold
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
      className="pointer-events-none absolute bf-glow"
      style={{
        left: x, top: y, width: size, height: size, transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, rgba(212,175,55,${opacity}) 0%, rgba(232,192,106,${opacity * 0.5}) 35%, transparent 68%)`,
        filter: 'blur(40px)',
      }}
    />
  );
}
