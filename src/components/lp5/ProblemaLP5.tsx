import { Icon } from '@iconify/react';
import { T, Reveal, Counter } from './ui';

const FALAS = [
  { t: <>O cliente pergunta o preço. Você hesita. Você calcula na cabeça, olha o que a concorrência cobra, e chuta um número que <strong className="font-semibold text-lp5n-900 not-italic">parece justo</strong>.</>, off: 'lg:ml-0', rot: '-0.6deg' },
  { t: <>O mês fecha. O Pix caiu bastante. Mas <strong className="font-semibold text-lp5n-900 not-italic">o saldo não aparece</strong>.</>, off: 'lg:ml-16', rot: '0.5deg' },
  { t: <>Você manda o preço no WhatsApp. <strong className="font-semibold text-lp5n-900 not-italic">O cliente some</strong>.</>, off: 'lg:ml-6', rot: '-0.4deg' },
  { t: <>O cliente pede desconto. Você não tem o que responder — porque no fundo você também não sabe de onde veio aquele número.</>, off: 'lg:ml-20', rot: '0.6deg' },
];

export default function ProblemaLP5() {
  return (
    <section id="problema" className="relative overflow-hidden bg-lp5n-50 pt-[96px] lg:pt-[140px] pb-[72px] lg:pb-[120px]">
      {/* campo de cor ao fundo */}
      <div className="absolute -top-32 -right-40 w-[720px] h-[720px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(closest-side, rgba(246,106,147,0.16), transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute top-[38%] -left-52 w-[600px] h-[600px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(closest-side, rgba(206,34,82,0.10), transparent 70%)', filter: 'blur(50px)' }} />

      <div className="relative max-w-lp5-container mx-auto px-5 lg:px-[80px]">
        <Reveal>
          <h2 className={`${T.h2} uppercase text-center text-lp5n-900 max-w-[820px] mx-auto`}>
            Você reconhece alguma dessas situações?
          </h2>
        </Reveal>

        {/* falas como cartões soltos, escalonados */}
        <div className="max-w-[760px] mx-auto mt-12 lg:mt-16 space-y-5">
          {FALAS.map((f, i) => (
            <Reveal key={i} delay={i * 110} className={f.off}>
              <div className="relative rounded-[20px] bg-white p-6 lg:p-7 pl-14 lg:pl-16"
                   style={{ transform: `rotate(${f.rot})`, boxShadow: '0 18px 44px -18px rgba(33,31,28,0.20)', border: '1px solid #EDEBE8' }}>
                <span className="absolute left-5 top-6 inline-flex w-8 h-8 items-center justify-center rounded-full bg-lp5-100">
                  <Icon icon="solar:quote-up-bold" width={15} className="text-lp5-500" />
                </span>
                <p className={`${T.body} italic text-lp5n-700`}>{f.t}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className={`${T.body} text-lp5n-700 max-w-lp5-prose mx-auto mt-14 space-y-4 text-center`}>
            <p>Nenhuma dessas coisas te acorda de madrugada. Elas custam pouco por vez.</p>
            <p>O problema é que <strong className="font-semibold text-lp5n-900">elas se repetem</strong>. Três reais a menos por peça, cinquenta peças por mês, doze meses.</p>
            <p className="italic text-lp5n-600">O erro de preço não aparece num pedido. Aparece no fim do ano, quando você percebe que trabalhou o ano inteiro.</p>
          </div>
        </Reveal>

        {/* ── metade dois: texto à esquerda, foto à direita (como no layout original) ── */}
        <div className="relative mt-20 lg:mt-28">
          <div className="grid lg:grid-cols-[55fr_45fr] gap-10 lg:gap-16 items-center">
            <Reveal className="order-2 lg:order-1">
              <h3 className={`${T.h3} uppercase text-lp5n-900`}>E o problema não é você não saber fazer conta</h3>
              <div className={`${T.body} text-lp5n-700 mt-5 space-y-4 max-w-[62ch]`}>
                <p>Você sabe exatamente quanto custa o papel, a fita, a placa de MDF, o pote de tinta. Esses custos você conhece de cor — porque eles <strong className="font-semibold text-lp5n-900">têm etiqueta e têm nota</strong>.</p>
                <p>O que fica de fora é o que não tem preço na prateleira: a energia, o desgaste da sua máquina, o aluguel do seu espaço. E, acima de tudo, <strong className="font-semibold text-lp5-700">a sua hora</strong>.</p>
              </div>
            </Reveal>

            <Reveal className="order-1 lg:order-2" delay={120}>
              <img src="/lp5/img-problema-atelie.webp"
                   alt="Bancada de ateliê com papel cortado, fita, régua, calculadora e um celular com conversa aberta"
                   loading="lazy" decoding="async" width={1122} height={1402}
                   className="w-full rounded-[20px] object-cover aspect-[16/10] lg:aspect-[4/5]" />
            </Reveal>
          </div>
        </div>

        {/* ── o cálculo: bloco escuro com glow, o ponto de virada ── */}
        <Reveal delay={80}>
          <div className="relative max-w-[940px] mx-auto mt-16 lg:mt-24">
            <div className="absolute -inset-8 pointer-events-none"
                 style={{ background: 'radial-gradient(closest-side, rgba(206,34,82,0.32), transparent 72%)', filter: 'blur(46px)' }} />
            <div className="relative rounded-[28px] overflow-hidden px-7 py-9 lg:px-14 lg:py-14"
                 style={{ background: 'radial-gradient(120% 130% at 15% 0%, #6B1230 0%, #3E0A1B 45%, #22050F 100%)', boxShadow: '0 50px 110px -34px rgba(0,0,0,0.75)' }}>
              <div className="absolute -right-20 -top-20 w-[380px] h-[380px] rounded-full border border-white/[0.06]" />
              <div className="absolute -right-6 -bottom-28 w-[300px] h-[300px] rounded-full border border-white/[0.05]" />

              <p className={`${T.caption} text-lp5-300 relative`}>A conta que ninguém te ensinou</p>

              <div className="relative grid sm:grid-cols-3 gap-6 lg:gap-8 mt-7">
                {[
                  { v: <Counter to={173} suffix=" h" />, l: 'que você trabalha por mês' },
                  { v: 'R$ 23,12', l: 'quanto sua hora precisa valer' },
                  { v: 'R$ 15,41', l: 'só do seu trabalho numa peça de 40 min' },
                ].map((c, i) => (
                  <div key={i} className={i > 0 ? 'sm:border-l sm:border-white/10 sm:pl-6 lg:pl-8' : ''}>
                    <p className={`${T.number} text-lp5-400`}>{c.v}</p>
                    <p className={`${T.small} text-white/60 mt-2`}>{c.l}</p>
                  </div>
                ))}
              </div>

              <p className={`${T.body} italic text-lp5-200 mt-9 relative max-w-[56ch]`}>
                Se esse número não está dentro do seu preço, ele está saindo do seu bolso.
              </p>
            </div>
          </div>
        </Reveal>

        {/* depoimento */}
        <Reveal>
          <div className="relative max-w-[760px] mx-auto mt-16 lg:mt-20">
            <div className="rounded-[22px] bg-white p-7 lg:p-9" style={{ border: '1px solid #EDEBE8', boxShadow: '0 22px 50px -22px rgba(33,31,28,0.22)' }}>
              <Icon icon="solar:quote-up-bold" width={26} className="text-lp5-200" />
              <p className={`${T.body} italic text-lp5n-700 mt-3`}>
                Em dois anos de negócio, <strong className="font-semibold text-lp5n-900 not-italic">nunca coloquei o custo da impressora no preço</strong>.
                Nunca. O PreciArte me mostrou esse erro nos primeiros minutos. Foi o susto que eu precisava.
              </p>
              <footer className="flex items-center gap-3 mt-5">
                <span className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-lp5-100 font-lp5 font-bold text-lp5-700">C</span>
                <span className={T.small}>
                  <span className="block font-semibold text-lp5-700">Carla</span>
                  <span className="block text-lp5n-600">Produtos em MDF · Paraná</span>
                </span>
              </footer>
            </div>
          </div>

          <p className={`${T.body} text-lp5n-700 max-w-lp5-prose mx-auto mt-10 text-center`}>
            Dois anos. Uma pessoa competente, que sabia o preço de cada material — e estava errada o tempo todo.
            Não foi falta de capacidade. Foi falta de alguém mostrar <strong className="font-semibold text-lp5n-900">onde olhar</strong>.
          </p>

          <p className={`${T.h3} uppercase text-center text-lp5-700 mt-10`}>
            Não é falta de esforço. É falta de conta.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
