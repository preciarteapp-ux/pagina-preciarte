import { T, Reveal, G, CTAButton, Glow } from '../ui';
import { destinoCta, ehCheckout } from '../oferta';
import { buildCheckoutUrl } from '@/lib/checkout';

const CtaFaixa = () => (
  <section className="bg-bf-bone pb-[72px] lg:pb-[120px]">
    <div className="max-w-bf-narrow mx-auto px-5 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] bg-bf-ink px-7 py-12 lg:px-16 lg:py-20 text-center">
          <Glow x="50%" y="40%" size={760} opacity={0.28} />
          <div className="relative">
            <h2 className={`${T.h2} text-white max-w-[18ch] mx-auto`}>
              Você não precisa de mais um curso. <G>Precisa do número certo.</G>
            </h2>
            <p className={`${T.body} text-white/65 mt-5 max-w-[48ch] mx-auto`}>
              Uma tarde para cadastrar os seus principais produtos. Depois disso,
              cada orçamento sai em dois minutos e nenhum preço novo nasce errado —
              pelos próximos doze meses.
            </p>
            <div className="mt-8">
              <CTAButton
                href={ehCheckout() ? buildCheckoutUrl(destinoCta()) : '#planos'}
                tone="dark" size="lg" external={ehCheckout()}
                trackId="black1-cta-final" className="w-full sm:w-auto"
              >
                Quero resolver isso agora
              </CTAButton>
            </div>
            <p className={`${T.small} text-white/55 mt-5`}>
              Plano anual. 7 dias de garantia. Sem renovação automática surpresa.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default CtaFaixa;
