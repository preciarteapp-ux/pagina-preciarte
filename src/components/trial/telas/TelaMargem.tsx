import { APP, BarraApp, brl, useEmCena, useSequencia } from './base';

/**
 * A margem colorida, viva — a melhor demonstração do produto.
 *
 * O preço desce degrau a degrau e a margem acompanha: verde acima de
 * 60%, amarelo acima de 40%, vermelho abaixo. É a regra real do app
 * (getMarginColor no ItemVendaFormModal), acontecendo na tela.
 * Custo fixo em R$ 9,44, igual ao da tela de composição.
 */
const CUSTO = 9.44;
const PRECOS = [20.0, 17.0, 14.16, 12.0];

const corDa = (m: number) => (m >= 60 ? APP.verde : m >= 40 ? APP.amarelo : APP.vermelho);
const fundoDe = (m: number) =>
  m >= 60 ? 'rgb(22 163 74 / .09)' : m >= 40 ? 'rgb(202 138 4 / .10)' : 'rgb(239 68 68 / .09)';
const bordaDe = (m: number) =>
  m >= 60 ? 'rgb(22 163 74 / .25)' : m >= 40 ? 'rgb(202 138 4 / .28)' : 'rgb(239 68 68 / .25)';

const TelaMargem = () => {
  const { ref, ativo } = useEmCena<HTMLDivElement>();
  const passo = useSequencia(PRECOS.length, ativo, 1300, 2600);

  const preco = PRECOS[passo];
  const margem = ((preco - CUSTO) / CUSTO) * 100;
  const lucro = preco - CUSTO;
  const cor = corDa(margem);

  return (
    <div ref={ref} className="bg-white">
      <BarraApp titulo="Itens de Venda" />

      <div className="px-4 pb-5 pt-3" style={{ background: '#FDF2F6' }}>
        <div className="rounded-[16px] bg-white p-4" style={{ border: `1px solid ${APP.rosaClaro}` }}>
          <div className="flex items-center justify-between mb-3">
            <span className="font-poppins font-semibold text-[15px]" style={{ color: APP.texto }}>Margem do item</span>
            <span
              className="text-[10px] font-semibold tracking-[.04em] uppercase px-[9px] py-[4px] rounded-full"
              style={{ background: APP.rosaClaro, color: APP.rosa }}
            >
              Convite Premium
            </span>
          </div>

          {/* o número e a cor mudam junto com o preço */}
          <div
            className="rounded-[12px] p-4 text-center transition-colors duration-[700ms]"
            style={{ background: fundoDe(margem), border: `1px solid ${bordaDe(margem)}` }}
          >
            <span className="text-[11.5px]" style={{ color: APP.suave }}>Margem Atual</span>
            <p
              className="font-poppins font-bold text-[38px] leading-[1.1] transition-colors duration-[700ms]"
              style={{ color: cor }}
            >
              {margem.toFixed(1).replace('.', ',')}%
            </p>
            <span className="text-[12px]" style={{ color: APP.suave }}>Lucro: R$ {brl(lucro)}</span>

            {/* barra que encolhe conforme a margem cai */}
            <div className="flex gap-[5px] mt-3">
              {[0, 1, 2].map((i) => {
                const faixa = [40, 60, 100][i];
                const cheio = margem >= (i === 0 ? 1 : [40, 60][i - 1]);
                return (
                  <span key={faixa} className="flex-1 h-[6px] rounded-full overflow-hidden" style={{ background: APP.input }}>
                    <span
                      className="block h-full rounded-full transition-all duration-[800ms] [transition-timing-function:cubic-bezier(.16,1,.3,1)]"
                      style={{ background: cor, width: cheio ? '100%' : '0%' }}
                    />
                  </span>
                );
              })}
            </div>
          </div>

          <div className="mt-3">
            {[
              { k: 'Custo Total', v: `R$ ${brl(CUSTO)}`, c: APP.texto },
              { k: 'Preço Sugerido', v: `R$ ${brl(14.16)}`, c: APP.rosa },
              { k: 'Meu Preço', v: `R$ ${brl(preco)}`, c: APP.texto, destaque: true },
            ].map((l) => (
              <div
                key={l.k}
                className="flex items-center justify-between py-[11px]"
                style={{ borderTop: `1px solid ${APP.rosaClaro}` }}
              >
                <span className="text-[13.5px]" style={{ color: APP.suave }}>{l.k}</span>
                <span
                  className="font-poppins font-semibold text-[17px] transition-colors duration-500"
                  style={{ color: l.destaque ? cor : l.c }}
                >
                  {l.v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelaMargem;
