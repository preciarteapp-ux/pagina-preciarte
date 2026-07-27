import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { T, Reveal, Badge, CTAButton, ArcDecor } from './ui';

/**
 * DOBRA 3 — A Calculadora  ·  CLÍMAX DA PÁGINA
 *
 * É o único momento em que a visitante recebe valor antes de qualquer pedido.
 * Regras que não podem ser afrouxadas:
 *   · o cálculo roda no cliente, sem requisição
 *   · NENHUM campo de e-mail, nome ou telefone — nenhum gate antes do número
 *   · o resultado aparece sozinho, sem botão "calcular"
 *   · o CTA só existe depois do primeiro resultado válido
 *
 * Fórmulas idênticas às do app (src/pages/Calculadora.tsx), inclusive o 4.33.
 */

const SEMANAS_MES = 4.33;

/** Aceita "6", "6,5", "3.500" e "3.500,50" — heurística pt-BR. */
function parseBR(raw: string): number {
  if (!raw) return 0;
  const s = raw.replace(/[^\d.,]/g, '');
  if (!s) return 0;
  const temVirgula = s.includes(',');
  const temPonto = s.includes('.');
  let normal = s;
  if (temVirgula && temPonto) normal = s.replace(/\./g, '').replace(',', '.');
  else if (temVirgula) normal = s.replace(',', '.');
  else if (temPonto) {
    // ponto com 3 dígitos depois = separador de milhar
    const depois = s.slice(s.lastIndexOf('.') + 1);
    normal = depois.length === 3 ? s.replace(/\./g, '') : s;
  }
  const n = parseFloat(normal);
  return Number.isFinite(n) ? n : 0;
}

const brl = (n: number) =>
  n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Anima o número exibido em direção ao alvo, com debounce na entrada. */
function useDebouncedCounter(target: number, debounce = 400, dur = 900) {
  const [shown, setShown] = useState(0);
  const raf = useRef<number>();
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduz) {
      setShown(target);
      return;
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const from = shown;
      const delta = target - from;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / dur, 1);
        setShown(from + delta * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf.current = requestAnimationFrame(tick);
      };
      raf.current = requestAnimationFrame(tick);
    }, debounce);
    return () => {
      clearTimeout(timer.current);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, debounce, dur]);

  return shown;
}

const CAMPOS = [
  { key: 'horas', icon: 'solar:clock-circle-outline', label: 'Quantas horas você produz por dia', apoio: '', ph: '6' },
  { key: 'dias', icon: 'solar:calendar-outline', label: 'Quantos dias por semana', apoio: '', ph: '5' },
  { key: 'ganho', icon: 'solar:wallet-money-outline', label: 'Quanto você quer ganhar por mês', apoio: 'O que você quer tirar para você, limpo', ph: '3.500' },
  { key: 'custos', icon: 'solar:bill-list-outline', label: 'Seus custos fixos mensais', apoio: 'Internet, energia, parcela da máquina, assinaturas, transporte', ph: '670' },
] as const;

const CalculadoraLP6 = () => {
  const [v, setV] = useState<Record<string, string>>({ horas: '', dias: '', ganho: '', custos: '' });
  const blocoRef = useRef<HTMLDivElement>(null);
  const [blocoVisivel, setBlocoVisivel] = useState(true);

  const calc = useMemo(() => {
    const horasPorMes = parseBR(v.horas) * parseBR(v.dias) * SEMANAS_MES;
    const ganho = parseBR(v.ganho);
    const custos = parseBR(v.custos);
    const valorBasicoHora = horasPorMes > 0 ? ganho / horasPorMes : 0;
    const faturamentoNecessario = custos + ganho;
    const valorRealHora = horasPorMes > 0 ? faturamentoNecessario / horasPorMes : 0;
    const diferenca = valorRealHora - valorBasicoHora;
    const diferencaPercentual = valorBasicoHora > 0 ? (diferenca / valorBasicoHora) * 100 : 0;
    return { valorBasicoHora, valorRealHora, diferenca, diferencaPercentual };
  }, [v]);

  const temResultado = calc.valorRealHora > 0;

  const basico = useDebouncedCounter(calc.valorBasicoHora);
  const real = useDebouncedCounter(calc.valorRealHora);
  const dif = useDebouncedCounter(calc.diferenca);

  // a barra sticky do mobile some enquanto o bloco completo está na tela
  useEffect(() => {
    const el = blocoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setBlocoVisivel(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="calculadora" className="relative overflow-hidden bg-lp6-ink py-[80px] lg:py-[140px]">
      <div
        className="absolute inset-0 lp6-glow"
        style={{
          background:
            'radial-gradient(ellipse 600px 400px at 72% 45%, rgba(194,24,91,0.35) 0%, transparent 70%)',
        }}
      />
      <ArcDecor radii={[900]} color="rgba(255,255,255,0.06)" top="120%" left="20%" />

      <div className="relative max-w-lp6-narrow mx-auto px-6 lg:px-10">
        <Reveal className="text-center">
          <Badge variant="dark">A conta</Badge>
          <h2 className={`${T.h2} uppercase text-white mt-5`}>Quanto a sua hora precisa valer</h2>
          <p className={`${T.body} text-white/[0.72] mt-4 max-w-[56ch] mx-auto`}>
            Responda três coisas que você já sabe. É o mesmo cálculo que roda dentro do PreciArte.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-[46fr_54fr] gap-8 lg:gap-14 items-start mt-12 lg:mt-14">
          {/* campos */}
          <Reveal delay={90} className="space-y-5">
            {CAMPOS.map((c) => (
              <div key={c.key}>
                <label htmlFor={`lp6-${c.key}`} className="flex items-center gap-2 mb-2">
                  <Icon icon={c.icon} width={20} className="text-lp6-300 shrink-0" />
                  <span className="font-lp6body text-[14px] text-white/70">{c.label}</span>
                </label>
                <input
                  id={`lp6-${c.key}`}
                  type="text"
                  inputMode="decimal"
                  placeholder={c.ph}
                  value={v[c.key]}
                  onChange={(e) => setV((p) => ({ ...p, [c.key]: e.target.value }))}
                  className="w-full h-[64px] rounded-[16px] bg-white/[0.06] border border-white/[0.14] px-5
                    font-lp6 font-semibold text-[22px] text-white placeholder:text-white/25
                    transition-shadow focus:outline-none focus:border-lp6-500
                    focus:shadow-[0_0_0_3px_rgba(213,109,152,0.18)]"
                />
                {c.apoio && (
                  <p className="font-lp6body text-[12px] text-white/[0.45] mt-2">{c.apoio}</p>
                )}
              </div>
            ))}
          </Reveal>

          {/* resultado */}
          <Reveal delay={180}>
            <div
              ref={blocoRef}
              className="rounded-[24px] bg-white/[0.05] border border-white/[0.12] backdrop-blur-[12px] p-7 lg:p-10"
            >
              <div>
                <p className={`${T.caption} text-white/60`}>Valor básico da hora</p>
                <p className="font-lp6body text-[13px] text-white/[0.45] mt-1">
                  o que você acha que sua hora vale
                </p>
                <p className={`${T.display} text-white text-[28px] lg:text-[40px] mt-2`}>
                  R$ {brl(basico)}
                </p>
              </div>

              <div className="mt-7">
                <p className={`${T.caption} text-white/60`}>Valor real da hora</p>
                <p className="font-lp6body text-[13px] text-white/[0.45] mt-1">
                  o que ela precisa valer para o negócio se pagar
                </p>
                <p className={`${T.display} text-white text-[28px] lg:text-[40px] mt-2`}>
                  R$ {brl(real)}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-white/[0.12]">
                <div
                  key={Math.round(calc.diferenca * 100)}
                  className="lp6-glass-dark inline-flex flex-col rounded-[20px] border border-white/25 backdrop-blur-[16px] py-4 px-6 lp6-pulse"
                >
                  <span className={`${T.caption} text-white/70`}>A diferença</span>
                  <span className={`${T.display} text-lp6-300 text-[34px] lg:text-[52px] mt-1`}>
                    R$ {brl(dif)}
                  </span>
                  <span className="font-lp6body text-[14px] text-white/70 mt-1">
                    {calc.diferencaPercentual.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}% a mais
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="text-center mt-12 lg:mt-14">
          <p className={`${T.body} text-white/[0.78] max-w-[64ch] mx-auto`}>
            Essa diferença é o que você paga, do seu bolso, para trabalhar.
          </p>
          <p className={`${T.body} text-white/[0.78] max-w-[64ch] mx-auto mt-4`}>
            Ela não some sozinha. Se multiplica por cada hora que você produz, e{' '}
            <strong className="font-semibold text-white">cresce quando você vende mais</strong>, porque
            quanto mais você produz, mais rápido o custo fixo que ninguém pagou se acumula.
          </p>
          <p className="font-lp6 font-semibold italic text-[20px] lg:text-[26px] text-white mt-7 max-w-[30ch] mx-auto">
            Se você não coloca custo fixo no preço, crescer piora a sua situação.
          </p>

          {temResultado && (
            <div className="mt-10 animate-fade-in">
              <CTAButton
                href="#planos"
                variant="dark"
                size="lg"
                external={false}
                trackId="lp6-calculadora-cta"
                className="w-full sm:w-auto"
              >
                QUERO ESSE CÁLCULO EM TODOS OS MEUS PRODUTOS
              </CTAButton>
            </div>
          )}
        </Reveal>
      </div>

      {/* barra sticky do mobile — some enquanto o bloco completo está visível */}
      <div
        className={`lg:hidden sticky bottom-0 z-40 mt-8 transition-transform duration-300 ${
          temResultado && !blocoVisivel ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="h-[96px] flex items-center justify-between gap-4 px-6 bg-lp6-ink/[0.94] backdrop-blur-[12px] border-t border-white/[0.12]">
          <div>
            <span className={`${T.caption} text-white/60`}>A diferença</span>
            <span className={`${T.display} block text-lp6-300 text-[26px] mt-1`}>R$ {brl(dif)}</span>
          </div>
          <span className="font-lp6body text-[13px] text-white/70 text-right">
            {calc.diferencaPercentual.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}%
            <br />a mais
          </span>
        </div>
      </div>
    </section>
  );
};

export default CalculadoraLP6;
