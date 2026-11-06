import { Icon } from '@iconify/react';
import { T, Reveal, R, Rotulo, Item, Botao } from './ui';
import { buildAssinarUrl } from '@/lib/checkout';
import {
  CHECKOUT_ANUAL, CHECKOUT_MENSAL,
  ANUAL_PARCELA, ANUAL_PARCELAS, ANUAL_VISTA, ANUAL_TOTAL_PARCELADO,
  MENSAL, ANCORA_ANO, ECONOMIA, DESCONTO,
} from './oferta';

/**
 * Os planos — com o checkout PROPRIO do PreciArte.
 *
 * Os dois botoes vao para preciarte.com.br/assinar, e nao para a Hotmart nem
 * para a OnProfit. O `?plano=` leva o id exato da tabela `planos`: o checkout
 * procura por id, e um id que nao casa faz ele cair no primeiro da lista — que
 * hoje e o MENSAL. Ou seja, errar o id aqui nao da erro de tela nenhum, da
 * venda do plano errado em silencio.
 *
 * buildAssinarUrl carrega a query inteira da /apresentacao para la. E
 * calculado no render, igual as paginas /trial e /black, porque e assim que o
 * href ja sai pronto antes do script da Utmify reescrever os links.
 *
 * O TOTAL PARCELADO FICA VISIVEL
 * O anual tem 4% de juros por parcela, entao 12 x R$ 12,56 da R$ 150,72. O
 * checkout mostra esse total. Omitir aqui nao aumenta venda nenhuma: so troca
 * a hora em que a pessoa descobre, e troca para a pior possivel.
 */

const INCLUSO = [
  'Precificação com custo real e margem',
  'Pedidos, clientes e orçamento',
  'Financeiro, a receber e a pagar',
  'Estoque com baixa automática',
  'Catálogo online com link próprio',
  'Miris, a assistente dentro do sistema',
];

const Planos = () => (
  <section id="planos" className="bg-white">
    <div className="max-w-ap-container mx-auto px-5 lg:px-8 py-16 lg:py-24">
      <div className="text-center max-w-ap-prose mx-auto">
        <Reveal>
          <Rotulo icon="solar:tag-price-bold">Planos</Rotulo>
        </Reveal>
        <Reveal delay={70}>
          <h2 className={`${T.h2} text-ap-tinta mt-5`}>
            Viu o sistema. <R>Agora o preço dele.</R>
          </h2>
        </Reveal>
        <Reveal delay={130}>
          <p className={`${T.body} text-ap-suave mt-4`}>
            O mesmo sistema nos dois planos, sem função trancada. O que muda é só como você paga.
          </p>
        </Reveal>
      </div>

      {/*
        No celular o anual vem primeiro (order-1) porque e o que a pagina
        recomenda, e no desktop ele vai para a direita (md:order-2), onde o olho
        termina de ler a comparacao. Mesma escolha das paginas da Black.
      */}
      <div className="grid md:grid-cols-2 gap-5 lg:gap-6 max-w-ap-narrow mx-auto mt-10 lg:mt-14">
        {/* ── Anual ─────────────────────────────────────────── */}
        <Reveal className="order-1 md:order-2">
          <div className="relative h-full ap-sombra-card rounded-[26px] border-2 border-ap-rosa bg-white px-6 py-8 lg:px-9 lg:py-10 flex flex-col">
            <span className="absolute -top-[13px] left-1/2 -translate-x-1/2 inline-flex items-center gap-[6px] h-[26px] px-[14px] rounded-full bg-ap-rosaforte text-white font-ap font-semibold text-[11px] tracking-[0.1em] uppercase whitespace-nowrap">
              <Icon icon="solar:star-bold" width={12} />
              Mais escolhido
            </span>

            <div className="flex items-baseline justify-between gap-3">
              <h3 className={`${T.h3} text-ap-tinta`}>Anual</h3>
              <span className="inline-flex items-center h-[24px] px-[10px] rounded-full bg-ap-rosabg text-ap-rosaforte font-ap font-semibold text-[12px]">
                {DESCONTO} OFF
              </span>
            </div>

            <div className="mt-5">
              <span className={`${T.mini} text-ap-suave line-through`}>{ANCORA_ANO} por ano</span>
              <p className="mt-1">
                <span className="font-ap font-normal text-[15px] text-ap-suave">{ANUAL_PARCELAS}x de </span>
                <span className="font-ap font-bold text-[42px] lg:text-[50px] tracking-[-0.03em] text-ap-tinta leading-none">
                  {ANUAL_PARCELA}
                </span>
              </p>
              <p className={`${T.small} text-ap-suave mt-2`}>
                ou <span className="font-semibold text-ap-tinta">{ANUAL_VISTA}</span> à vista
              </p>
              <p className={`${T.mini} text-ap-suave mt-[6px]`}>
                Parcelado em {ANUAL_PARCELAS}x o total fica {ANUAL_TOTAL_PARCELADO}. À vista não tem acréscimo.
              </p>
            </div>

            <div className="h-px bg-ap-linha my-6" />

            <ul className="flex flex-col gap-[11px]">
              {INCLUSO.map((t) => <Item key={t}>{t}</Item>)}
            </ul>

            <div className="mt-auto pt-7">
              <Botao
                href={buildAssinarUrl(CHECKOUT_ANUAL)}
                size="lg"
                trackId="ap-planos-anual"
                className="w-full"
              >
                Assinar o anual
              </Botao>
              <p className={`${T.mini} text-ap-suave text-center mt-3`}>
                Economiza {ECONOMIA} em doze meses
              </p>
            </div>
          </div>
        </Reveal>

        {/* ── Mensal ────────────────────────────────────────── */}
        <Reveal delay={60} className="order-2 md:order-1">
          <div className="h-full ap-sombra-card rounded-[26px] border border-ap-linha bg-ap-creme px-6 py-8 lg:px-9 lg:py-10 flex flex-col">
            <h3 className={`${T.h3} text-ap-tinta`}>Mensal</h3>

            <div className="mt-5">
              <p>
                <span className="font-ap font-bold text-[42px] lg:text-[50px] tracking-[-0.03em] text-ap-tinta leading-none">
                  {MENSAL}
                </span>
                <span className="font-ap font-normal text-[15px] text-ap-suave"> por mês</span>
              </p>
              <p className={`${T.small} text-ap-suave mt-2`}>Sem fidelidade, cancela quando quiser</p>
              <p className={`${T.mini} text-ap-suave mt-[6px]`}>
                É o plano de quem quer ir testando mês a mês antes de fechar o ano.
              </p>
            </div>

            <div className="h-px bg-ap-linha my-6" />

            <ul className="flex flex-col gap-[11px]">
              {INCLUSO.map((t) => <Item key={t}>{t}</Item>)}
            </ul>

            <div className="mt-auto pt-7">
              <Botao
                href={buildAssinarUrl(CHECKOUT_MENSAL)}
                tone="contorno"
                size="lg"
                trackId="ap-planos-mensal"
                className="w-full"
              >
                Assinar o mensal
              </Botao>
              <p className={`${T.mini} text-ap-suave text-center mt-3`}>
                Doze meses assim dariam {ANCORA_ANO}
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={120}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-x-7 gap-y-2 mt-9 lg:mt-11">
          {[
            { i: 'solar:card-bold', t: 'Cartão ou Pix' },
            { i: 'solar:lock-keyhole-bold', t: 'Pagamento no site do PreciArte' },
            { i: 'solar:bolt-bold', t: 'Acesso liberado na hora' },
          ].map((x) => (
            <span key={x.t} className={`inline-flex items-center gap-[7px] ${T.mini} text-ap-suave`}>
              <Icon icon={x.i} width={15} className="text-ap-rosa" />
              {x.t}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

export default Planos;
