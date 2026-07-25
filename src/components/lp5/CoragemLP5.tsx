import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { T, Reveal } from './ui';

const TOASTS = [
  { titulo: 'Orçamento aprovado', valor: 'R$ 340,00', top: '22%', left: '-8%' },
  { titulo: 'Pedido pago', valor: 'R$ 180,00', top: '45%', left: '4%' },
  { titulo: 'Margem corrigida', valor: '+38%', top: '68%', left: '-4%' },
];

const DEPOIMENTOS = [
  {
    destaque: true, nome: 'Ana Paula', meta: ' · Papelaria personalizada · São Paulo',
    texto: <>Descobri que em vários pedidos eu estava no prejuízo. O PreciArte me mostrou isso nos primeiros 10 minutos. Reajustei os preços, <strong className="font-semibold text-white not-italic">fiquei com medo de perder cliente — e não perdi nenhum</strong>.</>,
  },
  {
    destaque: true, nome: 'Juliana', meta: ' · Caixinhas personalizadas · Rio de Janeiro',
    texto: <>Hoje quando o cliente pede desconto, <strong className="font-semibold text-white not-italic">eu mostro o cálculo. Ele para de pedir.</strong> Essa segurança sozinha já pagou o sistema várias vezes.</>,
  },
  {
    destaque: false, nome: 'Fernanda', meta: ' · Sublimação · Minas Gerais',
    texto: <>O orçamento em PDF mudou tudo. Antes mandava o preço no WhatsApp e <strong className="font-semibold text-white not-italic">o cliente sumia</strong>. Hoje recebe um documento profissional com minha logo — e a resposta é completamente diferente.</>,
  },
  {
    destaque: false, nome: 'Mariana', meta: ' · Lembrancinhas · Bahia',
    texto: <>Finalmente consigo fechar o mês e saber se o negócio cresceu. Antes era tudo no feeling. Agora tenho controle de verdade — e <strong className="font-semibold text-white not-italic">isso mudou minha cabeça como empresária</strong>.</>,
  },
];

/* Assinatura de movimento da página: os toasts entram em cascata
   e o ciclo reinicia a cada 6s. É o único movimento cíclico da LP,
   e acontece no pico emocional. */
function useToastLoop(qtd: number) {
  const [ativos, setAtivos] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setAtivos(qtd);
      return;
    }
    let timers: number[] = [];
    const ciclo = () => {
      setAtivos(0);
      timers = [];
      for (let i = 0; i < qtd; i++) {
        timers.push(window.setTimeout(() => setAtivos(i + 1), 400 + i * 200));
      }
    };
    ciclo();
    const intervalo = window.setInterval(ciclo, 6000);
    return () => { window.clearInterval(intervalo); timers.forEach(window.clearTimeout); };
  }, [qtd]);
  return ativos;
}

export default function CoragemLP5() {
  const ativos = useToastLoop(TOASTS.length);

  return (
    <section id="coragem" className="relative overflow-hidden bg-lp5-700 py-[72px] lg:py-[120px]">
      {/* blob orgânico */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-lp5-800 opacity-50 pointer-events-none"
        style={{ borderRadius: '58% 42% 40% 60% / 45% 52% 48% 55%' }}
      />

      <div className="relative max-w-lp5-container mx-auto px-5 lg:px-[120px]">
        <Reveal>
          {/* override obrigatório: única dobra com split real */}
          <h2
            className="font-lp5 font-extrabold uppercase text-white text-center tracking-[-0.015em] leading-[1.1] max-w-[900px] mx-auto"
            style={{ fontSize: 'clamp(24px, 2.8vw, 44px)' }}
          >
            E se eu subir o preço e perder meus clientes?
          </h2>
          <div className={`${T.body} text-white/[0.86] text-center max-w-[65ch] mx-auto mt-5 space-y-3`}>
            <p>Essa é a pergunta que trava quase todo mundo. E é justa — você nunca subiu, então nunca descobriu o que acontece.</p>
            <p className="font-semibold text-white">Quem já subiu, descobriu.</p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-[42fr_58fr] gap-10 lg:gap-[80px] mt-12 lg:mt-16 items-start">
          {/* foto + toasts */}
          <Reveal className="relative">
            <img
              src="/lp5/img-coragem-artesa.webp"
              alt="Artesã em seu ateliê olhando o celular com expressão tranquila e concentrada"
              loading="lazy" decoding="async" width={1122} height={1402}
              className="w-full rounded-[20px] object-cover aspect-[16/10] lg:aspect-[4/5]"
              style={{ objectPosition: 'center left' }}
            />
            {TOASTS.map((t, i) => (
              <div
                key={t.titulo}
                className={`absolute ${i === 2 ? 'hidden lg:flex' : 'flex'} items-center gap-3 rounded-[14px] px-4 py-3
                  bg-white/[0.14] border border-white/[0.22] backdrop-blur-[14px]
                  transition-[opacity,transform] duration-500 ease-out
                  ${i < ativos ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                style={{ top: t.top, left: t.left }}
              >
                <span className="inline-flex w-8 h-8 shrink-0 items-center justify-center rounded-full bg-white">
                  <Icon icon="solar:check-circle-bold" width={16} color="#972142" />
                </span>
                <span>
                  <span className="block font-lp5 font-semibold text-[14px] text-white leading-tight">{t.titulo}</span>
                  <span className={`${T.caption} text-white/70 normal-case tracking-normal`}>{t.valor}</span>
                </span>
              </div>
            ))}
          </Reveal>

          {/* depoimentos */}
          <div className="space-y-5">
            {DEPOIMENTOS.map((d, i) => (
              <Reveal key={d.nome} delay={i * 120}>
                <blockquote className={`rounded-[20px] p-7 border ${d.destaque ? 'bg-white/[0.14] border-white/30' : 'bg-white/10 border-white/15'}`}>
                  <Icon icon="solar:quote-up-bold" width={24} className="text-white/25" />
                  <p className={`${T.body} italic text-white/[0.92] mt-2`}>{d.texto}</p>
                  <footer className={`${T.small} mt-4 flex items-center gap-3`}>
                    <span className="inline-flex w-12 h-12 shrink-0 items-center justify-center rounded-full bg-lp5-100 font-lp5 font-bold text-lp5-700 text-[18px]">
                      {d.nome[0]}
                    </span>
                    <span>
                      <span className="font-semibold text-lp5-200 block">{d.nome}</span>
                      <span className="text-white/[0.65]">{d.meta.replace(' · ', '')}</span>
                    </span>
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <p className={`${T.h3} italic text-lp5-200 text-center mt-14`}>
            Quem chutou o preço não consegue defender o preço.
          </p>
          <p className={`${T.body} text-white/[0.86] text-center max-w-[65ch] mx-auto mt-4`}>
            Não é firmeza que falta — é argumento. Quando o número vem de uma conta que você pode mostrar, a conversa
            muda de lugar. Você para de negociar o quanto e passa a explicar o porquê.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
