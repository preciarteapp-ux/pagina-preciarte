import { Icon } from '@iconify/react';
import { T, Reveal, Badge, ImgSlot } from './ui';

/**
 * DOBRA 7 — É para você, e o que esperar
 *
 * Qualifica e diz a verdade sobre o esforço, nesta ordem, logo antes do preço.
 * O bloco escuro previne o motivo nº 1 de pedido de reembolso, que é
 * expectativa quebrada. Não remover para "melhorar a conversão": ele troca
 * conversão ruim por conversão que fica.
 */

const ITENS = [
  <>
    Produz <strong className="font-semibold">sob encomenda</strong>, com nome, data ou identidade do cliente
  </>,
  <>Compra material em embalagem grande e usa em fração: resma, rolo, galão, metro</>,
  <>
    Manda preço por WhatsApp e sente que{' '}
    <strong className="font-semibold">perde venda na comparação</strong>
  </>,
  <>Trabalha sozinha ou com uma ajudante, e faz tudo pelo celular</>,
  <>Já tem cliente recorrente e ainda não sabe qual produto dá mais lucro</>,
];

const ParaVoceLP6 = () => (
  <section className="relative overflow-hidden bg-white py-[72px] lg:py-[120px]">
    <div className="max-w-lp6-container mx-auto px-6 lg:px-10">
      <div className="grid lg:grid-cols-[54fr_42fr] gap-10 lg:gap-16 items-center">
        <div>
          <Reveal>
            <Badge>Para quem é</Badge>
            <h2 className={`${T.h2} uppercase text-lp6-text mt-5 max-w-[18ch]`}>
              O PreciArte é para você que...
            </h2>
          </Reveal>

          <ul className="mt-8 space-y-4">
            {ITENS.map((item, i) => (
              <Reveal key={i} delay={i * 80} as="li" className="flex items-start gap-3">
                <Icon
                  icon="solar:check-circle-bold"
                  width={22}
                  className="text-lp6-600 shrink-0 mt-[3px]"
                />
                <span className={`${T.body} text-lp6-text`}>{item}</span>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={120}>
            <p className={`${T.small} text-lp6-muted mt-8 pt-6 border-t border-lp6-line max-w-[62ch]`}>
              Não é para quem revende produto pronto sem produzir. Se você só compra e revende, seu
              custo é o preço de compra e uma planilha simples resolve.
            </p>
          </Reveal>
        </div>

        {/* no mobile a foto vem DEPOIS da lista — a lista é o que qualifica */}
        <Reveal delay={100} className="order-last lg:order-none">
          <div className="hidden lg:block">
            <ImgSlot
              name="contexto-atelie-producao.jpg"
              ratio="4/5"
              tone="rose"
              className="!rounded-[20px]"
              label="mesa de trabalho real"
            />
          </div>
          <div className="lg:hidden">
            <ImgSlot
              name="contexto-atelie-producao.jpg"
              ratio="16/10"
              tone="rose"
              className="!rounded-[20px]"
              label="mesa de trabalho real"
            />
          </div>
        </Reveal>
      </div>

      {/* bloco de honestidade */}
      <Reveal delay={80}>
        <div className="bg-lp6-ink rounded-[24px] py-10 px-6 lg:py-14 lg:px-16 mt-16 lg:mt-20">
          <h3 className="font-lp6 font-bold text-[24px] lg:text-[38px] tracking-[-0.02em] leading-[1.12] uppercase text-white max-w-[22ch]">
            Vai dar trabalho no começo. Uma tarde.
          </h3>
          <p className={`${T.body} text-white/[0.78] mt-5 max-w-[68ch]`}>
            Não vou prometer que você configura tudo em cinco minutos, porque não é verdade e você já
            comprou promessa de facilidade antes.
          </p>
          <p className={`${T.body} text-white/[0.78] mt-4 max-w-[68ch]`}>
            Cadastrar seus materiais com as conversões certas leva{' '}
            <strong className="font-semibold text-white">uma tarde</strong>. Depois disso, cada
            orçamento novo sai em dois minutos e o preço de cada produto novo já nasce calculado. E
            você não precisa cadastrar tudo de uma vez: comece pelos{' '}
            <strong className="font-semibold text-white">dez produtos que mais vendem</strong> e o
            resto entra conforme o pedido aparece.
          </p>
          <p className="font-lp6 font-semibold italic text-[19px] lg:text-[20px] text-white mt-7 max-w-[46ch]">
            A conta é simples: uma tarde de trabalho contra um erro que se repete todo mês.
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

export default ParaVoceLP6;
