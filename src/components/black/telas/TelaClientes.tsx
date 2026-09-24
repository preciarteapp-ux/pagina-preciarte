import { APP, BarraApp, brl, useContador, useEmCena, useSequencia } from './base';

/**
 * Clientes, vivo — o ranking de quem deve.
 *
 * O app calcula isso sozinho (useClientesDashboard): agrupa os pedidos
 * por cliente, soma o que ficou em aberto e ordena pelo maior valor
 * pendente. Ela nunca pediu essa lista: ganha de graça por ter
 * registrado os pedidos.
 */

const MELHORES = [
  { nome: 'Rafaela Nunes', pedidos: 9, total: 3240.0 },
  { nome: 'Ana Beatriz', pedidos: 7, total: 2180.5 },
  { nome: 'Camila Duarte', pedidos: 5, total: 1490.0 },
];

const DEVEDORES = [
  { nome: 'Ana Beatriz', abertos: 2, pendente: 256.0 },
  { nome: 'Camila Duarte', abertos: 1, pendente: 96.5 },
];

const TelaClientes = () => {
  const { ref, ativo } = useEmCena<HTMLDivElement>();
  const passo = useSequencia(4, ativo, 950, 2600); // 0 vazio · 1 ticket · 2 melhores · 3 pendências

  const ticket = useContador(486.4, passo >= 1, 900);
  const aReceber = useContador(352.5, passo >= 3, 800);

  return (
    <div ref={ref} className="bg-white">
      <BarraApp titulo="Clientes" />

      <div className="px-4 pb-5 pt-3" style={{ background: '#FDF2F6' }}>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-[12px] bg-white p-3" style={{ border: `1px solid ${APP.rosaClaro}` }}>
            <span className="block text-[11px]" style={{ color: APP.suave }}>Ticket médio</span>
            <span className="font-poppins font-bold text-[19px]" style={{ color: APP.rosa }}>R$ {brl(ticket)}</span>
          </div>
          <div className="rounded-[12px] bg-white p-3" style={{ border: `1px solid ${APP.rosaClaro}` }}>
            <span className="block text-[11px]" style={{ color: APP.suave }}>Te devem</span>
            <span className="font-poppins font-bold text-[19px]" style={{ color: APP.vermelho }}>R$ {brl(aReceber)}</span>
          </div>
        </div>

        {/* melhores clientes */}
        <div className="rounded-[16px] bg-white p-3 mt-2" style={{ border: `1px solid ${APP.rosaClaro}` }}>
          <span className="block text-[11.5px] font-semibold mb-1" style={{ color: APP.texto }}>Melhores clientes</span>
          {MELHORES.map((c, i) => (
            <div
              key={c.nome}
              className="flex items-center gap-[9px] py-[8px] transition-all duration-500"
              style={{
                borderTop: i ? `1px solid ${APP.rosaClaro}` : undefined,
                opacity: passo >= 2 ? 1 : 0,
                transform: passo >= 2 ? 'translateX(0)' : 'translateX(-6px)',
                transitionDelay: `${i * 110}ms`,
              }}
            >
              <span
                className="flex items-center justify-center w-[26px] h-[26px] rounded-full text-[11px] font-semibold shrink-0"
                style={{ background: APP.rosaClaro, color: APP.rosa }}
              >
                {c.nome.charAt(0)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] font-semibold truncate" style={{ color: APP.texto }}>{c.nome}</span>
                <span className="block text-[11px]" style={{ color: APP.suave }}>{c.pedidos} pedidos</span>
              </span>
              <span className="text-[13px] font-semibold" style={{ color: APP.texto }}>R$ {brl(c.total)}</span>
            </div>
          ))}
        </div>

        {/* quem tem pendência */}
        <div
          className="rounded-[16px] p-3 mt-2 transition-all duration-500"
          style={{
            background: 'rgb(239 68 68 / .05)',
            border: '1px solid rgb(239 68 68 / .18)',
            opacity: passo >= 3 ? 1 : 0,
            transform: passo >= 3 ? 'translateY(0)' : 'translateY(8px)',
          }}
        >
          <span className="block text-[11.5px] font-semibold mb-1" style={{ color: APP.vermelho }}>Com pagamento em aberto</span>
          {DEVEDORES.map((c, i) => (
            <div
              key={c.nome}
              className="flex items-center justify-between py-[7px]"
              style={{ borderTop: i ? '1px solid rgb(239 68 68 / .14)' : undefined }}
            >
              <span>
                <span className="block text-[12.5px] font-semibold" style={{ color: APP.texto }}>{c.nome}</span>
                <span className="block text-[11px]" style={{ color: APP.suave }}>{c.abertos} pedido(s) em aberto</span>
              </span>
              <span className="text-[13px] font-semibold" style={{ color: APP.vermelho }}>R$ {brl(c.pendente)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TelaClientes;
