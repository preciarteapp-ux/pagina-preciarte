import { Icon } from '@iconify/react';
import { T, Reveal, CTAButton } from './ui';

const SELOS = [
  { icon: 'solar:shield-check-linear', texto: '7 dias de garantia incondicional' },
  { icon: 'solar:refresh-linear', texto: 'Cancele quando quiser' },
  { icon: 'solar:chat-round-linear', texto: 'Suporte por WhatsApp' },
];

export default function CtaFinalLP5() {
  return (
    <section id="cta-final" className="relative overflow-hidden bg-lp5n-900 py-[72px] lg:py-[140px]">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(110% 80% at 50% 100%, #2E1520 0%, #211F1C 55%, #16150F 100%)' }} />
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-[420px] w-[1300px] h-[1300px] rounded-full border border-white/[0.05] pointer-events-none" />
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-[280px] w-[900px] h-[900px] rounded-full border border-white/[0.045] pointer-events-none" />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/4 w-[820px] h-[440px] pointer-events-none lp5-glow"
           style={{ background: 'radial-gradient(closest-side, rgba(246,106,147,0.34), transparent 72%)', filter: 'blur(26px)' }} />

      <div className="relative max-w-lp5-cta mx-auto px-5 lg:px-[120px] text-center">
        <Reveal>
          <span className="relative inline-flex mx-auto">
            <span className="absolute inset-0 rounded-[38%] blur-[40px] opacity-80"
                  style={{ background: 'radial-gradient(circle, #F66A93 0%, rgba(206,34,82,0.5) 45%, transparent 72%)' }} />
            <span className="relative w-[76px] h-[76px] lg:w-[88px] lg:h-[88px] rounded-[26px] flex items-center justify-center lp5-float"
                  style={{
                    background: 'linear-gradient(150deg, rgba(255,255,255,0.20), rgba(255,255,255,0.05) 50%, rgba(246,106,147,0.14))',
                    border: '1px solid rgba(255,255,255,0.20)',
                    boxShadow: '0 24px 60px -20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.30)',
                  }}>
              <img src="/lp5/logo-preciarte-simbolo-dark.png" alt="" aria-hidden="true" loading="lazy" className="w-[42px] lg:w-[50px]" />
            </span>
          </span>

          <h2 className={`${T.h2} uppercase mt-6 text-white`}>
            Você já faz a parte difícil.
            <br />
            <span className="text-lp5-400" style={{ textShadow: '0 0 40px rgba(246,106,147,0.5)' }}>Falta só saber quanto ela vale.</span>
          </h2>

          <div className={`${T.body} text-white/[0.82] max-w-[65ch] mx-auto mt-5 space-y-3`}>
            <p>
              Você já tem o produto, o talento e os clientes. O que falta é o número por trás —{' '}
              <strong className="font-semibold text-white">
                o que cada peça custa de verdade e o que ela precisa custar pra você lucrar
              </strong>.
            </p>
            <p>O PreciArte faz essa conta. E te dá o orçamento pronto pra mandar hoje mesmo.</p>
          </div>

          <div className="mt-9 flex justify-center">
            <CTAButton href="#precos" external={false} variant="dark" size="lg" className="hover:scale-[1.02]" trackId="lp5-cta-final">
              QUERO SABER MEU PREÇO CERTO
            </CTAButton>
          </div>

          <ul className="mt-8 flex flex-col lg:flex-row lg:justify-center gap-3 lg:gap-8">
            {SELOS.map((s) => (
              <li key={s.texto}
                  className={`${T.small} flex items-center justify-center gap-2 text-white/[0.72] rounded-full px-4 py-2.5`}
                  style={{ border: '1px solid rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.05)' }}>
                <Icon icon={s.icon} width={18} className="shrink-0" />
                {s.texto}
              </li>
            ))}
          </ul>

          <p className={`${T.small} text-white/50 mt-6`}>
            Ficou com dúvida?{' '}
            <a
              href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer"
              data-track-id="lp5-cta-final-whatsapp"
              className="inline-flex items-center min-h-[44px] text-lp5-200 underline underline-offset-4"
            >
              Fala com a gente pelo WhatsApp.
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
