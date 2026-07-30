import { Icon } from '@iconify/react';
import { T, Reveal, Badge, Glow, G } from './ui';

/**
 * DOBRA 2 — "Não é uma calculadora"
 *
 * Na referência, quatro assessores de IA com nome e rosto. Aqui a mesma
 * estrutura de quatro cards, mas personificando as ÁREAS do sistema —
 * que existem de verdade. Rosto inventado seria prova fabricada.
 */

const PILARES = [
  {
    icon: 'solar:tag-price-outline',
    nome: 'Preço',
    papel: 'O que sustenta tudo',
    texto: 'Converte resma em folha, soma o seu tempo pelo valor real da hora e distribui os custos fixos. O preço mínimo aparece sozinho.',
  },
  {
    icon: 'solar:document-text-outline',
    nome: 'Pedidos',
    papel: 'Do orçamento à entrega',
    texto: 'Proposta em PDF numerada, com a sua logo e a sua chave PIX. Status de produção, prazo e o que falta entregar nesta semana.',
  },
  {
    icon: 'solar:wallet-money-outline',
    nome: 'Dinheiro',
    papel: 'O que entrou de verdade',
    texto: 'Venda parcelada não vira receita no dia da venda. Fica em contas a receber, com data, e só entra quando você confirmar.',
  },
  {
    icon: 'solar:shop-outline',
    nome: 'Vitrine',
    papel: 'Onde o cliente escolhe',
    texto: 'Catálogo público com as suas cores, preço no PIX, parcelamento e botão de WhatsApp em cada produto.',
  },
];

const PilaresLP7 = () => (
  <section id="sistema" className="relative overflow-hidden bg-lp7-ink py-[72px] lg:py-[130px]">
    <Glow x="50%" y="8%" size={900} opacity={0.14} />

    <div className="relative max-w-lp7-container mx-auto px-5 lg:px-8">
      <Reveal className="text-center">
        <Badge>A diferença</Badge>
        <h2 className={`${T.h2} text-white mt-6 max-w-[18ch] mx-auto`}>
          Não é uma calculadora. <G>É onde o seu negócio acontece.</G>
        </h2>
        <p className={`${T.body} text-white/55 mt-5 max-w-[56ch] mx-auto`}>
          Quatro áreas que conversam entre si. O que você diz numa aparece na outra, sem você
          precisar repetir nada.
        </p>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mt-12 lg:mt-16">
        {PILARES.map((p, i) => (
          <Reveal key={p.nome} delay={i * 90}>
            <div className="h-full rounded-[24px] border border-lp7-line bg-lp7-surface p-7 lg:p-8 transition-colors duration-300 hover:border-lp7-violet/40">
              <span className="inline-flex items-center justify-center w-[52px] h-[52px] rounded-full bg-gradient-to-br from-lp7-violet to-lp7-pink text-white">
                <Icon icon={p.icon} width={26} />
              </span>
              <h3 className={`${T.h3} text-white mt-5`}>{p.nome}</h3>
              <p className={`${T.cap} text-lp7-violet mt-2`}>{p.papel}</p>
              <p className={`${T.small} text-white/55 mt-4`}>{p.texto}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default PilaresLP7;
