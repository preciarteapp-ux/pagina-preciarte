import { Icon } from '@iconify/react';
import { T, Reveal, R, Rotulo } from './ui';

/**
 * O que tem dentro — em lista, sem mockup de tela.
 *
 * POR QUE NAO TEM PRINT NENHUM AQUI
 * A primeira versao trazia tres telas do sistema animadas embaixo do video. O
 * problema nao era a qualidade delas: e que o VIDEO ja mostra o sistema tela
 * por tela, entao os mockups contavam a mesma coisa de novo e custavam mais de
 * 4.000px de rolagem no celular. Numa pagina demonstrativa, o que concorre com
 * o video nao ajuda o video.
 *
 * O que sobra aqui e o papel que a lista faz bem e o video nao faz: deixar a
 * pessoa VARRER o escopo em cinco segundos, inclusive quem nao assistiu ou
 * parou no meio.
 *
 * (As telas animadas continuam existindo em components/black/telas/, usadas
 * pelas paginas da Black. Nao foram apagadas, so nao entram aqui.)
 */

const DENTRO = [
  {
    icone: 'solar:calculator-bold',
    titulo: 'Preço com custo real',
    texto: 'Material, sua hora e os custos fixos dentro da conta — não o chute vezes três.',
  },
  {
    icone: 'solar:chart-2-bold',
    titulo: 'Margem que muda de cor',
    texto: 'Verde, amarelo ou vermelho enquanto você mexe no preço, antes de mandar o orçamento.',
  },
  {
    icone: 'solar:box-bold',
    titulo: 'Materiais',
    texto: 'Você diz quanto pagou e quanto vem na embalagem; ele acha o custo por unidade.',
  },
  {
    icone: 'solar:clipboard-list-bold',
    titulo: 'Pedidos e orçamentos',
    texto: 'Pendente, em produção, entregue — e quem pagou, quem pagou metade, quem não pagou.',
  },
  {
    icone: 'solar:wallet-money-bold',
    titulo: 'Financeiro',
    texto: 'A receber e a pagar separados. Só entra na receita o que caiu de verdade.',
  },
  {
    icone: 'solar:box-minimalistic-bold',
    titulo: 'Estoque',
    texto: 'A baixa do material sai do pedido entregue, sozinha.',
  },
  {
    icone: 'solar:users-group-rounded-bold',
    titulo: 'Clientes',
    texto: 'Quem compra mais e quem está devendo, sem você pedir a lista.',
  },
  {
    icone: 'solar:shop-bold',
    titulo: 'Catálogo online',
    texto: 'Seu link de produtos, com cada botão caindo no seu WhatsApp.',
  },
];

const Dentro = () => (
  <section id="sistema" className="bg-ap-creme">
    <div className="max-w-ap-container mx-auto px-5 lg:px-8 py-14 lg:py-20">
      <div className="text-center max-w-ap-prose mx-auto">
        <Reveal>
          <Rotulo icon="solar:widget-5-bold">O que tem dentro</Rotulo>
        </Reveal>
        <Reveal delay={70}>
          <h2 className={`${T.h2} text-ap-tinta mt-5`}>
            Tudo isso <R>no mesmo lugar</R>.
          </h2>
        </Reveal>
        <Reveal delay={130}>
          <p className={`${T.body} text-ap-suave mt-4`}>
            É o que você acabou de ver no vídeo, em lista — caso queira conferir sem voltar.
          </p>
        </Reveal>
      </div>

      <Reveal delay={60} className="mt-9 lg:mt-14">
        <div className="ap-sombra-card bg-white rounded-[24px] lg:rounded-[28px] px-6 py-8 lg:px-12 lg:py-11">
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-7">
            {DENTRO.map((d) => (
              <div key={d.titulo} className="flex items-start gap-[14px]">
                <span className="inline-flex items-center justify-center w-[38px] h-[38px] rounded-full bg-ap-rosabg text-ap-rosaforte shrink-0">
                  <Icon icon={d.icone} width={19} />
                </span>
                <div>
                  <p className={`${T.small} font-semibold text-ap-tinta`}>{d.titulo}</p>
                  <p className={`${T.mini} text-ap-suave mt-[4px] max-w-[42ch]`}>{d.texto}</p>
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
