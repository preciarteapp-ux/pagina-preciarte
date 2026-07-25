import { T, Reveal, Badge, IconCircle } from './ui';

const PASSOS = [
  {
    n: '01', dark: false,
    titulo: 'Diga quanto você quer ganhar',
    corpo: <>Horas por dia, dias por semana, quanto quer receber no mês. O sistema calcula o valor real da sua hora. <strong className="font-semibold text-lp5n-900">Leva 5 minutos.</strong></>,
    img: '/lp5/img-passo-01-calculadora.webp',
    alt: 'Tela da calculadora do PreciArte com horas por dia, dias por semana e meta de ganho preenchidos',
    ratio: 'aspect-[16/10]',
  },
  {
    n: '02', dark: true,
    titulo: 'Cadastre seus materiais e monte seus produtos',
    corpo: <>Cada material com o custo por unidade. O PreciArte soma material, seu tempo e custo fixo, e mostra <strong className="font-semibold text-white">a margem de cada peça em tempo real</strong> — verde, amarelo ou vermelho.</>,
    img: '/lp5/img-passo-02-margem.webp',
    alt: 'Tela de item de venda do PreciArte com a margem destacada em vermelho',
    ratio: 'aspect-[16/10]',
  },
  {
    n: '03', dark: false,
    titulo: 'Mande o orçamento em PDF pelo WhatsApp',
    corpo: <>Com a sua logo, seus dados, o prazo e a sua chave Pix. Em 1 clique.</>,
    ancora: 'O cliente para de receber um número e passa a receber uma proposta.',
    img: '/lp5/img-passo-03-pdf-whatsapp.webp',
    alt: 'Orçamento em PDF do PreciArte aberto em uma conversa de WhatsApp no celular',
    ratio: 'aspect-[9/16] max-h-[420px] w-auto mx-auto',
  },
];

export default function ComoFuncionaLP5() {
  return (
    <section id="como-funciona" className="bg-lp5n-100 py-[72px] lg:py-[120px]">
      <div className="max-w-lp5-container mx-auto px-5 lg:px-[120px]">
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
                <div className={`rounded-[20px] p-7 lg:p-8 ${p.dark ? 'bg-lp5-700' : 'bg-white border border-lp5n-200 shadow-[0_4px_16px_-4px_rgba(33,31,28,0.10)]'}`}>
                  <IconCircle variant={p.dark ? 'inverse' : 'solid'}>{p.n}</IconCircle>
                  <h3 className={`${T.h3} uppercase mt-5 ${p.dark ? 'text-white' : 'text-lp5n-900'}`}>{p.titulo}</h3>
                  <p className={`${T.body} mt-3 ${p.dark ? 'text-white/[0.86]' : 'text-lp5n-700'}`}>{p.corpo}</p>
                  {p.ancora && <p className={`${T.body} italic mt-3 text-lp5n-600`}>{p.ancora}</p>}
                  <img
                    src={p.img} alt={p.alt} loading="lazy" decoding="async"
                    className={`mt-6 rounded-[12px] object-cover w-full ${p.ratio} ${p.dark ? 'border border-white/15' : 'border border-lp5n-200'}`}
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
            <div className="mt-8 w-full aspect-[16/9] rounded-[20px] border-2 border-dashed border-lp5n-300 bg-lp5n-200/60 flex flex-col items-center justify-center gap-2 shadow-[0_12px_32px_-8px_rgba(33,31,28,0.14)]">
              <span className={`${T.caption} text-lp5n-500`}>gif-margem-tempo-real.mp4</span>
              <span className={`${T.small} text-lp5n-500`}>converter o .mov para MP4 (menos de 1,5MB) e substituir</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
