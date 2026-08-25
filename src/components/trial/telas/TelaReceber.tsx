import { Icon } from '@iconify/react';
import { APP, BarraApp, brl, useContador, useEmCena, useSequencia } from './base';

/**
 * Contas a Receber, vivo — com o gráfico dos meses enchendo.
 *
 * É a regra do app: só entra na receita o que está REALIZADO. O que é
 * a prazo fica pendente, com vencimento, até alguém confirmar. Na
 * sequência, a última parcela é confirmada e o valor migra de "a
 * receber" para "recebido" — que é exatamente o que acontece na tela.
 */

const PARCELAS = [
  { desc: 'Pagamento a prazo (1/3)', cliente: 'Ana Beatriz', venc: '05/08', valor: 128.0, vencida: true },
  { desc: 'Cartão de crédito (2/4)', cliente: 'Camila Duarte', venc: '18/08', valor: 96.5, vencida: false },
  { desc: 'Pagamento a prazo (2/3)', cliente: 'Ana Beatriz', venc: '05/09', valor: 128.0, vencida: false },
];

const MESES = [
  { m: 'Abr', v: 0.42 }, { m: 'Mai', v: 0.58 }, { m: 'Jun', v: 0.51 },
  { m: 'Jul', v: 0.74 }, { m: 'Ago', v: 0.93 },
];

const TelaReceber = () => {
  const { ref, ativo } = useEmCena<HTMLDivElement>();
  // 0 vazio · 1 barras · 2 cartões · 3 lista · 4 confirma a primeira
  const passo = useSequencia(5, ativo, 1000, 2600);

  const confirmada = passo >= 4;
  const totalReceber = PARCELAS.reduce((s, p) => s + p.valor, 0) - (confirmada ? PARCELAS[0].valor : 0);
  const receber = useContador(totalReceber, passo >= 2, 700);
  const vencidas = useContador(confirmada ? 0 : PARCELAS[0].valor, passo >= 2, 700);

  return (
    <div ref={ref} className="bg-white">
      <BarraApp titulo="Financeiro" />

      <div className="px-4 pb-5 pt-3" style={{ background: '#FDF2F6' }}>
        {/* gráfico do que entrou por mês */}
        <div className="rounded-[16px] bg-white p-3" style={{ border: `1px solid ${APP.rosaClaro}` }}>
          <span className="block text-[11.5px] mb-2" style={{ color: APP.suave }}>Recebido por mês</span>
          <div className="flex items-end gap-[7px] h-[64px]">
            {MESES.map((mes, i) => (
              <span key={mes.m} className="flex-1 flex flex-col items-center gap-[5px]">
                <span
                  className="w-full rounded-t-[4px] transition-all duration-[900ms] [transition-timing-function:cubic-bezier(.16,1,.3,1)]"
                  style={{
                    height: passo >= 1 ? `${mes.v * 56}px` : '0px',
                    background: i === MESES.length - 1 ? APP.rosa : '#F3C3D5',
                    transitionDelay: `${i * 90}ms`,
                  }}
                />
                <span className="text-[9.5px]" style={{ color: APP.suave }}>{mes.m}</span>
              </span>
            ))}
          </div>
        </div>

        {/* cartões de resumo */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="rounded-[12px] bg-white p-3" style={{ border: `1px solid ${APP.rosaClaro}` }}>
            <span className="block text-[11px]" style={{ color: APP.suave }}>A receber</span>
            <span className="font-poppins font-bold text-[19px]" style={{ color: '#A16207' }}>R$ {brl(receber)}</span>
          </div>
          <div className="rounded-[12px] bg-white p-3" style={{ border: `1px solid ${APP.rosaClaro}` }}>
            <span className="block text-[11px]" style={{ color: APP.suave }}>Vencidas</span>
            <span
              className="font-poppins font-bold text-[19px] transition-colors duration-500"
              style={{ color: confirmada ? APP.verde : APP.vermelho }}
            >
              R$ {brl(vencidas)}
            </span>
          </div>
        </div>

        {/* parcelas */}
        <div className="rounded-[16px] bg-white p-3 mt-2" style={{ border: `1px solid ${APP.rosaClaro}` }}>
          {PARCELAS.map((p, i) => {
            const paga = i === 0 && confirmada;
            return (
              <div
                key={p.desc}
                className="flex items-center justify-between py-[9px] transition-all duration-500"
                style={{
                  borderTop: i ? `1px solid ${APP.rosaClaro}` : undefined,
                  opacity: passo >= 3 ? 1 : 0,
                  transform: passo >= 3 ? 'translateY(0)' : 'translateY(6px)',
                }}
              >
                <span className="min-w-0 pr-2">
                  <span className="block text-[12.5px] font-semibold truncate" style={{ color: APP.texto }}>{p.desc}</span>
                  <span className="block text-[11px]" style={{ color: paga ? APP.verde : p.vencida ? APP.vermelho : APP.suave }}>
                    {paga ? 'Recebimento confirmado' : `${p.cliente} · ${p.vencida ? 'venceu' : 'vence'} ${p.venc}`}
                  </span>
                </span>
                <span className="flex items-center gap-2 shrink-0">
                  <span className="text-[13px] font-semibold" style={{ color: paga ? APP.verde : APP.texto }}>
                    R$ {brl(p.valor)}
                  </span>
                  <span
                    className="flex items-center justify-center w-[26px] h-[26px] rounded-full transition-all duration-500"
                    style={{ background: paga ? APP.verde : APP.rosaClaro, color: paga ? '#fff' : APP.rosa }}
                  >
                    <Icon icon={paga ? 'solar:check-read-linear' : 'solar:clock-circle-outline'} width={14} />
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TelaReceber;
