import { useEffect, useRef } from 'react';
import { T, Reveal, G, Badge, CTAButton, Glow } from '../ui';
import { PRECO_VISTA, destinoCta, ehCheckout } from '../oferta';
import { buildCheckoutUrl } from '@/lib/checkout';

/**
 * Hero da /black1 — ângulo da decisão adiada.
 *
 * Deliberadamente diferente do da /black (que ataca pela aritmética),
 * para o teste A/B ensinar algo sobre argumento e não só sobre layout.
 *
 * A VSL é o mesmo player da LP1, inclusive repassando a query string —
 * é assim que o ConverteAI recebe as UTMs.
 */
const Hero = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const src = 'https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js';
    if (!document.querySelector(`script[src="${src}"]`)) {
      const s = document.createElement('script');
      s.src = src; s.async = true;
      document.head.appendChild(s);
    }
    if (iframeRef.current) {
      iframeRef.current.src =
        `https://scripts.converteai.net/f04f0c1f-d8c5-4ccf-aa51-6f81483a882e/players/696bebcc521058214ca6e141/v4/embed.html${window.location.search || '?'}&vl=${encodeURIComponent(window.location.href)}`;
    }
  }, []);

  return (
    <section className="relative overflow-hidden bg-bf-ink">
      <Glow x="76%" y="16%" size={900} opacity={0.26} />
      <Glow x="12%" y="64%" size={640} opacity={0.14} />

      <div className="relative max-w-bf-container mx-auto px-5 lg:px-8 pt-6 pb-16 lg:pb-24">
        <nav className="flex items-center justify-between h-[62px] rounded-full border border-bf-gold/20 bg-bf-gold/[0.04] backdrop-blur-md px-5 lg:px-6">
          <span className="font-bf font-extrabold text-[18px] text-white">PreciArte</span>
          <CTAButton href="#planos" tone="dark" external={false} trackId="black1-nav" className="!h-[40px] !px-5 !text-[13px]">
            Ver a oferta
          </CTAButton>
        </nav>

        <div className="text-center max-w-[760px] mx-auto mt-14 lg:mt-20">
          <Reveal>
            <Badge icon="solar:fire-bold">Esquenta Black Friday</Badge>
          </Reveal>

          <Reveal delay={90}>
            <h1 className={`${T.h1} text-white mt-6`}>
              Todo ano você adia essa conta. <G>Este ano ela custa {PRECO_VISTA}.</G>
            </h1>
          </Reveal>

          <Reveal delay={170}>
            <p className={`${T.body} text-white/65 mt-6 max-w-[56ch] mx-auto`}>
              Não é sobre a Black Friday. É que o preço que você cobra hoje veio de um chute —
              provavelmente do Instagram de alguém que também chutou. E o instrumento para
              corrigir isso está mais barato do que vai ficar.
            </p>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-9">
              <CTAButton
                href={ehCheckout() ? buildCheckoutUrl(destinoCta()) : '#planos'}
                tone="dark" size="lg" external={ehCheckout()}
                trackId="black1-hero" className="w-full sm:w-auto"
              >
                Quero resolver isso agora
              </CTAButton>
              <p className={`${T.small} text-white/60 mt-4`}>
                Plano anual · 7 dias de garantia · uma tarde para cadastrar
              </p>
            </div>
          </Reveal>

          <Reveal delay={330}>
            <div className="relative mt-12 rounded-[20px] overflow-hidden border border-bf-line bg-bf-surface aspect-video">
              <iframe
                ref={iframeRef}
                title="PreciArte"
                allow="autoplay; fullscreen"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;
