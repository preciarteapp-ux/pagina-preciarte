import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { T, CTAButton, Badge, Counter } from './ui';

const SEGMENTOS = [
  'Papelaria personalizada', 'Lembrancinhas de festa', 'Caixinhas e kits',
  'Sabonetes e velas artesanais', 'Produtos em MDF', 'Sublimação',
  'Brindes corporativos', 'Impressão 3D', 'Gravação a laser',
  'Acrílico personalizado', 'Encadernação personalizada',
];

const METRICAS = [
  { to: 2000, prefix: '+', suffix: '', label: 'criadoras assinantes' },
  { to: 2, prefix: '+R$ ', suffix: ' mi', label: 'em orçamentos todo mês' },
  { to: 87, prefix: '', suffix: '%', label: 'cobravam abaixo do custo' },
  { to: 1, prefix: '', suffix: ' min', label: 'para gerar um orçamento' },
];

export default function HeroLP5() {
  const [on, setOn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOn(true), 60); return () => clearTimeout(t); }, []);
  const enter = 'transition-[opacity,transform] duration-[700ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]';
  const st = (d: number) => ({ transitionDelay: `${d}ms` });
  const vis = on ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';

  return (
    <section id="hero" className="relative overflow-hidden bg-lp5-900 pb-[120px] lg:pb-[180px]">
      {/* ── camadas de fundo ─────────────────────────────────── */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 90% at 50% -12%, #6B1230 0%, #480C1E 40%, #22050F 100%)' }} />
      {/* anéis concêntricos — profundidade */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-[380px] w-[1500px] h-[1500px] rounded-full border border-white/[0.055] pointer-events-none" />
      <div className="absolute left-1/2 -translate-x-1/2 -top-[240px] w-[1120px] h-[1120px] rounded-full border border-white/[0.05] pointer-events-none" />
      <div className="absolute left-1/2 -translate-x-1/2 -top-[110px] w-[760px] h-[760px] rounded-full border border-white/[0.045] pointer-events-none" />
      {/* glow principal atrás do título */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[60px] w-[900px] h-[560px] pointer-events-none lp5-glow"
           style={{ background: 'radial-gradient(closest-side, rgba(246,106,147,0.42), rgba(246,106,147,0.10) 55%, transparent 75%)', filter: 'blur(20px)' }} />
      {/* halos laterais */}
      <div className="absolute -left-[220px] top-[420px] w-[620px] h-[620px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(closest-side, rgba(206,34,82,0.35), transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute -right-[240px] top-[240px] w-[560px] h-[560px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(closest-side, rgba(246,106,147,0.28), transparent 70%)', filter: 'blur(70px)' }} />

      <div className="relative max-w-lp5-container mx-auto px-5 lg:px-[80px] pt-[120px] lg:pt-[140px]">
        {/* ── objeto de marca com volume ────────────────────── */}
        <div className={`${enter} ${vis} flex justify-center`} style={st(0)}>
          <div className="relative">
            <div className="absolute inset-0 rounded-[38%] blur-[46px] opacity-80"
                 style={{ background: 'radial-gradient(circle, #F66A93 0%, rgba(206,34,82,0.5) 45%, transparent 72%)' }} />
            <div className="relative w-[92px] h-[92px] lg:w-[112px] lg:h-[112px] rounded-[30px] flex items-center justify-center lp5-float"
                 style={{
                   background: 'linear-gradient(150deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 45%, rgba(246,106,147,0.16) 100%)',
                   border: '1px solid rgba(255,255,255,0.22)',
                   boxShadow: '0 24px 60px -18px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.35)',
                   backdropFilter: 'blur(12px)',
                 }}>
              <img src="/lp5/logo-preciarte-simbolo-dark.png" alt="" aria-hidden="true"
                   className="w-[52px] lg:w-[62px] drop-shadow-[0_6px_16px_rgba(0,0,0,0.5)]" />
            </div>
          </div>
        </div>

        <div className="text-center mt-8 lg:mt-10">
          <div className={`${enter} ${vis}`} style={st(90)}>
            <Badge variant="dark" icon="solar:verified-check-linear">
              Sistema de gestão para quem produz sob encomenda
            </Badge>
          </div>

          <h1 className={`${T.h1} uppercase mt-6 max-w-[960px] mx-auto text-white ${enter} ${vis}`} style={st(180)}>
            Seu preço cobre o material.
            <br />
            <span className="relative inline-block text-lp5-400"
                  style={{ textShadow: '0 0 42px rgba(246,106,147,0.55), 0 0 90px rgba(246,106,147,0.28)' }}>
              Ele cobre a sua hora?
            </span>
          </h1>

          <p className={`${T.body} mt-6 max-w-[660px] mx-auto text-white/[0.75] ${enter} ${vis}`} style={st(280)}>
            O PreciArte calcula o preço real de cada peça que você produz —{' '}
            <strong className="font-semibold text-white">material, máquina, custo fixo e o seu tempo</strong>{' '}
            — e gera o orçamento em PDF pronto pra mandar no WhatsApp.
          </p>

          <div className={`mt-9 flex flex-col items-center gap-4 ${enter} ${vis}`} style={st(380)}>
            <CTAButton href="#precos" external={false} variant="dark" size="lg" trackId="lp5-hero">
              QUERO SABER MEU PREÇO CERTO
            </CTAButton>
            <span className={`${T.small} inline-flex items-center gap-2 text-white/[0.55] text-center`}>
              <Icon icon="solar:shield-check-linear" width={16} className="shrink-0" />
              7 dias de garantia incondicional — você mesma pede o reembolso
            </span>
          </div>
        </div>

        {/* ── palco do produto: perspectiva, sombra, sobreposição ── */}
        <div className={`relative mt-16 lg:mt-24 ${enter} ${vis}`} style={st(480)}>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-70px] w-[80%] h-[220px] pointer-events-none"
               style={{ background: 'radial-gradient(closest-side, rgba(246,106,147,0.40), transparent 72%)', filter: 'blur(48px)' }} />

          <div className="relative mx-auto max-w-[840px]" style={{ perspective: '1600px' }}>
            <div className="relative rounded-[20px] p-[6px]"
                 style={{
                   transform: 'rotateX(5deg) rotateZ(-0.5deg)', transformOrigin: 'center top',
                   background: 'linear-gradient(160deg, rgba(255,255,255,0.28), rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.10))',
                   boxShadow: '0 60px 120px -30px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.07)',
                 }}>
              <img src="/lp5/img-hero-precificacao.webp"
                   alt="Tela do PreciArte mostrando o custo real, o lucro em reais e a margem de um produto"
                   {...{ fetchpriority: 'high' }} width={1600} height={1000}
                   className="w-full rounded-[15px] block" />
            </div>

            {/* card de vidro — atravessa a borda do produto */}
            <div className="hidden md:block absolute z-20 -top-10 -right-8 lg:-right-24 w-[290px] rounded-[18px] overflow-hidden lp5-float"
                 style={{
                   border: '1px solid rgba(255,255,255,0.24)', backdropFilter: 'blur(16px)',
                   background: 'linear-gradient(150deg, rgba(255,255,255,0.16), rgba(255,255,255,0.05))',
                   boxShadow: '0 30px 70px -22px rgba(0,0,0,0.75)',
                 }}>
              <img src="/lp5/img-hero-card-hora.webp"
                   alt="Bloco do PreciArte mostrando o custo de mão de obra calculado a partir do valor da hora"
                   loading="lazy" className="w-full block opacity-95" />
            </div>

            {/* pílula flutuante à esquerda */}
            <div className="hidden lg:flex absolute z-20 -left-32 bottom-20 items-center gap-3 rounded-full pl-3 pr-5 py-3 whitespace-nowrap lp5-float"
                 style={{
                   animationDelay: '1.4s',
                   border: '1px solid rgba(255,255,255,0.20)',
                   background: 'linear-gradient(150deg, #5C1027 0%, #3A0817 100%)',
                   boxShadow: '0 24px 60px -18px rgba(0,0,0,0.85)',
                 }}>
              <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-white shrink-0">
                <Icon icon="solar:check-circle-bold" width={18} color="#972142" />
              </span>
              <span className="leading-tight">
                <span className="block font-lp5 font-semibold text-[14px] text-white">Margem calculada</span>
                <span className="block font-lp5 text-[12px] text-white/60">antes de você mandar o preço</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── barra de métricas: corta o hero, não fica embaixo ─── */}
      <div className="relative max-w-lp5-container mx-auto px-5 lg:px-[80px] mt-14 lg:mt-20">
        <div className="rounded-[22px] bg-white px-6 lg:px-10 py-7 lg:py-8 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0"
             style={{ boxShadow: '0 40px 90px -28px rgba(0,0,0,0.55)' }}>
          {METRICAS.map((m, i) => (
            <div key={m.label} className={`text-center lg:px-6 ${i > 0 ? 'lg:border-l lg:border-lp5n-200' : ''}`}>
              <Counter {...m} className={`${T.number} text-lp5-700 block`} />
              <p className={`${T.small} text-lp5n-600 mt-1.5`}>{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── faixa de segmentos ───────────────────────────────── */}
      <div className="relative pt-[56px] lg:pt-[72px]">
        <p className={`${T.caption} text-white/40 text-center mb-5`}>Feito para quem produz sob encomenda</p>
        <div className="lp5-scroll-fade overflow-x-auto lg:overflow-visible">
          <div className="flex lg:flex-wrap lg:justify-center gap-[10px] px-5 lg:px-[80px] w-max lg:w-auto lg:max-w-[1000px] lg:mx-auto">
            {SEGMENTOS.map((s) => (
              <span key={s}
                    className={`${T.small} whitespace-nowrap h-[38px] px-[18px] inline-flex items-center rounded-full text-white/70`}
                    style={{ border: '1px solid rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.05)' }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
