import { useEffect, useState } from 'react';
import { T, CTAButton, Badge, Counter } from './ui';

const SEGMENTOS = [
  'Papelaria personalizada', 'Lembrancinhas de festa', 'Caixinhas e kits',
  'Sabonetes e velas artesanais', 'Produtos em MDF', 'Sublimação',
  'Brindes corporativos', 'Impressão 3D', 'Gravação a laser',
  'Acrílico personalizado', 'Encadernação personalizada',
];

const METRICAS = [
  { to: 2000, prefix: '+', suffix: '', label: 'criadoras assinantes usando o PreciArte' },
  { to: 2, prefix: '+R$ ', suffix: ' milhões', label: 'em orçamentos gerados todo mês pela plataforma' },
  { to: 87, prefix: '', suffix: '%', label: 'descobrem que cobravam abaixo do custo real' },
  { to: 1, prefix: '', suffix: ' minuto', label: 'é o tempo pra gerar um orçamento profissional em PDF' },
];

export default function HeroLP5() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);

  const anim = (delay: number) =>
    `transition-[opacity,transform] duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
      mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    }`;

  return (
    <section id="hero" className="relative overflow-hidden bg-lp5-900">
      {/* gradiente radial + glow rosa */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 40%, #4F0D21 0%, #270611 100%)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none lp5-glow"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 32%, rgba(246,106,147,0.22), transparent 70%)' }}
      />

      <div className="relative max-w-lp5-container mx-auto px-5 lg:px-[120px] pt-[88px] lg:pt-[96px] pb-0">
        <div className="text-center">
          <div className={anim(0)} style={{ transitionDelay: '0ms' }}>
            <Badge variant="dark" icon="solar:verified-check-linear">
              Sistema de gestão para quem produz sob encomenda
            </Badge>
          </div>

          <h1 className={`${T.h1} uppercase mt-6 max-w-[900px] mx-auto text-white ${anim(120)}`} style={{ transitionDelay: '120ms' }}>
            Seu preço cobre o material.
            <br />
            <span className="text-lp5-400">Ele cobre a sua hora?</span>
          </h1>

          <p className={`${T.body} mt-5 max-w-[680px] mx-auto text-white/[0.82] ${anim(240)}`} style={{ transitionDelay: '240ms' }}>
            O PreciArte calcula o preço real de cada peça que você produz —{' '}
            <strong className="font-semibold text-white">material, máquina, custo fixo e o seu tempo</strong>{' '}
            — e gera o orçamento em PDF pronto pra mandar no WhatsApp.
          </p>

          <div className={`mt-8 flex justify-center ${anim(360)}`} style={{ transitionDelay: '360ms' }}>
            <CTAButton href="#precos" external={false} variant="dark" size="lg" trackId="lp5-hero">
              QUERO SABER MEU PREÇO CERTO
            </CTAButton>
          </div>

          <p className={`${T.small} mt-4 text-white/[0.65] ${anim(420)}`} style={{ transitionDelay: '420ms' }}>
            7 dias de garantia incondicional. Não gostou, você mesma pede o reembolso dentro do sistema.
          </p>
        </div>

        {/* screenshot + card de vidro */}
        <div className={`relative mt-12 lg:mt-14 ${anim(480)}`} style={{ transitionDelay: '480ms' }}>
          <img
            src="/lp5/img-hero-precificacao.webp"
            alt="Tela do PreciArte mostrando o custo real, o lucro em reais e a margem de um produto"
            {...{ fetchpriority: 'high' }}
            width={1600}
            height={1000}
            className="w-full max-w-[860px] mx-auto rounded-[16px] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.45)] -mr-6 lg:mr-auto"
            style={{ filter: 'brightness(1.02) contrast(1.04)' }}
          />
          <img
            src="/lp5/img-hero-card-hora.webp"
            alt="Bloco do PreciArte mostrando o custo de mão de obra calculado a partir do valor da hora"
            loading="lazy"
            className="hidden lg:block absolute top-[-28px] right-[40px] w-[280px] rounded-[16px]
                       border border-white/20 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.45)] lp5-float"
          />
        </div>
      </div>

      {/* barra branca de métricas — encostada no fim do hero */}
      <div className="relative bg-white">
        <div className="max-w-lp5-container mx-auto px-5 lg:px-[120px] py-[32px]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">
            {METRICAS.map((m, i) => (
              <div key={m.label} className={`text-center lg:px-6 ${i > 0 ? 'lg:border-l lg:border-lp5n-200' : ''}`}>
                <Counter {...m} className={`${T.number} text-lp5-700 block`} />
                <p className={`${T.small} text-lp5n-600 mt-2`}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* faixa de segmentos */}
      <div className="relative bg-lp5n-50 py-[28px]">
        <p className={`${T.caption} text-lp5n-600 text-center mb-4`}>Feito para quem produz sob encomenda</p>
        <div className="lp5-scroll-fade overflow-x-auto lg:overflow-visible">
          <div className="flex lg:flex-wrap lg:justify-center gap-[10px] px-5 lg:px-[120px] w-max lg:w-auto lg:max-w-lp5-container lg:mx-auto">
            {SEGMENTOS.map((s) => (
              <span key={s} className={`${T.small} whitespace-nowrap h-[36px] px-[16px] inline-flex items-center rounded-full bg-white border border-lp5n-200 text-lp5n-700`}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
