import { APP, BarraApp, Campo, brl, useContador, useEmCena, useSequencia } from './base';

/**
 * Cadastro de material, vivo.
 * As três perguntas em linguagem de ateliê preenchem em sequência e o
 * preço por unidade de consumo conta na frente da pessoa — que é
 * exatamente a conta que ela nunca faz de cabeça.
 * 68,00 ÷ 500 = 0,136 → R$ 0,14, como o app arredonda.
 */
const PASSOS = 6;

const TelaMaterial = () => {
  const { ref, ativo } = useEmCena<HTMLDivElement>();
  const passo = useSequencia(PASSOS, ativo, 780, 2400);
  const preco = useContador(0.14, passo >= 5, 800);

  return (
    <div ref={ref} className="bg-white">
      <BarraApp titulo="Materiais" />

      <div className="px-4 pb-5 pt-3" style={{ background: '#FDF2F6' }}>
        <div className="rounded-[16px] bg-white p-4" style={{ border: `1px solid ${APP.rosaClaro}` }}>
          <div className="flex items-center justify-between">
            <span className="font-poppins font-semibold text-[15px]" style={{ color: APP.texto }}>
              Novo Material
            </span>
            <span
              className="text-[10px] font-semibold tracking-[.04em] uppercase px-[9px] py-[4px] rounded-full transition-opacity duration-500"
              style={{ background: APP.rosaClaro, color: APP.rosa, opacity: passo >= 1 ? 1 : 0 }}
            >
              Papel A4 250g
            </span>
          </div>

          <Campo rotulo="Como você compra?" valor="Resma (pacote)" visivel={passo >= 2} seta />
          <Campo rotulo="Como você usa?" valor="Folha" visivel={passo >= 3} seta />
          <Campo rotulo="Quantas unidades vêm?" valor="500" visivel={passo >= 4} />
          <Campo rotulo="Preço de Compra (R$)" valor="68,00" visivel={passo >= 5} />

          <div
            className="mt-4 rounded-[12px] px-3 py-3 text-[13px] font-medium transition-all duration-500"
            style={{
              background: APP.verdeBg,
              border: `1px solid ${APP.verdeBorda}`,
              color: APP.verdeTexto,
              opacity: passo >= 5 ? 1 : 0,
              transform: passo >= 5 ? 'translateY(0)' : 'translateY(8px)',
            }}
          >
            Preço por folha: <span className="text-[19px] font-semibold ml-1">R$ {brl(preco)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelaMaterial;
