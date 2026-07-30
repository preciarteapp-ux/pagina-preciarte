import { Icon } from '@iconify/react';
import { T, Reveal, CTAButton, ArcDecor, GlassChip, ImgSlot } from './ui';

/**
 * DOBRA 1 — Hero + Prova
 *
 * Hero CENTRALIZADO, não split. Por isso usa o h1 global.
 * Se um dia virar 2 colunas, o h1 precisa de override para
 * clamp(24px, 2.8vw, 44px) — senão quebra em 8 linhas.
 */
const HeroLP6 = () => (
  <section className="relative overflow-hidden">
    {/* gradiente radial da marca */}
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse at 50% 25%, #C2185B 0%, #A81352 45%, #8E0F43 100%)',
      }}
    />
    <ArcDecor radii={[700, 1100]} color="rgba(255,255,255,0.08)" top="-20%" left="50%" spin />

    <div className="relative max-w-lp6-container mx-auto px-6 lg:px-10 pt-6 pb-0">
      {/* nav pill flutuante */}
      <nav className="flex items-center justify-between h-[64px] rounded-full bg-white px-5 lg:px-6 shadow-[0_4px_20px_rgba(24,8,16,0.10)]">
        <span className="font-lp6 font-bold text-[19px] lg:text-[20px] text-lp6-600">PreciArte</span>
        <a
          href="#planos"
          className="hidden lg:inline-flex items-center gap-2 h-[40px] px-5 rounded-full bg-lp6-600 text-white font-lp6 font-semibold text-[14px] transition-colors hover:bg-lp6-700"
        >
          VER PLANOS
        </a>
        <a href="#planos" aria-label="Ver planos" className="lg:hidden text-lp6-600">
          <Icon icon="solar:hamburger-menu-linear" width={24} />
        </a>
      </nav>

      {/* conteúdo */}
      <div className="text-center pt-10 lg:pt-20">
        <Reveal>
          <span className="inline-flex items-center gap-[6px] h-[32px] px-[16px] rounded-full border border-white/25 bg-white/[0.14] text-white">
            <Icon icon="solar:crown-line-duotone" width={15} className="text-lp6-300" />
            <span className={T.caption}>Para quem produz sob encomenda</span>
          </span>
        </Reveal>

        <Reveal delay={90}>
          <h1 className={`${T.h1} text-white mt-6 mx-auto max-w-[15ch]`}>
            Descubra em 3 minutos se o seu preço está pagando o seu trabalho
          </h1>
        </Reveal>

        <Reveal delay={180}>
          <p className={`${T.body} text-white/[0.82] mt-5 mx-auto max-w-[58ch]`}>
            O PreciArte calcula o <strong className="text-white font-semibold">custo real</strong> do que
            você produz: o material convertido de resma para folha, o seu tempo, e os custos fixos que
            nunca entram na conta. Para quem faz papelaria personalizada, lembrancinha, sublimação, MDF,
            adesivo e acrílico.
          </p>
        </Reveal>

        <Reveal delay={270}>
          <div className="mt-9 flex flex-col items-center">
            <CTAButton
              href="#calculadora"
              variant="dark"
              size="lg"
              external={false}
              trackId="lp6-hero-calcular"
              className="w-full sm:w-auto !text-[13px] sm:!text-[15px] lg:!text-[17px] !px-6 sm:!px-[38px]"
            >
              CALCULAR O VALOR REAL DA MINHA HORA
            </CTAButton>
            <p className={`${T.small} text-white/[0.62] mt-4`}>
              Grátis e sem cadastro. O cálculo acontece aqui nesta página.
            </p>
            <p className={`${T.small} text-white/[0.72] mt-2`}>
              Já sei que preciso disso.{' '}
              <a href="#planos" className="font-medium text-white underline underline-offset-4">
                VER PLANOS
              </a>
            </p>
          </div>
        </Reveal>
      </div>

      {/* screenshot sangrando pela base + chip
          No mobile o chip é ESTÁTICO acima da imagem: flutuando por cima ele
          cobria o miolo do screenshot, que é o argumento da dobra. */}
      <Reveal delay={280} className="relative mt-10 lg:mt-16">
        <div className="flex justify-center lg:hidden mb-4">
          <GlassChip
            icon="solar:chart-2-outline"
            label="A diferença que você não cobra"
            value="R$ 5,16 por hora"
            className="lp6-float"
          />
        </div>

        <div className="relative mx-auto w-full -mb-[32px] lg:-mb-[80px]">
          {/* frame de browser */}
          <div className="rounded-t-[16px] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.35)]">
            <div className="flex items-center gap-2 h-[28px] lg:h-[32px] px-4 bg-white/[0.12] backdrop-blur-sm">
              {['a', 'b', 'c'].map((k) => (
                <span key={k} className="w-[9px] h-[9px] lg:w-[10px] lg:h-[10px] rounded-full bg-white/25" />
              ))}
            </div>
            {/* duas versões da mesma tela: no celular a Calculadora empilha
                (grid-cols-1 md:grid-cols-2) e a versão larga ficaria com os
                rótulos ilegíveis a 342px de largura */}
            <ImgSlot
              name="hero-calculadora-valor-real-mobile.png"
              src="/lp6/hero-calculadora-valor-real-mobile.png"
              alt="Tela da calculadora do PreciArte comparando o valor básico da hora, o valor real com custos fixos e a diferença entre os dois"
              ratio="aspect-[1500/2178] lg:hidden"
              priority
            />
            <ImgSlot
              name="hero-calculadora-valor-real.png"
              src="/lp6/hero-calculadora-valor-real.png"
              alt="Tela da calculadora do PreciArte comparando o valor básico da hora, o valor real com custos fixos e a diferença entre os dois"
              ratio="aspect-[116/55] hidden lg:block"
              priority
            />
          </div>

          <div className="hidden lg:block absolute top-[24%] right-0 translate-x-[22%] lp6-float">
            <GlassChip
              icon="solar:chart-2-outline"
              label="A diferença que você não cobra"
              value="R$ 5,16 por hora"
            />
          </div>
        </div>
      </Reveal>
    </div>

    {/* faixa de prova, colada na base do gradiente */}
    <div className="relative bg-white pt-[64px] lg:pt-[112px] pb-10 lg:pb-14">
      <div className="max-w-lp6-container mx-auto px-6 lg:px-10 text-center">
        <Reveal>
          <p className="font-lp6 font-semibold text-[18px] lg:text-[24px] text-lp6-text leading-snug max-w-[46ch] mx-auto">
            <strong className="text-lp6-600 text-[1.4em] font-bold">87%</strong>{' '}
            das pessoas que fizeram esse cálculo descobriram que estavam{' '}
            <strong className="font-bold">cobrando abaixo do ideal</strong>.
          </p>
        </Reveal>
        <Reveal delay={90}>
          <p className={`${T.body} italic text-lp6-muted mt-5 max-w-[52ch] mx-auto`}>
            "Descobri que em vários pedidos eu estava no prejuízo."
          </p>
          <p className={`${T.small} text-lp6-muted mt-2`}>
            <strong className="font-semibold text-lp6-text">Ana Paula</strong>, papelaria personalizada, SP
          </p>
        </Reveal>
      </div>
    </div>
  </section>
);

export default HeroLP6;
