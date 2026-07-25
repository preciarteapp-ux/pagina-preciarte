import { T, Reveal } from './ui';

/* Diagramas — SVG inline para animar o traço.
   Traço #FB98B6 · nós #F66A93 · rótulos em branco. */
const S = {
  lbl: { fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 13, fill: '#FFFFFF' },
  sub: { fontFamily: 'Outfit, sans-serif', fontWeight: 400, fontSize: 10, fill: 'rgba(255,255,255,.55)', letterSpacing: '.06em' },
  big: { fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 20, fill: '#F66A93' },
};
const draw = { stroke: '#FB98B6', strokeWidth: 2, fill: 'none', strokeLinecap: 'round' as const };
const box = { stroke: 'rgba(251,152,182,.55)', strokeWidth: 2, fill: 'none' };

function DiagramaHora() {
  return (
    <svg viewBox="0 0 360 360" className="w-full max-w-[300px] mx-auto lp5-draw" role="img" aria-label="Sua meta de ganho dividida pelas suas horas define o valor da sua hora, que entra em cada produto">
      <rect {...box} x="8" y="16" width="150" height="58" rx="14" />
      <text {...S.sub} x="24" y="40">META DO MÊS</text>
      <text {...S.lbl} x="24" y="60">R$ 4.000,00</text>
      <rect {...box} x="202" y="16" width="150" height="58" rx="14" />
      <text {...S.sub} x="218" y="40">HORAS POR MÊS</text>
      <text {...S.lbl} x="218" y="60">173 h</text>
      <path {...draw} d="M83 78 L83 108 Q83 122 97 122 L163 122" />
      <path {...draw} d="M277 78 L277 108 Q277 122 263 122 L197 122" />
      <path {...draw} d="M180 122 L180 152" />
      <path {...draw} d="M174 145 L180 153 L186 145" />
      <rect x="72" y="154" width="216" height="66" rx="16" stroke="#F66A93" strokeWidth="2" fill="rgba(246,106,147,.14)" />
      <text {...S.sub} x="180" y="180" textAnchor="middle">O VALOR DA SUA HORA</text>
      <text {...S.big} x="180" y="205" textAnchor="middle">R$ 23,12 / h</text>
      <path {...draw} d="M180 224 L180 262" />
      <path {...draw} d="M174 255 L180 263 L186 255" />
      {[30, 135, 240].map((x) => (
        <g key={x}>
          <rect {...box} x={x} y="268" width="90" height="60" rx="14" />
          <text {...S.lbl} x={x + 45} y="296" textAnchor="middle" fontSize="11">Produto</text>
          <text {...S.sub} x={x + 45} y="314" textAnchor="middle">+ HORA</text>
        </g>
      ))}
    </svg>
  );
}

function DiagramaPropagacao() {
  const ok = { stroke: '#2E7D5B', strokeWidth: 2, fill: 'rgba(46,125,91,.18)' };
  const bad = { stroke: '#C0392B', strokeWidth: 2, fill: 'rgba(192,57,43,.20)' };
  const pct = { fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 11 };
  const nos: [number, number, any, string, string, string][] = [
    [140, 34, ok, 'Caixa', '72%', '#6FD3A6'], [272, 86, ok, 'Tag', '64%', '#6FD3A6'],
    [272, 222, bad, 'Kit', '18%', '#F08379'], [140, 274, bad, 'Lembrança', '11%', '#F08379'],
    [8, 222, ok, 'Cartão', '68%', '#6FD3A6'], [8, 86, ok, 'Sacola', '61%', '#6FD3A6'],
  ];
  return (
    <svg viewBox="0 0 360 360" className="w-full max-w-[300px] mx-auto lp5-draw" role="img" aria-label="Ao atualizar o preço de um material, o custo de todos os produtos se corrige e a margem acusa quais ficaram no vermelho">
      <g>
        <path {...draw} d="M180 152 L180 96" /><path {...draw} d="M216 168 L286 128" />
        <path {...draw} d="M216 192 L286 232" /><path {...draw} d="M180 208 L180 264" />
        <path {...draw} d="M144 192 L74 232" /><path {...draw} d="M144 168 L74 128" />
      </g>
      <rect x="112" y="146" width="136" height="68" rx="18" stroke="#F66A93" strokeWidth="2.5" fill="rgba(246,106,147,.16)" />
      <text {...S.sub} x="180" y="168" textAnchor="middle">PAPEL</text>
      <text {...S.big} x="180" y="192" textAnchor="middle" fontSize="16">0,80 → 0,95</text>
      {nos.map(([x, y, skin, nome, p, cor]) => (
        <g key={nome}>
          <rect {...skin} x={x} y={y} width="80" height="52" rx="14" />
          <text {...S.lbl} x={x + 40} y={y + 22} textAnchor="middle" fontSize="12">{nome}</text>
          <text {...pct} x={x + 40} y={y + 40} textAnchor="middle" fill={cor}>{p}</text>
        </g>
      ))}
    </svg>
  );
}

function DiagramaFinanceiro() {
  return (
    <svg viewBox="0 0 360 360" className="w-full max-w-[300px] mx-auto lp5-draw" role="img" aria-label="Ao marcar o pedido como pago, o lançamento entra no financeiro automaticamente">
      <rect {...box} x="36" y="34" width="288" height="92" rx="18" />
      <text {...S.sub} x="60" y="62">PEDIDO</text>
      <text {...S.lbl} x="60" y="86" fontSize="14">Kit lembrancinha · 100 uni</text>
      <rect x="60" y="98" width="72" height="24" rx="12" fill="rgba(46,125,91,.22)" stroke="#2E7D5B" strokeWidth="1.5" />
      <path d="M74 110 l4 4 l7 -8" stroke="#6FD3A6" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="92" y="114" fontFamily="Outfit, sans-serif" fontWeight="700" fontSize="11" fill="#6FD3A6">PAGO</text>
      <path {...draw} d="M180 130 L180 214" />
      <path {...draw} d="M172 205 L180 215 L188 205" />
      <text x="196" y="176" fontFamily="Outfit, sans-serif" fontWeight="500" fontSize="11" fill="rgba(255,255,255,.55)" fontStyle="italic">sem digitar nada</text>
      <rect {...box} x="36" y="222" width="288" height="102" rx="18" />
      <text {...S.sub} x="60" y="250">FINANCEIRO</text>
      <text {...S.big} x="60" y="282" fontSize="22">+ R$ 340,00</text>
      <text {...S.sub} x="60" y="304">LANÇADO AUTOMATICAMENTE</text>
      <rect x="36" y="252" width="4" height="44" rx="2" fill="#F66A93" />
    </svg>
  );
}

const BLOCOS = [
  {
    n: '01', titulo: 'A sua hora entra em cada peça, sozinha',
    corpo: <p>Você define uma vez quanto quer ganhar e quantas horas trabalha. Todo produto que você cadastrar já nasce com <strong className="font-semibold text-white">o custo do seu tempo embutido</strong> — sem você precisar lembrar de somar.</p>,
    diagrama: <DiagramaHora />,
  },
  {
    n: '02', titulo: 'Mudou um material, você descobre na hora quais preços ficaram errados',
    corpo: <>
      <p>O papel subiu 18%? Você atualiza em <strong className="font-semibold text-white">um lugar</strong> e o custo de todos os produtos que usam aquele papel se corrige sozinho. A margem de cada um recalcula na hora — e os que ficaram apertados <strong className="font-semibold text-white">aparecem em vermelho na sua lista</strong>.</p>
      <p className="mt-4 font-semibold text-white">O preço quem muda é você. O sistema só garante que você saiba quais precisam mudar.</p>
      <p className="mt-4">Sua planilha não faz isso. É por isso que ela não estava errada no dia em que você criou — ela <strong className="font-semibold text-white">ficou errada sozinha</strong>, dois meses depois, e continuou parecendo certa.</p>
    </>,
    diagrama: <DiagramaPropagacao />,
  },
  {
    n: '03', titulo: 'O pedido pago vira seu financeiro, sem você lançar nada',
    corpo: <>
      <p>Você marca o pedido como pago. <strong className="font-semibold text-white">O lançamento entra no financeiro automaticamente.</strong></p>
      <p className="mt-4">Financeiro de quem produz sob encomenda não falha por falta de ferramenta. Falha porque ninguém tem paciência de digitar tudo em dezembro. Aqui o número fica certo porque você nunca precisou querer que ficasse.</p>
    </>,
    diagrama: <DiagramaFinanceiro />,
  },
];

export default function MecanismoLP5() {
  return (
    <section id="mecanismo" className="relative overflow-hidden bg-lp5n-900 py-[80px] lg:py-[130px]">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(110% 70% at 50% 0%, #2E1520 0%, #211F1C 55%, #16150F 100%)' }} />
      <div className="absolute left-1/2 -translate-x-1/2 -top-[300px] w-[1200px] h-[1200px] rounded-full border border-white/[0.04] pointer-events-none" />
      <div className="absolute left-1/2 -translate-x-1/2 -top-[160px] w-[820px] h-[820px] rounded-full border border-white/[0.035] pointer-events-none" />
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[860px] h-[420px] pointer-events-none lp5-glow"
           style={{ background: 'radial-gradient(closest-side, rgba(246,106,147,0.26), transparent 72%)', filter: 'blur(30px)' }} />

      <div className="relative max-w-lp5-narrow mx-auto px-5 lg:px-[80px]">
        <Reveal>
          <h2 className={`${T.h2} uppercase text-center text-white max-w-[880px] mx-auto`}>
            O PreciArte não começa perguntando o preço do seu produto.{' '}
            <span className="text-lp5-400" style={{ textShadow: '0 0 38px rgba(246,106,147,0.45)' }}>
              Começa perguntando o preço da sua hora.
            </span>
          </h2>
          <div className={`${T.body} text-white/[0.72] max-w-[64ch] mx-auto text-center mt-6 space-y-4`}>
            <p>A maioria das planilhas funciona assim: você soma o material, aplica uma porcentagem por cima e chama de preço. Seu tempo, quando entra, é um número que você mesma chutou.</p>
            <p>O PreciArte inverte isso. <strong className="font-semibold text-white">Você diz quanto quer ganhar por mês</strong> e quantas horas trabalha. O sistema soma seus custos fixos, divide pelas suas horas e chega ao valor real da sua hora. Depois <strong className="font-semibold text-white">injeta esse valor em cada produto que você cadastra</strong>, sozinho.</p>
            <p className="italic text-lp5-200">O seu pró-labore deixa de ser o que sobra e passa a ser o que entra na conta.</p>
          </div>
        </Reveal>

        <div className="mt-16 lg:mt-24 space-y-8 lg:space-y-10">
          {BLOCOS.map((b, i) => (
            <Reveal key={b.n} delay={i * 90}>
              <div className="relative rounded-[26px] overflow-hidden px-6 py-9 lg:px-12 lg:py-12"
                   style={{
                     background: 'linear-gradient(150deg, rgba(255,255,255,0.075) 0%, rgba(255,255,255,0.025) 55%, rgba(246,106,147,0.05) 100%)',
                     border: '1px solid rgba(255,255,255,0.10)',
                     boxShadow: '0 40px 90px -40px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.10)',
                   }}>
                {/* numeral fantasma */}
                <span className="absolute -top-8 right-4 lg:right-10 font-lp5 font-extrabold pointer-events-none select-none leading-none"
                      style={{ fontSize: '190px', color: 'rgba(246,106,147,0.07)' }}>{b.n}</span>
                {/* brilho de canto */}
                <div className="absolute -left-24 -top-24 w-[320px] h-[320px] rounded-full pointer-events-none"
                     style={{ background: 'radial-gradient(closest-side, rgba(246,106,147,0.18), transparent 70%)', filter: 'blur(30px)' }} />

                <div className={`relative grid lg:grid-cols-2 gap-9 lg:gap-14 items-center`}>
                  <div className={i % 2 === 1 ? 'lg:order-2' : ''}>{b.diagrama}</div>
                  <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                    <span className={`${T.caption} inline-flex items-center h-[30px] px-[13px] rounded-full text-lp5-300`}
                          style={{ border: '1px solid rgba(246,106,147,0.35)', background: 'rgba(246,106,147,0.10)' }}>
                      Mecanismo {b.n}
                    </span>
                    <h3 className={`${T.h3} uppercase text-white mt-5`}>{b.titulo}</h3>
                    <div className={`${T.body} text-white/[0.74] mt-4 max-w-[60ch]`}>{b.corpo}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
