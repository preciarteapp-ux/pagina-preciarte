import { T, Reveal, Badge, IconCircle } from './ui';

const PASSOS = [
  {
    n: '01', dark: false,
    titulo: 'Diga quanto você quer ganhar',
    corpo: <>Horas por dia, dias por semana, quanto quer receber no mês. O sistema calcula o valor real da sua hora. <strong className="font-semibold text-lp5n-900">Leva 5 minutos.</strong></>,
    img: '/lp5/img-passo-01-calculadora.webp',
    alt: 'Tela da calculadora do PreciArte com horas por dia, dias por semana e meta de ganho preenchidos',
    ratio: 'w-full',
  },
  {
    n: '02', dark: true,
    titulo: 'Cadastre seus materiais e monte seus produtos',
    corpo: <>Cada material com o custo por unidade. O PreciArte soma material, seu tempo e custo fixo, e mostra <strong className="font-semibold text-white">a margem de cada peça em tempo real</strong> — verde, amarelo ou vermelho.</>,
    img: '/lp5/img-passo-02-margem.webp',
    alt: 'Tela de item de venda do PreciArte com a margem destacada em vermelho',
    ratio: 'w-full',
  },
  {
    n: '03', dark: false,
    titulo: 'Mande o orçamento em PDF pelo WhatsApp',
    corpo: <>Com a sua logo, seus dados, o prazo e a sua chave Pix. Em 1 clique.</>,
    ancora: 'O cliente para de receber um número e passa a receber uma proposta.',
    img: '/lp5/img-passo-03-pdf-whatsapp.webp',
    alt: 'Orçamento em PDF do PreciArte aberto em uma conversa de WhatsApp no celular',
    ratio: 'w-auto max-h-[460px] mx-auto',
  },
];

export default function ComoFuncionaLP5() {
  return (
    <section id="como-funciona" className="relative overflow-hidden bg-lp5n-100 py-[80px] lg:py-[130px]">
      <div className="absolute -left-40 top-1/3 w-[620px] h-[620px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(closest-side, rgba(246,106,147,0.18), transparent 70%)', filter: 'blur(46px)' }} />
      <div className="absolute -right-32 top-[8%] w-[520px] h-[520px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(closest-side, rgba(206,34,82,0.12), transparent 70%)', filter: 'blur(50px)' }} />
      <div className="relative max-w-lp5-container mx-auto px-5 lg:px-[80px]">
        <div className="grid lg:grid-cols-[40fr_60fr] gap-10 lg:gap-[80px]">
          {/* coluna sticky */}
          <div className="lg:sticky lg:top-[120px] lg:self-start">
            <Reveal>
              <Badge icon="solar:play-circle-linear">Como funciona</Badge>
              <h2 className={`${T.h2} uppercase text-lp5n-900 mt-5`}>Simples o suficiente pra começar hoje</h2>
              <p className={`${T.body} text-lp5n-700 mt-4 max-w-[46ch]`}>
                Você não precisa cadastrar tudo antes de ver valor. O primeiro número aparece no primeiro dia.
              </p>
            </Reveal>
          </div>

          {/* cards */}
          <div className="space-y-6">
            {PASSOS.map((p, i) => (
              <Reveal key={p.n} delay={i * 120}>
                <div className={`relative overflow-hidden rounded-[24px] p-7 lg:p-9 transition-transform duration-[260ms] hover:-translate-y-1`}
                     style={p.dark
                       ? { background: 'radial-gradient(130% 130% at 10% 0%, #B02A52 0%, #972142 45%, #6F1530 100%)', boxShadow: '0 40px 90px -34px rgba(151,33,66,0.6)' }
                       : { background: '#FFFFFF', border: '1px solid #EDEBE8', boxShadow: '0 24px 56px -26px rgba(33,31,28,0.24)' }}>
                  {p.dark && <div className="absolute -right-16 -top-16 w-[280px] h-[280px] rounded-full border border-white/[0.10]" />}
                  <span className="relative inline-flex w-[54px] h-[54px] items-center justify-center rounded-[18px] font-lp5 font-extrabold text-[20px]"
                        style={p.dark
                          ? { background: 'rgba(255,255,255,0.95)', color: '#972142' }
                          : { background: 'linear-gradient(150deg, #972142, #CE2252)', color: '#FFFFFF', boxShadow: '0 12px 26px -10px rgba(206,34,82,0.55)' }}>
                    {p.n}
                  </span>
                  <h3 className={`${T.h3} uppercase mt-5 relative ${p.dark ? 'text-white' : 'text-lp5n-900'}`}>{p.titulo}</h3>
                  <p className={`${T.body} mt-3 relative ${p.dark ? 'text-white/[0.86]' : 'text-lp5n-700'}`}>{p.corpo}</p>
                  {p.ancora && <p className={`${T.body} italic mt-3 text-lp5n-600`}>{p.ancora}</p>}
                  <img
                    src={p.img} alt={p.alt} loading="lazy" decoding="async"
                    className={`relative mt-7 rounded-[14px] h-auto block ${p.ratio}`}
                    style={{ border: p.dark ? '1px solid rgba(255,255,255,0.20)' : '1px solid #EDEBE8',
                             boxShadow: p.dark ? '0 26px 60px -24px rgba(0,0,0,0.6)' : '0 22px 50px -24px rgba(33,31,28,0.35)' }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* bloco de demonstração */}
        <Reveal>
          <div className="max-w-lp5-narrow mx-auto mt-16 lg:mt-24 text-center">
            <h3 className={`${T.h3} uppercase text-lp5n-900 max-w-[820px] mx-auto`}>
              O vermelho aparece antes de você mandar o preço — não depois do mês fechar
            </h3>
            <p className={`${T.body} text-lp5n-700 max-w-[65ch] mx-auto mt-4`}>
              Cada produto mostra o custo real, o lucro em reais e a margem em porcentagem. Se a margem estiver baixa,{' '}
              <strong className="font-semibold text-lp5s-danger">o número fica vermelho na sua tela</strong> enquanto você
              ainda pode mudar.
            </p>

            {/* PLACEHOLDER — o vídeo está em .mov com 21MB e precisa virar MP4 antes de entrar */}
            <div className="relative mt-9 w-full aspect-[16/9] rounded-[22px] border-2 border-dashed border-lp5n-300 bg-lp5n-200/60 flex flex-col items-center justify-center gap-2"
                 style={{ boxShadow: '0 40px 90px -34px rgba(33,31,28,0.4)' }}>
              <span className={`${T.caption} text-lp5n-500`}>gif-margem-tempo-real.mp4</span>
              <span className={`${T.small} text-lp5n-500`}>converter o .mov para MP4 (menos de 1,5MB) e substituir</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
