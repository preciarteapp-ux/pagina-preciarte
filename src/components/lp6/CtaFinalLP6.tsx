import { T, Reveal, CTAButton, SecondaryButton, ArcDecor } from './ui';

/**
 * DOBRA 10 — CTA final
 *
 * Fecha devolvendo a decisão para ela: a copy convida a fazer a conta e sair
 * se o número for pequeno. Os arcos espelham o hero e fecham o círculo visual.
 */
const CtaFinalLP6 = () => (
  <section className="relative overflow-hidden bg-lp6-ink py-[56px] lg:py-[140px]">
    <div
      className="absolute inset-0 lp6-glow"
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(194,24,91,0.20) 0%, transparent 65%)',
      }}
    />
    <ArcDecor radii={[500, 800]} color="rgba(255,255,255,0.06)" top="50%" left="50%" />

    <div className="relative max-w-lp6-prose mx-auto px-6 lg:px-10 text-center">
      <Reveal>
        <h2 className="font-lp6 font-bold text-[30px] lg:text-[52px] tracking-[-0.02em] leading-[1.08] uppercase text-white">
          O seu preço precisa ser seu
        </h2>

        <p className={`${T.body} text-white/[0.80] mt-6 max-w-[62ch] mx-auto`}>
          Todo pedido que você fecha antes de arrumar o preço{' '}
          <strong className="font-semibold text-white">trava um prejuízo por trinta dias</strong>.
        </p>
        <p className={`${T.body} text-white/[0.80] mt-4 max-w-[62ch] mx-auto`}>
          Faça a conta primeiro. Se a diferença entre o que você acha que sua hora vale e o que ela
          precisa valer for pequena, você não precisa de nada disso.
        </p>

        <p className="font-lp6 font-semibold italic text-[20px] lg:text-[26px] text-white mt-7 max-w-[34ch] mx-auto">
          Se ela for grande, você já sabe há bastante tempo. Só não tinha o número.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <CTAButton
            href="#planos"
            variant="dark"
            size="lg"
            external={false}
            trackId="lp6-cta-final-planos"
            className="w-full sm:w-auto"
          >
            VER OS PLANOS
          </CTAButton>
          <SecondaryButton
            href="#calculadora"
            variant="dark"
            external={false}
            trackId="lp6-cta-final-calculadora"
            className="w-full sm:w-auto"
          >
            FAZER O CÁLCULO ANTES
          </SecondaryButton>
        </div>

        <p className={`${T.small} text-white/[0.55] mt-5`}>
          7 dias de garantia. Sem fidelidade. Cancele quando quiser.
        </p>
      </Reveal>
    </div>
  </section>
);

export default CtaFinalLP6;
