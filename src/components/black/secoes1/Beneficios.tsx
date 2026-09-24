import { Icon } from '@iconify/react';
import { T, Reveal, Badge } from '../ui';

/**
 * O que muda na operação. Seis blocos, tirados dos problemas que a
 * análise ordenou por peso de engenharia — não de uma lista genérica
 * de benefícios de software.
 */
const ITENS = [
  {
    i: 'solar:calculator-minimalistic-outline',
    t: 'Você para de vender no prejuízo sem saber',
    d: 'O custo sai completo: material convertido, impressão, a sua hora com os custos fixos dentro e as taxas. As quatro parcelas que a conta de cabeça esquece.',
  },
  {
    i: 'solar:document-text-outline',
    t: 'Sua proposta para de parecer recado',
    d: 'PDF numerado, com a sua logo e a sua chave PIX, saindo direto para o WhatsApp. A cliente compara documento com documento.',
  },
  {
    i: 'solar:wallet-money-outline',
    t: 'Você sabe o que é seu de verdade',
    d: 'Venda parcelada não vira receita no dia da venda. Fica em contas a receber, com vencimento, e só entra no caixa quando você confirma.',
  },
  {
    i: 'solar:clipboard-list-outline',
    t: 'Você sabe o que entrega nesta semana',
    d: 'Cada pedido com status e data. O painel mostra o que está em produção e o que vence nos próximos dias.',
  },
  {
    i: 'solar:users-group-rounded-outline',
    t: 'O sistema ranqueia quem te deve',
    d: 'Ele soma o que ficou em aberto por cliente e ordena pelo maior valor pendente. Você nunca pediu essa lista.',
  },
  {
    i: 'solar:box-outline',
    t: 'A baixa de estoque acontece sozinha',
    d: 'Marcar o pedido como entregue desconta os materiais. Controle de estoque você ganha por ter precificado direito.',
  },
];

const Beneficios = () => (
  <section id="sistema" className="bg-bf-bone pt-[72px] lg:pt-[120px] pb-[72px] lg:pb-[120px]">
    <div className="max-w-bf-container mx-auto px-5 lg:px-8">
      <Reveal className="text-center">
        <Badge tone="light">O que muda</Badge>
        <h2 className={`${T.h2} text-bf-text mt-6 max-w-[20ch] mx-auto`}>
          Não é uma calculadora. É onde o seu negócio acontece.
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
        {ITENS.map((it, n) => (
          <Reveal key={it.t} delay={n * 60}>
            <div className="h-full rounded-[22px] bg-white border border-bf-text/[0.07] p-7">
              <span className="inline-flex items-center justify-center w-[44px] h-[44px] rounded-[14px] bg-gradient-to-br from-bf-gold to-bf-goldlight text-bf-ink">
                <Icon icon={it.i} width={22} />
              </span>
              <h3 className={`${T.h3} text-bf-text mt-5`}>{it.t}</h3>
              <p className={`${T.small} text-bf-muted mt-3`}>{it.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Beneficios;
