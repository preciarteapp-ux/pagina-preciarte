import { APP, BarraApp, brl, useContador, useEmCena, useSequencia } from './base';

/**
 * Composição de custo, viva — com o gráfico que enche.
 * As quatro parcelas entram uma a uma, cada valor conta, e a barra
 * embaixo cresce mostrando quanto cada parcela ocupa do custo total.
 * É o argumento contra "material vezes três" acontecendo na tela.
 */
const PARCELAS = [
  { nome: 'Impressão', detalhe: '2x R$ 0,42', valor: 0.84, cor: '#F39AC4' },
  { nome: 'Materiais', detalhe: '3 itens selecionados', valor: 2.18, cor: '#D46A92' },
  { nome: 'Mão de obra', detalhe: '12min × R$ 32,10/h', valor: 6.42, cor: '#A84A6E' },
  { nome: 'Outras taxas', detalhe: 'embalagem, frete', valor: 0.0, cor: '#EFD3DE' },
];
const TOTAL = 9.44;
const PASSOS = PARCELAS.length + 2; // parcelas + total + barra

const Linha = ({ p, ligado }: { p: typeof PARCELAS[number]; ligado: boolean }) => {
  const v = useContador(p.valor, ligado, 700);
  return (
    <div
      className="flex items-center justify-between py-[10px] transition-all duration-500"
      style={{
        borderTop: `1px solid ${APP.rosaClaro}`,
        opacity: ligado ? 1 : 0,
        transform: ligado ? 'translateX(0)' : 'translateX(-8px)',
      }}
    >
      <span>
        <span className="block text-[14px] font-semibold" style={{ color: APP.texto }}>{p.nome}</span>
        <span className="block text-[11.5px]" style={{ color: APP.suave }}>{p.detalhe}</span>
      </span>
      <span className="text-[15px] font-semibold" style={{ color: APP.rosa }}>R$ {brl(v)}</span>
    </div>
  );
};

const TelaCusto = () => {
  const { ref, ativo } = useEmCena<HTMLDivElement>();
  const passo = useSequencia(PASSOS, ativo, 620, 2400);
  const total = useContador(TOTAL, passo >= PARCELAS.length, 900);
  const barraLigada = passo >= PARCELAS.length + 1;

  return (
    <div ref={ref} className="bg-white">
      <BarraApp titulo="Itens de Venda" />

      <div className="px-4 pb-5 pt-3" style={{ background: '#FDF2F6' }}>
        <div className="rounded-[16px] bg-white p-4" style={{ border: `1px solid ${APP.rosaClaro}` }}>
          <div className="flex items-center justify-between mb-1">
            <span className="font-poppins font-semibold text-[15px]" style={{ color: APP.texto }}>Custos do item</span>
            <span
              className="text-[10px] font-semibold tracking-[.04em] uppercase px-[9px] py-[4px] rounded-full"
              style={{ background: APP.rosaClaro, color: APP.rosa }}
            >
              Convite Premium
            </span>
          </div>

          {PARCELAS.map((p, i) => <Linha key={p.nome} p={p} ligado={passo >= i + 1} />)}

          {/* gráfico: cada parcela ocupa sua fatia do custo */}
          <div className="flex gap-[3px] mt-4 h-[9px]">
            {PARCELAS.map((p) => (
              <span
                key={p.nome}
                className="rounded-full transition-all duration-[900ms] [transition-timing-function:cubic-bezier(.16,1,.3,1)]"
                style={{
                  background: p.cor,
                  width: barraLigada ? `${Math.max((p.valor / TOTAL) * 100, 2)}%` : '0%',
                  opacity: barraLigada ? 1 : 0,
                }}
              />
            ))}
          </div>

          <div
            className="mt-4 rounded-[12px] px-4 py-3 flex items-center justify-between transition-all duration-500"
            style={{
              background: 'rgb(212 106 146 / .10)',
              border: '1px solid rgb(212 106 146 / .22)',
              opacity: passo >= PARCELAS.length ? 1 : 0.3,
            }}
          >
            <span className="font-poppins font-semibold text-[14px]" style={{ color: APP.texto }}>Custo Total</span>
            <span className="font-poppins font-bold text-[21px]" style={{ color: APP.rosa }}>R$ {brl(total)}</span>
          </div>

          <p className="text-[11px] mt-[10px]" style={{ color: APP.suave }}>
            Usando valor real da hora (inclui custos fixos)
          </p>
        </div>
      </div>
    </div>
  );
};

export default TelaCusto;
