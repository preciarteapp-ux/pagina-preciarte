import { T, Reveal, CTAButton, Glow, G } from './ui';

/**
 * DOBRA 6 — Faixa escura de fechamento
 *
 * Na referência é um bloco escuro arredondado dentro da seção creme,
 * com a pessoa recortada de um lado. Aqui a mesma moldura, com a tela
 * do produto no lugar da foto, que é o que temos de verdade.
 */
const CtaFinalLP7 = () => (
  <section className="bg-lp7-cream pb-[72px] lg:pb-[130px]">
    <div className="max-w-lp7-container mx-auto px-5 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] bg-lp7-ink px-7 py-12 lg:px-16 lg:py-20">
          <Glow x="82%" y="50%" size={760} opacity={0.26} />

          <div className="relative grid lg:grid-cols-[1fr_320px] gap-10 items-center">
            <div className="text-center lg:text-left">
              <h2 className={`${T.h2} text-white max-w-[16ch] mx-auto lg:mx-0`}>
                Seu preço certo, <G>onde quer que você esteja.</G>
              </h2>
              <p className={`${T.body} text-white/55 mt-5 max-w-[46ch] mx-auto lg:mx-0`}>
                Uma tarde para cadastrar os seus principais produtos. Depois disso, cada orçamento
                sai em dois minutos e nenhum preço novo nasce errado.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center lg:items-start gap-3 justify-center lg:justify-start">
                <CTAButton href="#planos" tone="dark" size="lg" external={false} trackId="lp7-cta-final" className="w-full sm:w-auto">
                  Começar agora
                </CTAButton>
              </div>
              <p className={`${T.small} text-white/35 mt-5`}>
                7 dias de garantia. Sem fidelidade. Cancele quando quiser.
              </p>
            </div>

            <div className="hidden lg:block lp7-float">
              <div className="rounded-[28px] border-[8px] border-[#1B1620] bg-[#1B1620] shadow-[0_40px_80px_-30px_rgba(0,0,0,.6)]">
                <img
                  src="/lp6/passo-03-margem-colorida.png"
                  alt="Tela do PreciArte mostrando a margem do item ao lado do preço sugerido"
                  loading="lazy"
                  decoding="async"
                  className="block w-full rounded-[20px]"
                />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default CtaFinalLP7;
