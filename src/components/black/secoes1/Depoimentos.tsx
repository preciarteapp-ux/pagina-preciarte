import { Icon } from '@iconify/react';
import { T, Reveal, Badge } from '../ui';
import mariaImg from '@/assets/testimonial-maria.jpg';
import julianaImg from '@/assets/testimonial-juliana.jpg';
import anaImg from '@/assets/testimonial-ana.jpg';

/** Os mesmos depoimentos que já rodam na /lp1, vestidos de escuro. */
const DEPOIMENTOS = [
  {
    nome: 'Maria Silva', papel: 'Papelaria Festa Feliz', foto: mariaImg,
    txt: 'Antes eu achava que estava lucrando, mas quando comecei a usar o PreciArte percebi que estava no prejuízo em vários produtos! Agora meu lucro real aumentou 40%!',
  },
  {
    nome: 'Juliana Santos', papel: 'Arte em Papel', foto: julianaImg,
    txt: 'O catálogo online mudou minha vida! Meus clientes veem tudo organizado e fazem pedidos direto pelo WhatsApp. Minhas vendas triplicaram!',
  },
  {
    nome: 'Ana Costa', papel: 'Conviteria Encanto', foto: anaImg,
    txt: 'A IA de marketing me ajuda a criar conteúdo todo dia! E os orçamentos profissionais fizeram meus clientes me levarem a sério.',
  },
];

const Depoimentos = () => (
  <section className="bg-bf-ink pt-[72px] lg:pt-[120px] pb-[72px] lg:pb-[120px]">
    <div className="max-w-bf-container mx-auto px-5 lg:px-8">
      <Reveal className="text-center">
        <Badge>Quem já usa</Badge>
        <h2 className={`${T.h2} text-white mt-6 max-w-[18ch] mx-auto`}>
          Elas descobriram o preço certo antes de você.
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-4 mt-12">
        {DEPOIMENTOS.map((d, n) => (
          <Reveal key={d.nome} delay={n * 70}>
            <div className="h-full rounded-[22px] bg-bf-surface border border-bf-line p-7">
              <div className="flex gap-1 text-bf-gold">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Icon key={i} icon="solar:star-bold" width={16} />
                ))}
              </div>
              <p className={`${T.small} text-white/80 mt-4`}>{d.txt}</p>
              <div className="flex items-center gap-3 mt-6">
                <img src={d.foto} alt={d.nome} className="w-[44px] h-[44px] rounded-full object-cover" loading="lazy" />
                <span>
                  <span className="block font-bf font-bold text-[14px] text-white">{d.nome}</span>
                  <span className={`block ${T.small} text-white/55`}>{d.papel}</span>
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Depoimentos;
