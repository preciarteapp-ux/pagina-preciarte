import { useEffect, useRef, useState, ReactNode } from 'react';
import { Icon } from '@iconify/react';

/* ────────────────────────────────────────────────────────────
   LP5 — componentes base
   Design system: escada rosa derivada da logo (#F66A93 = degrau 400)
   Tipografia: Outfit  ·  Ícones: Iconify solar (nunca Lucide)
   ──────────────────────────────────────────────────────────── */

export const T = {
  h1: 'font-lp5 font-extrabold text-[36px] lg:text-[64px] tracking-[-0.02em] leading-[1.05]',
  h2: 'font-lp5 font-bold text-[28px] lg:text-[48px] tracking-[-0.015em] leading-[1.1]',
  h3: 'font-lp5 font-semibold text-[20px] lg:text-[24px] tracking-[-0.01em] leading-[1.25]',
  body: 'font-lp5 font-normal text-[16px] lg:text-[18px] leading-[1.6]',
  small: 'font-lp5 font-normal text-[14px] lg:text-[15px] leading-[1.55]',
  caption: 'font-lp5 font-semibold text-[11px] lg:text-[12px] tracking-[0.08em] uppercase leading-[1.2]',
  number: 'font-lp5 font-extrabold text-[32px] lg:text-[44px] tracking-[-0.02em] leading-none',
};

/* ── Reveal ao entrar na viewport ─────────────────────────── */
export function Reveal({
  children, delay = 0, className = '', as: Tag = 'div',
}: { children: ReactNode; delay?: number; className?: string; as?: any }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          io.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <Tag
      ref={ref as any}
      className={`transition-[opacity,transform] duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ── Counter animado ──────────────────────────────────────── */
export function Counter({
  to, prefix = '', suffix = '', decimals = 0, className = '',
}: { to: number; prefix?: string; suffix?: string; decimals?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(to);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done.current) return;
      done.current = true;
      const start = performance.now();
      const dur = 1400;
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        setVal(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

/* ── CTA ──────────────────────────────────────────────────────
   REGRA CRÍTICA, baseada em contraste medido:
   rosa #CE2252 sobre fundo escuro dá 2,82:1 e o botão afunda.
   Em seção escura o CTA vira BRANCO com texto framboesa.
   ──────────────────────────────────────────────────────────── */
type CTAProps = {
  children: ReactNode;
  href: string;
  variant?: 'light' | 'dark';
  size?: 'md' | 'lg';
  className?: string;
  trackId?: string;
  external?: boolean;
};

export function CTAButton({
  children, href, variant = 'light', size = 'md', className = '', trackId, external = true,
}: CTAProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-lp5 font-semibold ' +
    'transition-all duration-[240ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] active:scale-[0.98] ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-lp5-600';
  const sizes =
    size === 'lg'
      ? 'h-[56px] lg:h-[60px] px-[32px] lg:px-[40px] text-[16px] lg:text-[17px]'
      : 'h-[52px] lg:h-[56px] px-[28px] lg:px-[36px] text-[15px] lg:text-[16px]';
  const skin =
    variant === 'dark'
      ? 'bg-white text-lp5-700 hover:bg-lp5-100 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.35)]'
      : 'bg-lp5-600 text-white hover:bg-lp5-700 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_-4px_rgba(206,34,82,0.42)] shadow-[0_4px_14px_-2px_rgba(206,34,82,0.32)]';

  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      data-track-id={trackId}
      data-track-type={trackId ? 'checkout' : undefined}
      className={`${base} ${sizes} ${skin} ${className}`}
    >
      {children}
      <Icon icon="solar:arrow-right-linear" width={16} />
    </a>
  );
}

export function SecondaryButton({
  children, href, variant = 'light', className = '', trackId, external = true,
}: CTAProps) {
  const skin =
    variant === 'dark'
      ? 'border border-white/[0.28] text-white hover:bg-white/[0.08]'
      : 'border border-lp5-700 text-lp5-700 hover:bg-lp5-50';
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      data-track-id={trackId}
      data-track-type={trackId ? 'checkout' : undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-lp5 font-semibold
        h-[52px] lg:h-[56px] px-[28px] lg:px-[36px] text-[15px] lg:text-[16px] bg-transparent
        transition-all duration-[240ms] active:scale-[0.98]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-lp5-600
        ${skin} ${className}`}
    >
      {children}
      <Icon icon="solar:arrow-right-linear" width={16} />
    </a>
  );
}

/* ── Badge de seção ───────────────────────────────────────── */
export function Badge({
  children, icon, variant = 'light', className = '',
}: { children: ReactNode; icon?: string; variant?: 'light' | 'dark'; className?: string }) {
  const skin =
    variant === 'dark'
      ? 'border-white/20 bg-white/[0.06] text-white'
      : 'border-lp5-200 bg-lp5-50 text-lp5-700';
  return (
    <span className={`inline-flex items-center gap-[6px] h-[32px] px-[14px] rounded-full border ${skin} ${T.caption} ${className}`}>
      {icon && <Icon icon={icon} width={14} />}
      {children}
    </span>
  );
}

/* ── Círculo de ícone ─────────────────────────────────────── */
export function IconCircle({
  icon, variant = 'solid', children,
}: { icon?: string; variant?: 'solid' | 'soft' | 'dark' | 'inverse'; children?: ReactNode }) {
  const skin = {
    solid: 'bg-lp5-700 text-white',
    soft: 'bg-lp5-100 text-lp5-700',
    dark: 'bg-white/10 text-lp5-400',
    inverse: 'bg-white text-lp5-700',
  }[variant];
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-full w-[48px] h-[48px] lg:w-[56px] lg:h-[56px] ${skin}`}>
      {icon ? <Icon icon={icon} width={24} /> : <span className="font-lp5 font-extrabold text-[20px]">{children}</span>}
    </span>
  );
}

/* ── Barra fixa de CTA — só mobile ────────────────────────────
   Aparece depois da dobra 02 e SOME quando a dobra de preço
   entra na viewport: dois CTAs concorrentes reduzem o clique.
   ──────────────────────────────────────────────────────────── */
export function FixedCTABar({ href }: { href: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const problema = document.getElementById('problema');
    const precos = document.getElementById('precos');
    if (!problema || !precos) return;

    let passouProblema = false;
    let emPrecos = false;
    const sync = () => setShow(passouProblema && !emPrecos);

    const io1 = new IntersectionObserver(([e]) => {
      passouProblema = e.boundingClientRect.top < 0;
      sync();
    }, { threshold: 0 });
    const io2 = new IntersectionObserver(([e]) => {
      emPrecos = e.isIntersecting;
      sync();
    }, { threshold: 0 });

    io1.observe(problema);
    io2.observe(precos);
    return () => { io1.disconnect(); io2.disconnect(); };
  }, []);

  return (
    <div
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 h-[64px] bg-white px-4 flex items-center
        shadow-[0_-4px_16px_rgba(33,31,28,0.10)] transition-transform duration-300
        ${show ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <CTAButton href={href} className="w-full" trackId="lp5-barra-fixa">
        QUERO SABER MEU PREÇO CERTO
      </CTAButton>
    </div>
  );
}
