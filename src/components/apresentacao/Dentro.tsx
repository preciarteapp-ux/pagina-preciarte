import { ReactNode } from 'react';
import { Icon } from '@iconify/react';
import { T, Reveal, R, Rotulo, Item, CelularClaro, AoVivo } from './ui';
import TelaCalculadora from '../black/telas/TelaCalculadora';
import TelaMargem from '../black/telas/TelaMargem';
import TelaReceber from '../black/telas/TelaReceber';

/**
 * O corpo da demonstracao — as telas do sistema, animadas.
 *
 * As telas vem de components/black/telas/: nao sao PNG, sao componentes que
 * rodam as REGRAS do app (a cor da margem, o que entra na receita) usando os
 * tokens de cor reais dele. Ficam onde estao e sao importadas daqui — copiar
 * para uma pasta `apresentacao/telas` daria duas versoes das mesmas regras
 * para divergirem do produto em epocas diferentes.
 *
 * POR QUE SO TRES TELAS GRANDES
 * A primeira versao tinha cinco e a pagina passou de 10.000px no celular, o
 * que nao e mini pagina nenhuma — e pior: o video, que e a razao da pagina
 * existir, virava 8% dela. Aqui embaixo do video o trabalho e so confirmar o
 * que a pessoa acabou de ver, nao demonstrar de novo. Entao ficaram as tres
 * que carregam o argumento, e o resto virou a grade compacta do fim.
 *
 * A ORDEM E UM CAMINHO, NAO UMA LISTA DE RECURSOS
 * preco -> margem -> dinheiro. Cada bloco usa o resultado do anterior, e e por
 * isso que a sequencia se explica sozinha. Uma lista de funcionalidades em
 * ordem alfabetica mostra as mesmas telas e nao conta nada.
 */

type Bloco = {
  icone: string;
  rotulo: string;
  titulo: ReactNode;
  texto: string;
  itens: string[];
  tela: ReactNode;
};

const BLOCOS: Bloco[] = [
  {
    icone: 'solar:calculator-bold',
    rotulo: 'A conta que falta',
    titulo: <>Quanto <R>a sua hora</R> precisa valer.</>,
    texto:
      'Aluguel, luz, internet, o que você precisa tirar por mês. O sistema divide isso pelas horas que você realmente trabalha e devolve o valor da sua hora — com os custos fixos dentro, não só o material.',
    itens: [
      'Horas por dia × dias por semana × 4,33',
      'Custo fixo entra na hora, não fica de fora',
      'A diferença aparece ao lado do seu chute',
    ],
    tela: <TelaCalculadora />,
  },
  {
    icone: 'solar:chart-2-bold',
    rotulo: 'O que muda na hora',
    titulo: <>A margem <R>muda de cor</R> enquanto você mexe no preço.</>,
    texto:
      'Verde acima de 60%, amarelo acima de 40%, vermelho abaixo. Você não precisa saber o que é margem para entender que ficou vermelho — e é isso que segura o desconto que come o lucro inteiro.',
    itens: [
      'Desce o preço, a cor responde',
      'Mesma regra do app, não é ilustração',
      'Dá para ver antes de mandar o orçamento',
    ],
    tela: <TelaMargem />,
  },
  {
    icone: 'solar:wallet-money-bold',
    rotulo: 'No fim do mês',
    titulo: <>Só entra na receita <R>o que caiu</R>.</>,
    texto:
      'Venda a prazo fica pendente, com vencimento, até alguém confirmar. É a diferença entre quanto você vendeu e quanto você tem — e é por não separar isso que o mês parece bom e a conta não fecha.',
    itens: [
      'A receber e recebido em colunas separadas',
      'Vencimento de cada parcela',
      'O gráfico dos meses se monta sozinho',
    ],
    tela: <TelaReceber />,
  },
];

const AINDA_TEM = [
  { icone: 'solar:box-bold', titulo: 'Materiais', texto: 'Você diz quanto pagou e quanto vem na embalagem; ele acha o custo por unidade.' },
  { icone: 'solar:clipboard-list-bold', titulo: 'Pedidos', texto: 'Pendente, em produção, entregue — e quem pagou, quem pagou metade, quem não pagou.' },
  { icone: 'solar:box-minimalistic-bold', titulo: 'Estoque', texto: 'A baixa do material sai do pedido entregue, sozinha.' },
  { icone: 'solar:users-group-rounded-bold', titulo: 'Clientes', texto: 'Quem compra mais e quem está devendo, sem você pedir a lista.' },
  { icone: 'solar:pie-chart-2-bold', titulo: 'Composição do custo', texto: 'Quanto do preço é material, hora, custo fixo e lucro.' },
  { icone: 'solar:shop-bold', titulo: 'Catálogo online', texto: 'Seu link de produtos, com cada botão caindo no seu WhatsApp.' },
];

const Dentro = () => (
  <section id="sistema" className="bg-ap-creme">
    <div className="max-w-ap-container mx-auto px-5 lg:px-8 py-14 lg:py-24">
      <div className="text-center max-w-ap-prose mx-auto">
        <Reveal>
          <Rotulo icon="solar:monitor-smartphone-bold">O que você viu no vídeo</Rotulo>
        </Reveal>
        <Reveal delay={70}>
          <h2 className={`${T.h2} text-ap-tinta mt-5`}>
            As mesmas telas, <R>no seu ritmo</R>.
          </h2>
        </Reveal>
        <Reveal delay={130}>
          <p className={`${T.body} text-ap-suave mt-4`}>
            Cada uma aqui embaixo está rodando de verdade, com as contas do sistema.
            Não é imagem parada.
          </p>
        </Reveal>
      </div>

      <div className="space-y-4 lg:space-y-5 mt-9 lg:mt-16">
        {BLOCOS.map((b, i) => (
          <Reveal key={b.rotulo} delay={i * 50}>
            {/*
              No celular o texto vem sempre primeiro e a tela embaixo: inverter
              a ordem em telas estreitas largaria a pessoa olhando um print sem
              saber do que se trata. A alternancia e so do lg para cima.
            */}
            <div
              className={`grid gap-0 lg:grid-cols-2 lg:gap-5 ${
                i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <div className="ap-sombra-card bg-white rounded-t-[24px] lg:rounded-[26px] px-6 pt-7 pb-6 lg:p-11 flex flex-col justify-center">
                <Rotulo icon={b.icone} className="self-start">{b.rotulo}</Rotulo>
                <h3 className={`${T.h2} !text-[23px] lg:!text-[31px] text-ap-tinta mt-4 max-w-[20ch]`}>
                  {b.titulo}
                </h3>
                <p className={`${T.small} text-ap-suave mt-3 max-w-[46ch]`}>{b.texto}</p>
                <ul className="flex flex-col gap-[10px] mt-5">
                  {b.itens.map((t) => <Item key={t}>{t}</Item>)}
                </ul>
              </div>

              {/*
                Fundo nuvem, nao branco: no celular a moldura escura do celular
                some (border-0 abaixo de lg) e a tela do app e branca. Branco
                sobre branco apagava a borda da tela e ela virava um retangulo
                solto no meio do card. No desktop a moldura escura volta e o
                nuvem so separa o par.
              */}
              <div className="ap-sombra-card bg-ap-nuvem rounded-b-[24px] lg:rounded-[26px] px-4 pt-5 pb-5 lg:p-10 flex flex-col items-center justify-center gap-3">
                <div className="w-full max-w-[262px] lg:max-w-[292px]">
                  <CelularClaro>{b.tela}</CelularClaro>
                </div>
                <AoVivo />
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={60} className="mt-4 lg:mt-6">
        <div className="ap-sombra-card bg-white rounded-[24px] lg:rounded-[26px] px-6 py-8 lg:px-11 lg:py-10">
          <h3 className={`${T.h3} text-ap-tinta`}>E ainda tem, no mesmo lugar</h3>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 mt-6">
            {AINDA_TEM.map((a) => (
              <div key={a.titulo} className="flex items-start gap-[13px]">
                <span className="inline-flex items-center justify-center w-[34px] h-[34px] rounded-full bg-ap-rosabg text-ap-rosaforte shrink-0">
                  <Icon icon={a.icone} width={17} />
                </span>
                <div>
                  <p className={`${T.small} font-semibold text-ap-tinta`}>{a.titulo}</p>
                  <p className={`${T.mini} text-ap-suave mt-[3px]`}>{a.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Dentro;
