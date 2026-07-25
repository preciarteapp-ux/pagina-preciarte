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
      <div
        className="absolute inset-0 pointer-events-none lp5-glow"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 45%, rgba(246,106,147,0.20), transparent 70%)' }}
      />

      <div className="relative max-w-lp5-cta mx-auto px-5 lg:px-[120px] text-center">
        <Reveal>
          <img
            src="/lp5/logo-preciarte-simbolo-dark.png"
            alt="" aria-hidden="true" loading="lazy"
            className="w-12 lg:w-16 mx-auto"
          />

          <h2 className={`${T.h2} uppercase mt-6 text-white`}>
            Você já faz a parte difícil.
            <br />
            <span className="text-lp5-400">Falta só saber quanto ela vale.</span>
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
              <li key={s.texto} className={`${T.small} flex items-center justify-center gap-2 text-white/[0.65]`}>
                <Icon icon={s.icon} width={18} />
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
