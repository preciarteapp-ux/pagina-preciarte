import { APP, BarraApp, Campo, brl, useContador, useEmCena, useSequencia } from './base';

/**
 * Tela Calculadora, viva.
 * Os campos preenchem em sequência e, quando o último entra, os dois
 * valores da hora contam até o resultado e a diferença aparece.
 * Mesmas fórmulas do app: horas × dias × 4.33, e custos fixos na hora.
 */
const PASSOS = 7; // 0 vazio · 1-4 campos · 5 resultados · 6 diferença

const TelaCalculadora = () => {
  const { ref, ativo } = useEmCena<HTMLDivElement>();
  const passo = useSequencia(PASSOS, ativo, 700, 2600);

  const basico = useContador(26.94, passo >= 5);
  const real = useContador(32.1, passo >= 5, 1100);
  const dif = useContador(5.16, passo >= 6, 700);

  return (
    <div ref={ref} className="bg-white">
      <BarraApp titulo="Calculadora" />

      <div className="px-4 pb-5 pt-3" style={{ background: '#FDF2F6' }}>
        <div className="rounded-[16px] bg-white p-4" style={{ border: `1px solid ${APP.rosaClaro}` }}>
          <span className="font-poppins font-semibold text-[15px]" style={{ color: APP.texto }}>
            Resumo dos Cálculos
          </span>

          <Campo rotulo="Horas por dia" valor="6" visivel={passo >= 1} />
          <Campo rotulo="Dias por semana" valor="5" visivel={passo >= 2} />
          <Campo rotulo="Quanto quer ganhar por mês" valor="3.500,00" visivel={passo >= 3} />
          <Campo rotulo="Custos fixos mensais" valor="669,90" visivel={passo >= 4} />

          {/* resultados */}
          <div
            className="mt-4 rounded-[12px] p-3 transition-all duration-500"
            style={{
              background: 'rgb(212 106 146 / .10)',
              border: '1px solid rgb(212 106 146 / .22)',
              opacity: passo >= 5 ? 1 : 0.25,
            }}
          >
            <span className="text-[10px] font-semibold tracking-[.07em] uppercase" style={{ color: APP.suave }}>
              Valor Básico da Hora
            </span>
            <p className="font-poppins font-bold text-[26px] leading-tight" style={{ color: APP.rosa }}>
              R$ {brl(basico)}
            </p>
          </div>

          <div
            className="mt-2 rounded-[12px] p-3 transition-all duration-500"
            style={{
              background: 'rgb(239 68 68 / .09)',
              border: '1px solid rgb(239 68 68 / .22)',
              opacity: passo >= 5 ? 1 : 0.25,
            }}
          >
            <span className="text-[10px] font-semibold tracking-[.07em] uppercase" style={{ color: APP.suave }}>
              Valor Real da Hora
            </span>
            <p className="font-poppins font-bold text-[26px] leading-tight" style={{ color: APP.vermelho }}>
              R$ {brl(real)}
            </p>
          </div>

          {/* diferença */}
          <div
            className="mt-3 rounded-[12px] px-4 py-3 flex items-center justify-between transition-all duration-500"
            style={{
              background: APP.rosa,
              color: '#fff',
              opacity: passo >= 6 ? 1 : 0,
              transform: passo >= 6 ? 'translateY(0) scale(1)' : 'translateY(8px) scale(.97)',
            }}
          >
            <span>
              <span className="block text-[10px] tracking-[.07em] uppercase opacity-85">Diferença</span>
              <span className="font-poppins font-bold text-[22px] leading-tight">+R$ {brl(dif)}</span>
            </span>
            <span className="text-[11px] text-right opacity-85">19% a mais<br />por hora</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelaCalculadora;
