import { Icon } from '@iconify/react';
import { buildCheckoutUrl } from '@/lib/checkout';
import { T, Reveal, CTAButton, SecondaryButton } from './ui';

export const CHECKOUT_ANUAL = 'https://pay.onprofit.com.br/CUTCm7GF?off=cbP8BX';
export const CHECKOUT_MENSAL = 'https://pay.hotmart.com/X105144057Q?off=awlgyuqd';

const ANUAL = {
  riscado: 'R$ 478,80/ano',
  parcelado: 'R$ 14,91',
  avista: 'ou R$ 139,90 à vista no plano anual',
  economia: 'R$ 338,90',
  porMes: 'R$ 14,91',
};

const INCLUSO = [
  '60 créditos de IA por mês', 'Calculadoras de preço e de hora', 'Produtos ilimitados',
  'Orçamentos ilimitados', 'Gestão de materiais e estoque', 'Gestão de clientes',
  'Financeiro completo', 'Catálogo online com link próprio', 'Foto profissional com IA',
  'Assistente de marketing com IA', 'Dashboard completo', 'Suporte especializado',
  'Atualizações constantes',
];

function Item({ children, forte = false }: { children: React.ReactNode; forte?: boolean }) {
  return (
    <li className={`${T.body} flex items-start gap-3 ${forte ? 'font-semibold text-lp5n-900' : 'text-lp5n-700'}`}>
      <Icon icon="solar:check-linear" width={20} className="shrink-0 mt-[5px] text-lp5s-success" />
      <span>{children}</span>
    </li>
  );
}

export default function PrecosLP5() {
  return (
    <section id="precos" className="relative overflow-hidden bg-white py-[72px] lg:py-[120px]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 30% 45%, rgba(246,106,147,0.10), transparent 70%)' }}
      />

      <div className="relative max-w-lp5-tight mx-auto px-5 lg:px-[120px]">
        <Reveal>
          <h2 className={`${T.h2} uppercase text-center text-lp5n-900`}>Simples assim. Sem pegadinha.</h2>
          <p className={`${T.body} text-lp5n-700 text-center mt-4 max-w-[60ch] mx-auto`}>
            Acesso completo em todos os planos. A diferença é só o tempo de compromisso.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mt-12 lg:mt-16 items-start">
          {/* ANUAL */}
          <Reveal>
            <div className="relative rounded-[24px] p-[2px] lg:scale-[1.04] transition-transform duration-[240ms] hover:-translate-y-1.5"
                 style={{ background: 'linear-gradient(150deg, #CE2252, #972142 55%, #F66A93)', boxShadow: '0 46px 100px -36px rgba(151,33,66,0.55)' }}>
            <div className="relative rounded-[22px] bg-white p-7 lg:p-10 overflow-hidden">
              <div className="absolute -right-20 -top-20 w-[280px] h-[280px] rounded-full pointer-events-none"
                   style={{ background: 'radial-gradient(closest-side, rgba(246,106,147,0.20), transparent 70%)', filter: 'blur(24px)' }} />
              <span className={`${T.caption} absolute z-10 -top-[14px] left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-lp5-700 text-white px-[14px] py-[6px] rounded-full whitespace-nowrap`}>
                <Icon icon="solar:star-bold" width={14} /> Melhor oferta
              </span>

              <h3 className={`${T.h3} uppercase text-lp5n-900`}>Anual</h3>
              <p className={`${T.body} text-lp5n-500 line-through mt-3`}>{ANUAL.riscado}</p>
              <p className={`${T.number} text-lp5-700 mt-1`}>{ANUAL.parcelado}</p>
              <p className={`${T.small} text-lp5n-600 mt-1`}>{ANUAL.avista}</p>

              <div className="flex items-center gap-3 rounded-[12px] bg-lp5s-success-bg p-4 mt-5">
                <Icon icon="solar:tag-price-linear" width={20} className="shrink-0 text-lp5s-success" />
                <span className={`${T.small} text-lp5s-success`}>
                  Você economiza <strong className="font-semibold">{ANUAL.economia}</strong> por ano
                </span>
              </div>

              <ul className="space-y-3 mt-6">
                <Item>Acesso completo a todos os recursos</Item>
                <Item forte>O sistema se paga na primeira venda que você corrigir</Item>
                <Item>Menos de {ANUAL.porMes} por mês</Item>
                <Item>Suporte prioritário incluso</Item>
              </ul>

              <CTAButton href={buildCheckoutUrl(CHECKOUT_ANUAL)} className="w-full mt-7 relative" trackId="checkout-anual">
                ASSINAR ANUAL AGORA
              </CTAButton>
            </div>
            </div>
          </Reveal>

          {/* MENSAL */}
          <Reveal delay={140}>
            <div className="rounded-[20px] bg-lp5n-50 border border-lp5n-300 p-7 lg:p-8 shadow-[0_4px_16px_-4px_rgba(33,31,28,0.10)]">
              <h3 className={`${T.h3} uppercase text-lp5n-900`}>Mensal</h3>
              <p className="mt-3">
                <span className={`${T.number} text-lp5n-900`}>R$ 39,90</span>
                <span className={`${T.body} text-lp5n-600`}>/mês</span>
              </p>
              <p className={`${T.small} text-lp5n-600 mt-1`}>Cancele quando quiser</p>

              <ul className="space-y-3 mt-6">
                <Item>Acesso completo a todos os recursos</Item>
                <Item>Suporte especializado</Item>
                <Item>Cancele quando quiser</Item>
                <Item>Sem fidelidade</Item>
              </ul>

              <SecondaryButton href={buildCheckoutUrl(CHECKOUT_MENSAL)} className="w-full mt-7" trackId="checkout-mensal">
                ASSINAR MENSAL
              </SecondaryButton>
            </div>
          </Reveal>
        </div>

        {/* tudo incluso */}
        <Reveal>
          <div className="mt-14 lg:mt-20 text-center">
            <p className={`${T.caption} text-lp5n-600`}>Tudo incluso em qualquer plano</p>
            <ul className="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-5 text-left max-w-[860px] mx-auto">
              {INCLUSO.map((i) => (
                <li key={i} className={`${T.small} flex items-start gap-2 text-lp5n-700`}>
                  <Icon icon="solar:check-circle-linear" width={16} className="shrink-0 mt-[3px] text-lp5-700" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* garantia */}
        <Reveal>
          <div className="mt-12 rounded-[16px] bg-lp5s-warning-bg border border-lp5s-warning p-6 flex flex-col lg:flex-row items-center gap-5 text-center lg:text-left">
            <svg viewBox="0 0 112 112" className="w-14 h-14 shrink-0" role="img" aria-label="Garantia incondicional de 7 dias">
              <circle cx="56" cy="56" r="55" fill="#FCF1E3" />
              <path d="M56 16 L82 26 v18 c0 15 -10 25 -26 30 C42 69 30 59 30 44 V26 Z" stroke="#CE691C" strokeWidth="3" fill="none" strokeLinejoin="round" />
              <path d="M46 44 l7 8 l14 -17" stroke="#CE691C" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <text x="56" y="95" textAnchor="middle" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="15" letterSpacing="1.2" fill="#CE691C">7 DIAS</text>
            </svg>
            <div>
              <h3 className={`${T.h3} uppercase text-lp5n-900`}>Garantia incondicional de 7 dias.</h3>
              <p className={`${T.body} text-lp5n-700 mt-2`}>
                Não gostou, você mesma solicita o reembolso dentro do sistema. Sem ligação, sem retenção, sem precisar
                explicar nada pra ninguém.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
