import { Icon } from '@iconify/react';
import { APP, BarraApp, useEmCena, useSequencia } from './base';

/**
 * Estoque, vivo — a baixa acontecendo sozinha.
 *
 * No app, marcar o pedido como entregue percorre orcamento_itens →
 * materiais_utilizados, soma o consumo (quantidade × quantidade_usada)
 * e desconta de materiais.quantidade_estoque. Ela nunca faz controle
 * de estoque: ganha de brinde por ter declarado a ficha do produto.
 */

const MATERIAIS = [
  { nome: 'Papel A4 250g', un: 'folhas', antes: 500, consumo: 90 },
  { nome: 'Fita de cetim 15mm', un: 'cm', antes: 5000, consumo: 1200 },
  { nome: 'Envelope kraft', un: 'un', antes: 120, consumo: 30 },
];

const TelaEstoque = () => {
  const { ref, ativo } = useEmCena<HTMLDivElement>();
  // 0 pedido aberto · 1 marcando entregue · 2 baixa aplicada · 3 confirmação
  const passo = useSequencia(4, ativo, 1250, 2600);
  const baixou = passo >= 2;

  return (
    <div ref={ref} className="bg-white">
      <BarraApp titulo="Materiais" />

      <div className="px-4 pb-5 pt-3" style={{ background: '#FDF2F6' }}>
        {/* o gatilho: o pedido sendo marcado como entregue */}
        <div
          className="rounded-[14px] p-3 flex items-center gap-[10px] transition-all duration-500"
          style={{
            background: baixou ? 'rgb(22 163 74 / .10)' : '#fff',
            border: `1px solid ${baixou ? 'rgb(22 163 74 / .25)' : APP.rosaClaro}`,
          }}
        >
          <span
            className="flex items-center justify-center w-[30px] h-[30px] rounded-full shrink-0 transition-colors duration-500"
            style={{ background: baixou ? APP.verde : APP.rosaClaro, color: baixou ? '#fff' : APP.rosa }}
          >
            <Icon icon={baixou ? 'solar:check-read-linear' : 'solar:box-outline'} width={16} />
          </span>
          <span className="min-w-0">
            <span className="block text-[12.5px] font-semibold" style={{ color: APP.texto }}>
              ORC-2026-0042 · 30 convites
            </span>
            <span className="block text-[11px]" style={{ color: baixou ? APP.verde : APP.suave }}>
              {passo === 0 ? 'Aguardando entrega' : passo === 1 ? 'Marcando como entregue…' : 'Pedido entregue · estoque atualizado'}
            </span>
          </span>
        </div>

        <div className="rounded-[16px] bg-white p-3 mt-2" style={{ border: `1px solid ${APP.rosaClaro}` }}>
          <span className="block text-[11.5px] font-semibold mb-1" style={{ color: APP.texto }}>Estoque dos materiais</span>

          {MATERIAIS.map((m, i) => {
            const atual = baixou ? m.antes - m.consumo : m.antes;
            const pct = (atual / m.antes) * 100;
            return (
              <div key={m.nome} className="py-[9px]" style={{ borderTop: i ? `1px solid ${APP.rosaClaro}` : undefined }}>
                <div className="flex items-center justify-between">
                  <span className="text-[12.5px] font-semibold" style={{ color: APP.texto }}>{m.nome}</span>
                  <span className="text-[12.5px] font-semibold transition-colors duration-500" style={{ color: baixou ? APP.rosa : APP.texto }}>
                    {atual.toLocaleString('pt-BR')} {m.un}
                  </span>
                </div>
                <div className="h-[6px] rounded-full mt-[6px]" style={{ background: APP.input }}>
                  <span
                    className="block h-full rounded-full transition-all duration-[900ms] [transition-timing-function:cubic-bezier(.16,1,.3,1)]"
                    style={{ width: `${pct}%`, background: APP.rosa, transitionDelay: `${i * 120}ms` }}
                  />
                </div>
                <span
                  className="block text-[10.5px] mt-[3px] transition-opacity duration-500"
                  style={{ color: APP.suave, opacity: baixou ? 1 : 0 }}
                >
                  −{m.consumo.toLocaleString('pt-BR')} {m.un} neste pedido
                </span>
              </div>
            );
          })}
        </div>

        <p
          className="text-[11px] text-center mt-3 transition-opacity duration-500"
          style={{ color: APP.suave, opacity: passo >= 3 ? 1 : 0 }}
        >
          Você não deu baixa em nada. O sistema deu.
        </p>
      </div>
    </div>
  );
};

export default TelaEstoque;
