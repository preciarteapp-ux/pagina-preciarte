import { T, Reveal, Badge, IconCircle, ImgSlot } from './ui';

/**
 * DOBRA 2 — O Problema
 *
 * Dobra de tensão: NÃO tem CTA. Oferecer saída aqui quebra a construção.
 * No mobile a imagem sobe para logo depois do H2 — é o gancho visual.
 */

const PARCELAS = [
  { icon: 'solar:box-minimalistic-outline', forte: 'O material', resto: ', convertido para a unidade que você realmente consome' },
  { icon: 'solar:printer-outline', forte: 'A impressão', resto: ', calculada por página, não por sensação' },
  { icon: 'solar:clock-circle-outline', forte: 'O seu tempo', resto: ', multiplicado por quanto a sua hora precisa valer' },
  { icon: 'solar:home-smile-outline', forte: 'Os custos fixos', resto: ', que correm todo mês, você produzindo ou não' },
];

const ProblemaLP6 = () => (
  <section id="problema" className="relative overflow-hidden bg-white py-[56px] lg:py-[120px]">
    <div className="max-w-lp6-container mx-auto px-6 lg:px-10">
      {/* bloco A */}
      <div className="grid lg:grid-cols-[52fr_44fr] gap-10 lg:gap-16 items-start">
        <div className="order-1">
          <Reveal>
            <Badge>O problema</Badge>
            <h2 className={`${T.h2} uppercase text-lp6-text mt-5 max-w-[16ch]`}>
              Você não decide o seu preço. Você copia ele.
            </h2>
          </Reveal>
        </div>

        {/* imagem: 2ª no desktop, 2ª no mobile também (logo após o H2) */}
        <Reveal delay={120} className="order-2 lg:order-2 lg:row-span-2">
          <div className="mx-auto w-[78%] lg:w-full rotate-[-2deg] lg:rotate-[-4deg]">
            <ImgSlot
              name="problema-preco-whatsapp.png"
              ratio="aspect-[4/5]"
              tone="rose"
              className="!rounded-[28px] shadow-[0_30px_60px_rgba(24,8,16,0.14)]"
              label="conversa com o preço solto"
            />
          </div>
        </Reveal>

        <div className="order-3 lg:order-2 lg:col-start-1">
          <Reveal delay={60}>
            <p className={`${T.body} text-lp6-muted max-w-[62ch]`}>
              O cliente pergunta quanto fica. Você hesita.
            </p>
            <p className={`${T.body} text-lp6-muted mt-4 max-w-[62ch]`}>
              Faz a conta de cabeça, lembra de metade dos materiais, abre o Instagram de outra pessoa
              que faz parecido, e manda um número que{' '}
              <strong className="font-semibold text-lp6-text">parece justo</strong>. Esse cálculo dura
              quarenta segundos, e define a sua margem nos próximos quinze dias de trabalho.
            </p>
            <p className="font-lp6body italic text-[18px] lg:text-[19px] leading-[1.6] text-lp6-text border-l-[3px] border-lp6-600 pl-5 my-8 max-w-[58ch]">
              O problema não é que você calcula rápido. É que o número que você usa como referência
              também foi um chute de outra pessoa.
            </p>
          </Reveal>

          <div className="space-y-4">
            <Reveal delay={120}>
              <blockquote className="bg-lp6-50 border-l-[3px] border-lp6-300 rounded-r-[12px] py-5 px-6">
                <p className={`${T.small} italic text-lp6-muted`}>
                  "O cliente pergunta o preço. Você hesita. Você calcula na cabeça, olha o que a
                  concorrência cobra, e chuta um número que 'parece justo'."
                </p>
              </blockquote>
            </Reveal>
            <Reveal delay={240}>
              <blockquote className="bg-lp6-50 border-l-[3px] border-lp6-300 rounded-r-[12px] py-5 px-6">
                <p className={`${T.small} italic text-lp6-muted`}>
                  "Em dois anos de negócio, nunca coloquei o custo da impressora no preço. Nunca."
                </p>
                <p className={`${T.small} text-lp6-muted mt-2 not-italic`}>
                  <strong className="font-semibold text-lp6-text">Carla</strong>, MDF, PR
                </p>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>

      {/* bloco B — o erro não avisa */}
      <Reveal delay={80}>
        <div className="bg-lp6-ink rounded-[24px] py-10 px-6 lg:py-14 lg:px-16 mt-12 lg:mt-20">
          <h3 className="font-lp6 font-bold text-[24px] lg:text-[34px] tracking-[-0.02em] leading-[1.15] text-white max-w-[22ch]">
            E o pior desse erro é que ele{' '}
            <strong className="text-lp6-300 font-bold">não emite sinal</strong>.
          </h3>
          <p className={`${T.body} text-white/[0.78] mt-5 max-w-[62ch]`}>
            O produto sai. O Pix cai. O dinheiro parece existir. Prejuízo em pedido individual não
            dispara alerta nenhum. Ele só aparece meses depois, como aquela sensação de que você
            trabalha o mês inteiro e não sobra.
          </p>
          <p className="font-lp6 font-semibold text-[18px] lg:text-[20px] text-white mt-6">
            Erro que não avisa não se corrige com esforço. Só com instrumento.
          </p>
        </div>
      </Reveal>

      {/* bloco C — as quatro parcelas */}
      <div className="mt-10 lg:mt-16">
        <Reveal>
          <p className={`${T.body} text-lp6-muted max-w-[68ch]`}>
            A maioria resolve isso com planilha, com a calculadora do celular, ou com a regra que
            todo mundo repete: material vezes três.
          </p>
          <p className={`${T.body} text-lp6-muted mt-4 max-w-[68ch]`}>
            O problema é estrutural.{' '}
            <strong className="font-semibold text-lp6-text">
              O material é só uma das quatro parcelas do seu custo:
            </strong>
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {PARCELAS.map((p, i) => (
            <Reveal key={p.forte} delay={i * 80}>
              <div className="h-full bg-lp6-50 border border-lp6-line rounded-[20px] p-7">
                <IconCircle icon={p.icon} />
                <p className={`${T.small} text-lp6-muted mt-4`}>
                  <strong className="font-semibold text-lp6-text">{p.forte}</strong>
                  {p.resto}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className={`${T.body} text-lp6-muted mt-10 max-w-[68ch]`}>
            Multiplicar material por três só acerta por acidente, no caso raro em que o material é um
            terço do custo. Em produção personalizada, com tempo de trabalho alto,{' '}
            <strong className="font-semibold text-lp6-text">o material raramente passa de 20%</strong>.
            A regra não erra por pouco: ela deixa três quartos da conta de fora.
          </p>
        </Reveal>
      </div>
    </div>
  </section>
);

export default ProblemaLP6;
