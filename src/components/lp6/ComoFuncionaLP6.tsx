import { T, Reveal, Badge, ImgSlot } from './ui';

/**
 * DOBRA 4 — Como funciona + demonstração
 *
 * Tira o medo da complexidade logo depois do susto da calculadora.
 * No mobile os 3 passos viram carrossel com snap: mostrar parte do
 * próximo card sinaliza que há mais sem exigir scroll vertical.
 */

const PASSOS = [
  {
    n: '01',
    titulo: 'Você cadastra o que compra',
    corpo: (
      <>
        Diz como compra e como usa. Uma resma que tem 500 folhas, um rolo de fita, um galão de resina.
        O sistema calcula sozinho quanto custa{' '}
        <strong className="font-semibold text-lp6-text">cada folha, cada centímetro, cada mililitro</strong>.
      </>
    ),
    img: 'passo-01-material-conversao.png',
    alt: 'Como você compra / Como você usa',
  },
  {
    n: '02',
    titulo: 'Você monta o produto',
    corpo: (
      <>
        Escolhe os materiais que entram e informa o tempo de produção. O custo aparece completo:
        material, impressão, sua mão de obra pelo valor real da hora, e as taxas.
      </>
    ),
    img: 'passo-02-item-composicao.png',
    alt: 'materiais somando o custo total',
  },
  {
    n: '03',
    titulo: 'O preço aparece com a margem colorida',
    corpo: (
      <>
        Verde acima de 60%, amarelo acima de 40%, vermelho abaixo. Você põe{' '}
        <strong className="font-semibold text-lp6-text">o seu preço</strong>, o sistema mostra o que ele
        está fazendo com o seu lucro.
      </>
    ),
    img: 'passo-03-margem-colorida.png',
    alt: 'margem em vermelho ao lado do preço sugerido',
  },
];

const ComoFuncionaLP6 = () => (
  <section className="relative overflow-hidden bg-white py-[56px] lg:py-[120px]">
    <div className="max-w-lp6-container mx-auto px-6 lg:px-10">
      <Reveal>
        <div className="flex flex-col lg:flex-row lg:items-end gap-4 lg:gap-8">
          <Badge>Como começar</Badge>
          <h2 className={`${T.h2} uppercase text-lp6-text`}>Como funciona</h2>
        </div>
      </Reveal>

      {/* desktop: grid · mobile: carrossel com snap */}
      <div className="lp6-snap flex lg:grid lg:grid-cols-3 gap-4 lg:gap-6 mt-8 lg:mt-14 overflow-x-auto lg:overflow-visible -mx-6 px-6 lg:mx-0 lg:px-0">
        {PASSOS.map((p, i) => (
          <Reveal key={p.n} delay={i * 110} className="min-w-[84%] sm:min-w-[60%] lg:min-w-0">
            <div className="h-full bg-lp6-50 border border-lp6-line rounded-[20px] p-7 lg:p-8">
              <p className="font-lp6 font-bold text-[48px] leading-none text-lp6-300">{p.n}</p>
              <h3 className={`${T.h3} uppercase text-lp6-text mt-3`}>{p.titulo}</h3>
              <p className={`${T.small} text-lp6-muted mt-3`}>{p.corpo}</p>
              <ImgSlot name={p.img} ratio="aspect-[16/10] lg:aspect-[4/3]" tone="light" label={p.alt} className="mt-6" />
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={90}>
        <p className={`${T.body} text-lp6-text text-center max-w-[68ch] mx-auto mt-9 lg:mt-14`}>
          Depois disso o número te acompanha. Quando a conta de luz subir, você atualiza em um lugar só e{' '}
          <em>o preço mínimo de todos os seus produtos já nasce corrigido</em>.
        </p>
      </Reveal>

      {/* demonstração */}
      <Reveal delay={120} className="mt-9 lg:mt-14">
        <p className={`${T.body} text-lp6-muted text-center max-w-[62ch] mx-auto`}>
          Veja o que hoje você faz de cabeça. A margem muda de cor enquanto você mexe no preço, e você
          sabe exatamente onde é o{' '}
          <strong className="font-semibold text-lp6-text">seu piso</strong> antes de responder o cliente.
        </p>
        <div className="mt-8 max-w-[720px] mx-auto">
          {/* 16/9 no desktop, 4/5 no mobile — o vídeo foi gravado na vertical */}
          <div className="hidden lg:block">
            <ImgSlot
              name="demo-margem-mudando.mp4"
              ratio="aspect-[16/9]"
              tone="rose"
              className="!rounded-[24px] shadow-[0_30px_70px_rgba(24,8,16,0.16)]"
              label="vídeo · 8s · poster obrigatório"
            />
          </div>
          <div className="lg:hidden mx-auto w-[78%]">
            <ImgSlot
              name="demo-margem-mudando.mp4"
              ratio="aspect-[4/5]"
              tone="rose"
              className="!rounded-[24px] shadow-[0_30px_70px_rgba(24,8,16,0.16)]"
              label="vídeo · 8s · vertical"
            />
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default ComoFuncionaLP6;
