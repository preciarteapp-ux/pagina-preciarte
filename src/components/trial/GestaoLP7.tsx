import { T, Reveal, Badge } from './ui';
import { BlocosAlternados, type Bloco } from './Blocos';
import TelaPedidos from './telas/TelaPedidos';
import TelaReceber from './telas/TelaReceber';
import TelaClientes from './telas/TelaClientes';
import TelaEstoque from './telas/TelaEstoque';

/**
 * SEÇÃO — a gestão depois da venda.
 *
 * É a parte que separa o produto de uma calculadora: o que acontece
 * DEPOIS que o preço saiu. Pedido, recebimento, cliente e estoque.
 * Tudo já existe no app.
 */
const BLOCOS: Bloco[] = [
  {
    badge: 'Produção',
    icone: 'solar:clipboard-list-outline',
    titulo: 'Você sabe o que entrega nesta semana.',
    texto:
      'Cada pedido tem status e data de entrega. O painel mostra o que está pendente, o que está em produção e o que vence nos próximos dias, com aviso de urgente.',
    chips: ['Pendente, em produção e entregue', 'Entrega mais próxima primeiro', 'Alteração em massa quando fecha vários'],
    tela: <TelaPedidos />,
  },
  {
    badge: 'Caixa',
    icone: 'solar:wallet-money-outline',
    titulo: 'O que entrou não é o que ainda vai entrar.',
    texto:
      'Venda parcelada não vira receita no dia da venda. Fica em contas a receber, com vencimento, e só entra no caixa quando você confirma. O que venceu aparece em vermelho.',
    chips: ['Vencidas e a vencer separadas', 'Cartão com parcela mês a mês', 'Confirmou aqui, atualiza o pedido lá'],
    tela: <TelaReceber />,
  },
  {
    badge: 'Cobrança',
    icone: 'solar:users-group-rounded-outline',
    titulo: 'O sistema ranqueia quem te deve.',
    texto:
      'Ele agrupa os pedidos por cliente, soma o que ficou em aberto e ordena pelo maior valor pendente. Você nunca pediu essa lista: ela aparece porque os pedidos estão registrados.',
    chips: ['Quem mais compra e quanto já gastou', 'Quem está com pagamento em aberto', 'Ticket médio calculado sozinho'],
    tela: <TelaClientes />,
  },
  {
    badge: 'Estoque',
    icone: 'solar:box-outline',
    titulo: 'A baixa do material acontece sem você lembrar.',
    texto:
      'Como você já disse quais materiais entram em cada produto, marcar o pedido como entregue desconta tudo do estoque. Controle de estoque você ganha de brinde por ter precificado direito.',
    chips: ['Desconta na entrega, item por item', 'Usa a ficha que você já cadastrou', 'Você não dá baixa em nada'],
    tela: <TelaEstoque />,
  },
];

const GestaoLP7 = () => (
  <section id="gestao" className="bg-lp7-cream pt-[36px] lg:pt-[60px] pb-[72px] lg:pb-[130px]">
    <div className="max-w-lp7-container mx-auto px-5 lg:px-8">
      <Reveal className="text-center">
        <Badge tone="light">Parte 2 · A gestão</Badge>
        <h2 className={`${T.h2} text-lp7-text mt-6 max-w-[19ch] mx-auto`}>
          O preço é o começo. O resto é o negócio andando.
        </h2>
        <p className={`${T.body} text-lp7-muted mt-5 max-w-[54ch] mx-auto`}>
          Calculadora entrega um número e para. Aqui o número vira pedido, o pedido vira entrega, a
          entrega vira dinheiro na conta e o estoque se acerta sozinho.
        </p>
      </Reveal>
      <BlocosAlternados blocos={BLOCOS} inverteA />
    </div>
  </section>
);

export default GestaoLP7;
