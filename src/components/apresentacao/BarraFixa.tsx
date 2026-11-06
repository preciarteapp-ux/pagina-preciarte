import { T, Botao } from './ui';
import { useBarraAp } from './useBarraAp';
import { buildAssinarUrl } from '@/lib/checkout';
import { CHECKOUT_ANUAL, ANUAL_PARCELA, ANUAL_PARCELAS, ANUAL_VISTA } from './oferta';

/**
 * Barra fixa do rodape — so no celular, onde esta quase todo o trafego.
 *
 * SO ABAIXO DE lg
 * No desktop a pagina inteira cabe em poucas rolagens e ja tem CTA no hero, nos
 * planos e no fecho. A barra ali nao ajuda e atrapalha: ela corta o rodape do
 * celular com a tela do sistema, que e justamente o que a pessoa esta olhando.
 *
 * ELA SOME NA SECAO DE PLANOS, DE PROPOSITO
 * E o unico lugar da pagina onde a barra cobriria justamente o cartao com o
 * preco e o botao de verdade. Tambem some no rodape.
 *
 * O gatilho mora em `useBarraAp` e nao no hook da Black — o motivo esta la.
 */
const BarraFixa = () => {
  const visivel = useBarraAp();

  return (
    <div
      className={`lg:hidden fixed inset-x-0 bottom-0 z-40 transition-[transform,opacity] duration-[320ms] ${
        visivel ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
      aria-hidden={!visivel}
    >
      <div className="bg-white/95 backdrop-blur-md border-t border-ap-linha shadow-[0_-10px_30px_-18px_rgba(36,27,32,0.22)]">
        <div className="max-w-ap-container mx-auto px-5 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="font-ap font-bold text-[17px] lg:text-[19px] tracking-[-0.02em] text-ap-tinta leading-tight">
              {ANUAL_PARCELAS}x de {ANUAL_PARCELA}
              <span className="font-normal text-[13px] text-ap-suave"> no anual</span>
            </p>
            <p className={`${T.mini} text-ap-suave truncate`}>
              ou {ANUAL_VISTA} à vista · acesso na hora
            </p>
          </div>
          <Botao
            href={buildAssinarUrl(CHECKOUT_ANUAL)}
            trackId="ap-barra"
            seta={false}
            className="shrink-0 !h-[44px] !px-[20px] !text-[14px]"
          >
            Assinar
          </Botao>
        </div>
      </div>
    </div>
  );
};

export default BarraFixa;
