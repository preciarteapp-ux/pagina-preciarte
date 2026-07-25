import { Icon } from '@iconify/react';
import { T, Reveal, Counter } from './ui';

const FALAS = [
  <>O cliente pergunta o preço. Você hesita. Você calcula na cabeça, olha o que a concorrência cobra, e chuta um número que <strong className="font-semibold text-lp5n-900 not-italic">parece justo</strong>.</>,
  <>O mês fecha. O Pix caiu bastante. Mas <strong className="font-semibold text-lp5n-900 not-italic">o saldo não aparece</strong>.</>,
  <>Você manda o preço no WhatsApp. <strong className="font-semibold text-lp5n-900 not-italic">O cliente some</strong>.</>,
  <>O cliente pede desconto. Você não tem o que responder — porque no fundo você também não sabe de onde veio aquele número.</>,
];

export default function ProblemaLP5() {
  return (
    <section id="problema" className="relative overflow-hidden bg-lp5n-50 py-[72px] lg:py-[120px]">
      {/* blob orgânico */}
      <div
        className="absolute -top-24 -right-24 w-[480px] h-[480px] bg-lp5-50 pointer-events-none"
        style={{ borderRadius: '62% 38% 45% 55% / 55% 48% 52% 45%' }}
      />

      <div className="relative max-w-lp5-container mx-auto px-5 lg:px-[120px]">
        <Reveal>
          <h2 className={`${T.h2} uppercase text-center text-lp5n-900 max-w-[820px] mx-auto`}>
            Você reconhece alguma dessas situações?
          </h2>
        </Reveal>

        <div className="max-w-lp5-prose mx-auto mt-10 lg:mt-12">
          <Icon icon="solar:quote-up-bold" width={24} className="text-lp5-200 mb-2" />
          {FALAS.map((f, i) => (
            <Reveal key={i} delay={i * 120}>
              <p className={`${T.body} italic text-lp5n-700 border-l-[3px] border-lp5-200 pl-6 py-3 mb-5`}>{f}</p>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className={`${T.body} text-lp5n-700 max-w-lp5-prose mx-auto mt-10 space-y-4`}>
            <p>Nenhuma dessas coisas te acorda de madrugada. Elas custam pouco por vez.</p>
            <p>
              O problema é que <strong className="font-semibold text-lp5n-900">elas se repetem</strong>. Três reais a menos por peça,
              cinquenta peças por mês, doze meses.
            </p>
            <p className="italic text-lp5n-600">
              O erro de preço não aparece num pedido. Aparece no fim do ano, quando você percebe que trabalhou o ano inteiro.
            </p>
          </div>
        </Reveal>

        {/* segunda metade — a culpa muda de lugar */}
        <div className="grid lg:grid-cols-[55fr_45fr] gap-10 lg:gap-[80px] items-center mt-16 lg:mt-24">
          <Reveal className="order-2 lg:order-1">
            <h3 className={`${T.h3} uppercase text-lp5n-900`}>E o problema não é você não saber fazer conta</h3>
            <div className={`${T.body} text-lp5n-700 mt-5 space-y-4 max-w-[65ch]`}>
              <p>
                Você sabe exatamente quanto custa o papel, a fita, a placa de MDF, o pote de tinta. Esses custos você
                conhece de cor — porque eles <strong className="font-semibold text-lp5n-900">têm etiqueta e têm nota</strong>.
              </p>
              <p>
                O que fica de fora é o que não tem preço na prateleira: a energia, o desgaste da sua máquina, o aluguel
                do seu espaço. E, acima de tudo, <strong className="font-semibold text-lp5-700">a sua hora</strong>.
              </p>
            </div>
          </Reveal>

          <Reveal className="order-1 lg:order-2" delay={120}>
            <img
              src="/lp5/img-problema-atelie.webp"
              alt="Bancada de ateliê com papel cortado, fita, régua, calculadora e um celular com conversa aberta"
              loading="lazy"
              decoding="async"
              width={1122}
              height={1402}
              className="w-full rounded-[20px] object-cover aspect-[16/10] lg:aspect-[4/5]"
            />
          </Reveal>
        </div>

        {/* card escuro do cálculo */}
        <Reveal delay={100}>
          <div className="max-w-[900px] mx-auto mt-14 lg:mt-20 bg-lp5-900 rounded-[20px] p-7 lg:p-[48px]">
            <p className={`${T.body} text-white/[0.82]`}>
              Você trabalha 8 horas por dia, 5 dias por semana. Isso são{' '}
              <Counter to={173} className={`${T.number} text-lp5-400 inline-block align-baseline`} />{' '}
              <span className={`${T.number} text-lp5-400`}>horas por mês</span>.
            </p>
            <p className={`${T.body} text-white/[0.82] mt-5`}>
              Se você quer ganhar R$ 4.000 por mês, sua hora precisa valer{' '}
              <span className={`${T.number} text-lp5-400`}>R$ 23,12</span>. Uma peça que leva 40 minutos custa{' '}
              <span className={`${T.number} text-lp5-400`}>R$ 15,41</span> só do seu trabalho —{' '}
              <strong className="font-semibold text-white">antes</strong> do papel, da tinta e da fita.
            </p>
            <p className={`${T.body} italic text-lp5-200 mt-6`}>
              Se esse número não está dentro do seu preço, ele está saindo do seu bolso.
            </p>
          </div>
        </Reveal>

        {/* depoimento Carla */}
        <Reveal>
          <blockquote className="max-w-lp5-prose mx-auto mt-12 border-l-[3px] border-lp5-200 pl-6">
            <p className={`${T.body} italic text-lp5n-700`}>
              Em dois anos de negócio, <strong className="font-semibold text-lp5n-900 not-italic">nunca coloquei o custo da impressora no preço</strong>.
              Nunca. O PreciArte me mostrou esse erro nos primeiros minutos. Foi o susto que eu precisava.
            </p>
            <footer className={`${T.small} mt-3`}>
              <span className="font-semibold text-lp5-700">Carla</span>
              <span className="text-lp5n-600"> · Produtos em MDF · Paraná</span>
            </footer>
          </blockquote>

          <p className={`${T.body} text-lp5n-700 max-w-lp5-prose mx-auto mt-8`}>
            Dois anos. Uma pessoa competente, que sabia o preço de cada material — e estava errada o tempo todo. Não foi
            falta de capacidade. Foi falta de alguém mostrar <strong className="font-semibold text-lp5n-900">onde olhar</strong>.
          </p>

          <p className={`${T.h3} uppercase text-center text-lp5-700 mt-12`}>
            Não é falta de esforço. É falta de conta.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
