import { T, Reveal, CTAButton, Glow, G } from '../ui';
import { destinoCta, ehCheckout } from '../oferta';
import { buildCheckoutUrl } from '@/lib/checkout';
import { Celular } from '../telas/base';
import TelaMargem from '../telas/TelaMargem';

/**
 * DOBRA 6 — Faixa escura de fechamento
 *
 * Na referência é um bloco escuro arredondado dentro da seção creme,
 * com a pessoa recortada de um lado. Aqui a mesma moldura, com a tela
 * do produto no lugar da foto, que é o que temos de verdade.
 */
const CtaFinal = () => (
  <section className="bg-bf-bone pb-[72px] lg:pb-[130px]">
    <div className="max-w-bf-container mx-auto px-5 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] bg-bf-ink px-7 py-12 lg:px-16 lg:py-20">
          <Glow x="82%" y="50%" size={760} opacity={0.26} />

          <div className="relative grid lg:grid-cols-[1fr_320px] gap-10 items-center">
            <div className="text-center lg:text-left">
              <h2 className={`${T.h2} text-white max-w-[16ch] mx-auto lg:mx-0`}>
Você não precisa de mais um curso. <G>Precisa do número certo.</G>
              </h2>
              <p className={`${T.body} text-white/65 mt-5 max-w-[46ch] mx-auto lg:mx-0`}>
                Uma tarde para cadastrar os seus principais produtos. Depois disso, cada orçamento
                sai em dois minutos e nenhum preço novo nasce errado — pelos próximos doze meses.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center lg:items-start gap-3 justify-center lg:justify-start">
                <CTAButton
                  href={ehCheckout() ? buildCheckoutUrl(destinoCta()) : '#planos'}
                  tone="dark" size="lg" external={ehCheckout()}
                  trackId="black-cta-final" className="w-full sm:w-auto"
                >
                  Pegar a oferta do ano
                </CTAButton>
              </div>
              <p className={`${T.small} text-white/35 mt-5`}>
                Plano anual. 7 dias de garantia. Sem renovação automática surpresa.
              </p>
            </div>

            <div className="hidden lg:block bf-float">
              <Celular><TelaMargem /></Celular>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default CtaFinal;
