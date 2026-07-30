import { useEffect, useRef, useState, ReactNode } from 'react';
import { Icon } from '@iconify/react';

/* ────────────────────────────────────────────────────────────
   LP6 — componentes base
   Ângulo: "Seu preço não é seu"
   Tipografia: Outfit (títulos) + DM Sans (corpo)
   Ícones: Iconify solar (nunca Lucide)

   Regra de contraste herdada da LP5 e revalidada aqui:
   rosa #C2185B sobre fundo escuro afunda. Em seção escura o
   CTA vira BRANCO com texto framboesa.
   ──────────────────────────────────────────────────────────── */

export const T = {
  h1: 'font-lp6 font-bold text-[34px] lg:text-[64px] tracking-[-0.02em] leading-[1.06]',
  h2: 'font-lp6 font-bold text-[27px] lg:text-[42px] tracking-[-0.02em] leading-[1.12]',
  h3: 'font-lp6 font-semibold text-[19px] lg:text-[24px] tracking-[-0.01em] leading-[1.3]',
  body: 'font-lp6body font-normal text-[16px] lg:text-[17px] leading-[1.7]',
  small: 'font-lp6body font-normal text-[14px] lg:text-[15px] leading-[1.6]',
  caption: 'font-lp6 font-semibold text-[11px] lg:text-[12px] tracking-[0.08em] uppercase leading-[1.2]',
  display: 'font-lp6 font-bold tracking-[-0.02em] leading-none',
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
      className={`transition-[opacity,transform] duration-[560ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ── CTA ──────────────────────────────────────────────────── */
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
    'inline-flex items-center justify-center gap-2 rounded-full font-lp6 font-semibold ' +
    'transition-all duration-[240ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] active:scale-[0.98] ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-lp6-600';
  const sizes =
    size === 'lg'
      ? 'h-[56px] lg:h-[60px] px-[30px] lg:px-[38px] text-[15px] lg:text-[17px]'
      : 'h-[52px] lg:h-[56px] px-[26px] lg:px-[34px] text-[14px] lg:text-[16px]';
  const skin =
    variant === 'dark'
      ? 'bg-white text-lp6-700 hover:bg-lp6-100 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.35)]'
      : 'bg-lp6-600 text-white hover:bg-lp6-700 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_-4px_rgba(194,24,91,0.42)] shadow-[0_4px_14px_-2px_rgba(194,24,91,0.30)]';

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
      ? 'border border-white/[0.32] text-white hover:bg-white/[0.10]'
      : 'border border-lp6-600 text-lp6-700 hover:bg-lp6-50';
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      data-track-id={trackId}
      data-track-type={trackId ? 'checkout' : undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-lp6 font-semibold
        h-[52px] lg:h-[56px] px-[26px] lg:px-[34px] text-[14px] lg:text-[16px] bg-transparent
        transition-all duration-[240ms] active:scale-[0.98]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-lp6-600
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
      ? 'border-white/25 bg-white/[0.10] text-lp6-300'
      : 'border-lp6-100 bg-lp6-50 text-lp6-700';
  return (
    <span className={`inline-flex items-center gap-[6px] h-[32px] px-[14px] rounded-full border ${skin} ${T.caption} ${className}`}>
      {icon && <Icon icon={icon} width={14} />}
      {children}
    </span>
  );
}

/* ── Círculo de ícone ─────────────────────────────────────── */
export function IconCircle({
  icon, variant = 'soft', size = 48, children,
}: { icon?: string; variant?: 'soft' | 'solid' | 'dark'; size?: number; children?: ReactNode }) {
  const skin = {
    soft: 'bg-lp6-100 text-lp6-600',
    solid: 'bg-lp6-600 text-white',
    dark: 'bg-white/10 text-lp6-300',
  }[variant];
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full ${skin}`}
      style={{ width: size, height: size }}
    >
      {icon ? <Icon icon={icon} width={size * 0.5} /> : <span className="font-lp6 font-bold text-[20px]">{children}</span>}
    </span>
  );
}

/* ── Chip de vidro — componente de assinatura da página ───────
   Transforma número em prova sem precisar de gráfico.
   O fallback @supports é obrigatório: sem ele, navegador sem
   backdrop-filter renderiza um retângulo opaco.
   ──────────────────────────────────────────────────────────── */
export function GlassChip({
  icon, label, value, tone = 'dark', className = '',
}: { icon: string; label: string; value: string; tone?: 'dark' | 'light'; className?: string }) {
  const isDark = tone === 'dark';
  return (
    <div
      className={`inline-flex items-center gap-3 rounded-full py-3 px-5 border backdrop-blur-[16px]
        ${isDark ? 'lp6-glass-dark border-white/25 text-white' : 'lp6-glass-light border-lp6-line text-lp6-text'}
        ${className}`}
    >
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-full w-[32px] h-[32px]
          ${isDark ? 'bg-white/15 text-lp6-300' : 'bg-lp6-100 text-lp6-600'}`}
      >
        <Icon icon={icon} width={16} />
      </span>
      <span className="text-left">
        <span className={`block font-lp6body text-[12px] leading-tight ${isDark ? 'text-white/70' : 'text-lp6-muted'}`}>
          {label}
        </span>
        <span className="block font-lp6 font-semibold text-[16px] lg:text-[17px] leading-tight">{value}</span>
      </span>
    </div>
  );
}

/* ── Arcos decorativos de fundo ───────────────────────────────
   Recurso herdado da referência: círculos concêntricos de
   baixíssimo contraste que dão profundidade sem competir.
   ──────────────────────────────────────────────────────────── */
export function ArcDecor({
  radii, color, top, left, spin = false,
}: { radii: number[]; color: string; top: string; left: string; spin?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${spin ? 'lp6-spin' : ''}`}
      style={{ top, left, transform: 'translate(-50%, -50%)' }}
    >
      {radii.map((r) => (
        <span
          key={r}
          className="absolute rounded-full border"
          style={{
            width: r * 2, height: r * 2, left: -r, top: -r, borderColor: color,
          }}
        />
      ))}
    </div>
  );
}

/* ── Placeholder nomeado de imagem ────────────────────────────
   As imagens entram por último. Até lá o slot mostra o nome
   exato do arquivo, para não haver dúvida na hora de trocar.
   ──────────────────────────────────────────────────────────── */
export function ImgSlot({
  name, ratio = 'aspect-[4/3]', tone = 'light', className = '', label, src, alt, priority,
}: {
  name: string; ratio?: string; tone?: 'light' | 'dark' | 'rose'; className?: string;
  label?: string; src?: string; alt?: string; priority?: boolean;
}) {
  // com src, vira a imagem de verdade; sem src, segue como placeholder nomeado
  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? name}
        {...(priority ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const, decoding: 'async' as const })}
        className={`block w-full h-full object-cover ${ratio} ${className}`}
      />
    );
  }

  const skin = {
    light: 'bg-lp6-100 border-lp6-300 text-lp6-muted',
    rose: 'bg-lp6-50 border-lp6-300 text-lp6-muted',
    dark: 'bg-white/[0.06] border-white/25 text-white/60',
  }[tone];
  return (
    <div
      className={`flex flex-col items-center justify-center gap-1 rounded-[16px] border-2 border-dashed text-center px-4 ${ratio} ${skin} ${className}`}
    >
      <Icon icon="solar:gallery-wide-outline" width={26} className="opacity-50" />
      <span className="font-lp6body text-[12px] lg:text-[13px] break-all leading-tight">{name}</span>
      {label && <span className="font-lp6body text-[11px] opacity-70 leading-tight">{label}</span>}
    </div>
  );
}
