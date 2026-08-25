import { APP, BarraApp, brl, useContador, useEmCena, useSequencia } from './base';

/**
 * Pedidos, vivo — o fluxo de produção acontecendo.
 *
 * Os status são os do app (PENDENTE, EM_PRODUCAO, CONCLUIDA) e a
 * situação de pagamento também (EM_ABERTO, PARCIAL, PAGO). Ao longo da
 * sequência um pedido caminha de Pendente a Entregue, e o contador de
 * "a entregar" cai junto.
 */

type Status = 'Pendente' | 'Em Produção' | 'Entregue';

const CORES: Record<Status, { bg: string; cor: string }> = {
  'Pendente': { bg: 'rgb(202 138 4 / .12)', cor: '#A16207' },
  'Em Produção': { bg: 'rgb(212 106 146 / .14)', cor: APP.rosa },
  'Entregue': { bg: 'rgb(22 163 74 / .12)', cor: APP.verde },
};

/** cada passo da sequência define o status de cada pedido */
const ROTEIRO: Status[][] = [
  ['Pendente', 'Pendente', 'Em Produção'],
  ['Em Produção', 'Pendente', 'Em Produção'],
  ['Em Produção', 'Pendente', 'Entregue'],
  ['Entregue', 'Em Produção', 'Entregue'],
];

const PEDIDOS = [
  { n: 'ORC-2026-0042', cliente: 'Ana Beatriz', valor: 384.0, entrega: '12/08', pago: 'Em aberto' },
  { n: 'ORC-2026-0041', cliente: 'Camila Duarte', valor: 216.5, entrega: '14/08', pago: 'Parcial' },
  { n: 'ORC-2026-0040', cliente: 'Rafaela Nunes', valor: 540.0, entrega: '09/08', pago: 'Pago' },
];

const TelaPedidos = () => {
  const { ref, ativo } = useEmCena<HTMLDivElement>();
  const passo = useSequencia(ROTEIRO.length, ativo, 1400, 2400);
  const status = ROTEIRO[passo];

  const aEntregar = status.filter((s) => s !== 'Entregue').length;
  const total = PEDIDOS.reduce((s, p) => s + p.valor, 0);
  const soma = useContador(total, ativo, 900);

  return (
    <div ref={ref} className="bg-white">
      <BarraApp titulo="Pedidos" />

      <div className="px-4 pb-5 pt-3" style={{ background: '#FDF2F6' }}>
        {/* resumo do topo */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-[12px] bg-white p-3" style={{ border: `1px solid ${APP.rosaClaro}` }}>
            <span className="block text-[11px]" style={{ color: APP.suave }}>A entregar</span>
            <span
              className="font-poppins font-bold text-[22px] transition-all duration-500"
              style={{ color: APP.texto }}
              key={aEntregar}
            >
              {aEntregar}
            </span>
          </div>
          <div className="rounded-[12px] bg-white p-3" style={{ border: `1px solid ${APP.rosaClaro}` }}>
            <span className="block text-[11px]" style={{ color: APP.suave }}>Valor no mês</span>
            <span className="font-poppins font-bold text-[22px]" style={{ color: APP.rosa }}>R$ {brl(soma)}</span>
          </div>
        </div>

        <div className="rounded-[16px] bg-white p-3 mt-2" style={{ border: `1px solid ${APP.rosaClaro}` }}>
          {PEDIDOS.map((p, i) => {
            const st = status[i];
            const c = CORES[st];
            return (
              <div
                key={p.n}
                className="py-[10px]"
                style={{ borderTop: i ? `1px solid ${APP.rosaClaro}` : undefined }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[12.5px] font-semibold" style={{ color: APP.texto }}>{p.n}</span>
                  <span
                    className="text-[10.5px] font-semibold px-[9px] py-[3px] rounded-full transition-all duration-500"
                    style={{ background: c.bg, color: c.cor }}
                  >
                    {st}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-[3px]">
                  <span className="text-[12px]" style={{ color: APP.suave }}>
                    {p.cliente} · entrega {p.entrega}
                  </span>
                  <span className="text-[13px] font-semibold" style={{ color: APP.texto }}>R$ {brl(p.valor)}</span>
                </div>
                <span
                  className="inline-block mt-[5px] text-[10px] font-medium px-[7px] py-[2px] rounded-full"
                  style={{
                    background: p.pago === 'Pago' ? 'rgb(22 163 74 / .12)' : p.pago === 'Parcial' ? 'rgb(202 138 4 / .12)' : 'rgb(239 68 68 / .10)',
                    color: p.pago === 'Pago' ? APP.verde : p.pago === 'Parcial' ? '#A16207' : APP.vermelho,
                  }}
                >
                  {p.pago}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TelaPedidos;
