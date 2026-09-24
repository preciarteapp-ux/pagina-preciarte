import { Icon } from '@iconify/react';
import { T, Reveal, Badge, CTAButton, Glow, G } from '../ui';
import { PRECO_VISTA, destinoCta, ehCheckout } from '../oferta';
import { buildCheckoutUrl } from '@/lib/checkout';
import { Celular } from '../telas/base';
import TelaCalculadora from '../telas/TelaCalculadora';

/**
 * DOBRA 1 — Hero
 *
 * Estrutura da referência: nav em pílula flutuante, badge, headline com
 * a expressão-chave em gradiente, subtítulo, CTA, marcadores em linha e
 * o produto num celular à direita.
 *
 * O que muda: o celular mostra a NOSSA tela — a calculadora com o valor
 * real da hora, gerada em mockups/. E a promessa é a que o app entrega:
 * ele é operado com o produto na mão, no celular.
 */

/* Cada item leva para a sua própria seção. Antes iam todos para
   #planos, o que fazia o menu inteiro cair no mesmo lugar. */
const MENU = [
  { txt: 'Como funciona', id: '#como-funciona' },
  { txt: 'O sistema', id: '#sistema' },
  { txt: 'Planos', id: '#planos' },
  { txt: 'Dúvidas', id: '#duvidas' },
];

const MARCADORES = ['Funciona no celular', 'Proposta direto no WhatsApp', 'Catálogo com link próprio'];

const Hero = () => (
  <section className="relative overflow-hidden bg-bf-ink">
    <Glow x="72%" y="18%" size={1000} opacity={0.28} />
    <Glow x="14%" y="62%" size={700} opacity={0.16} />

    <div className="relative max-w-bf-container mx-auto px-5 lg:px-8 pt-5 pb-16 lg:pb-24">
      {/* nav em pílula */}
      <nav className="flex items-center justify-between h-[62px] rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md px-5 lg:px-6">
        <span className="font-lp7 font-semibold text-[18px] text-white">PreciArte</span>
        <div className="hidden lg:flex items-center gap-8">
          {MENU.map(({ txt, id }) => (
            <a key={id} href={id} className={`${T.small} text-white/70 hover:text-white transition-colors`}>{txt}</a>
          ))}
        </div>
        <CTAButton href="#planos" tone="dark" external={false} trackId="black-nav" className="!h-[40px] !px-5 !text-[13px]">
          Ver a oferta
        </CTAButton>
      </nav>

      <div className="grid lg:grid-cols-[1fr_460px] gap-12 lg:gap-10 items-center mt-14 lg:mt-20">
        {/* coluna de texto */}
        <div className="text-center lg:text-left">
          <Reveal>
            <Badge icon="solar:fire-bold">Esquenta Black Friday</Badge>
          </Reveal>

          <Reveal delay={90}>
            <h1 className={`${T.h1} text-white mt-6 max-w-[13ch] mx-auto lg:mx-0`}>
              O ano inteiro sai por {PRECO_VISTA}. <G>Um mês de preço errado sai mais caro.</G>
            </h1>
          </Reveal>

          <Reveal delay={170}>
            <p className={`${T.body} text-white/60 mt-6 max-w-[52ch] mx-auto lg:mx-0`}>
              Na calculadora do sistema, a diferença entre a hora que você acha que vale e a hora
              que ela vale de verdade costuma passar de cinco reais. Em cento e trinta horas de
              produção, isso é o sistema inteiro — todo mês.
            </p>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-9">
              <CTAButton
                href={ehCheckout() ? buildCheckoutUrl(destinoCta()) : '#planos'}
                tone="dark" size="lg" external={ehCheckout()}
                trackId="black-hero" className="w-full sm:w-auto"
              >
                Pegar a oferta do ano
              </CTAButton>
              <p className={`${T.small} text-white/60 mt-4`}>
                Plano anual · 7 dias de garantia · uma tarde para cadastrar
              </p>
            </div>
          </Reveal>

          <Reveal delay={330}>
            <ul className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 mt-7">
              {MARCADORES.map((m) => (
                <li key={m} className={`${T.small} text-white/60 flex items-center gap-2`}>
                  <span className="w-[5px] h-[5px] rounded-full bg-bf-goldlight" />
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* celular com a tela do app */}
        <Reveal delay={200} className="bf-float">
          <div className="relative mx-auto w-[280px] sm:w-[320px] lg:w-full max-w-[380px]">
            <Celular>
              <TelaCalculadora />
            </Celular>
          </div>
        </Reveal>
      </div>
    </div>

    {/* faixa preta de prova */}
    <ProvaFaixa />
  </section>
);

/* Faixa rolando, como a marquee da referência.
   Sem número inventado: só o que o produto realmente entrega. */
const FATOS = [
  { icon: 'solar:widget-5-outline', txt: '13 áreas no mesmo sistema' },
  { icon: 'solar:calculator-outline', txt: 'Preço com o custo real' },
  { icon: 'solar:document-text-outline', txt: 'Proposta em PDF com a sua marca' },
  { icon: 'solar:shop-outline', txt: 'Catálogo com link próprio' },
  { icon: 'solar:wallet-money-outline', txt: 'Contas a receber por vencimento' },
  { icon: 'solar:box-outline', txt: 'Baixa de estoque automática' },
  { icon: 'solar:tag-price-outline', txt: 'Plano anual, sem mensalidade' },
];

function ProvaFaixa() {
  return (
    <div className="relative bg-bf-black border-y border-white/[0.07] py-4 lg:py-5 overflow-hidden bf-marquee-mask">
      <div className="bf-marquee">
        {[0, 1].map((copia) => (
          <div key={copia} className="flex items-center shrink-0" aria-hidden={copia === 1}>
            {FATOS.map((f) => (
              <span key={f.txt} className={`${T.small} text-white/65 flex items-center gap-[10px] px-6 lg:px-8 whitespace-nowrap`}>
                <Icon icon={f.icon} width={17} className="text-bf-gold" />
                {f.txt}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
